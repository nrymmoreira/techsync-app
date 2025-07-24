import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import Modal from '../../Modal/Modal';
import { authService } from '../../../services/api';
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
  StatusBadge,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  ActionsCell,
  ActionButton
} from './ClientsList.styles';

const ClientsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortFilter, setSortFilter] = useState('name_asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const sortOptions = [
    { value: 'name_asc', label: 'Nome A-Z' },
    { value: 'name_desc', label: 'Nome Z-A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'ATIVO', label: 'Ativos' },
    { value: 'INATIVO', label: 'Inativos' }
  ];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await authService.getAllClients();
        setClients(data);
      } catch (err) {
        setError('Falha ao carregar clientes. Tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    let filtered = [...clients];

    if (searchTerm) {
      filtered = filtered.filter(client => {
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesName = client.nome.toLowerCase().includes(searchLower);
        const cnpjValue = String(client.cnpj_cpf ?? client.cnpj ?? '');
        const matchesCNPJ = cnpjValue.includes(searchLower.replace(/[^\d]/g, ''));
        const matchesEmail = client.email.toLowerCase().includes(searchLower);
        return matchesName || matchesCNPJ || matchesEmail;
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    switch (sortFilter) {
      case 'name_asc':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, sortFilter, statusFilter]);

  const getClientInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  const handleClientClick = (clientId) => navigate(`/clientes/${clientId}`);

  const handleEditClient = (clientId, event) => {
    event.stopPropagation();
    navigate(`/clientes/${clientId}/editar`);
  };

  const handleDeleteClick = (client, event) => {
    event.stopPropagation();
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const confirmDeleteClient = async () => {
    if (!clientToDelete) return;
    try {
      await authService.deleteClient(clientToDelete.id);
      // CORREÇÃO: Força o recarregamento da página para garantir que a lista seja atualizada.
      window.location.reload();
    } catch (err) {
      setError('Erro ao excluir cliente. Tente novamente.');
    } finally {
      setShowDeleteModal(false);
      setClientToDelete(null);
    }
  };

  if (loading) {
    return (
      <ClientsContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <ClientsContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">hourglass_empty</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>A carregar clientes...</EmptyStateTitle>
          </EmptyState>
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
                Faça a gestão dos seus clientes e acompanhe os seus projetos
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
            placeholder="Procurar por nome, NIF/NIPC ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />
          
          <div style={{ flex: '0 0 auto', minWidth: '180px' }}>
            <Select
              id="sortFilter"
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              options={sortOptions}
              placeholder="Ordenar por"
              $isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ flex: '0 0 auto', minWidth: '180px' }}>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder="Filtrar por estado"
              $isDarkMode={isDarkMode}
            />
          </div>
        </FiltersSection>

        {filteredClients.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">group</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== 'all' ? 'Nenhum cliente encontrado' : 'Nenhum cliente registado'}
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== 'all' 
                ? 'Tente ajustar os filtros de pesquisa'
                : 'Comece por adicionar o seu primeiro cliente'
              }
            </EmptyStateDescription>
            {!searchTerm && statusFilter === 'all' && (
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
                  <TableHeaderCell $isDarkMode={isDarkMode}>Nome</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>NIF/NIPC</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>Estado</TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode} style={{ textAlign: 'right' }}>Ações</TableHeaderCell>
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
                          {getClientInitial(client.nome)}
                        </ClientAvatar>
                        <ClientName $isDarkMode={isDarkMode}>
                          {client.nome}
                        </ClientName>
                      </ClientInfo>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {/* CORREÇÃO: Garante que o valor não seja 'null' */}
                        {(client.cnpj_cpf ?? client.cnpj) ?? ''}
                      </span>
                    </td>
                    <td>
                      <StatusBadge $status={client.status === 'ATIVO' ? 'active' : 'inactive'} $isDarkMode={isDarkMode}>
                        {client.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                      </StatusBadge>
                    </td>
                    <ActionsCell>
                        <ActionButton $isDarkMode={isDarkMode} onClick={(e) => handleEditClient(client.id, e)}>
                            <span className="material-symbols-outlined">edit</span>
                        </ActionButton>
                        <ActionButton $isDarkMode={isDarkMode} onClick={(e) => handleDeleteClick(client, e)}>
                            <span className="material-symbols-outlined">delete</span>
                        </ActionButton>
                    </ActionsCell>
                  </ClientRow>
                ))}
              </TableBody>
            </ClientsTable>
          </TableContainer>
        )}
      </ClientsContent>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        $isDarkMode={isDarkMode}
      >
        <p>
          Tem a certeza que deseja excluir o cliente <strong>{clientToDelete?.nome}</strong>?
          <br />
          Esta ação não pode ser desfeita.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setShowDeleteModal(false)}
            $isDarkMode={isDarkMode}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="medium"
            onClick={confirmDeleteClient}
            $isDarkMode={isDarkMode}
          >
            Excluir
          </Button>
        </div>
      </Modal>
    </ClientsContainer>
  );
};

export default ClientsList;
