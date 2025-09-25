import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { authService } from '../../../services/api';
import {
  FormContainer,
  FormContent,
  FormHeader,
  BackButton,
  HeaderContent,
  PageTitle,
  PageDescription,
  FormSection,
  SectionTitle,
  SectionDescription,
  FormGrid,
  FilesSection,
  FileUploadArea,
  FileList,
  FileItem,
  FileInfo,
  FileActions,
  ObservationsSection,
  ObservationsTextarea,
  FormActions,
  SaveButton,
  CancelButton
} from './ProjectForm.styles';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    clientId: '',
    dataInicio: '',
    dataTermino: '',
    descricao: '',
    status: 'PENDENTE'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState([
    { value: '', label: 'Selecione um cliente' }
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const clients = await authService.getAllClients();
        setClientOptions([
          { value: '', label: 'Selecione um cliente' },
          ...clients.map(c => ({ value: String(c.id), label: c.nome }))
        ]);

        if (isEditing) {
          const projectData = await authService.getProjectById(id);

          setFormData({
            nome: projectData.nome,
            clientId: String(projectData.cliente.id),
            dataInicio: projectData.dataInicio,
            dataTermino: projectData.dataTermino,
            descricao: projectData.descricao,
            status: projectData.status
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do projeto é obrigatório';
    }

    if (!formData.clientId) {
      newErrors.clientId = 'Cliente é obrigatório';
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
    }

    if (!formData.dataTermino) {
      newErrors.dataTermino = 'Data de término é obrigatória';
    }

    if (formData.dataInicio && formData.dataTermino) {
      const startDate = new Date(formData.dataInicio);
      const endDate = new Date(formData.dataTermino);
      if (endDate <= startDate) {
        newErrors.dataTermino = 'Data de término deve ser posterior à data de início';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const projectData = {
        nome: formData.nome,
        cliente: { id: Number(formData.clientId) },
        dataInicio: formData.dataInicio,
        dataTermino: formData.dataTermino,
        descricao: formData.descricao,
        status: formData.status || 'PENDENTE'
      };

      if (isEditing) {
        await authService.updateProject(id, projectData);
      } else {
        await authService.createProject(projectData);
      }
      
      navigate('/projetos');
    } catch (error) {
      setErrors({ api: 'Erro ao salvar projeto' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/projetos');
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton
            onClick={() => navigate('/projetos')}
            $isDarkMode={isDarkMode}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing
                ? 'Atualize as informações do projeto'
                : 'Preencha os dados do novo projeto'}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
              Informações Básicas
            </SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Dados principais do projeto
            </SectionDescription>

            {errors.api && (
              <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                {errors.api}
              </div>
            )}

            <FormGrid>
              <Input
                id="nome"
                label="Nome do projeto"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                error={errors.nome}
                placeholder="Ex: Website Corporativo"
                icon="folder_managed"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Select
                id="clientId"
                label="Cliente"
                value={formData.clientId}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                options={clientOptions}
                error={errors.clientId}
                placeholder="Selecione um cliente"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="dataInicio"
                label="Data de início"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                error={errors.dataInicio}
                icon="event"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="dataTermino"
                label="Data de término"
                type="date"
                value={formData.dataTermino}
                onChange={(e) => handleInputChange('dataTermino', e.target.value)}
                error={errors.dataTermino}
                icon="event_available"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <div style={{ gridColumn: '1 / -1' }}>
                <Input
                  id="descricao"
                  label="Descrição do projeto"
                  type="text"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  error={errors.descricao}
                  placeholder="Descreva brevemente o projeto"
                  icon="description"
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              </div>
            </FormGrid>
          </FormSection>

          <FormActions>
            <CancelButton
              type="button"
              onClick={handleCancel}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            >
              Cancelar
            </CancelButton>
            <SaveButton
              type="submit"
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            >
              {isLoading
                ? 'Salvando...'
                : isEditing
                ? 'Salvar Alterações'
                : 'Criar Projeto'}
            </SaveButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default ProjectForm;