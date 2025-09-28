import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import PieChart from '../../Charts/PieChart/PieChart';
import BarChart from '../../Charts/BarChart/BarChart';
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
                R$ 0,00
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Receitas Recebidas</MetricLabel>
              <MetricTrend $isPositive={true} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">arrow_upward</span>
                Aguardando dados
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="error">
              trending_down
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                R$ 0,00
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Despesas Pagas</MetricLabel>
              <MetricTrend $isPositive={false} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">arrow_downward</span>
                Aguardando dados
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="primary">
              account_balance_wallet
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                R$ 0,00
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Lucro Líquido</MetricLabel>
              <MetricTrend $isPositive={true} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">arrow_upward</span>
                Margem: 0%
              </MetricTrend>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="warning">
              schedule
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                R$ 0,00
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>A Receber</MetricLabel>
              <MetricTrend $isPositive={false} $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">schedule</span>
                Pendentes
              </MetricTrend>
            </MetricContent>
          </MetricCard>
        </MetricsGrid>

        <ChartsSection>
          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Receitas vs Despesas</ChartTitle>
            <ChartContent>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'inherit'
              }}>
                Nenhum dado disponível
              </div>
            </ChartContent>
          </ChartCard>

          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Receitas por Projeto</ChartTitle>
            <ChartContent>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'inherit'
              }}>
                Nenhum dado disponível
              </div>
            </ChartContent>
          </ChartCard>
        </ChartsSection>

        <ChartsSection>
          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Despesas por Categoria</ChartTitle>
            <ChartContent>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'inherit'
              }}>
                Nenhum dado disponível
              </div>
            </ChartContent>
          </ChartCard>

          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Fluxo de Caixa</ChartTitle>
            <ChartContent>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'inherit'
              }}>
                Nenhum dado disponível
              </div>
            </ChartContent>
          </ChartCard>
        </ChartsSection>

        <RecentTransactionsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>Transações Recentes</SectionTitle>
          
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">receipt_long</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Nenhuma transação registrada</EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              Comece registrando sua primeira transação
            </EmptyStateDescription>
            <Button
              variant="primary"
              size="medium"
              icon="add"
              onClick={() => navigate('/financeiro/nova-transacao')}
              $isDarkMode={isDarkMode}
              style={{ marginTop: '1rem' }}
            >
              Nova Transação
            </Button>
          </EmptyState>
        </RecentTransactionsSection>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default FinancialDashboard;