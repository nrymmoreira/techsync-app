import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Modal from '../../Modal/Modal';
import Select from '../../Select/Select';
import StatusManager from '../StatusManager/StatusManager';
import { authService } from '../../../services/api';
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
  StatusManagerSection
} from './ProjectKanban.styles';

const ProjectKanban = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  
  const [project, setProject] = useState(null);
  const [statuses, setStatuses] = useState([
    { id: 'TODO', title: 'A Fazer', color: '#6b7280' },
    { id: 'IN_PROGRESS', title: 'Em Progresso', color: '#3b82f6' },
    { id: 'REVIEW', title: 'Em Revisão', color: '#f59e0b' },
    { id: 'DONE', title: 'Concluído', color: '#10b981' }
  ]);
  const [tasks, setTasks] = useState({
    'TODO': [],
    'IN_PROGRESS': [],
    'REVIEW': [],
    'DONE': []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showStatusManager, setShowStatusManager] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'MEDIA',
    status: 'TODO',
    dataVencimento: '',
    responsavel: ''
  });

  const priorityOptions = [
    { value: 'BAIXA', label: 'Baixa' },
    { value: 'MEDIA', label: 'Média' },
    { value: 'ALTA', label: 'Alta' },
    { value: 'URGENTE', label: 'Urgente' }
  ];

  const statusOptions = statuses.map(status => ({
    value: status.id,
    label: status.title
  }));

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        
        // Simular dados do projeto até implementar a API
        const mockProject = {
          id: parseInt(id),
          nome: 'Website Corporativo',
          cliente: { nome: 'TechCorp Ltd' },
          status: 'EM_ANDAMENTO',
          progresso: 65
        };

        // Simular tarefas do projeto
        const initialTasks = {};
        statuses.forEach(status => {
          initialTasks[status.id] = [];
        });

        // Adicionar algumas tarefas de exemplo
        initialTasks['TODO'] = [
          {
            id: '1',
            titulo: 'Criar wireframes',
            descricao: 'Desenvolver wireframes das principais páginas',
            prioridade: 'ALTA',
            responsavel: 'João Silva',
            dataVencimento: '2024-02-15',
            status: 'TODO'
          }
        ];
        initialTasks['IN_PROGRESS'] = [
          {
            id: '3',
            titulo: 'Desenvolver homepage',
            descricao: 'Implementar a página inicial do site',
            prioridade: 'ALTA',
            responsavel: 'Pedro Costa',
            dataVencimento: '2024-02-20',
            status: 'IN_PROGRESS'
          }
        ];

        setProject(mockProject);
        setTasks(initialTasks);
      } catch (err) {
        setError('Erro ao carregar dados do projeto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  // Atualizar tasks quando os status mudarem
  useEffect(() => {
    setTasks(prevTasks => {
      const newTasks = {};
      statuses.forEach(status => {
        newTasks[status.id] = prevTasks[status.id] || [];
      });
      return newTasks;
    });
  }, [statuses]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const draggedTask = sourceColumn.find(task => task.id === draggableId);

    if (!draggedTask) return;

    // Remover da coluna de origem
    const newSourceTasks = sourceColumn.filter(task => task.id !== draggableId);
    
    // Adicionar na coluna de destino
    const newDestTasks = [...destColumn];
    newDestTasks.splice(destination.index, 0, { ...draggedTask, status: destination.droppableId });

    setTasks(prev => ({
      ...prev,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestTasks
    }));

    // Aqui você faria a chamada para a API para atualizar o status da tarefa
    console.log(`Tarefa ${draggedTask.titulo} movida para ${destination.droppableId}`);
  };

  const handleStatusesChange = (newStatuses) => {
    setStatuses(newStatuses);
  };

  const handleTaskInputChange = (field, value) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = (columnId) => {
    setNewTask({
      titulo: '',
      descricao: '',
      prioridade: 'MEDIA',
      dataVencimento: '',
      responsavel: '',
      status: columnId
    });
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setNewTask(task);
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!newTask.titulo.trim()) return;

    const taskId = editingTask ? editingTask.id : Date.now().toString();
    const taskData = {
      ...newTask,
      id: taskId
    };

    if (editingTask) {
      // Remover da coluna anterior se o status mudou
      const oldStatus = editingTask.status;
      const newStatus = taskData.status;
      
      setTasks(prev => {
        const newTasks = { ...prev };
        
        // Remover da coluna anterior
        newTasks[oldStatus] = newTasks[oldStatus].filter(task => task.id !== taskId);
        
        // Adicionar na nova coluna
        if (!newTasks[newStatus]) newTasks[newStatus] = [];
        const existingIndex = newTasks[newStatus].findIndex(task => task.id === taskId);
        if (existingIndex >= 0) {
          newTasks[newStatus][existingIndex] = taskData;
        } else {
          newTasks[newStatus].push(taskData);
        }
        
        return newTasks;
      });
    } else {
      // Criar nova tarefa
      setTasks(prev => ({
        ...prev,
        [taskData.status]: [...(prev[taskData.status] || []), taskData]
      }));
    }

    setShowTaskModal(false);
    setNewTask({
      titulo: '',
      descricao: '',
      prioridade: 'MEDIA',
      status: 'TODO',
      dataVencimento: '',
      responsavel: ''
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'BAIXA':
        return '#10b981';
      case 'MEDIA':
        return '#f59e0b';
      case 'ALTA':
        return '#ef4444';
      case 'URGENTE':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
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
            {error || 'Projeto não encontrado'}
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate('/projetos')}
              $isDarkMode={isDarkMode}
              style={{ marginTop: '1rem' }}
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
          <BackButton onClick={() => navigate('/projetos')} $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <ProjectTitle $isDarkMode={isDarkMode}>{project.nome}</ProjectTitle>
            <ProjectClient $isDarkMode={isDarkMode}>{project.cliente.nome}</ProjectClient>
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
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <TaskCard
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                $isDragging={snapshot.isDragging}
                                $isDarkMode={isDarkMode}
                                onClick={() => handleEditTask(task)}
                              >
                                <TaskTitle $isDarkMode={isDarkMode}>
                                  {task.titulo}
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
                                  {task.responsavel && (
                                    <TaskAssignee $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">person</span>
                                      {task.responsavel}
                                    </TaskAssignee>
                                  )}
                                  {task.dataVencimento && (
                                    <TaskDueDate $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">schedule</span>
                                      {formatDate(task.dataVencimento)}
                                    </TaskDueDate>
                                  )}
                                </TaskMeta>
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
        title={editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        $isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            id="taskTitle"
            label="Título da tarefa"
            type="text"
            value={newTask.titulo}
            onChange={(e) => handleTaskInputChange('titulo', e.target.value)}
            placeholder="Digite o título da tarefa"
            required
            $isDarkMode={isDarkMode}
          />

          <Select
            id="taskStatus"
            label="Status"
            value={newTask.status}
            onChange={(e) => handleTaskInputChange('status', e.target.value)}
            options={statusOptions}
            $isDarkMode={isDarkMode}
          />

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: isDarkMode ? '#F5F5F5' : '#1E293B'
            }}>
              Descrição
            </label>
            <textarea
              value={newTask.descricao}
              onChange={(e) => handleTaskInputChange('descricao', e.target.value)}
              placeholder="Descreva a tarefa..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '8px',
                border: `2px solid ${isDarkMode ? 'rgba(78, 86, 105, 0.3)' : '#E2E8F0'}`,
                backgroundColor: isDarkMode ? 'rgba(78, 86, 105, 0.1)' : '#FFFFFF',
                color: isDarkMode ? '#F5F5F5' : '#1E293B',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                resize: 'vertical',
                minHeight: '80px'
              }}
            />
          </div>

          <Select
            id="taskPriority"
            label="Prioridade"
            value={newTask.prioridade}
            onChange={(e) => handleTaskInputChange('prioridade', e.target.value)}
            options={priorityOptions}
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskAssignee"
            label="Responsável"
            type="text"
            value={newTask.responsavel}
            onChange={(e) => handleTaskInputChange('responsavel', e.target.value)}
            placeholder="Nome do responsável"
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskDueDate"
            label="Data de vencimento"
            type="date"
            value={newTask.dataVencimento}
            onChange={(e) => handleTaskInputChange('dataVencimento', e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
              {editingTask ? 'Salvar' : 'Criar'}
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
        />
      </Modal>
    </KanbanContainer>
  );
};

export default ProjectKanban;