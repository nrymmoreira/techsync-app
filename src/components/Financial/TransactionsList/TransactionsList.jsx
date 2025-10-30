import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
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
  TransactionInfo,
  TransactionDescription,
  TransactionCategory,
  TransactionAmount,
  TransactionStatus,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "./TransactionsList.styles";
import { authService } from "../../../services/api";

const TransactionsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await authService.getAllBudgets();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "PAGO":
        return "success";
      case "PENDENTE":
        return "warning";
      case "VENCIDO":
        return "error";
      default:
        return "info";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = (
      (transaction.nome && transaction.nome.toLowerCase().includes(searchTermLower)) ||
      (transaction.projeto?.nome && transaction.projeto.nome.toLowerCase().includes(searchTermLower)) ||
      (transaction.cliente?.nome && transaction.cliente.nome.toLowerCase().includes(searchTermLower))
    );

    const matchesType = typeFilter === "all" || transaction.tipo === typeFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const typeOptions = [
    { value: "all", label: "Todos os tipos" },
    { value: "RECEITA", label: "Receitas" },
    { value: "DESPESA", label: "Despesas" },
  ];

  const statusOptions = [
    { value: "all", label: "Todos os status" },
    { value: "PAGO", label: "Pago" },
    { value: "PENDENTE", label: "Pendente" },
    { value: "VENCIDO", label: "Vencido" },
  ];

  return (
    <TransactionsContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <TransactionsContent>
        <TransactionsHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>
                Transações Financeiras
              </PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Gerencie todas as receitas e despesas da sua empresa
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
            placeholder="Buscar por descrição, projeto ou cliente..."
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
              placeholder="Filtrar por tipo"
              $isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder="Filtrar por status"
              $isDarkMode={isDarkMode}
            />
          </div>
        </FiltersSection>

        <TableContainer $isDarkMode={isDarkMode}>
          <TransactionsTable $isDarkMode={isDarkMode}>
            <TableHeader $isDarkMode={isDarkMode}>
              <TransactionRow $isDarkMode={isDarkMode}>
                <TableHeaderCell>Projeto/Cliente</TableHeaderCell>
                <TableHeaderCell>Data de Vencimento</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell style={{ textAlign: "right" }}>
                  Valor
                </TableHeaderCell>
              </TransactionRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  onClick={() =>
                    navigate(`/financeiro/transacao/${transaction.id}`)
                  }
                  $isDarkMode={isDarkMode}
                >
                  <td>
                    <TransactionCategory $isDarkMode={isDarkMode}>
                      {transaction.projeto?.nome || transaction.cliente?.nome}
                    </TransactionCategory>
                  </td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>
                  <td>
                    <TransactionStatus
                      $isDarkMode={isDarkMode}
                      $status={getStatusVariant(transaction.status)}
                    >
                      {transaction.status}
                    </TransactionStatus>
                  </td>
                  <td>
                    <TransactionAmount
                      $isDarkMode={isDarkMode}
                      $type={transaction.tipo}
                    >
                      {transaction.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TransactionAmount>
                  </td>
                </TransactionRow>
              ))}
            </TableBody>
          </TransactionsTable>
        </TableContainer>

        {filteredTransactions.length === 0 && (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              search_off
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              Nenhuma transação encontrada
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              Tente ajustar seus filtros ou cadastre uma nova transação.
            </EmptyStateDescription>
          </EmptyState>
        )}
      </TransactionsContent>
    </TransactionsContainer>
  );
};

export default TransactionsList;
