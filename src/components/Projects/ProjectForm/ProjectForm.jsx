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
    clienteId: '',
    dataInicio: '',
    dataFim: '',
    descricao: '',
    observacoes: '',
    status: 'PENDENTE',
  });

  const [files, setFiles] = useState([]);
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
          const projectData = await authService.getProject(id);
          setFormData({
            nome: projectData.nome,
            clienteId: String(projectData.cliente.id),
            dataInicio: projectData.dataInicio,
            dataFim: projectData.dataTermino,
            descricao: projectData.descricao,
            observacoes: projectData.observacoes,
            status: projectData.status,
          });

          // Simular arquivos do projeto
          setFiles([]);
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

    if (!formData.clienteId) {
      newErrors.clienteId = 'Cliente é obrigatório';
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
    }

    if (!formData.dataFim) {
      newErrors.dataFim = 'Data de prazo é obrigatória';
    }

    if (formData.dataInicio && formData.dataFim) {
      const startDate = new Date(formData.dataInicio);
      const endDate = new Date(formData.dataFim);
      if (endDate <= startDate) {
        newErrors.dataFim = 'Data de prazo deve ser posterior à data de início';
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

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const newFiles = uploadedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      type: file.type,
      file: file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const baseProjectData = {
        nome: formData.nome,
        dataInicio: formData.dataInicio,
        dataTermino: formData.dataFim,
        descricao: formData.descricao,
        observacoes: formData.observacoes,
        status: formData.status,
      };

      if (isEditing) {
        const projectData = {
          ...baseProjectData,
          cliente: { id: Number(formData.clienteId) },
        };
        await authService.updateProject(id, projectData);
        console.log('Projeto atualizado:', projectData);
      } else {
        await authService.createProject(
          baseProjectData,
          Number(formData.clienteId)
        );
        console.log('Projeto criado:', baseProjectData);
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
                id="clienteId"
                label="Cliente"
                value={formData.clienteId}
                onChange={(e) => handleInputChange('clienteId', e.target.value)}
                options={clientOptions}
                error={errors.clienteId}
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
                id="dataFim"
                label="Data de prazo"
                type="date"
                value={formData.dataFim}
                onChange={(e) => handleInputChange('dataFim', e.target.value)}
                error={errors.dataFim}
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

          <FilesSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Arquivos</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Anexe documentos, imagens e outros arquivos relacionados ao projeto
            </SectionDescription>

            <FileUploadArea $isDarkMode={isDarkMode}>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="fileUpload"
                disabled={isLoading}
              />
              <label htmlFor="fileUpload" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.7 }}>
                  cloud_upload
                </span>
                <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
                  Clique para selecionar arquivos
                </span>
                <span style={{ fontSize: '0.8125rem', opacity: 0.7, marginTop: '0.25rem' }}>
                  ou arraste e solte aqui
                </span>
              </label>
            </FileUploadArea>

            {files.length > 0 && (
              <FileList>
                {files.map((file) => (
                  <FileItem key={file.id} $isDarkMode={isDarkMode}>
                    <FileInfo>
                      <span className="material-symbols-outlined">
                        {file.type.includes('pdf') ? 'picture_as_pdf' : 
                         file.type.includes('image') ? 'image' : 'description'}
                      </span>
                      <div>
                        <div style={{ fontWeight: '500' }}>{file.name}</div>
                        <div style={{ fontSize: '0.8125rem', opacity: 0.7 }}>{file.size}</div>
                      </div>
                    </FileInfo>
                    <FileActions>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        title="Remover arquivo"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </FileActions>
                  </FileItem>
                ))}
              </FileList>
            )}
          </FilesSection>

          <ObservationsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Notas e informações adicionais sobre o projeto
            </SectionDescription>

            <ObservationsTextarea
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Adicione observações ou notas sobre o projeto..."
              rows={4}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            />
          </ObservationsSection>

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