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
    nome: '',
    descricao: '',
    status: 'TODO',
    dataInicio: '',
    dataTermino: '',
    responsavelId: ''
  });

  const [userOptions, setUserOptions] = useState([
    { value: '', label: 'Selecione um responsável' }
  ]);

  const statusOptions = statuses.map(status => ({
    value: status.id,
    label: status.title
  }));

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados reais do projeto
        const projectData = await authService.getProjectById(id);
        setProject(projectData);
        
        // Buscar tarefas do projeto
        const tasksData = await authService.getProjectTasks(id);
        
        // Organizar tarefas por status
        const initialTasks = {};
        statuses.forEach(status => {
          initialTasks[status.id] = [];
        });
        
        // Distribuir tarefas pelos status
        tasksData.forEach(task => {
          if (initialTasks[task.status]) {
            initialTasks[task.status].push(task);
          }
        });
        
        setTasks(initialTasks);
        
        // Buscar usuários para o select de responsável
        // Por enquanto, vamos simular até ter o endpoint
        setUserOptions([
          { value: '', label: 'Selecione um responsável' },
          { value: '1', label: 'João Silva' },
          { value: '2', label: 'Pedro Costa' },
          { value: '3', label: 'Maria Santos' }
        ]);
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

    const sourceColumn = [...(tasks[source.droppableId] || [])];
    const destColumn = source.droppableId === destination.droppableId 
      ? sourceColumn 
      : [...(tasks[destination.droppableId] || [])];
      
    const draggedTask = sourceColumn.find(task => task.id === draggableId);

    if (!draggedTask) return;

    if (source.droppableId === destination.droppableId) {
      // Reordenar dentro da mesma coluna
      const newTasks = [...sourceColumn];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
      
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: newTasks
      }));
    } else {
      // Mover entre colunas diferentes
      const updatedTask = { ...draggedTask, status: destination.droppableId };
      const newSourceTasks = sourceColumn.filter(task => task.id !== draggableId);
      const newDestTasks = [...destColumn];
      newDestTasks.splice(destination.index, 0, updatedTask);

      setTasks(prev => ({
        ...prev,
        [source.droppableId]: newSourceTasks,
        [destination.droppableId]: newDestTasks
      }));
      
      // Atualizar status da tarefa na API
      try {
        await authService.updateTaskStatus(draggedTask.id, destination.droppableId);
      } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
        // Reverter mudança em caso de erro
        setTasks(prev => ({
          ...prev,
          [source.droppableId]: sourceColumn,
          [destination.droppableId]: destColumn
        }));
      }
    }
  };

  const handleStatusesChange = (newStatuses) => {
    setStatuses(newStatuses);
  };

  const handleTaskInputChange = (field, value) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = (columnId) => {
    setNewTask({
      nome: '',
      descricao: '',
      dataInicio: '',
      dataTermino: '',
      responsavelId: '',
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
    if (!newTask.nome.trim()) return;

    const taskPayload = {
      nome: newTask.nome,
      descricao: newTask.descricao,
      status: newTask.status,
      dataInicio: newTask.dataInicio || null,
      dataTermino: newTask.dataTermino || null,
      responsavel: newTask.responsavelId ? { id: parseInt(newTask.responsavelId) } : null
    };

    const saveTask = async () => {
      try {
        if (editingTask) {
          const updatedTask = await authService.updateTask(editingTask.id, taskPayload);
          
          // Atualizar tarefa no estado local
          setTasks(prev => {
            const newTasks = {};
            Object.keys(prev).forEach(key => {
              newTasks[key] = prev[key].map(task => 
                task.id === editingTask.id ? updatedTask : task
              );
            });
            return newTasks;
          });
        } else {
          const createdTask = await authService.createTask(project.id, taskPayload);
          
          // Adicionar nova tarefa ao estado local
          setTasks(prev => ({
            ...prev,
            [createdTask.status]: [...(prev[createdTask.status] || []), createdTask]
          }));
        }
        
        setShowTaskModal(false);
        setEditingTask(null);
        setNewTask({
          nome: '',
          descricao: '',
          status: 'TODO',
          dataInicio: '',
          dataTermino: '',
          responsavelId: ''
        });
      } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
        alert('Erro ao salvar tarefa. Tente novamente.');
      }
    };
    
    saveTask();
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      await authService.deleteTask(taskId);
      
      // Remover tarefa do estado local
      setTasks(prev => {
        const newTasks = {};
        Object.keys(prev).forEach(key => {
          newTasks[key] = prev[key].filter(task => task.id !== taskId);
        });
        return newTasks;
      });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa. Tente novamente.');
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
                                  {task.responsavel && (
                                    <TaskAssignee $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">person</span>
                                      {task.responsavel.nome}
                                    </TaskAssignee>
                                  )}
                                  {task.dataInicio && (
                                    <TaskDate $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">event</span>
                                      Início: {formatDate(task.dataInicio)}
                                    </TaskDate>
                                  )}
                                  {task.dataTermino && (
                                    <TaskDate $isDarkMode={isDarkMode}>
                                      <span className="material-symbols-outlined">schedule</span>
                                      Prazo: {formatDate(task.dataTermino)}
                                    </TaskDate>
                                  )}
                                </TaskMeta>
                                
                                {/* Botão de edição visível apenas no hover */}
                                <div style={{
                                  position: 'absolute',
                                  top: '0.5rem',
                                  right: '0.5rem',
                                  opacity: 0,
                                  transition: 'opacity 0.2s ease',
                                  pointerEvents: 'auto',
                                  display: 'flex',
                                  gap: '0.25rem'
                                }}
                                className="task-edit-button"
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditTask(task);
                                    }}
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '4px',
                                      background: isDarkMode ? 'rgba(78, 86, 105, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                                      border: 'none',
                                      color: isDarkMode ? '#F5F5F5' : '#1E293B',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>
                                      edit
                                    </span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTask(task.id);
                                    }}
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '4px',
                                      background: isDarkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.9)',
                                      border: 'none',
                                      color: 'white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>
                                      delete
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
        title={editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        $isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            id="taskTitle"
            label="Nome da tarefa"
            type="text"
            value={newTask.nome}
            onChange={(e) => handleTaskInputChange('nome', e.target.value)}
            placeholder="Digite o nome da tarefa"
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
                minHeight: '80px',
                userSelect: 'text',
                WebkitUserSelect: 'text'
              }}
            />
          </div>

          <Input
            id="taskStartDate"
            label="Data de início"
            type="date"
            value={newTask.dataInicio}
            onChange={(e) => handleTaskInputChange('dataInicio', e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskEndDate"
            label="Data de término"
            type="date"
            value={newTask.dataTermino}
            onChange={(e) => handleTaskInputChange('dataTermino', e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <Select
            id="taskResponsavel"
            label="Responsável"
            value={newTask.responsavelId}
            onChange={(e) => handleTaskInputChange('responsavelId', e.target.value)}
            options={userOptions}
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