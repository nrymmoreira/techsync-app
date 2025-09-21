import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Modal from '../../Modal/Modal';
import { HexColorPicker } from 'react-colorful';
import {
  StatusManagerContainer,
  StatusList,
  StatusItem,
  StatusColor,
  StatusInfo,
  StatusName,
  StatusActions,
  AddStatusButton,
  ColorPickerContainer,
  PresetColors,
  ColorOption
} from './StatusManager.styles';

const StatusManager = ({ statuses, onStatusesChange, $isDarkMode }) => {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [newStatus, setNewStatus] = useState({
    id: '',
    title: '',
    color: '#3b82f6'
  });

  const presetColors = [
    '#6b7280', // Cinza
    '#3b82f6', // Azul
    '#f59e0b', // Amarelo
    '#10b981', // Verde
    '#ef4444', // Vermelho
    '#8b5cf6', // Roxo
    '#f97316', // Laranja
    '#06b6d4', // Ciano
    '#84cc16', // Lima
    '#f43f5e'  // Rosa
  ];

  const handleAddStatus = () => {
    setNewStatus({
      id: '',
      title: '',
      color: '#3b82f6'
    });
    setEditingStatus(null);
    setShowModal(true);
  };

  const handleEditStatus = (status) => {
    setNewStatus({
      id: status.id,
      title: status.title,
      color: status.color
    });
    setEditingStatus(status);
    setShowModal(true);
  };

  const handleSaveStatus = () => {
    if (!newStatus.title.trim()) return;

    const statusId = editingStatus ? editingStatus.id : newStatus.title.toUpperCase().replace(/\s+/g, '_');
    const statusData = {
      id: statusId,
      title: newStatus.title,
      color: newStatus.color
    };

    if (editingStatus) {
      const updatedStatuses = statuses.map(status =>
        status.id === editingStatus.id ? statusData : status
      );
      onStatusesChange(updatedStatuses);
    } else {
      onStatusesChange([...statuses, statusData]);
    }

    setShowModal(false);
    setNewStatus({ id: '', title: '', color: '#3b82f6' });
  };

  const handleDeleteStatus = (statusId) => {
    if (statuses.length <= 1) {
      alert('Deve existir pelo menos um status');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este status?')) {
      const updatedStatuses = statuses.filter(status => status.id !== statusId);
      onStatusesChange(updatedStatuses);
    }
  };

  const handleColorSelect = (color) => {
    setNewStatus(prev => ({ ...prev, color }));
  };

  return (
    <>
      <StatusManagerContainer $isDarkMode={isDarkMode}>
        <StatusList>
          {statuses.map((status) => (
            <StatusItem key={status.id} $isDarkMode={isDarkMode}>
              <StatusColor $color={status.color} />
              <StatusInfo>
                <StatusName $isDarkMode={isDarkMode}>{status.title}</StatusName>
              </StatusInfo>
              <StatusActions>
                <button
                  type="button"
                  onClick={() => handleEditStatus(status)}
                  title="Editar status"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStatus(status.id)}
                  title="Excluir status"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </StatusActions>
            </StatusItem>
          ))}
        </StatusList>

        <AddStatusButton
          type="button"
          onClick={handleAddStatus}
          $isDarkMode={isDarkMode}
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar Status
        </AddStatusButton>
      </StatusManagerContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingStatus ? 'Editar Status' : 'Novo Status'}
        $isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Input
            id="statusTitle"
            label="Nome do status"
            type="text"
            value={newStatus.title}
            onChange={(e) => setNewStatus(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: Em Revisão"
            required
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
              Cor do status
            </label>
            
            <PresetColors>
              {presetColors.map((color) => (
                <ColorOption
                  key={color}
                  $color={color}
                  $isSelected={newStatus.color === color}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </PresetColors>

            <ColorPickerContainer>
              <HexColorPicker
                color={newStatus.color}
                onChange={(color) => setNewStatus(prev => ({ ...prev, color }))}
              />
            </ColorPickerContainer>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setShowModal(false)}
              $isDarkMode={isDarkMode}
              style={{ flex: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleSaveStatus}
              $isDarkMode={isDarkMode}
              style={{ flex: 1 }}
            >
              {editingStatus ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StatusManager;