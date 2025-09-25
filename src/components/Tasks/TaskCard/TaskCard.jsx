import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  TaskCardContainer,
  TaskTitle,
  TaskDescription,
  TaskMeta,
  TaskAssignee,
  TaskDate,
  TaskActions,
  ActionButton
} from './TaskCard.styles';

const TaskCard = ({ task, isDarkMode, onEdit, onDelete, formatDate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TaskCardContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      $isDragging={isDragging}
      $isDarkMode={isDarkMode}
      onDoubleClick={() => onEdit(task)}
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
      
      <TaskActions className="task-edit-button">
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          $isDarkMode={isDarkMode}
          $variant="edit"
        >
          <span className="material-symbols-outlined">edit</span>
        </ActionButton>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          $isDarkMode={isDarkMode}
          $variant="delete"
        >
          <span className="material-symbols-outlined">delete</span>
        </ActionButton>
      </TaskActions>
    </TaskCardContainer>
  );
};

export default TaskCard;