import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
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
  EmptyStateDescription
} from './BudgetsList.styles';

const BudgetsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'aberto', label: 'Aberto' },
    { value: 'aguardando_aprovacao', label: 'Aguardando Aprovação' },
    { value: 'aprovado', label: 'Aprovado' },
    { value: 'pago', label: 'Pago' }
  ];

  const clientOptions = [
    { value: 'all', label: 'Todos os clientes' },
    { value: '1', label: 'TechNova Solutions' },
    { value: '2', label: 'DataFlex Analytics' },
    { value: '3', label: 'WebSphere Design' },
    { value: '4', label: 'CloudPeak Systems' }
  ];

  // Mock data - substituir pela API real
  const mockBudgets = [
    {
      id: 1,
      number: 'ORC-2024-001',
      clientId: '1',
      clientName: 'TechNova Solutions',
      status: 'aguardando_aprovacao',
      totalValue: 15000.00,
      createdAt: '2024-01-15',
      services: [
        { name: 'Desenvolvimento Website', value: 12000.00 },
        { name: 'Consultoria UX', value: 3000.00 }
      ],
      discount: 0,
      observations: 'Projeto de redesign completo'
    },
    {
      id: 2,
      number: 'ORC-2024-002',
      clientId: '3',
      clientName: 'WebSphere Design',
      status: 'aprovado',
      totalValue: 8500.00,
      createdAt: '2024-01-20',
      services: [
        { name: 'Sistema CRM', value: 8500.00 }
      ],
      discount: 500.00,
      observations: ''
    },
    {
      id: 3,
      number: 'ORC-2024-003',
      clientId: '4',
      clientName: 'CloudPeak Systems',
      status: 'pago',
      totalValue: 25000.00,
      createdAt: '2024-01-10',
      services: [
        { name: 'Aplicativo Mobile', value: 20000.00 },
        { name: 'API Backend', value: 5000.00 }
      ],
      discount: 0,
      observations: 'Projeto prioritário'
    },
    {
      id: 4,
      number: 'ORC-2024-004',
      clientId: '1',
      clientName: 'TechNova Solutions',
      status: 'aberto',
      totalValue: 5000.00,
      createdAt: '2024-01-25',
      services: [
        { name: 'Manutenção Mensal', value: 5000.00 }
      ],
      discount: 0,
      observations: 'Contrato de manutenção'
    }
  ];

  useEffect(() => {
    setBudgets(mockBudgets);
    setFilteredBudgets(mockBudgets);
  }, []);

  useEffect(() => {
    let filtered = budgets.filter(budget => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      const matchesSearch = !searchLower || 
        budget.number.toLowerCase().includes(searchLower) ||
        budget.clientName.toLowerCase().includes(searchLower);
      
      const matchesStatus = statusFilter === 'all' || budget.status === statusFilter;
      const matchesClient = clientFilter === 'all' || budget.clientId === clientFilter;
      
      return matchesSearch && matchesStatus && matchesClient;
    });

    // Ordenar por data de criação (mais recentes primeiro)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBudgets(filtered);
  }, [budgets, searchTerm, statusFilter, clientFilter]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'aberto': 'Aberto',
      'aguardando_aprovacao': 'Aguardando Aprovação',
      'aprovado': 'Aprovado',
      'pago': 'Pago'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto':
        return 'warning';
      case 'aguardando_aprovacao':
        return 'info';
      case 'aprovado':
        return 'success';
      case 'pago':
        return 'success';
      default:
        return 'info';
    }
  };

  const handleBudgetClick = (budgetId) => {
    navigate(`/orcamentos/${budgetId}`);
  };

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
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/orcamentos/novo')}
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
          
          <FilterSelect>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder="Filtrar por status"
              $isDarkMode={isDarkMode}
            />
          </FilterSelect>

          <FilterSelect>
            <Select
              id="clientFilter"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              options={clientOptions}
              placeholder="Filtrar por cliente"
              $isDarkMode={isDarkMode}
            />
          </FilterSelect>
        </FiltersSection>

        {filteredBudgets.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              receipt_long
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== 'all' || clientFilter !== 'all' 
                ? 'Nenhum orçamento encontrado' 
                : 'Nenhum orçamento cadastrado'
              }
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== 'all' || clientFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando seu primeiro orçamento'
              }
            </EmptyStateDescription>
            {!searchTerm && statusFilter === 'all' && clientFilter === 'all' && (
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/orcamentos/novo')}
                $isDarkMode={isDarkMode}
                style={{ marginTop: '1rem' }}
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
                          {budget.number}
                        </BudgetNumber>
                      </BudgetInfo>
                    </td>
                    <td>
                      <BudgetClient $isDarkMode={isDarkMode}>
                        {budget.clientName}
                      </BudgetClient>
                    </td>
                    <td>
                      <StatusBadge $status={getStatusColor(budget.status)} $isDarkMode={isDarkMode}>
                        {getStatusLabel(budget.status)}
                      </StatusBadge>
                    </td>
                    <td>
                      <BudgetValue $isDarkMode={isDarkMode}>
                        {formatCurrency(budget.totalValue)}
                      </BudgetValue>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem', color: 'inherit' }}>
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