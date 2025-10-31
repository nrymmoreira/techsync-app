import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { authService, financialService } from '../../../services/api';
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
    nomeTransacao: '',
    valor: '',
    tipo: 'ENTRADA',
    dataTransacao: '',
    clienteId: '',
  });

  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(isEditing); // Start loading if editing

  const typeOptions = [
    { value: 'ENTRADA', label: 'Entrada' },
    { value: 'SAIDA', label: 'Saída' }
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const clientsData = await authService.getAllClients();
        setClients(clientsData || []);

        if (isEditing) {
          const transaction = await financialService.getTransactionById(id);
          const formattedDate = transaction.dataTransacao 
            ? transaction.dataTransacao.split('T')[0] 
            : '';

          setFormData({
            nomeTransacao: transaction.nomeTransacao || '',
            valor: transaction.valor || '',
            tipo: transaction.tipo || 'ENTRADA',
            dataTransacao: formattedDate,
            clienteId: transaction.cliente?.id || '',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErrors({ api: 'Falha ao carregar os dados. Tente novamente.' });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [id, isEditing]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nomeTransacao.trim()) newErrors.nomeTransacao = 'O nome da transação é obrigatório';
    if (!formData.valor || parseFloat(formData.valor) <= 0) newErrors.valor = 'O valor deve ser maior que zero';
    if (!formData.dataTransacao) newErrors.dataTransacao = 'A data da transação é obrigatória';
    if (!formData.clienteId) newErrors.clienteId = 'É obrigatório selecionar um cliente';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const selectedClient = clients.find(c => c.id === parseInt(formData.clienteId));
    if (!selectedClient) {
      setErrors({ api: 'Cliente selecionado não é válido.' });
      setIsLoading(false);
      return;
    }

    const transactionPayload = {
      ...formData,
      valor: parseFloat(formData.valor),
      cliente: selectedClient,
      numeroNotaFiscal: isEditing ? formData.numeroNotaFiscal : financialService.generateInvoiceNumber(),
    };

    try {
      if (isEditing) {
        await financialService.updateTransaction(id, transactionPayload);
      } else {
        await financialService.createTransaction(transactionPayload);
      }
      navigate('/financeiro/transacoes');
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      setErrors({ api: 'Erro ao salvar a transação. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: client.nome
  }));

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton onClick={() => navigate('/financeiro/transacoes')} $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? 'Editar Transação' : 'Nova Transação'}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing ? 'Atualize as informações da transação' : 'Registre uma nova entrada ou saída'}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        {isLoading ? (
          <p>Carregando dados da transação...</p>
        ) : errors.api ? (
          <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1rem' }}>
            {errors.api}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormSection $isDarkMode={isDarkMode}>
              <SectionTitle $isDarkMode={isDarkMode}>Informações da Transação</SectionTitle>
              <SectionDescription $isDarkMode={isDarkMode}>
                Preencha os dados principais da transação financeira.
              </SectionDescription>

              <FormGrid>
                <Input
                  id="nomeTransacao"
                  label="Nome da Transação"
                  type="text"
                  value={formData.nomeTransacao}
                  onChange={(e) => handleInputChange('nomeTransacao', e.target.value)}
                  error={errors.nomeTransacao}
                  placeholder="Ex: Recebimento de projeto X"
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
                  id="dataTransacao"
                  label="Data da Transação"
                  type="date"
                  value={formData.dataTransacao}
                  onChange={(e) => handleInputChange('dataTransacao', e.target.value)}
                  error={errors.dataTransacao}
                  icon="event"
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
                  required
                  $isDarkMode={isDarkMode}
                  disabled={isLoading || !clients.length}
                  placeholder="Selecione um cliente"
                />
              </FormGrid>
            </FormSection>

            <FormActions>
              <CancelButton type="button" onClick={() => navigate('/financeiro/transacoes')} $isDarkMode={isDarkMode} disabled={isLoading}>
                Cancelar
              </CancelButton>
              <SaveButton type="submit" $isDarkMode={isDarkMode} disabled={isLoading}>
                {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Salvar Transação')}
              </SaveButton>
            </FormActions>
          </form>
        )}
      </FormContent>
    </FormContainer>
  );
};

export default TransactionForm;