import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import {
  DetailContainer,
  DetailContent,
  DetailHeader,
  BackButton,
  HeaderContent,
  ClientTitle,
  ClientSubtitle,
  HeaderActions,
  ClientInfo,
  ClientAvatar,
  ClientDetails,
  ClientName,
  ClientAddress,
  ContactInfo,
  ContactItem,
  ContactIcon,
  ContactsSection,
  SectionTitle,
  ContactCard,
  ContactHeader,
  ContactName,
  ContactRole,
  ContactDetails,
  ObservationsSection,
  ObservationsText,
  TabsSection,
  TabsList,
  TabButton,
  TabContent,
  ProjectsGrid,
  ProjectCard,
  ProjectHeader,
  ProjectTitle,
  ProjectStatus,
  ProjectDescription,
  ProjectProgress,
  ProgressBar,
  ProgressFill,
  ProgressText,
  ProjectDates,
  ProjectActions,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription
} from './ClientDetail.styles';

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');

  // Mock data - substituir pela API real
  const mockClient = {
    id: 1,
    name: 'TechNova Solutions',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    email: 'contato@technova.com',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    clientSince: '10/05/2021',
    activeProjects: 3,
    contacts: [
      {
        id: 1,
        name: 'João Silva',
        role: 'CEO',
        phone: '(11) 98765-4321',
        email: 'joao@technova.com'
      },
      {
        id: 2,
        name: 'Maria Oliveira',
        role: 'CTO',
        phone: '(11) 97654-3210',
        email: 'maria@technova.com'
      }
    ],
    observations: 'Cliente desde 2021. Preferência por reuniões nas segundas-feiras pela manhã.',
    projects: [
      {
        id: 1,
        title: 'Redesign do Website',
        description: 'Redesign completo do website corporativo com foco em UX e performance.',
        status: 'Em andamento',
        progress: 65,
        startDate: '15/02/2023',
        endDate: '30/05/2023'
      },
      {
        id: 2,
        title: 'Implementação de CRM',
        description: 'Implementação e configuração de sistema CRM para equipe de vendas.',
        status: 'Em andamento',
        progress: 40,
        startDate: '10/03/2023',
        endDate: '15/06/2023'
      }
    ]
  };

  useEffect(() => {
    setClient(mockClient);
  }, [id]);

  const getClientInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.split('/').reverse().join('-'));
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'em andamento':
        return 'info';
      case 'concluído':
        return 'success';
      case 'pausado':
        return 'warning';
      case 'cancelado':
        return 'error';
      default:
        return 'info';
    }
  };

  if (!client) {
    return (
      <DetailContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DetailContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">error</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Cliente não encontrado</EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              O cliente solicitado não foi encontrado ou foi removido.
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
            <ClientTitle $isDarkMode={isDarkMode}>{client.name}</ClientTitle>
            <ClientSubtitle $isDarkMode={isDarkMode}>
              <span className="material-symbols-outlined">schedule</span>
              Cliente desde {client.clientSince}
            </ClientSubtitle>
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
          </HeaderActions>
        </DetailHeader>

        <ClientInfo $isDarkMode={isDarkMode}>
          <ClientAvatar $isDarkMode={isDarkMode}>
            {getClientInitial(client.name)}
          </ClientAvatar>
          <ClientDetails>
            <ClientName $isDarkMode={isDarkMode}>{client.name}</ClientName>
            <ClientAddress $isDarkMode={isDarkMode}>{client.address}</ClientAddress>
          </ClientDetails>
          <ContactInfo>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">badge</ContactIcon>
              {client.cnpj}
            </ContactItem>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">phone</ContactIcon>
              {client.phone}
            </ContactItem>
            <ContactItem $isDarkMode={isDarkMode}>
              <ContactIcon className="material-symbols-outlined">mail</ContactIcon>
              {client.email}
            </ContactItem>
          </ContactInfo>
        </ClientInfo>

        <ContactsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>Contatos</SectionTitle>
          {client.contacts.length > 0 ? (
            client.contacts.map((contact) => (
              <ContactCard key={contact.id} $isDarkMode={isDarkMode}>
                <ContactHeader>
                  <div>
                    <ContactName $isDarkMode={isDarkMode}>{contact.name}</ContactName>
                    <ContactRole $isDarkMode={isDarkMode}>{contact.role}</ContactRole>
                  </div>
                </ContactHeader>
                <ContactDetails $isDarkMode={isDarkMode}>
                  {contact.phone && (
                    <div>
                      <span className="material-symbols-outlined">phone</span>
                      {contact.phone}
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
            <p style={{ color: 'inherit', opacity: 0.7 }}>Nenhum contato cadastrado</p>
          )}
        </ContactsSection>

        {client.observations && (
          <ObservationsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
            <ObservationsText $isDarkMode={isDarkMode}>
              {client.observations}
            </ObservationsText>
          </ObservationsSection>
        )}

        <TabsSection $isDarkMode={isDarkMode}>
          <TabsList $isDarkMode={isDarkMode}>
            <TabButton
              $isActive={activeTab === 'projects'}
              $isDarkMode={isDarkMode}
              onClick={() => setActiveTab('projects')}
            >
              Projetos
            </TabButton>
            <TabButton
              $isActive={activeTab === 'budgets'}
              $isDarkMode={isDarkMode}
              onClick={() => setActiveTab('budgets')}
            >
              Orçamentos
            </TabButton>
            <TabButton
              $isActive={activeTab === 'attachments'}
              $isDarkMode={isDarkMode}
              onClick={() => setActiveTab('attachments')}
            >
              Anexos
            </TabButton>
          </TabsList>

          <TabContent $isDarkMode={isDarkMode}>
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <SectionTitle $isDarkMode={isDarkMode}>
                    Projetos
                    <span style={{ fontSize: '0.875rem', fontWeight: 'normal', opacity: 0.7 }}>
                      Histórico de projetos do cliente
                    </span>
                  </SectionTitle>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => console.log('Ver todos')}
                      $isDarkMode={isDarkMode}
                    >
                      Ver todos
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      icon="add"
                      onClick={() => console.log('Novo projeto')}
                      $isDarkMode={isDarkMode}
                    >
                      Novo Projeto
                    </Button>
                  </div>
                </div>

                {client.projects.length > 0 ? (
                  <ProjectsGrid>
                    {client.projects.map((project) => (
                      <ProjectCard key={project.id} $isDarkMode={isDarkMode}>
                        <ProjectHeader>
                          <div>
                            <ProjectTitle $isDarkMode={isDarkMode}>{project.title}</ProjectTitle>
                            <ProjectStatus $status={getStatusColor(project.status)} $isDarkMode={isDarkMode}>
                              {project.status}
                            </ProjectStatus>
                          </div>
                          <ProjectActions>
                            <button title="Ver projeto">
                              <span className="material-symbols-outlined">visibility</span>
                            </button>
                          </ProjectActions>
                        </ProjectHeader>
                        <ProjectDescription $isDarkMode={isDarkMode}>
                          {project.description}
                        </ProjectDescription>
                        <ProjectProgress>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Progresso</span>
                            <ProgressText $isDarkMode={isDarkMode}>{project.progress}%</ProgressText>
                          </div>
                          <ProgressBar $isDarkMode={isDarkMode}>
                            <ProgressFill $progress={project.progress} />
                          </ProgressBar>
                        </ProjectProgress>
                        <ProjectDates $isDarkMode={isDarkMode}>
                          <span className="material-symbols-outlined">calendar_today</span>
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </ProjectDates>
                      </ProjectCard>
                    ))}
                  </ProjectsGrid>
                ) : (
                  <EmptyState $isDarkMode={isDarkMode}>
                    <EmptyStateIcon className="material-symbols-outlined">folder_managed</EmptyStateIcon>
                    <EmptyStateTitle $isDarkMode={isDarkMode}>Nenhum projeto encontrado</EmptyStateTitle>
                    <EmptyStateDescription $isDarkMode={isDarkMode}>
                      Este cliente ainda não possui projetos cadastrados.
                    </EmptyStateDescription>
                    <Button
                      variant="primary"
                      size="medium"
                      icon="add"
                      onClick={() => console.log('Novo projeto')}
                      $isDarkMode={isDarkMode}
                      style={{ marginTop: '1rem' }}
                    >
                      Criar Primeiro Projeto
                    </Button>
                  </EmptyState>
                )}
              </div>
            )}

            {activeTab === 'budgets' && (
              <EmptyState $isDarkMode={isDarkMode}>
                <EmptyStateIcon className="material-symbols-outlined">receipt_long</EmptyStateIcon>
                <EmptyStateTitle $isDarkMode={isDarkMode}>Orçamentos em breve</EmptyStateTitle>
                <EmptyStateDescription $isDarkMode={isDarkMode}>
                  A funcionalidade de orçamentos será implementada em breve.
                </EmptyStateDescription>
              </EmptyState>
            )}

            {activeTab === 'attachments' && (
              <EmptyState $isDarkMode={isDarkMode}>
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
    </DetailContainer>
  );
};

export default ClientDetail;