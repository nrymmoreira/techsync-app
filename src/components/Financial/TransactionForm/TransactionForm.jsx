import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { financialData } from '../../../services/demoData';
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
  FormActions,
  SaveButton,
  CancelButton
} from './TransactionForm.styles';

const TransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    tipo: 'DESPESA',
    descricao: '',
    valor: '',
    categoria: '',
    projectId: '',
    dataVencimento: '',
    dataPagamento: '',
    statusPagamento: 'PENDENTE',
    recorrente: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const typeOptions = [
    { value: 'RECEITA', label: 'Receita' },
    { value: 'DESPESA', label: 'Despesa' }
  ];

  const statusOptions = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'PAGO', label: 'Pago' }
  ];

  const expenseCategories = financialData.expenseCategories;

  const projectOptions = [
    { value: '', label: 'Selecione um projeto (opcional)' },
    ...financialData.projects.map(p => ({ 
      value: String(p.id), 
      label: p.nome 
    }))
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.valor || parseFloat(formData.valor) <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }

    if (formData.tipo === 'DESPESA' && !formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória para despesas';
    }

    if (!formData.dataVencimento) {
      newErrors.dataVencimento = 'Data de vencimento é obrigatória';
    }

    if (formData.statusPagamento === 'PAGO' && !formData.dataPagamento) {
      newErrors.dataPagamento = 'Data de pagamento é obrigatória quando status é "Pago"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Limpar data de pagamento se status não for PAGO
    if (field === 'statusPagamento' && value !== 'PAGO') {
      setFormData(prev => ({ ...prev, dataPagamento: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simular salvamento
      console.log('Salvando transação:', formData);
      
      // Em uma implementação real, aqui seria feita a chamada para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/financeiro/transacoes');
    } catch (error) {
      setErrors({ api: 'Erro ao salvar transação' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/financeiro/transacoes');
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton
            onClick={() => navigate('/financeiro/transacoes')}
            $isDarkMode={isDarkMode}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? 'Editar Transação' : 'Nova Transação'}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing
                ? 'Atualize as informações da transação'
                : 'Registre uma nova receita ou despesa'}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
              Informações da Transação
            </SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Dados principais da receita ou despesa
            </SectionDescription>

            {errors.api && (
              <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                {errors.api}
              </div>
            )}

            <FormGrid>
              <Select
                id="tipo"
                label="Tipo"
                value={formData.tipo}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
                options={typeOptions}
                error={errors.tipo}
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="descricao"
                label="Descrição"
                type="text"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                error={errors.descricao}
                placeholder="Ex: Pagamento de hospedagem"
                icon="description"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="valor"
                label="Valor"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor}
                onChange={(e) => handleInputChange('valor', e.target.value)}
                error={errors.valor}
                placeholder="0,00"
                icon="attach_money"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              {formData.tipo === 'DESPESA' && (
                <Select
                  id="categoria"
                  label="Categoria"
                  value={formData.categoria}
                  onChange={(e) => handleInputChange('categoria', e.target.value)}
                  options={expenseCategories}
                  error={errors.categoria}
                  placeholder="Selecione uma categoria"
                  required
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              )}

              {formData.tipo === 'RECEITA' && (
                <Select
                  id="projectId"
                  label="Projeto"
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  options={projectOptions}
                  error={errors.projectId}
                  placeholder="Selecione um projeto"
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              )}

              <Input
                id="dataVencimento"
                label="Data de Vencimento"
                type="date"
                value={formData.dataVencimento}
                onChange={(e) => handleInputChange('dataVencimento', e.target.value)}
                error={errors.dataVencimento}
                icon="event"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Select
                id="statusPagamento"
                label="Status do Pagamento"
                value={formData.statusPagamento}
                onChange={(e) => handleInputChange('statusPagamento', e.target.value)}
                options={statusOptions}
                error={errors.statusPagamento}
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              {formData.statusPagamento === 'PAGO' && (
                <Input
                  id="dataPagamento"
                  label="Data de Pagamento"
                  type="date"
                  value={formData.dataPagamento}
                  onChange={(e) => handleInputChange('dataPagamento', e.target.value)}
                  error={errors.dataPagamento}
                  icon="event_available"
                  required
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              )}
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
                : 'Salvar Transação'}
            </SaveButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default TransactionForm;