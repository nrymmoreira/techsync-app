import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import PieChart from "../../Charts/PieChart/PieChart";
import { financialService } from "../../../services/api";
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
        const data = await financialService.getAllTransactions();
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

  const financialMetrics = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalEntradas: 0, totalSaidas: 0, lucroLiquido: 0, margemLucro: 0 };
    }

    const totalEntradas = transactions
      .filter((t) => t.tipo === "ENTRADA")
      .reduce((acc, t) => acc + t.valor, 0);

    const totalSaidas = transactions
      .filter((t) => t.tipo === "SAIDA")
      .reduce((acc, t) => acc + t.valor, 0);

    const lucroLiquido = totalEntradas - totalSaidas;
    const margemLucro = totalEntradas > 0 ? (lucroLiquido / totalEntradas) * 100 : 0;

    return { totalEntradas, totalSaidas, lucroLiquido, margemLucro };
  }, [transactions]);

  const receitasPorCliente = useMemo(() => {
    if (!transactions) return [];
    const porCliente = transactions
      .filter(t => t.tipo === 'ENTRADA')
      .reduce((acc, curr) => {
        const clienteNome = curr.cliente.nome;
        if (!acc[clienteNome]) {
          acc[clienteNome] = 0;
        }
        acc[clienteNome] += curr.valor;
        return acc;
      }, {});

    return Object.entries(porCliente).map(([name, value]) => ({ name, value }));
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
                Acompanhe as entradas, saídas e a saúde financeira da sua empresa.
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
                <MetricIcon className="material-symbols-outlined" $color="success">trending_up</MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>{formatCurrency(financialMetrics.totalEntradas)}</MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>Total de Entradas</MetricLabel>
                </MetricContent>
              </MetricCard>

              <MetricCard $isDarkMode={isDarkMode}>
                <MetricIcon className="material-symbols-outlined" $color="error">trending_down</MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>{formatCurrency(financialMetrics.totalSaidas)}</MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>Total de Saídas</MetricLabel>
                </MetricContent>
              </MetricCard>

              <MetricCard $isDarkMode={isDarkMode}>
                <MetricIcon className="material-symbols-outlined" $color="primary">account_balance_wallet</MetricIcon>
                <MetricContent>
                  <MetricValue $isDarkMode={isDarkMode}>{formatCurrency(financialMetrics.lucroLiquido)}</MetricValue>
                  <MetricLabel $isDarkMode={isDarkMode}>Lucro Líquido</MetricLabel>
                  <MetricTrend $isPositive={financialMetrics.margemLucro >= 0} $isDarkMode={isDarkMode}>
                    <span className="material-symbols-outlined">
                      {financialMetrics.margemLucro >= 0 ? "arrow_upward" : "arrow_downward"}
                    </span>
                    Margem: {financialMetrics.margemLucro.toFixed(2)}%
                  </MetricTrend>
                </MetricContent>
              </MetricCard>
            </MetricsGrid>

            <ChartsSection>
              <ChartCard $isDarkMode={isDarkMode}>
                <ChartTitle $isDarkMode={isDarkMode}>Receitas por Cliente</ChartTitle>
                <ChartContent>
                  {receitasPorCliente.length > 0 ? (
                    <PieChart data={receitasPorCliente} isDarkMode={isDarkMode} />
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
                          <TransactionDescription $isDarkMode={isDarkMode}>{t.nomeTransacao}</TransactionDescription>
                          <TransactionDate $isDarkMode={isDarkMode}>
                            {new Date(t.dataTransacao).toLocaleDateString("pt-BR")}
                          </TransactionDate>
                        </TransactionInfo>
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
