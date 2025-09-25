import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import TaskCard from '../../Tasks/TaskCard/TaskCard';
import TaskModal from '../../Tasks/TaskModal/TaskModal';
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
  EmptyColumn,
  EmptyColumnIcon,
  EmptyColumnText,
  LoadingState,
  ErrorState,
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
  const [activeId, setActiveId] = useState(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Encontrar a tarefa que está sendo arrastada
    let sourceColumn = null;
    let draggedTask = null;

    for (const [columnId, columnTasks] of Object.entries(tasks)) {
      const task = columnTasks.find(t => t.id === activeId);
      if (task) {
        sourceColumn = columnId;
        draggedTask = task;
        break;
      }
    }

    if (!draggedTask || !sourceColumn) return;

    // Determinar a coluna de destino
    let targetColumn = null;
    
    // Se over.id é uma coluna
    if (statuses.some(status => status.id === overId)) {
      targetColumn = overId;
    } else {
      // Se over.id é uma tarefa, encontrar sua coluna
      for (const [columnId, columnTasks] of Object.entries(tasks)) {
        if (columnTasks.some(t => t.id === overId)) {
          targetColumn = columnId;
          break;
        }
      }
    }

    if (!targetColumn || sourceColumn === targetColumn) return;

    // Atualizar o estado local
    const updatedTask = { ...draggedTask, status: targetColumn };
    const newSourceTasks = tasks[sourceColumn].filter(task => task.id !== activeId);
    const newTargetTasks = [...tasks[targetColumn], updatedTask];

    setTasks(prev => ({
      ...prev,
      [sourceColumn]: newSourceTasks,
      [targetColumn]: newTargetTasks
    }));

    // Atualizar status da tarefa na API
    try {
      await authService.updateTaskStatus(draggedTask.id, targetColumn);
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      // Reverter mudança em caso de erro
      setTasks(prev => ({
        ...prev,
        [sourceColumn]: tasks[sourceColumn],
        [targetColumn]: tasks[targetColumn]
      }));
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Encontrar colunas
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    setTasks(prev => {
      const activeItems = prev[activeColumn];
      const overItems = prev[overColumn];

      const activeIndex = activeItems.findIndex(item => item.id === activeId);
      const overIndex = overItems.findIndex(item => item.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const activeTask = activeItems[activeIndex];
      const updatedTask = { ...activeTask, status: overColumn };

      return {
        ...prev,
        [activeColumn]: activeItems.filter(item => item.id !== activeId),
        [overColumn]: [
          ...overItems.slice(0, newIndex),
          updatedTask,
          ...overItems.slice(newIndex)
        ]
      };
    });
  };

  const findColumn = (id) => {
    if (statuses.some(status => status.id === id)) {
      return id;
    }

    for (const [columnId, columnTasks] of Object.entries(tasks)) {
      if (columnTasks.some(task => task.id === id)) {
        return columnId;
      }
    }
    return null;
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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
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

                <SortableContext
                  items={tasks[column.id].map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <TasksList
                    $isDarkMode={isDarkMode}
                    style={{
                      minHeight: '200px',
                      padding: '0.5rem',
                    }}
                  >
                    {(tasks[column.id] || []).length === 0 ? (
                      <EmptyColumn $isDarkMode={isDarkMode}>
                        <EmptyColumnIcon className="material-symbols-outlined">
                          task_alt
                        </EmptyColumnIcon>
                        <EmptyColumnText>Nenhuma tarefa</EmptyColumnText>
                      </EmptyColumn>
                    ) : (
                      (tasks[column.id] || []).map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          isDarkMode={isDarkMode}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          formatDate={formatDate}
                        />
                      ))
                    )}
                  </TasksList>
                </SortableContext>
              </Column>
            ))}
          </KanbanBoard>

          <DragOverlay>
            {activeId ? (
              <div style={{ 
                background: isDarkMode ? 'rgba(78, 86, 105, 0.1)' : '#FFFFFF',
                border: `1px solid ${isDarkMode ? '#F97316' : '#F97316'}`,
                borderRadius: '8px',
                padding: '1rem',
                opacity: 0.8,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}>
                {(() => {
                  const task = Object.values(tasks)
                    .flat()
                    .find(t => t.id === activeId);
                  return task ? (
                    <>
                      <h4 style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        color: isDarkMode ? '#F5F5F5' : '#1E293B',
                        margin: '0 0 0.5rem 0',
                        lineHeight: '1.4'
                      }}>
                        {task.nome}
                      </h4>
                      {task.descricao && (
                        <p style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8125rem',
                          color: isDarkMode ? '#D9D9D9' : '#475569',
                          margin: '0 0 0.75rem 0',
                          lineHeight: '1.4'
                        }}>
                          {task.descricao}
                        </p>
                      )}
                    </>
                  ) : null;
                })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </KanbanContent>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title={editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        task={newTask}
        onTaskChange={handleTaskInputChange}
        onSave={handleSaveTask}
        statusOptions={statusOptions}
        userOptions={userOptions}
        $isDarkMode={isDarkMode}
      />

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