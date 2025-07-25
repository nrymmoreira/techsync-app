import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import { authService } from '../../../services/api';
import {
  DetailContainer,
  DetailContent,
  DetailHeader,
  BackButton,
  HeaderContent,
  ClientTitle,
  HeaderActions,
  ClientInfo,
  ClientAvatar,
  ClientDetails,
  ClientName,
  ClientAddress,
  ContactInfo,
  ContactItem,
  ContactIcon,
  // Estilos para contatos e observações
  ContactsSection,
  ContactCard,
  ContactHeader,
  ContactName,
  ContactRole,
  ContactDetails,
  ObservationsSection,
  SectionTitle,
  ObservationsText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  // Estilos para as abas
  TabsSection,
  TabsList,
  TabButton,
  TabContent
} from './ClientDetail.styles';

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const data = await authService.getClientById(id);
        setClient(data);
      } catch (err) {
        setError('Não foi possível carregar os dados do cliente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    try {
      await authService.deleteClient(id);
      setShowDeleteModal(false);
      navigate('/clientes');
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      setShowDeleteModal(false);
      // O ideal seria mostrar um toast de erro aqui
    }
  };

  const getClientInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  if (loading) {
    return (
      <DetailContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DetailContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">hourglass_empty</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>A carregar cliente...</EmptyStateTitle>
          </EmptyState>
        </DetailContent>
      </DetailContainer>
    );
  }

  if (error || !client) {
    return (
      <DetailContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DetailContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">error</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Cliente não encontrado</EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {error || 'O cliente solicitado não foi encontrado ou foi removido.'}
            </EmptyStateDescription>
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate('/clientes')}
              $isDarkMode={isDarkMode}
              style={{ marginTop: '1rem' }}
            >
              Voltar para Clientes
            </Button>
          </EmptyState>
        </DetailContent>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <DetailContent>
        <DetailHeader>
          <BackButton onClick={() => navigate('/clientes')} $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <ClientTitle $isDarkMode={isDarkMode}>{client.nome}</ClientTitle>
          </HeaderContent>
          <HeaderActions>
            <Button
              variant="secondary"
              size="medium"
              icon="edit"
              onClick={() => navigate(`/clientes/${id}/editar`)}
              $isDarkMode={isDarkMode}
            >
              Editar Cliente
            </Button>
            <Button
              variant="danger"
              size="medium"
              icon="delete"
              onClick={() => setShowDeleteModal(true)}
              $isDarkMode={isDarkMode}
            >
              Excluir Cliente
            </Button>
          </HeaderActions>
        </DetailHeader>

        <ClientInfo $isDarkMode={isDarkMode}>
          <ClientAvatar $isDarkMode={isDarkMode}>
            {getClientInitial(client.nome)}
          </ClientAvatar>
          <ClientDetails>
            <ClientName $isDarkMode={isDarkMode}>{client.nome}</ClientName>
            {client.endereco && (
                <ClientAddress $isDarkMode={isDarkMode}>{client.endereco}</ClientAddress>
            )}
          </ClientDetails>
          <ContactInfo>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">badge</ContactIcon>
              {(client.cnpj_cpf ?? client.cnpj) ?? ''}
            </ContactItem>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">phone</ContactIcon>
              {String(client.telefone ?? '')}
            </ContactItem>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">mail</ContactIcon>
              {client.email}
            </ContactItem>
          </ContactInfo>
        </ClientInfo>

        {/* --- SECÇÃO DE CONTATOS REINTEGRADA --- */}
        <ContactsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>Contatos</SectionTitle>
          {client.contatos && client.contatos.length > 0 ? (
            client.contatos.map((contact) => (
              <ContactCard key={contact.id} $isDarkMode={isDarkMode}>
                <ContactHeader>
                  <div>
                    <ContactName $isDarkMode={isDarkMode}>{contact.nome}</ContactName>
                    <ContactRole $isDarkMode={isDarkMode}>{contact.cargo}</ContactRole>
                  </div>
                </ContactHeader>
                <ContactDetails $isDarkMode={isDarkMode}>
                  {contact.telefone && (
                    <div>
                      <span className="material-symbols-outlined">phone</span>
                      {String(contact.telefone)}
                    </div>
                  )}
                  {contact.email && (
                    <div>
                      <span className="material-symbols-outlined">mail</span>
                      {contact.email}
                    </div>
                  )}
                </ContactDetails>
              </ContactCard>
            ))
          ) : (
            <p style={{ color: 'inherit', opacity: 0.7, fontSize: '0.9rem' }}>Nenhum contato adicional cadastrado.</p>
          )}
        </ContactsSection>

        {/* --- SECÇÃO DE OBSERVAÇÕES REINTEGRADA --- */}
        {client.obs && (
          <ObservationsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
            <ObservationsText $isDarkMode={isDarkMode}>
              {client.obs}
            </ObservationsText>
          </ObservationsSection>
        )}
        
        <TabsSection $isDarkMode={isDarkMode}>
          <TabsList $isDarkMode={isDarkMode}>
            <TabButton $isActive={activeTab === 'projects'} $isDarkMode={isDarkMode} onClick={() => setActiveTab('projects')}>Projetos</TabButton>
            <TabButton $isActive={activeTab === 'budgets'} $isDarkMode={isDarkMode} onClick={() => setActiveTab('budgets')}>Orçamentos</TabButton>
            <TabButton $isActive={activeTab === 'attachments'} $isDarkMode={isDarkMode} onClick={() => setActiveTab('attachments')}>Anexos</TabButton>
          </TabsList>
          <TabContent $isDarkMode={isDarkMode}>
            {activeTab === 'projects' && (
              <EmptyState $isDarkMode={isDarkMode} style={{padding: '2rem'}}>
                <EmptyStateIcon className="material-symbols-outlined">folder_managed</EmptyStateIcon>
                <EmptyStateTitle $isDarkMode={isDarkMode}>Projetos em breve</EmptyStateTitle>
                <EmptyStateDescription $isDarkMode={isDarkMode}>
                  A funcionalidade de gestão de projetos será implementada em breve.
                </EmptyStateDescription>
              </EmptyState>
            )}
            {activeTab === 'budgets' && (
              <EmptyState $isDarkMode={isDarkMode} style={{padding: '2rem'}}>
                <EmptyStateIcon className="material-symbols-outlined">receipt_long</EmptyStateIcon>
                <EmptyStateTitle $isDarkMode={isDarkMode}>Orçamentos em breve</EmptyStateTitle>
                <EmptyStateDescription $isDarkMode={isDarkMode}>
                  A funcionalidade de orçamentos será implementada em breve.
                </EmptyStateDescription>
              </EmptyState>
            )}
            {activeTab === 'attachments' && (
              <EmptyState $isDarkMode={isDarkMode} style={{padding: '2rem'}}>
                <EmptyStateIcon className="material-symbols-outlined">attach_file</EmptyStateIcon>
                <EmptyStateTitle $isDarkMode={isDarkMode}>Anexos em breve</EmptyStateTitle>
                <EmptyStateDescription $isDarkMode={isDarkMode}>
                  A funcionalidade de anexos será implementada em breve.
                </EmptyStateDescription>
              </EmptyState>
            )}
          </TabContent>
        </TabsSection>

      </DetailContent>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        $isDarkMode={isDarkMode}
      >
        <p>
          Tem a certeza que deseja excluir o cliente <strong>{client?.nome}</strong>?
          <br />
          Esta ação não pode ser desfeita.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <Button variant="secondary" size="medium" onClick={() => setShowDeleteModal(false)} $isDarkMode={isDarkMode}>Cancelar</Button>
          <Button variant="danger" size="medium" onClick={handleDelete} $isDarkMode={isDarkMode}>Excluir</Button>
        </div>
      </Modal>
    </DetailContainer>
  );
};

export default ClientDetail;
