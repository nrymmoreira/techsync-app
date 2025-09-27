import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import { financialData } from '../../../services/demoData';
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
  EmptyStateDescription
} from './TransactionsList.styles';

const TransactionsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadTransactions = () => {
      try {
        setLoading(true);
        
        // Combinar receitas e despesas
        const allTransactions = [
          ...financialData.projectRevenues.map(item => ({
            ...item,
            descricao: `Receita - ${item.projectName}`,
            categoria: 'RECEITA',
            tipo: 'RECEITA'
          })),
          ...financialData.expenses.map(item => ({
            ...item,
            tipo: 'DESPESA'
          }))
        ].sort((a, b) => {
          const dateA = new Date(a.dataPagamento || a.dataVencimento);
          const dateB = new Date(b.dataPagamento || b.dataVencimento);
          return dateB - dateA;
        });
        
        setTransactions(allTransactions);
        setFilteredTransactions(allTransactions);
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions.filter((transaction) => {
      const searchLower = searchTerm.toLowerCase().trim();

      const matchesSearch = !searchLower ||
        transaction.descricao.toLowerCase().includes(searchLower) ||
        (transaction.projectName && transaction.projectName.toLowerCase().includes(searchLower)) ||
        (transaction.clientName && transaction.clientName.toLowerCase().includes(searchLower));

      const matchesType = typeFilter === 'all' || transaction.tipo === typeFilter;
      const matchesStatus = statusFilter === 'all' || transaction.statusPagamento === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, typeFilter, statusFilter]);

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

  const getCategoryLabel = (categoria) => {
    const categoryMap = {
      'RECEITA': 'Receita',
      'SOFTWARE': 'Software',
      'INFRAESTRUTURA': 'Infraestrutura',
      'SERVICOS': 'Serviços',
      'EQUIPAMENTOS': 'Equipamentos',
      'MARKETING': 'Marketing',
      'OUTROS': 'Outros'
    };
    return categoryMap[categoria] || categoria;
  };

  if (loading) {
    return (
      <TransactionsContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <TransactionsContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">hourglass_empty</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Carregando transações...</EmptyStateTitle>
          </EmptyState>
        </TransactionsContent>
      </TransactionsContainer>
    );
  }

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

        {filteredTransactions.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">receipt_long</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Nenhuma transação encontrada'
                : 'Nenhuma transação registrada'}
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece registrando sua primeira transação'}
            </EmptyStateDescription>
            {!searchTerm && typeFilter === 'all' && statusFilter === 'all' && (
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
            )}
          </EmptyState>
        ) : (
          <TableContainer>
            <TransactionsTable $isDarkMode={isDarkMode}>
              <TableHeader $isDarkMode={isDarkMode}>
                <tr>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Descrição</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Categoria</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Valor</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Status</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Data</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TransactionRow
                    key={`${transaction.tipo}-${transaction.id}`}
                    $isDarkMode={isDarkMode}
                  >
                    <td>
                      <TransactionInfo>
                        <TransactionDescription $isDarkMode={isDarkMode}>
                          {transaction.descricao}
                        </TransactionDescription>
                        {transaction.clientName && (
                          <div style={{ 
                            fontSize: '0.8125rem', 
                            color: 'inherit',
                            opacity: 0.7,
                            marginTop: '0.25rem'
                          }}>
                            Cliente: {transaction.clientName}
                          </div>
                        )}
                      </TransactionInfo>
                    </td>
                    <td>
                      <TransactionCategory $isDarkMode={isDarkMode}>
                        {getCategoryLabel(transaction.categoria)}
                      </TransactionCategory>
                    </td>
                    <td>
                      <TransactionAmount 
                        $type={transaction.tipo}
                        $isDarkMode={isDarkMode}
                      >
                        {transaction.tipo === 'DESPESA' ? '-' : '+'}
                        {formatCurrency(transaction.valor)}
                      </TransactionAmount>
                    </td>
                    <td>
                      <TransactionStatus
                        $status={getStatusColor(transaction.statusPagamento)}
                        $isDarkMode={isDarkMode}
                      >
                        {getStatusLabel(transaction.statusPagamento)}
                      </TransactionStatus>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem', color: 'inherit' }}>
                        {transaction.dataPagamento ? 
                          formatDate(transaction.dataPagamento) : 
                          formatDate(transaction.dataVencimento)
                        }
                      </span>
                    </td>
                  </TransactionRow>
                ))}
              </TableBody>
            </TransactionsTable>
          </TableContainer>
        )}
      </TransactionsContent>
    </TransactionsContainer>
  );
};

export default TransactionsList;