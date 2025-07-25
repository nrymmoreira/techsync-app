import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
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
  // Estilos para contatos e observações reintegrados
  ContactsSection,
  ContactCard,
  ContactHeader,
  ContactInfo,
  ContactActions,
  AddContactButton,
  ObservationsSection,
  ObservationsTextarea,
  FormActions,
  SaveButton,
  CancelButton
} from './ClientForm.styles';

const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    cnpj_cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    obs: '' // O nome do estado agora corresponde à API
  });

  // --- LÓGICA DE CONTATOS REINTEGRADA ---
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    nome: '',
    cargo: '',
    telefone: '',
    email: ''
  });
  // -----------------------------------------

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchClientData = async () => {
        try {
          const clientData = await authService.getClientById(id);
          setFormData({
            nome: clientData.nome || '',
            cnpj_cpf: String(clientData.cnpj_cpf || clientData.cnpj || ''),
            telefone: String(clientData.telefone || ''),
            email: clientData.email || '',
            endereco: clientData.endereco || '',
            obs: clientData.obs || ''
          });
          // Popula os contatos
          setContacts(clientData.contatos || []);
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
          setErrors({ api: 'Não foi possível carregar os dados do cliente.' });
        } finally {
          setIsLoading(false);
        }
      };
      fetchClientData();
    }
  }, [id, isEditing]);

  const validateCpfCnpj = (doc) => {
    const cleanDoc = String(doc).replace(/[^\d]/g, '');
    return cleanDoc.length === 11 || cleanDoc.length === 14;
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true;
    const cleanPhone = String(phone).replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!String(formData.cnpj_cpf).trim()) {
      newErrors.cnpj_cpf = 'CPF/CNPJ é obrigatório';
    } else if (!validateCpfCnpj(formData.cnpj_cpf)) {
      newErrors.cnpj_cpf = 'CPF ou CNPJ inválido';
    }
    if (!String(formData.telefone).trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
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

  // --- FUNÇÕES DE CONTATO REINTEGRADAS ---
  const handleContactChange = (field, value) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const addContact = () => {
    if (newContact.nome.trim() && newContact.cargo.trim()) {
      setContacts(prev => [...prev, { id: Date.now(), ...newContact }]);
      setNewContact({ nome: '', cargo: '', telefone: '', email: '' });
    }
  };

  const removeContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };
  // -----------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('techsync-user'));
    if (storedUser?.empresa?.id == null) {
        setErrors({ api: 'ID da sua empresa não encontrado. Faça login novamente.' });
        setIsLoading(false);
        return;
    }

    const clientPayload = {
        nome: formData.nome,
        cnpj_cpf: Number(String(formData.cnpj_cpf).replace(/[^\d]/g, '')),
        telefone: Number(String(formData.telefone).replace(/[^\d]/g, '')),
        email: formData.email,
        endereco: formData.endereco,
        obs: formData.obs,
        status: 'ATIVO',
        empresa: { id: storedUser.empresa.id },
        // Envia a lista de contatos (removendo o ID temporário do frontend)
        contatos: contacts.map(({ id, ...rest }) => rest)
    };

    try {
      if (isEditing) {
        await authService.updateClient(id, clientPayload);
        navigate(`/clientes/${id}`);
      } else {
        await authService.createClient(clientPayload);
        navigate('/clientes');
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setErrors({ api: error.message || 'Erro ao salvar cliente. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/clientes/${id}`);
    } else {
      navigate('/clientes');
    }
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton onClick={handleCancel} $isDarkMode={isDarkMode}>
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing ? 'Atualize as informações do cliente' : 'Preencha os dados do novo cliente'}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Informações Básicas</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Dados principais do cliente
            </SectionDescription>

            {errors.api && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.api}</p>}

            <FormGrid>
              <Input id="nome" label="Nome" type="text" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} error={errors.nome} placeholder="Nome da empresa ou pessoa" icon="business" required $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="cnpj_cpf" label="CPF/CNPJ" type="text" value={formData.cnpj_cpf} onChange={(e) => handleInputChange('cnpj_cpf', e.target.value)} error={errors.cnpj_cpf} placeholder="00.000.000/0000-00 ou 000.000.000-00" icon="badge" required $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="telefone" label="Telefone" type="tel" value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} error={errors.telefone} placeholder="(00) 00000-0000" icon="phone" required $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="email" label="Email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} error={errors.email} placeholder="email@exemplo.com" icon="mail" required $isDarkMode={isDarkMode} disabled={isLoading} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Input id="endereco" label="Endereço (Opcional)" type="text" value={formData.endereco} onChange={(e) => handleInputChange('endereco', e.target.value)} error={errors.endereco} placeholder="Endereço completo" icon="location_on" $isDarkMode={isDarkMode} disabled={isLoading} />
              </div>
            </FormGrid>
          </FormSection>

          {/* --- SECÇÃO DE CONTATOS CORRIGIDA --- */}
          <ContactsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Contatos</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Pessoas de contato na empresa (opcional)
            </SectionDescription>

            {contacts.map((contact) => (
              <ContactCard key={contact.id} $isDarkMode={isDarkMode}>
                <ContactHeader>
                  <ContactInfo>
                    <h4>{contact.nome}</h4>
                    <span>{contact.cargo}</span>
                  </ContactInfo>
                  <ContactActions>
                    <button type="button" onClick={() => removeContact(contact.id)} title="Remover contato">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </ContactActions>
                </ContactHeader>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'inherit' }}>
                  {contact.telefone && ( <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>phone</span>{contact.telefone}</div> )}
                  {contact.email && ( <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span>{contact.email}</div> )}
                </div>
              </ContactCard>
            ))}

            <FormGrid>
              <Input id="contactName" label="Nome do contato" type="text" value={newContact.nome} onChange={(e) => handleContactChange('nome', e.target.value)} placeholder="Nome do contato" icon="person" $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="contactRole" label="Cargo" type="text" value={newContact.cargo} onChange={(e) => handleContactChange('cargo', e.target.value)} placeholder="Cargo ou função" icon="work" $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="contactPhone" label="Telefone do contato" type="tel" value={newContact.telefone} onChange={(e) => handleContactChange('telefone', e.target.value)} placeholder="(00) 00000-0000" icon="phone" $isDarkMode={isDarkMode} disabled={isLoading} />
              <Input id="contactEmail" label="Email do contato" type="email" value={newContact.email} onChange={(e) => handleContactChange('email', e.target.value)} placeholder="email@exemplo.com" icon="mail" $isDarkMode={isDarkMode} disabled={isLoading} />
            </FormGrid>

            <AddContactButton type="button" onClick={addContact} $isDarkMode={isDarkMode} disabled={!newContact.nome.trim() || !newContact.cargo.trim() || isLoading}>
              <span className="material-symbols-outlined">add</span>
              Adicionar Contato
            </AddContactButton>
          </ContactsSection>

          <ObservationsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Informações adicionais sobre o cliente
            </SectionDescription>
            <ObservationsTextarea
              value={formData.obs}
              onChange={(e) => handleInputChange('obs', e.target.value)}
              placeholder="Adicione observações ou notas sobre o cliente..."
              rows={4}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            />
          </ObservationsSection>

          <FormActions>
            <CancelButton type="button" onClick={handleCancel} $isDarkMode={isDarkMode} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit" $isDarkMode={isDarkMode} disabled={isLoading}>
              {isLoading ? 'A guardar...' : (isEditing ? 'Guardar Alterações' : 'Guardar Cliente')}
            </SaveButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default ClientForm;