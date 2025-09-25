import React from 'react';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import {
  TaskModalContent,
  TaskModalGrid,
  TaskDescriptionContainer,
  TaskDescriptionLabel,
  TaskDescriptionTextarea,
  TaskModalActions
} from './TaskModal.styles';

const TaskModal = ({
  isOpen,
  onClose,
  title,
  task,
  onTaskChange,
  onSave,
  statusOptions,
  userOptions,
  isDarkMode
}) => {
  const handleInputChange = (field, value) => {
    onTaskChange(field, value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      $isDarkMode={isDarkMode}
    >
      <TaskModalContent>
        <TaskModalGrid>
          <Input
            id="taskTitle"
            label="Nome da tarefa"
            type="text"
            value={task.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            placeholder="Digite o nome da tarefa"
            required
            $isDarkMode={isDarkMode}
          />

          <Select
            id="taskStatus"
            label="Status"
            value={task.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            options={statusOptions}
            $isDarkMode={isDarkMode}
          />

          <TaskDescriptionContainer>
            <TaskDescriptionLabel $isDarkMode={isDarkMode}>
              Descrição
            </TaskDescriptionLabel>
            <TaskDescriptionTextarea
              value={task.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva a tarefa..."
              rows={3}
              $isDarkMode={isDarkMode}
            />
          </TaskDescriptionContainer>

          <Input
            id="taskStartDate"
            label="Data de início"
            type="date"
            value={task.dataInicio}
            onChange={(e) => handleInputChange('dataInicio', e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <Input
            id="taskEndDate"
            label="Data de término"
            type="date"
            value={task.dataTermino}
            onChange={(e) => handleInputChange('dataTermino', e.target.value)}
            $isDarkMode={isDarkMode}
          />

          <Select
            id="taskResponsavel"
            label="Responsável"
            value={task.responsavelId}
            onChange={(e) => handleInputChange('responsavelId', e.target.value)}
            options={userOptions}
            $isDarkMode={isDarkMode}
          />
        </TaskModalGrid>

        <TaskModalActions>
          <Button
            variant="secondary"
            size="medium"
            onClick={onClose}
            $isDarkMode={isDarkMode}
            style={{ flex: 1 }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={onSave}
            $isDarkMode={isDarkMode}
            style={{ flex: 1 }}
          >
            Salvar
          </Button>
        </TaskModalActions>
      </TaskModalContent>
    </Modal>
  );
};

export default TaskModal;