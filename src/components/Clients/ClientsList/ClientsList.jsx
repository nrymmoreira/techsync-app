import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
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
  FilterDropdown,
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
  LastContactDate,
  ActionsMenu,
  ActionButton,
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
  const [isLoading, setIsLoading] = useState(true);

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
    // Simular carregamento da API
    setTimeout(() => {
      setClients(mockClients);
      setFilteredClients(mockClients);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.cnpj.includes(searchTerm) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
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

  if (isLoading) {
    return (
      <ClientsContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <ClientsContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>
              hourglass_empty
            </span>
          </div>
        </ClientsContent>
      </ClientsContainer>
    );
  }

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
            placeholder="Buscar por nome ou CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />
          
          <FilterDropdown
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            $isDarkMode={isDarkMode}
          >
            <option value="recent">Mais recentes</option>
            <option value="name">Nome A-Z</option>
            <option value="projects">Mais projetos</option>
          </FilterDropdown>

          <FilterDropdown
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            $isDarkMode={isDarkMode}
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </FilterDropdown>
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
          <ClientsTable $isDarkMode={isDarkMode}>
            <TableHeader>
              <tr>
                <TableHeaderCell $isDarkMode={isDarkMode}>
                  Nome
                  <span className="material-symbols-outlined">unfold_more</span>
                </TableHeaderCell>
                <TableHeaderCell $isDarkMode={isDarkMode}>CNPJ</TableHeaderCell>
                <TableHeaderCell $isDarkMode={isDarkMode}>Contato</TableHeaderCell>
                <TableHeaderCell $isDarkMode={isDarkMode}>
                  Status
                  <span className="material-symbols-outlined">unfold_more</span>
                </TableHeaderCell>
                <TableHeaderCell $isDarkMode={isDarkMode}>
                  Último contato
                  <span className="material-symbols-outlined">unfold_more</span>
                </TableHeaderCell>
                <TableHeaderCell $isDarkMode={isDarkMode}>Ações</TableHeaderCell>
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
                    <ClientContact $isDarkMode={isDarkMode}>
                      <div>{client.phone}</div>
                      <div>{client.email}</div>
                    </ClientContact>
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
                  <td>
                    <LastContactDate $isDarkMode={isDarkMode}>
                      <span className="material-symbols-outlined">schedule</span>
                      {formatDate(client.lastContact)}
                    </LastContactDate>
                  </td>
                  <td>
                    <ActionsMenu>
                      <ActionButton
                        onClick={(e) => handleEditClient(client.id, e)}
                        $isDarkMode={isDarkMode}
                        title="Editar cliente"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </ActionButton>
                      <ActionButton
                        onClick={(e) => handleDeleteClient(client.id, e)}
                        $isDarkMode={isDarkMode}
                        $isDelete={true}
                        title="Excluir cliente"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </ActionButton>
                    </ActionsMenu>
                  </td>
                </ClientRow>
              ))}
            </TableBody>
          </ClientsTable>
        )}
      </ClientsContent>
    </ClientsContainer>
  );
};

export default ClientsList;