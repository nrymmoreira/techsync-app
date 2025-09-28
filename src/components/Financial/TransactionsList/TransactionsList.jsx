import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
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
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription
} from './TransactionsList.styles';

const TransactionsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'RECEITA', label: 'Receitas' },
    { value: 'DESPESA', label: 'Despesas' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'PAGO', label: 'Pago' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'VENCIDO', label: 'Vencido' }
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
                Gerencie todas as receitas e despesas da sua empresa
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="dashboard"
                onClick={() => navigate('/financeiro')}
                $isDarkMode={isDarkMode}
              >
                Dashboard
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
        </TransactionsHeader>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Buscar por descrição, projeto ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <div style={{ flex: '0 0 auto', minWidth: '180px' }}>
            <Select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={typeOptions}
              placeholder="Filtrar por tipo"
              $isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ flex: '0 0 auto', minWidth: '180px' }}>
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

        <EmptyState $isDarkMode={isDarkMode}>
          <EmptyStateIcon className="material-symbols-outlined">receipt_long</EmptyStateIcon>
          <EmptyStateTitle $isDarkMode={isDarkMode}>
            Nenhuma transação registrada
          </EmptyStateTitle>
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
      </TransactionsContent>
    </TransactionsContainer>
  );
};

export default TransactionsList;