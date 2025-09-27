import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import PieChart from '../../Charts/PieChart/PieChart';
import BarChart from '../../Charts/BarChart/BarChart';
import { financialData } from '../../../services/demoData';
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
  EmptyStateDescription
} from './FinancialDashboard.styles';

const FinancialDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [metrics, setMetrics] = useState({});
  const [chartData, setChartData] = useState({});
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFinancialData = () => {
      try {
        setLoading(true);
        
        // Carregar métricas
        const metricsData = financialData.getMetrics();
        setMetrics(metricsData);
        
        // Carregar dados dos gráficos
        const charts = financialData.getChartData();
        setChartData(charts);
        
        // Combinar receitas e despesas para transações recentes
        const allTransactions = [
          ...financialData.projectRevenues.map(item => ({
            ...item,
            descricao: `Receita - ${item.projectName}`,
            categoria: 'RECEITA'
          })),
          ...financialData.expenses
        ].sort((a, b) => {
          const dateA = new Date(a.dataPagamento || a.dataVencimento);
          const dateB = new Date(b.dataPagamento || b.dataVencimento);
          return dateB - dateA;
        });
        
        setRecentTransactions(allTransactions.slice(0, 8));
      } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFinancialData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pendente';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAGO':
        return 'success';
      case 'PENDENTE':
        return 'warning';
      case 'VENCIDO':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'PAGO': 'Pago',
      'PENDENTE': 'Pendente',
      'VENCIDO': 'Vencido'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <DashboardContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DashboardContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">hourglass_empty</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Carregando dashboard financeiro...</EmptyStateTitle>
          </EmptyState>
        </DashboardContent>
      </DashboardContainer>
    );
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
                Acompanhe receitas, despesas e a saúde financeira dos seus projetos
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="receipt_long"
                onClick={() => navigate('/financeiro/transacoes')}
                $isDarkMode={isDarkMode}
              >
                Ver Transações
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/financeiro/nova-transacao')}
                $isDarkMode={isDarkMode}
              >
                Nova Transação
              </Button>
            </HeaderActions>
          </HeaderContent>
        </DashboardHeader>

        <MetricsGrid>
          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="success">
              trending_up
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {formatCurrency(metrics.receitasPagas)}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Receitas Recebidas</MetricLabel>
              <MetricTrend $isPositive={true} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">arrow_upward</span>
                +12% vs mês anterior
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="error">
              trending_down
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {formatCurrency(metrics.despesasPagas)}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Despesas Pagas</MetricLabel>
              <MetricTrend $isPositive={false} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">arrow_downward</span>
                +5% vs mês anterior
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="primary">
              account_balance_wallet
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {formatCurrency(metrics.lucroLiquido)}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Lucro Líquido</MetricLabel>
              <MetricTrend $isPositive={metrics.lucroLiquido > 0} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">
                  {metrics.lucroLiquido > 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                Margem: {metrics.margemLucro.toFixed(1)}%
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="warning">
              schedule
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {formatCurrency(metrics.receitasPendentes)}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>A Receber</MetricLabel>
              <MetricTrend $isPositive={false} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">schedule</span>
                {financialData.projectRevenues.filter(r => r.statusPagamento === 'PENDENTE').length} pendentes
              </MetricTrend>
            </MetricContent>
          </MetricCard>
        </MetricsGrid>

        <ChartsSection>
          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Receitas vs Despesas</ChartTitle>
            <ChartContent>
              <PieChart 
                data={chartData.revenueExpenseData} 
                title="Receitas vs Despesas" 
              />
            </ChartContent>
          </ChartCard>

          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Receitas por Projeto</ChartTitle>
            <ChartContent>
              <BarChart 
                data={chartData.projectRevenueData} 
                title="Receitas por Projeto"
                dataKey="value"
                nameKey="name"
              />
            </ChartContent>
          </ChartCard>
        </ChartsSection>

        <ChartsSection>
          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Despesas por Categoria</ChartTitle>
            <ChartContent>
              <PieChart 
                data={chartData.expensesByCategory} 
                title="Despesas por Categoria" 
              />
            </ChartContent>
          </ChartCard>

          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Fluxo de Caixa</ChartTitle>
            <ChartContent>
              <BarChart 
                data={chartData.cashFlowData} 
                title="Fluxo de Caixa"
                dataKey="lucro"
                nameKey="name"
              />
            </ChartContent>
          </ChartCard>
        </ChartsSection>

        <RecentTransactionsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>Transações Recentes</SectionTitle>
          
          <TransactionsList>
            {recentTransactions.map((transaction) => (
              <TransactionItem
                key={`${transaction.tipo}-${transaction.id}`}
                $isDarkMode={isDarkMode}
              >
                <TransactionInfo>
                  <TransactionDescription $isDarkMode={isDarkMode}>
                    {transaction.descricao || `Receita - ${transaction.projectName}`}
                  </TransactionDescription>
                  <TransactionDate $isDarkMode={isDarkMode}>
                    {transaction.dataPagamento ? 
                      `Pago em ${formatDate(transaction.dataPagamento)}` : 
                      `Vence em ${formatDate(transaction.dataVencimento)}`
                    }
                  </TransactionDate>
                </TransactionInfo>
                
                <TransactionAmount 
                  $type={transaction.tipo}
                  $isDarkMode={isDarkMode}
                >
                  {transaction.tipo === 'DESPESA' ? '-' : '+'}
                  {formatCurrency(transaction.valor)}
                </TransactionAmount>
                
                <TransactionStatus
                  $status={getStatusColor(transaction.statusPagamento)}
                  $isDarkMode={isDarkMode}
                >
                  {getStatusLabel(transaction.statusPagamento)}
                </TransactionStatus>
              </TransactionItem>
            ))}
          </TransactionsList>
        </RecentTransactionsSection>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default FinancialDashboard;