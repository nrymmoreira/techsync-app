import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import { authService } from "../../../services/api";
import {
  BudgetsContainer,
  BudgetsContent,
  BudgetsHeader,
  HeaderContent,
  PageTitle,
  PageDescription,
  HeaderActions,
  FiltersSection,
  SearchInput,
  TableContainer,
  BudgetsTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  BudgetRow,
  BudgetInfo,
  BudgetNumber,
  BudgetClient,
  StatusBadge,
  BudgetValue,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "./BudgetsList.styles";

const BudgetsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [clientOptions, setClientOptions] = useState([
    { value: "all", label: "Todos os clientes" },
  ]);

  const statusOptions = [
    { value: "all", label: "Todos os status" },
    { value: "aberto", label: "Aberto" },
    { value: "aguardando_aprovacao", label: "Aguardando Aprovação" },
    { value: "aprovado", label: "Aprovado" },
    { value: "pago", label: "Pago" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [budgetsData, clients] = await Promise.all([
          authService.getAllBudgets(),
          authService.getAllClients(),
        ]);
        setBudgets(budgetsData);
        setFilteredBudgets(budgetsData);
        setClientOptions([
          { value: "all", label: "Todos os clientes" },
          ...clients.map((c) => ({ value: String(c.id), label: c.nome })),
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = budgets.filter((budget) => {
      const searchLower = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !searchLower ||
        budget.number.toLowerCase().includes(searchLower) ||
        budget.clientName.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || budget.status === statusFilter;
      const matchesClient =
        clientFilter === "all" || budget.clientId === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });

    // Ordenar por data de criação (mais recentes primeiro)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBudgets(filtered);
  }, [budgets, searchTerm, statusFilter, clientFilter]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      aberto: "Aberto",
      aguardando_aprovacao: "Aguardando Aprovação",
      aprovado: "Aprovado",
      pago: "Pago",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "aberto":
        return "warning";
      case "aguardando_aprovacao":
        return "info";
      case "aprovado":
        return "success";
      case "pago":
        return "success";
      default:
        return "info";
    }
  };

  const handleBudgetClick = (budgetId) => {
    navigate(`/orcamentos/${budgetId}`);
  };

  const downloadPDF = async () => {
    try {
      const blob = await authService.generateBudgetStatusReport();
      const url = URL.createObjectURL(blob);

      // Cria uma nova aba com HTML embutido
      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
        <html>
          <head>
            <title>Relatório Orçamento Status</title>
          </head>
          <body style="margin:0">
            <embed src="${url}" type="application/pdf" width="100%" height="100%">
          </body>
        </html>
      `);
        newWindow.document.close();
      }

      // Opcional: libera URL após alguns segundos
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      alert("Erro ao gerar PDF");
      console.error("Erro ao gerar PDF:", error);
    }
  };

  if (loading) {
    return (
      <BudgetsContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <BudgetsContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              hourglass_empty
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              A carregar orçamentos...
            </EmptyStateTitle>
          </EmptyState>
        </BudgetsContent>
      </BudgetsContainer>
    );
  }

  return (
    <BudgetsContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <BudgetsContent>
        <BudgetsHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>Orçamentos</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Gerencie seus orçamentos e acompanhe o status das propostas
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="ghost-report"
                size="medium"
                icon="add"
                onClick={downloadPDF}
                $isDarkMode={isDarkMode}
              >
                Relatório Status
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate("/orcamentos/novo")}
                $isDarkMode={isDarkMode}
              >
                Novo Orçamento
              </Button>
            </HeaderActions>
          </HeaderContent>
        </BudgetsHeader>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Buscar por número ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />

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

          <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
            <Select
              id="clientFilter"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              options={clientOptions}
              placeholder="Filtrar por cliente"
              $isDarkMode={isDarkMode}
            />
          </div>
        </FiltersSection>

        {filteredBudgets.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              receipt_long
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== "all" || clientFilter !== "all"
                ? "Nenhum orçamento encontrado"
                : "Nenhum orçamento cadastrado"}
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== "all" || clientFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Comece criando seu primeiro orçamento"}
            </EmptyStateDescription>
            {!searchTerm &&
              statusFilter === "all" &&
              clientFilter === "all" && (
                <Button
                  variant="primary"
                  size="medium"
                  icon="add"
                  onClick={() => navigate("/orcamentos/novo")}
                  $isDarkMode={isDarkMode}
                  style={{ marginTop: "1rem" }}
                >
                  Criar Orçamento
                </Button>
              )}
          </EmptyState>
        ) : (
          <TableContainer>
            <BudgetsTable $isDarkMode={isDarkMode}>
              <TableHeader $isDarkMode={isDarkMode}>
                <tr>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Orçamento
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Cliente
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Valor Total
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Data
                  </TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredBudgets.map((budget) => (
                  <BudgetRow
                    key={budget.id}
                    onClick={() => handleBudgetClick(budget.id)}
                    $isDarkMode={isDarkMode}
                  >
                    <td>
                      <BudgetInfo>
                        <BudgetNumber $isDarkMode={isDarkMode}>
                          {budget.id}
                        </BudgetNumber>
                      </BudgetInfo>
                    </td>
                    <td>
                      <BudgetClient $isDarkMode={isDarkMode}>
                        {budget.cliente.nome}
                      </BudgetClient>
                    </td>
                    <td>
                      <StatusBadge
                        $status={getStatusColor(budget.status)}
                        $isDarkMode={isDarkMode}
                      >
                        {getStatusLabel(budget.status)}
                      </StatusBadge>
                    </td>
                    <td>
                      <BudgetValue $isDarkMode={isDarkMode}>
                        {formatCurrency(budget.valor)}
                      </BudgetValue>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.875rem", color: "inherit" }}>
                        {formatDate(budget.createdAt)}
                      </span>
                    </td>
                  </BudgetRow>
                ))}
              </TableBody>
            </BudgetsTable>
          </TableContainer>
        )}
      </BudgetsContent>
    </BudgetsContainer>
  );
};

export default BudgetsList;
