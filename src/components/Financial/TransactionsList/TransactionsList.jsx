import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import Modal from "../../Modal/Modal"; 
import { financialService } from "../../../services/api";
import {
  TransactionsContainer,
  TransactionsContent,
  TransactionsHeader,
  HeaderContent,
  PageTitle,
  PageDescription,
  HeaderActions,
  FiltersSection,
  SearchInput,
  TableContainer,
  TransactionsTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TransactionRow,
  TransactionAmount,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  ActionButtons,
} from "./TransactionsList.styles";

const TransactionsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await financialService.getAllTransactions();
      setTransactions(data || []);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar as transações.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;
    try {
      await financialService.deleteTransaction(transactionToDelete.id);
      setShowDeleteModal(false);
      setTransactionToDelete(null);
      fetchTransactions(); // Re-fetch transactions after deletion
    } catch (err) {
      console.error("Erro ao deletar transação:", err);
      setError("Erro ao deletar a transação.");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = (
      transaction.nomeTransacao.toLowerCase().includes(searchTermLower) ||
      transaction.cliente.nome.toLowerCase().includes(searchTermLower)
    );
    const matchesType = typeFilter === "all" || transaction.tipo === typeFilter;
    return matchesSearch && matchesType;
  });

  const typeOptions = [
    { value: "all", label: "Todos os tipos" },
    { value: "ENTRADA", label: "Entrada" },
    { value: "SAIDA", label: "Saída" },
  ];

  return (
    <TransactionsContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <TransactionsContent>
        <TransactionsHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>Transações Financeiras</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Gerencie todas as entradas e saídas da sua empresa
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="dashboard"
                onClick={() => navigate("/financeiro")}
                $isDarkMode={isDarkMode}
              >
                Dashboard
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate("/financeiro/nova-transacao")}
                $isDarkMode={isDarkMode}
              >
                Nova Transação
              </Button>
            </HeaderActions>
          </HeaderContent>
        </TransactionsHeader>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Buscar por nome da transação ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />
          <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
            <Select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={typeOptions}
              $isDarkMode={isDarkMode}
            />
          </div>
        </FiltersSection>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TableContainer $isDarkMode={isDarkMode}>
            <TransactionsTable $isDarkMode={isDarkMode}>
              <TableHeader $isDarkMode={isDarkMode}>
                <tr>
                  <TableHeaderCell>Nome da Transação</TableHeaderCell>
                  <TableHeaderCell>Cliente</TableHeaderCell>
                  <TableHeaderCell>Data</TableHeaderCell>
                  <TableHeaderCell style={{ textAlign: "right" }}>Valor</TableHeaderCell>
                  <TableHeaderCell>Ações</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TransactionRow key={transaction.id} $isDarkMode={isDarkMode}>
                    <td>{transaction.nomeTransacao}</td>
                    <td>{transaction.cliente.nome}</td>
                    <td>{new Date(transaction.dataTransacao).toLocaleDateString("pt-BR")}</td>
                    <td>
                      <TransactionAmount $isDarkMode={isDarkMode} $type={transaction.tipo}>
                        {transaction.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TransactionAmount>
                    </td>
                    <td>
                      <ActionButtons>
                        <Button variant="icon" onClick={() => navigate(`/financeiro/transacao/${transaction.id}`)} $isDarkMode={isDarkMode}>
                          <span className="material-symbols-outlined">edit</span>
                        </Button>
                        <Button variant="icon" onClick={() => handleDeleteClick(transaction)} $isDarkMode={isDarkMode} $color="error">
                          <span className="material-symbols-outlined">delete</span>
                        </Button>
                      </ActionButtons>
                    </td>
                  </TransactionRow>
                ))}
              </TableBody>
            </TransactionsTable>
          </TableContainer>
        )}

        {!loading && !error && filteredTransactions.length === 0 && (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">search_off</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Nenhuma transação encontrada</EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              Tente ajustar seus filtros ou cadastre uma nova transação.
            </EmptyStateDescription>
          </EmptyState>
        )}
      </TransactionsContent>

      {showDeleteModal && (
        <Modal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
          title="Confirmar Exclusão"
          $isDarkMode={isDarkMode}
        >
          <p>Deseja realmente excluir a transação "{transactionToDelete?.nomeTransacao}"?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} $isDarkMode={isDarkMode}>Cancelar</Button>
            <Button variant="error" onClick={confirmDelete} $isDarkMode={isDarkMode}>Excluir</Button>
          </div>
        </Modal>
      )}
    </TransactionsContainer>
  );
};

export default TransactionsList;
