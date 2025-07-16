import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import {
  ClientsContainer,
  ClientsContent,
  ClientsHeader,
  HeaderContent,
  PageTitle,
  PageDescription,
  HeaderActions,
  FiltersSection,
  SearchInput,
  TableContainer,
  ClientsTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  ClientRow,
  ClientAvatar,
  ClientInfo,
  ClientName,
  ClientContact,
  StatusBadge,
  ProjectsCount,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription
} from './ClientsList.styles';

const ClientsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortFilter, setSortFilter] = useState('recent');
  const [statusFilter, setStatusFilter] = useState('all');

  const sortOptions = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'name', label: 'Nome A-Z' },
    { value: 'projects', label: 'Mais projetos' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' }
  ];

  // Mock data - substituir pela API real
  const mockClients = [
    {
      id: 1,
      name: 'TechNova Solutions',
      cnpj: '12.345.678/0001-90',
      phone: '(11) 98765-4321',
      email: 'contato@technova.com',
      address: 'Av. Paulista, 1000, São Paulo - SP',
      activeProjects: 3,
      lastContact: '2023-04-15',
      status: 'active',
      contacts: [
        { name: 'João Silva', role: 'CEO', phone: '(11) 98765-4321', email: 'joao@technova.com' }
      ],
      observations: 'Cliente desde 2021. Preferência por reuniões nas segundas-feiras pela manhã.'
    },
    {
      id: 2,
      name: 'DataFlex Analytics',
      cnpj: '98.765.432/0001-10',
      phone: '(21) 91234-5678',
      email: 'info@dataflex.com',
      address: 'Rua das Flores, 500, Rio de Janeiro - RJ',
      activeProjects: 0,
      lastContact: '2023-03-22',
      status: 'inactive',
      contacts: [],
      observations: ''
    },
    {
      id: 3,
      name: 'WebSphere Design',
      cnpj: '45.678.901/0001-23',
      phone: '(31) 99876-5432',
      email: 'contato@websphere.com',
      address: 'Av. Afonso Pena, 3000, Belo Horizonte - MG',
      activeProjects: 1,
      lastContact: '2023-04-10',
      status: 'active',
      contacts: [],
      observations: ''
    },
    {
      id: 4,
      name: 'CloudPeak Systems',
      cnpj: '78.901.234/0001-56',
      phone: '(41) 98765-1234',
      email: 'info@cloudpeak.com',
      address: 'Rua XV de Novembro, 800, Curitiba - PR',
      activeProjects: 2,
      lastContact: '2023-04-18',
      status: 'active',
      contacts: [],
      observations: ''
    },
    {
      id: 5,
      name: 'DigitalEdge Marketing',
      cnpj: '23.456.789/0001-67',
      phone: '(51) 97654-3210',
      email: 'contato@digitaledge.com',
      address: 'Av. Ipiranga, 1200, Porto Alegre - RS',
      activeProjects: 0,
      lastContact: '2023-02-28',
      status: 'inactive',
      contacts: [],
      observations: ''
    }
  ];

  useEffect(() => {
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  useEffect(() => {
    let filtered = clients.filter(client => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      if (!searchLower) return true;
      
      const matchesName = client.name.toLowerCase().includes(searchLower);
      const matchesCNPJ = client.cnpj.replace(/[^\d]/g, '').includes(searchLower.replace(/[^\d]/g, ''));
      const matchesEmail = client.email.toLowerCase().includes(searchLower);
      
      const matchesSearch = matchesName || matchesCNPJ || matchesEmail;
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Aplicar ordenação
    switch (sortFilter) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'projects':
        filtered.sort((a, b) => b.activeProjects - a.activeProjects);
        break;
      default:
        break;
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, sortFilter, statusFilter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getClientInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const handleClientClick = (clientId) => {
    navigate(`/clientes/${clientId}`);
  };

  const handleEditClient = (clientId, event) => {
    event.stopPropagation();
    navigate(`/clientes/${clientId}/editar`);
  };

  const handleDeleteClient = (clientId, event) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  return (
    <ClientsContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <ClientsContent>
        <ClientsHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>Clientes</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Gerencie seus clientes e acompanhe seus projetos
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/clientes/novo')}
                $isDarkMode={isDarkMode}
              >
                Adicionar Cliente
              </Button>
            </HeaderActions>
          </HeaderContent>
        </ClientsHeader>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Buscar por nome, CNPJ ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />
          
          <FilterSelect>
            <Select
              id="sortFilter"
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              options={sortOptions}
              placeholder="Ordenar por"
              $isDarkMode={isDarkMode}
            />
          </FilterSelect>

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
        </FiltersSection>

        {filteredClients.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              group
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm 
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro cliente'
              }
            </EmptyStateDescription>
            {!searchTerm && (
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/clientes/novo')}
                $isDarkMode={isDarkMode}
                style={{ marginTop: '1rem' }}
              >
                Adicionar Cliente
              </Button>
            )}
          </EmptyState>
        ) : (
          <TableContainer>
            <ClientsTable $isDarkMode={isDarkMode}>
              <TableHeader $isDarkMode={isDarkMode}>
                <tr>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Nome
                    <span className="material-symbols-outlined">unfold_more</span>
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>CNPJ</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Status
                    <span className="material-symbols-outlined">unfold_more</span>
                  </TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <ClientRow
                    key={client.id}
                    onClick={() => handleClientClick(client.id)}
                    $isDarkMode={isDarkMode}
                  >
                    <td>
                      <ClientInfo>
                        <ClientAvatar $isDarkMode={isDarkMode}>
                          {getClientInitial(client.name)}
                        </ClientAvatar>
                        <ClientName $isDarkMode={isDarkMode}>
                          {client.name}
                        </ClientName>
                      </ClientInfo>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {client.cnpj}
                      </span>
                    </td>
                    <td>
                      {client.activeProjects > 0 ? (
                        <StatusBadge $status="active" $isDarkMode={isDarkMode}>
                          <ProjectsCount>
                            {client.activeProjects}
                          </ProjectsCount>
                          projeto{client.activeProjects > 1 ? 's' : ''} ativo{client.activeProjects > 1 ? 's' : ''}
                        </StatusBadge>
                      ) : (
                        <StatusBadge $status="inactive" $isDarkMode={isDarkMode}>
                          Sem projetos ativos
                        </StatusBadge>
                      )}
                    </td>
                  </ClientRow>
                ))}
              </TableBody>
            </ClientsTable>
          </TableContainer>
        )}
      </ClientsContent>
    </ClientsContainer>
  );
};

export default ClientsList;