import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";
import Select from "../../Select/Select";
import StatusManager from "../StatusManager/StatusManager";
import { authService } from "../../../services/api";
import {
  KanbanContainer,
  KanbanContent,
  KanbanHeader,
  BackButton,
  HeaderContent,
  ProjectTitle,
  ProjectClient,
  HeaderActions,
  KanbanBoard,
  Column,
  ColumnHeader,
  ColumnTitle,
  ColumnCount,
  AddTaskButton,
  TasksList,
  TaskCard,
  TaskTitle,
  TaskDescription,
  TaskMeta,
  TaskPriority,
  TaskAssignee,
  TaskDueDate,
  EmptyColumn,
  EmptyColumnIcon,
  EmptyColumnText,
  LoadingState,
  ErrorState,
  KanbanActions,
  StatusManagerSection,
} from "./ProjectKanban.styles";

const ProjectKanban = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  const [project, setProject] = useState(null);
  const [statuses, setStatuses] = useState([
    { id: "TODO", title: "A Fazer", color: "#6b7280" },
    { id: "IN_PROGRESS", title: "Em Progresso", color: "#3b82f6" },
    { id: "REVIEW", title: "Em Revisão", color: "#f59e0b" },
    { id: "DONE", title: "Concluído", color: "#10b981" },
  ]);
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showStatusManager, setShowStatusManager] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    nome: "",
    descricao: "",
    prioridade: "MEDIA",
    status: "TODO",
    dataTermino: "",
    dataInicio: "",
  });

  const priorityOptions = [
    { value: "BAIXA", label: "Baixa" },
    { value: "MEDIA", label: "Média" },
    { value: "ALTA", label: "Alta" },
    { value: "URGENTE", label: "Urgente" },
  ];

  const statusOptions = statuses.map((status) => ({
    value: status.id,
    label: status.title,
  }));

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        const projectData = await authService.getProject(id);

        // Simular tarefas do projeto
        const initialTasks = organizarTarefas(projectData.tarefas);

        setProject(projectData);
        setTasks(initialTasks);
      } catch (err) {
        setError("Erro ao carregar dados do projeto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  // Atualizar tasks quando os status mudarem
  useEffect(() => {
    setTasks((prevTasks) => {
      const newTasks = {};
      statuses.forEach((status) => {
        newTasks[status.id] = prevTasks[status.id] || [];
      });
      return newTasks;
    });
  }, [statuses]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const originalTasks = { ...tasks };

    const sourceColumn = [...(tasks[source.droppableId] || [])];
    const destColumn =
      source.droppableId === destination.droppableId
        ? sourceColumn
        : [...(tasks[destination.droppableId] || [])];

    const draggedTask = sourceColumn.find((task) => task.id === draggableId);

    if (!draggedTask) return;

    // Optimistic state update
    if (source.droppableId === destination.droppableId) {
      const newTasks = [...sourceColumn];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: newTasks,
      }));
    } else {
      const newSourceTasks = sourceColumn.filter(
        (task) => task.id !== draggableId
      );
      const newDestTasks = [...destColumn];
      newDestTasks.splice(destination.index, 0, {
        ...draggedTask,
        status: destination.droppableId,
      });

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: newSourceTasks,
        [destination.droppableId]: newDestTasks,
      }));
    }

    try {
      await authService.updateTaskStatus(draggableId, destination.droppableId);
      console.log(
        `Tarefa "${draggedTask.nome}" movida para ${destination.droppableId}`
      );
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      // Revert state on error
      setTasks(originalTasks);
      alert("Ocorreu um erro ao mover a tarefa. Tente novamente.");
    }
  };

  const handleStatusesChange = (newStatuses) => {
    setStatuses(newStatuses);
  };

  const handleTaskInputChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = (columnId) => {
    setNewTask({
      nome: "",
      descricao: "",
      prioridade: "MEDIA",
      dataTermino: "",
      dataInicio: "",
      status: columnId,
    });
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setNewTask(task);
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    if (!newTask.nome.trim()) return;

    const taskData = { ...newTask };

    try {
      if (editingTask) {
        // Atualizar na API
        await authService.updateTask(editingTask.id, taskData);

        // Atualizar estado local
        setTasks((prev) => {
          const newTasks = { ...prev };
          const oldStatus = editingTask.status;
          const newStatus = taskData.status;

          if (oldStatus === newStatus) {
            const column = newTasks[oldStatus];
            const taskIndex = column.findIndex((t) => t.id === editingTask.id);
            if (taskIndex !== -1) {
              const newColumn = [...column];
              newColumn[taskIndex] = taskData;
              newTasks[oldStatus] = newColumn;
            }
          } else {
            // Remover da coluna antiga
            if (newTasks[oldStatus]) {
              newTasks[oldStatus] = newTasks[oldStatus].filter(
                (t) => t.id !== editingTask.id
              );
            }

            // Adicionar na nova coluna (no início)
            if (!newTasks[newStatus]) {
              newTasks[newStatus] = [];
            }
            newTasks[newStatus] = [taskData, ...newTasks[newStatus]];
          }
          return newTasks;
        });
      } else {
        // Criar na API
        const createdTask = await authService.createTask(project.id,  );

        // Normalizar o objeto da tarefa para o estado
        const newTaskForState = {
          id: String(createdTask.id),
          nome: createdTask.nome,
          descricao: createdTask.descricao || "",
          prioridade: createdTask.prioridade,
          dataInicio: createdTask.dataInicio || "",
          dataTermino: createdTask.dataTermino || "",
          status: createdTask.status,
        };

        // Atualizar estado local
        setTasks((prev) => ({
          ...prev,
          [newTaskForState.status]: [
            newTaskForState,
            ...(prev[newTaskForState.status] || []),
          ],
        }));
      }

      setShowTaskModal(false);
      setEditingTask(null);
      setNewTask({
        nome: "",
        descricao: "",
        prioridade: "MEDIA",
        status: "TODO",
        dataTermino: "",
      });
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      alert("Erro ao salvar a tarefa. Tente novamente.");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "BAIXA":
        return "#10b981";
      case "MEDIA":
        return "#f59e0b";
      case "ALTA":
        return "#ef4444";
      case "URGENTE":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  const organizarTarefas = (tarefas) => {
    const initialTasks = {};
    statuses.forEach((status) => {
      initialTasks[status.id] = [];
    });

    tarefas.forEach((tarefa) => {
      if (!initialTasks[tarefa.status]) {
        initialTasks[tarefa.status] = [];

        const statusesAux = [ ...statuses ];
        statusesAux.push({ id: tarefa.status, title: tarefa.status, color: "#6b7280" })

        setStatuses([
          ...statusesAux
        ])
      }

      initialTasks[tarefa.status].push({
        id: String(tarefa.id),
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        prioridade: tarefa.prioridade,
        dataInicio: tarefa.dataInicio,
        dataTermino: tarefa.dataTermino,
        status: tarefa.status,
      });
    });

    return initialTasks;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <KanbanContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <KanbanContent>
          <LoadingState $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">hourglass_empty</span>
            Carregando projeto...
          </LoadingState>
        </KanbanContent>
      </KanbanContainer>
    );
  }

  if (error || !project) {
    return (
      <KanbanContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <KanbanContent>
          <ErrorState $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">error</span>
            {error || "Projeto não encontrado"}
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate("/projetos")}
              $isDarkMode={isDarkMode}
              style={{ marginTop: "1rem" }}
            >
              Voltar para Projetos
            </Button>
          </ErrorState>
        </KanbanContent>
      </KanbanContainer>
    );
  }

  return (
    <KanbanContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <KanbanContent>
        <KanbanHeader>
          <BackButton
            onClick={() => navigate("/projetos")}
            $isDarkMode={isDarkMode}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <ProjectTitle $isDarkMode={isDarkMode}>{project.nome}</ProjectTitle>
            <ProjectClient $isDarkMode={isDarkMode}>
              {project.cliente.nome}
            </ProjectClient>
          </HeaderContent>
          <HeaderActions>
            <Button
              variant="ghost"
              size="medium"
              icon="tune"
              onClick={() => setShowStatusManager(true)}
              $isDarkMode={isDarkMode}
            >
              Gerenciar Status
            </Button>
            <Button
              variant="secondary"
              size="medium"
              icon="edit"
              onClick={() => navigate(`/projetos/${id}/editar`)}
              $isDarkMode={isDarkMode}
            >
              Editar Projeto
            </Button>
          </HeaderActions>
        </KanbanHeader>

        <DragDropContext onDragEnd={handleDragEnd}>
          <KanbanBoard>
            {statuses.map((column) => (
              <Column key={column.id} $isDarkMode={isDarkMode}>
                <ColumnHeader $isDarkMode={isDarkMode}>
                  <ColumnTitle $color={column.color} $isDarkMode={isDarkMode}>
                    {column.title}
                  </ColumnTitle>
                  <ColumnCount $isDarkMode={isDarkMode}>
                    {tasks[column.id].length}
                  </ColumnCount>
                </ColumnHeader>

                <AddTaskButton
                  onClick={() => handleCreateTask(column.id)}
                  $isDarkMode={isDarkMode}
                >
                  <span className="material-symbols-outlined">add</span>
                  Adicionar tarefa
                </AddTaskButton>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <TasksList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      $isDraggingOver={snapshot.isDraggingOver}
                      $isDarkMode={isDarkMode}
                    >
                      {(tasks[column.id] || []).length === 0 ? (
                        <EmptyColumn $isDarkMode={isDarkMode}>
                          <EmptyColumnIcon className="material-symbols-outlined">
                            task_alt
                          </EmptyColumnIcon>
                          <EmptyColumnText>Nenhuma tarefa</EmptyColumnText>
                        </EmptyColumn>
                      ) : (
                        (tasks[column.id] || []).map((task, index) => (
                          <Draggable
                            key={String(task.id)}
                            draggableId={String(task.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <TaskCard
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={provided.draggableProps.style}
                                $isDragging={snapshot.isDragging}
                                $isDarkMode={isDarkMode}
                                onDoubleClick={() => handleEditTask(task)}
                              >
                                <TaskTitle $isDarkMode={isDarkMode}>
                                  {task.nome}
                                </TaskTitle>
                                {task.descricao && (
                                  <TaskDescription $isDarkMode={isDarkMode}>
                                    {task.descricao}
                                  </TaskDescription>
                                )}
                                <TaskMeta>
                                  <TaskPriority
                                    $color={getPriorityColor(task.prioridade)}
                                    $isDarkMode={isDarkMode}
                                  >
                                    {task.prioridade}
                                  </TaskPriority>
                                  {task.dataTermino && (
                                    <TaskDueDate $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">
                                        schedule
                                      </span>
                                      {formatDate(task.dataTermino)}
                                    </TaskDueDate>
                                  )}
                                </TaskMeta>

                                {/* Botão de edição visível apenas no hover */}
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "0.5rem",
                                    right: "0.5rem",
                                    opacity: 0,
                                    transition: "opacity 0.2s ease",
                                    pointerEvents: "auto",
                                  }}
                                  className="task-edit-button"
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditTask(task);
                                    }}
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      borderRadius: "4px",
                                      background: isDarkMode
                                        ? "rgba(78, 86, 105, 0.8)"
                                        : "rgba(255, 255, 255, 0.9)",
                                      border: "none",
                                      color: isDarkMode ? "#F5F5F5" : "#1E293B",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                      transition: "all 0.2s ease",
                                    }}
                                  >
                                    <span
                                      className="material-symbols-outlined"
                                      style={{ fontSize: "0.875rem" }}
                                    >
                                      edit
                                    </span>
                                  </button>
                                </div>
                              </TaskCard>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </TasksList>
                  )}
                </Droppable>
              </Column>
            ))}
          </KanbanBoard>
        </DragDropContext>
      </KanbanContent>

      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title={editingTask ? "Editar Tarefa" : "Nova Tarefa"}
        $isDarkMode={isDarkMode}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            id="taskTitle"
            label="Título da tarefa"
            type="text"
            value={newTask.nome}
            onChange={(e) => handleTaskInputChange("nome", e.target.value)}
            placeholder="Digite o título da tarefa"
            required
            $isDarkMode={isDarkMode}
          />

          <Select
            id="taskStatus"
            label="Status"
            value={newTask.status}
            onChange={(e) => handleTaskInputChange("status", e.target.value)}
            options={statusOptions}
            $isDarkMode={isDarkMode}
          />

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: isDarkMode ? "#F5F5F5" : "#1E293B",
              }}
            >
              Descrição
            </label>
            <textarea
              value={newTask.descricao}
              onChange={(e) =>
                handleTaskInputChange("descricao", e.target.value)
              }
              placeholder="Descreva a tarefa..."
              rows={3}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                border: `2px solid ${
                  isDarkMode ? "rgba(78, 86, 105, 0.3)" : "#E2E8F0"
                }`,
                backgroundColor: isDarkMode
                  ? "rgba(78, 86, 105, 0.1)"
                  : "#FFFFFF",
                color: isDarkMode ? "#F5F5F5" : "#1E293B",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9375rem",
                resize: "vertical",
                minHeight: "80px",
                userSelect: "text",
                WebkitUserSelect: "text",
              }}
            />
          </div>

          <Select
            id="taskPriority"
            label="Prioridade"
            value={newTask.prioridade}
            onChange={(e) =>
              handleTaskInputChange("prioridade", e.target.value)
            }
            options={priorityOptions}
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskInitDate"
            label="Data de inicio"
            type="date"
            value={newTask.dataInicio}
            onChange={(e) =>
              handleTaskInputChange("dataInicio", e.target.value)
            }
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskDueDate"
            label="Data de vencimento"
            type="date"
            value={newTask.dataTermino}
            onChange={(e) =>
              handleTaskInputChange("dataTermino", e.target.value)
            }
            $isDarkMode={isDarkMode}
          />

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setShowTaskModal(false)}
              $isDarkMode={isDarkMode}
              style={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleSaveTask}
              $isDarkMode={isDarkMode}
              style={{ flex: 1 }}
            >
              {editingTask ? "Salvar" : "Criar"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showStatusManager}
        onClose={() => setShowStatusManager(false)}
        title="Gerenciar Status do Projeto"
        $isDarkMode={isDarkMode}
      >
        <StatusManager
          statuses={statuses}
          onStatusesChange={handleStatusesChange}
          $isDarkMode={isDarkMode}
          tasks={tasks}
          setTasks={setTasks}
        />
      </Modal>
    </KanbanContainer>
  );
};

export default ProjectKanban;
