import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import { authService } from '../../../services/api';
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
  RecentProjectsSection,
  SectionTitle,
  ProjectsList,
  ProjectItem,
  ProjectInfo,
  ProjectName,
  ProjectClient,
  ProjectStatus,
  ProjectProgress,
  ProgressBar,
  ProgressFill,
  ProgressText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription
} from './ProjectsDashboard.styles';

const ProjectsDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simular dados até implementar a API
        const mockProjects = [
          {
            id: 1,
            nome: 'Website Corporativo',
            cliente: { nome: 'TechCorp Ltd' },
            status: 'EM_ANDAMENTO',
            progresso: 65,
            dataInicio: '2024-01-15',
            dataFim: '2024-03-15'
          },
          {
            id: 2,
            nome: 'App Mobile',
            cliente: { nome: 'StartupXYZ' },
            status: 'CONCLUIDO',
            progresso: 100,
            dataInicio: '2023-11-01',
            dataFim: '2024-01-30'
          },
          {
            id: 3,
            nome: 'Sistema ERP',
            cliente: { nome: 'Empresa ABC' },
            status: 'PENDENTE',
            progresso: 0,
            dataInicio: '2024-02-01',
            dataFim: '2024-06-01'
          }
        ];

        setProjects(mockProjects);
        
        const metricsData = {
          total: mockProjects.length,
          inProgress: mockProjects.filter(p => p.status === 'EM_ANDAMENTO').length,
          completed: mockProjects.filter(p => p.status === 'CONCLUIDO').length,
          pending: mockProjects.filter(p => p.status === 'PENDENTE').length
        };
        
        setMetrics(metricsData);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusLabel = (status) => {
    const statusMap = {
      'EM_ANDAMENTO': 'Em Andamento',
      'CONCLUIDO': 'Concluído',
      'PENDENTE': 'Pendente',
      'PAUSADO': 'Pausado'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return 'info';
      case 'CONCLUIDO':
        return 'success';
      case 'PENDENTE':
        return 'warning';
      case 'PAUSADO':
        return 'error';
      default:
        return 'info';
    }
  };

  if (loading) {
    return (
      <DashboardContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DashboardContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">hourglass_empty</EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>Carregando dashboard...</EmptyStateTitle>
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
              <PageTitle $isDarkMode={isDarkMode}>Dashboard de Projetos</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Acompanhe o progresso e métricas dos seus projetos
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="list"
                onClick={() => navigate('/projetos')}
                $isDarkMode={isDarkMode}
              >
                Ver Todos
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/projetos/novo')}
                $isDarkMode={isDarkMode}
              >
                Novo Projeto
              </Button>
            </HeaderActions>
          </HeaderContent>
        </DashboardHeader>

        <MetricsGrid>
          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="primary">
              folder_managed
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>{metrics.total}</MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Total de Projetos</MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="info">
              play_circle
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>{metrics.inProgress}</MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Em Andamento</MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="success">
              check_circle
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>{metrics.completed}</MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Concluídos</MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="warning">
              schedule
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>{metrics.pending}</MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Pendentes</MetricLabel>
            </MetricContent>
          </MetricCard>
        </MetricsGrid>

        <RecentProjectsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>Projetos Recentes</SectionTitle>
          
          {projects.length === 0 ? (
            <EmptyState $isDarkMode={isDarkMode}>
              <EmptyStateIcon className="material-symbols-outlined">folder_managed</EmptyStateIcon>
              <EmptyStateTitle $isDarkMode={isDarkMode}>Nenhum projeto encontrado</EmptyStateTitle>
              <EmptyStateDescription $isDarkMode={isDarkMode}>
                Comece criando seu primeiro projeto
              </EmptyStateDescription>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate('/projetos/novo')}
                $isDarkMode={isDarkMode}
                style={{ marginTop: '1rem' }}
              >
                Criar Projeto
              </Button>
            </EmptyState>
          ) : (
            <ProjectsList>
              {projects.slice(0, 5).map((project) => (
                <ProjectItem
                  key={project.id}
                  onClick={() => navigate(`/projetos/${project.id}`)}
                  $isDarkMode={isDarkMode}
                >
                  <ProjectInfo>
                    <ProjectName $isDarkMode={isDarkMode}>{project.nome}</ProjectName>
                    <ProjectClient $isDarkMode={isDarkMode}>{project.cliente.nome}</ProjectClient>
                  </ProjectInfo>
                  
                  <ProjectStatus
                    $status={getStatusColor(project.status)}
                    $isDarkMode={isDarkMode}
                  >
                    {getStatusLabel(project.status)}
                  </ProjectStatus>
                  
                  <ProjectProgress>
                    <ProgressBar $isDarkMode={isDarkMode}>
                      <ProgressFill $progress={project.progresso} $isDarkMode={isDarkMode} />
                    </ProgressBar>
                    <ProgressText $isDarkMode={isDarkMode}>{project.progresso}%</ProgressText>
                  </ProjectProgress>
                </ProjectItem>
              ))}
            </ProjectsList>
          )}
        </RecentProjectsSection>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default ProjectsDashboard;