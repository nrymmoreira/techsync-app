import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import Modal from "../../Modal/Modal";
import { authService } from "../../../services/api";
import {
  ProjectsContainer,
  ProjectsContent,
  ProjectsHeader,
  HeaderContent,
  PageTitle,
  PageDescription,
  HeaderActions,
  FiltersSection,
  SearchInput,
  TableContainer,
  ProjectsTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  ProjectRow,
  ProjectInfo,
  ProjectName,
  ProjectClient,
  StatusBadge,
  ProjectProgress,
  ProgressBar,
  ProgressFill,
  ProgressText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  ActionsCell,
  ActionButton,
} from "./ProjectsList.styles";

const ProjectsList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const statusOptions = [
    { value: "all", label: "Todos os status" },
    { value: "EM_ANDAMENTO", label: "Em Andamento" },
    { value: "CONCLUIDO", label: "Concluído" },
    { value: "PENDENTE", label: "Pendente" },
    { value: "PAUSADO", label: "Pausado" },
  ];

  const [clientOptions, setClientOptions] = useState([
    { value: "all", label: "Todos os clientes" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Buscar clientes para o filtro
        const clients = await authService.getAllClients();
        setClientOptions([
          { value: "all", label: "Todos os clientes" },
          ...clients.map((c) => ({ value: String(c.id), label: c.nome })),
        ]);

        const projectsData = await authService.getAllProjects();

        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects.filter((project) => {
      const searchLower = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !searchLower ||
        project.nome.toLowerCase().includes(searchLower) ||
        project.cliente.nome.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesClient =
        clientFilter === "all" || String(project.cliente.id) === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });

    // Ordenar por data de criação (mais recentes primeiro)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, clientFilter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      EM_ANDAMENTO: "Em Andamento",
      CONCLUIDO: "Concluído",
      PENDENTE: "Pendente",
      PAUSADO: "Pausado",
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

  const handleProjectClick = (projectId) => {
    navigate(`/projetos/${projectId}`);
  };

  const handleEditProject = (projectId, event) => {
    event.stopPropagation();
    navigate(`/projetos/${projectId}/editar`);
  };

  const handleDeleteClick = (project, event) => {
    event.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await authService.deleteProject(projectToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      console.log("Projeto excluído:", projectToDelete.nome);
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    } finally {
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const calcularProgresso = (projeto) => {
    if (!projeto.tarefas || projeto.tarefas.length === 0) {
      return 0; // Sem tarefas, progresso é 0%
    }

    const total = projeto.tarefas.length;
    const concluidas = projeto.tarefas.filter(
      (t) => t.status === "DONE"
    ).length;

    const progresso = (concluidas / total) * 100;
    return Math.round(progresso);
  };

  if (loading) {
    return (
      <ProjectsContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <ProjectsContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              hourglass_empty
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              Carregando projetos...
            </EmptyStateTitle>
          </EmptyState>
        </ProjectsContent>
      </ProjectsContainer>
    );
  }

  return (
    <ProjectsContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <ProjectsContent>
        <ProjectsHeader>
          <HeaderContent>
            <div>
              <PageTitle $isDarkMode={isDarkMode}>Projetos</PageTitle>
              <PageDescription $isDarkMode={isDarkMode}>
                Gerencie todos os seus projetos e acompanhe o progresso
              </PageDescription>
            </div>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="dashboard"
                onClick={() => navigate("/projetos/dashboard")}
                $isDarkMode={isDarkMode}
              >
                Dashboard
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
        </ProjectsHeader>

        <FiltersSection>
          <SearchInput
            type="text"
            placeholder="Buscar por nome do projeto ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
            <Select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              placeholder="Filtrar por status"
              $isDarkMode={isDarkMode}
            />
          </div>

          <div style={{ flex: "0 0 auto", minWidth: "180px" }}>
            <Select
              id="clientFilter"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              options={clientOptions}
              placeholder="Filtrar por cliente"
              $isDarkMode={isDarkMode}
            />
          </div>
        </FiltersSection>

        {filteredProjects.length === 0 ? (
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              folder_managed
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== "all" || clientFilter !== "all"
                ? "Nenhum projeto encontrado"
                : "Nenhum projeto cadastrado"}
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              {searchTerm || statusFilter !== "all" || clientFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Comece criando seu primeiro projeto"}
            </EmptyStateDescription>
            {!searchTerm &&
              statusFilter === "all" &&
              clientFilter === "all" && (
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
              )}
          </EmptyState>
        ) : (
          <TableContainer>
            <ProjectsTable $isDarkMode={isDarkMode}>
              <TableHeader $isDarkMode={isDarkMode}>
                <tr>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Projeto
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Cliente
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Progresso
                  </TableHeaderCell>
                  <TableHeaderCell $isDarkMode={isDarkMode}>
                    Data Início
                  </TableHeaderCell>
                  <TableHeaderCell
                    $isDarkMode={isDarkMode}
                    style={{ textAlign: "right" }}
                  >
                    Ações
                  </TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    $isDarkMode={isDarkMode}
                  >
                    <td>
                      <ProjectInfo>
                        <ProjectName $isDarkMode={isDarkMode}>
                          {project.nome}
                        </ProjectName>
                      </ProjectInfo>
                    </td>
                    <td>
                      <ProjectClient $isDarkMode={isDarkMode}>
                        {project.cliente.nome}
                      </ProjectClient>
                    </td>
                    <td>
                      <StatusBadge
                        $status={getStatusColor(project.status)}
                        $isDarkMode={isDarkMode}
                      >
                        {getStatusLabel(project.status)}
                      </StatusBadge>
                    </td>
                    <td>
                      <ProjectProgress>
                        <ProgressBar $isDarkMode={isDarkMode}>
                          <ProgressFill
                            $progress={calcularProgresso(project)}
                            $isDarkMode={isDarkMode}
                          />
                        </ProgressBar>
                        <ProgressText $isDarkMode={isDarkMode}>
                          {calcularProgresso(project)}%
                        </ProgressText>
                      </ProjectProgress>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.875rem", color: "inherit" }}>
                        {formatDate(project.dataInicio)}
                      </span>
                    </td>
                    <ActionsCell>
                      <ActionButton
                        $isDarkMode={isDarkMode}
                        onClick={(e) => handleEditProject(project.id, e)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </ActionButton>
                      <ActionButton
                        $isDarkMode={isDarkMode}
                        onClick={(e) => handleDeleteClick(project, e)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </ActionButton>
                    </ActionsCell>
                  </ProjectRow>
                ))}
              </TableBody>
            </ProjectsTable>
          </TableContainer>
        )}
      </ProjectsContent>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        $isDarkMode={isDarkMode}
      >
        <p>
          Tem certeza que deseja excluir o projeto{" "}
          <strong>{projectToDelete?.nome}</strong>?
          <br />
          Esta ação não pode ser desfeita e todas as tarefas associadas serão
          perdidas.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setShowDeleteModal(false)}
            $isDarkMode={isDarkMode}
          >
            Cancelar
          </Button>
          <Button
            variant="ghost"
            size="medium"
            onClick={confirmDeleteProject}
            $isDarkMode={isDarkMode}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              borderColor: "#ef4444",
            }}
          >
            Excluir
          </Button>
        </div>
      </Modal>
    </ProjectsContainer>
  );
};

export default ProjectsList;
