import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import PieChart from "../../Charts/PieChart/PieChart";
import BarChart from "../../Charts/BarChart/BarChart";
import { authService } from "../../../services/api";
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
  EmptyStateDescription,
} from "./ProjectsDashboard.styles";

const ProjectsDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Buscar projetos reais
        const projectsData = await authService.getAllProjects();

        // Calcular progresso baseado nas tarefas
        const projectsWithProgress = projectsData.map((project) => ({
          ...project,
          progresso: calculateProjectProgress(project.tarefas || []),
        }));

        setProjects(projectsWithProgress);

        const metricsData = {
          total: projectsWithProgress.length,
          inProgress: projectsWithProgress.filter(
            (p) => p.status === "EM_ANDAMENTO"
          ).length,
          completed: projectsWithProgress.filter(
            (p) => p.status === "CONCLUIDO"
          ).length,
          pending: projectsWithProgress.filter((p) => p.status === "PENDENTE")
            .length,
        };

        setMetrics(metricsData);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const calculateProjectProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(
      (task) => task.status === "DONE" || task.status === "CONCLUIDO"
    );
    return Math.round((completedTasks.length / tasks.length) * 100);
  };

  // Dados para os gráficos
  const pieChartData = [
    { name: "Em Andamento", value: metrics.inProgress },
    { name: "Concluídos", value: metrics.completed },
    { name: "Pendentes", value: metrics.pending },
  ].filter((item) => item.value > 0);

  const contarProjetosPorMes = (dados) => {
    // nomes abreviados dos meses
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    // inicializar estrutura com todos os meses zerados
    const resultado = meses.map((m) => ({ name: m, value: 0 }));

    dados.forEach((projeto) => {
      // contar data de término do projeto (se existir)
      if (projeto.dataTermino) {
        const mes = new Date(projeto.dataTermino).getMonth(); // 0-11
        resultado[mes].value++;
      }
    });

    return resultado;
  };

  const barChartData = contarProjetosPorMes(projects);

  const getStatusLabel = (status) => {
    const statusMap = {
      EM_ANDAMENTO: "Em Andamento",
      CONCLUIDO: "Concluído",
      PENDENTE: "Pendente",
      CANCELADO: "Cancelado",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "EM_ANDAMENTO":
        return "info";
      case "CONCLUIDO":
        return "success";
      case "PENDENTE":
        return "warning";
      case "PAUSADO":
        return "error";
      default:
        return "info";
    }
  };

  if (loading) {
    return (
      <DashboardContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DashboardContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              hourglass_empty
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              Carregando dashboard...
            </EmptyStateTitle>
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
              <PageTitle $isDarkMode={isDarkMode}>
                Dashboard de Projetos
              </PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Acompanhe o progresso e métricas dos seus projetos
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="list"
                onClick={() => navigate("/projetos")}
                $isDarkMode={isDarkMode}
              >
                Ver Todos
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate("/projetos/novo")}
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
              <MetricValue $isDarkMode={isDarkMode}>
                {metrics.total}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>
                Total de Projetos
              </MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="info">
              play_circle
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {metrics.inProgress}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Em Andamento</MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="success">
              check_circle
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {metrics.completed}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Concluídos</MetricLabel>
            </MetricContent>
          </MetricCard>

          <MetricCard $isDarkMode={isDarkMode}>
            <MetricIcon className="material-symbols-outlined" $color="warning">
              schedule
            </MetricIcon>
            <MetricContent>
              <MetricValue $isDarkMode={isDarkMode}>
                {metrics.pending}
              </MetricValue>
              <MetricLabel $isDarkMode={isDarkMode}>Pendentes</MetricLabel>
            </MetricContent>
          </MetricCard>
        </MetricsGrid>

        <ChartsSection>
          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>
              Status dos Projetos
            </ChartTitle>
            <ChartContent>
              {pieChartData.length > 0 ? (
                <PieChart data={pieChartData} title="Status dos Projetos" />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "inherit",
                  }}
                >
                  Nenhum dado disponível
                </div>
              )}
            </ChartContent>
          </ChartCard>

          <ChartCard $isDarkMode={isDarkMode}>
            <ChartTitle $isDarkMode={isDarkMode}>Projetos por Mês</ChartTitle>
            <ChartContent>
              <BarChart data={barChartData} title="Projetos por Mês" />
            </ChartContent>
          </ChartCard>
        </ChartsSection>

        <RecentProjectsSection $isDarkMode={isDarkMode}>
          <SectionTitle $isDarkMode={isDarkMode}>
            Projetos Recentes
          </SectionTitle>

          {projects.length === 0 ? (
            <EmptyState $isDarkMode={isDarkMode}>
              <EmptyStateIcon className="material-symbols-outlined">
                folder_managed
              </EmptyStateIcon>
              <EmptyStateTitle $isDarkMode={isDarkMode}>
                Nenhum projeto encontrado
              </EmptyStateTitle>
              <EmptyStateDescription $isDarkMode={isDarkMode}>
                Comece criando seu primeiro projeto
              </EmptyStateDescription>
              <Button
                variant="primary"
                size="medium"
                icon="add"
                onClick={() => navigate("/projetos/novo")}
                $isDarkMode={isDarkMode}
                style={{ marginTop: "1rem" }}
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
                    <ProjectName $isDarkMode={isDarkMode}>
                      {project.nome}
                    </ProjectName>
                    <ProjectClient $isDarkMode={isDarkMode}>
                      {project.cliente.nome}
                    </ProjectClient>
                  </ProjectInfo>

                  <ProjectStatus
                    $status={getStatusColor(project.status)}
                    $isDarkMode={isDarkMode}
                  >
                    {getStatusLabel(project.status)}
                  </ProjectStatus>

                  <ProjectProgress>
                    <ProgressBar $isDarkMode={isDarkMode}>
                      <ProgressFill
                        $progress={project.progresso}
                        $isDarkMode={isDarkMode}
                      />
                    </ProgressBar>
                    <ProgressText $isDarkMode={isDarkMode}>
                      {project.progresso}%
                    </ProgressText>
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
