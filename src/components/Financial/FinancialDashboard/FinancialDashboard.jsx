import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import PieChart from "../../Charts/PieChart/PieChart";
import { authService } from "../../../services/api";
import {
  DashboardContainer,
  DashboardContent,
  DashboardHeader,
  HeaderContent,
  PageTitle,
  PageDescription,
  HeaderActions,
  MetricsGrid,
  MetricCard,
  MetricIcon,
  MetricContent,
  MetricValue,
  MetricLabel,
  MetricTrend,
  ChartsSection,
  ChartCard,
  ChartTitle,
  ChartContent,
  RecentTransactionsSection,
  SectionTitle,
  TransactionsList,
  TransactionItem,
  TransactionInfo,
  TransactionDescription,
  TransactionDate,
  TransactionAmount,
  TransactionStatus,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "./FinancialDashboard.styles";

const FinancialDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await authService.getAllBudgets();
        setTransactions(data || []);
        setError(null);
      } catch (err) {
        setError("Erro ao buscar as transações.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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

  const financialMetrics = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        receitasPagas: 0,
        lucroLiquido: 0,
        aReceber: 0,
        margemLucro: 0,
      };
    }

    const receitasPagas = transactions
      .filter((t) => t.status === "pago")
      .reduce((acc, t) => acc + t.valor, 0);

    const lucroLiquido = receitasPagas ;

    const aReceber = transactions
      .filter((t) => t.status === "PENDENTE")
      .reduce((acc, t) => acc + t.valor, 0);

    const margemLucro = receitasPagas > 0 ? (lucroLiquido / receitasPagas) * 100 : 0;

    return { receitasPagas, lucroLiquido, aReceber, margemLucro };
  }, [transactions]);

  const receitasPorProjeto = useMemo(() => {
    if (!transactions) return [];
    const porProjeto = transactions.reduce((acc, curr) => {
      const projetoNome = curr.cliente.nome;
      if (!acc[projetoNome]) {
        acc[projetoNome] = 0;
      }
      acc[projetoNome] += curr.valor;
      return acc;
    }, {});

    return Object.entries(porProjeto).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DashboardContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <DashboardContent>
        <DashboardHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>Dashboard Financeiro</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Acompanhe receitas e a saúde financeira dos seus projetos
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="receipt_long"
                onClick={() => navigate("/financeiro/transacoes")}
                $isDarkMode={isDarkMode}
              >
                Ver Transações
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
        </DashboardHeader>

        {transactions.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">monitoring</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Sem dados para exibir</EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              Ainda não há transações para gerar o dashboard. Comece cadastrando uma.
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          <>
            <MetricsGrid>
              <MetricCard $isDarkMode={isDarkMode}>
                <MetricIcon className="material-symbols-outlined" $color="success">
                  trending_up
                </MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>
                    {formatCurrency(financialMetrics.receitasPagas)}
                  </MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>Receitas Recebidas</MetricLabel>
                </MetricContent>
              </MetricCard>

              <MetricCard $isDarkMode={isDarkMode}>
                <MetricIcon className="material-symbols-outlined" $color="primary">
                  account_balance_wallet
                </MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>
                    {formatCurrency(financialMetrics.lucroLiquido)}
                  </MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>Lucro Líquido</MetricLabel>
                  <MetricTrend $isPositive={financialMetrics.margemLucro >= 0} $isDarkMode={isDarkMode}>
                    <span className="material-symbols-outlined">
                      {financialMetrics.margemLucro >= 0 ? "arrow_upward" : "arrow_downward"}
                    </span>
                    Margem: {financialMetrics.margemLucro.toFixed(2)}%
                  </MetricTrend>
                </MetricContent>
              </MetricCard>

              <MetricCard $isDarkMode={isDarkMode}>
                <MetricIcon className="material-symbols-outlined" $color="warning">
                  schedule
                </MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>
                    {formatCurrency(financialMetrics.aReceber)}
                  </MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>A Receber</MetricLabel>
                </MetricContent>
              </MetricCard>
            </MetricsGrid>

            <ChartsSection>
              <ChartCard $isDarkMode={isDarkMode}>
                <ChartTitle $isDarkMode={isDarkMode}>Receitas por Cliente</ChartTitle>
                <ChartContent>
                  {receitasPorProjeto.length > 0 ? (
                    <PieChart data={receitasPorProjeto} isDarkMode={isDarkMode} />
                  ) : (
                    <div>Nenhuma receita para exibir.</div>
                  )}
                </ChartContent>
              </ChartCard>

              <RecentTransactionsSection $isDarkMode={isDarkMode}>
                <SectionTitle $isDarkMode={isDarkMode}>Transações Recentes</SectionTitle>
                {recentTransactions.length > 0 ? (
                  <TransactionsList>
                    {recentTransactions.map((t) => (
                      <TransactionItem key={t.id} $isDarkMode={isDarkMode}>
                        <TransactionInfo>
                          <TransactionDescription $isDarkMode={isDarkMode}>{t.nome}</TransactionDescription>
                          <TransactionDate $isDarkMode={isDarkMode}>
                            {new Date(t.createdAt).toLocaleDateString("pt-BR")}
                          </TransactionDate>
                        </TransactionInfo>
                        <TransactionStatus $isDarkMode={isDarkMode} $status={getStatusVariant(t.status)}>
                          {t.status}
                        </TransactionStatus>
                        <TransactionAmount $isDarkMode={isDarkMode} $type={t.tipo}>
                          {formatCurrency(t.valor)}
                        </TransactionAmount>
                      </TransactionItem>
                    ))}
                  </TransactionsList>
                ) : (
                  <EmptyState $isDarkMode={isDarkMode} style={{ padding: '1rem 0' }}>
                    <EmptyStateDescription $isDarkMode={isDarkMode}>
                      Nenhuma transação recente.
                    </EmptyStateDescription>
                  </EmptyState>
                )}
              </RecentTransactionsSection>
            </ChartsSection>
          </>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
};

export default FinancialDashboard;
