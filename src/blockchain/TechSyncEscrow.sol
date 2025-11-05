// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
  TechSyncEscrow + Factory
  - Cliente cria contrato via Factory e deposita o valor
  - Freelancer marca trabalho concluído -> começa prazo de revisão
  - Cliente pode liberar ou abrir disputa durante o prazo
  - Se prazo expirar sem disputa, qualquer um pode acionar autoRelease()
  - Arbiter (p.ex. TechSync admin) pode resolver disputas
  - Proteções: reentrancy guard (OpenZeppelin) and checks-effects-interactions
*/

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TechSyncEscrow is ReentrancyGuard {
    address public client;
    address public freelancer;
    address public arbiter; // terceiro neutro (p.ex. TechSync)
    uint256 public amount;
    bool public workCompleted;
    bool public paid;
    bool public dispute;
    uint256 public deadline; // timestamp quando prazo acaba
    uint256 public createdAt;
    string public metadata; // hash/descrição curta (opcional)

    event Deposited(address indexed client, uint256 amount);
    event WorkMarkedCompleted(address indexed freelancer, uint256 deadline);
    event PaymentReleased(address indexed to, uint256 amount);
    event DisputeRaised(address indexed client);
    event DisputeResolved(address indexed arbiter, bool releaseToFreelancer);
    event Refunded(address indexed client, uint256 amount);

    modifier onlyClient() {
        require(msg.sender == client, "Somente cliente");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Somente freelancer");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Somente arbiter");
        _;
    }

    constructor(
        address _client,
        address _freelancer,
        address _arbiter,
        string memory _metadata
    ) payable {
        require(_client != address(0) && _freelancer != address(0), "Enderecos invalidos");
        require(msg.value > 0, "Valor deve ser > 0");
        client = _client;
        freelancer = _freelancer;
        arbiter = _arbiter;
        amount = msg.value;
        createdAt = block.timestamp;
        metadata = _metadata;

        emit Deposited(client, msg.value);
    }

    /// Freelancer marca o trabalho concluido; o parametro _daysToWait define prazo de revisão (em dias)
    function markWorkCompleted(uint256 _daysToWait) external onlyFreelancer {
        require(!workCompleted, "Ja marcado como concluido");
        require(_daysToWait > 0 && _daysToWait <= 30, "Prazo invalido (1-30 dias)");
        workCompleted = true;
        deadline = block.timestamp + (_daysToWait * 1 days);
        emit WorkMarkedCompleted(msg.sender, deadline);
    }

    /// Cliente libera o pagamento manualmente
    function releasePayment() external onlyClient nonReentrant {
        require(workCompleted, "Trabalho nao concluido");
        require(!paid, "Pagamento ja realizado");
        require(!dispute, "Disputa ativa");
        _payoutFreelancer();
    }

    /// Cliente abre disputa durante o periodo de revisao
    function raiseDispute() external onlyClient {
        require(workCompleted, "Trabalho nao concluido");
        require(!dispute, "Disputa ja aberta");
        require(block.timestamp < deadline, "Prazo expirado");
        dispute = true;
        emit DisputeRaised(msg.sender);
    }

    /// Arbiter resolve a disputa indicando para quem liberar
    function resolveDispute(bool releaseToFreelancer) external onlyArbiter nonReentrant {
        require(dispute, "Nao ha disputa");
        require(!paid, "Pagamento ja realizado");
        dispute = false;
        if (releaseToFreelancer) {
            _payoutFreelancer();
            emit DisputeResolved(msg.sender, true);
        } else {
            _refundClient();
            emit DisputeResolved(msg.sender, false);
        }
    }

    /// Libera automaticamente o pagamento se prazo expirou e nao ha disputa
    /// Pode ser chamada por qualquer conta (p.ex. backend do TechSync)
    function autoRelease() external nonReentrant {
        require(workCompleted, "Trabalho nao concluido");
        require(block.timestamp >= deadline, "Prazo ainda nao expirado");
        require(!paid, "Pagamento ja realizado");
        require(!dispute, "Disputa ativa");
        _payoutFreelancer();
    }

    /// Se por algum motivo quiser reembolsar (p.ex. acordo entre as partes), apenas arbiter pode executar
    function refundToClient() external onlyArbiter nonReentrant {
        require(!paid, "Pagamento ja realizado");
        _refundClient();
    }

    // ----- internals -----
    function _payoutFreelancer() internal {
        require(amount > 0, "Sem fundos");
        paid = true;
        uint256 payout = amount;
        amount = 0; // efeito antes da interação (checks-effects-interactions)
        (bool ok, ) = payable(freelancer).call{value: payout}("");
        require(ok, "Transferencia falhou");
        emit PaymentReleased(freelancer, payout);
    }

    function _refundClient() internal {
        require(amount > 0, "Sem fundos");
        paid = true;
        uint256 refund = amount;
        amount = 0;
        (bool ok, ) = payable(client).call{value: refund}("");
        require(ok, "Reembolso falhou");
        emit Refunded(client, refund);
    }

    // Helper view
    function timeLeftForReview() external view returns (uint256) {
        if (!workCompleted) return 0;
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }
}

contract EscrowFactory {
    event EscrowCreated(address indexed escrowAddress, address indexed client, address indexed freelancer, uint256 amount);

    TechSyncEscrow[] public escrows;

    function createEscrow(address _freelancer, address _arbiter, string calldata _metadata) external payable returns (address) {
        require(msg.value > 0, "Deposito necessario");
        TechSyncEscrow s = (new TechSyncEscrow){value: msg.value}(msg.sender, _freelancer, _arbiter, _metadata);
        escrows.push(s);
        emit EscrowCreated(address(s), msg.sender, _freelancer, msg.value);
        return address(s);
    }

    function getEscrows() external view returns (TechSyncEscrow[] memory) {
        return escrows;
    }
}
