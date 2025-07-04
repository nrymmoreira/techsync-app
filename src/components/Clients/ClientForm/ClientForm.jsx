import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import Navbar from '../../Navbar/Navbar';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
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
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    address: '',
    observations: ''
  });

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Simular carregamento dos dados do cliente
      setIsLoading(true);
      setTimeout(() => {
        // Mock data - substituir pela API real
        setFormData({
          name: 'TechNova Solutions',
          cnpj: '12.345.678/0001-90',
          phone: '(11) 98765-4321',
          email: 'contato@technova.com',
          address: 'Av. Paulista, 1000, São Paulo - SP',
          observations: 'Cliente desde 2021. Preferência por reuniões nas segundas-feiras pela manhã.'
        });
        setContacts([
          { id: 1, name: 'João Silva', role: 'CEO', phone: '(11) 98765-4321', email: 'joao@technova.com' },
          { id: 2, name: 'Maria Oliveira', role: 'CTO', phone: '(11) 97654-3210', email: 'maria@technova.com' }
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditing]);

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    let sum = 0;
    let weight = 2;
    
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    
    let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCNPJ.charAt(12)) !== digit) return false;
    
    sum = 0;
    weight = 2;
    
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCNPJ.charAt(13)) === digit;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (formData.email && !validateEmail(formData.email)) {
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

  const handleContactChange = (field, value) => {
    setNewContact(prev => ({ ...prev, [field]: value }));
  };

  const addContact = () => {
    if (newContact.name.trim() && newContact.role.trim()) {
      setContacts(prev => [...prev, { 
        id: Date.now(), 
        ...newContact 
      }]);
      setNewContact({ name: '', role: '', phone: '', email: '' });
    }
  };

  const removeContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simular salvamento na API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving client:', { ...formData, contacts });
      navigate('/clientes');
    } catch (error) {
      setErrors({ api: 'Erro ao salvar cliente' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/clientes');
  };

  if (isEditing && isLoading) {
    return (
      <FormContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <FormContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>
              hourglass_empty
            </span>
          </div>
        </FormContent>
      </FormContainer>
    );
  }

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton onClick={() => navigate('/clientes')} $isDarkMode={isDarkMode}>
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

            <FormGrid>
              <Input
                id="name"
                label="Nome"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                placeholder="Nome da empresa ou pessoa"
                icon="business"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="cnpj"
                label="CNPJ/CPF"
                type="text"
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                error={errors.cnpj}
                placeholder="00.000.000/0000-00"
                icon="badge"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="phone"
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                placeholder="(00) 00000-0000"
                icon="phone"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                placeholder="email@exemplo.com"
                icon="mail"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <div style={{ gridColumn: '1 / -1' }}>
                <Input
                  id="address"
                  label="Endereço"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                  placeholder="Endereço completo"
                  icon="location_on"
                  $isDarkMode={isDarkMode}
                  disabled={isLoading}
                />
              </div>
            </FormGrid>
          </FormSection>

          <ContactsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Contatos</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Pessoas de contato na empresa
            </SectionDescription>

            {contacts.map((contact) => (
              <ContactCard key={contact.id} $isDarkMode={isDarkMode}>
                <ContactHeader>
                  <ContactInfo>
                    <h4>{contact.name}</h4>
                    <span>{contact.role}</span>
                  </ContactInfo>
                  <ContactActions>
                    <button
                      type="button"
                      onClick={() => removeContact(contact.id)}
                      title="Remover contato"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </ContactActions>
                </ContactHeader>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'inherit' }}>
                  {contact.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>phone</span>
                      {contact.phone}
                    </div>
                  )}
                  {contact.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span>
                      {contact.email}
                    </div>
                  )}
                </div>
              </ContactCard>
            ))}

            <FormGrid>
              <Input
                id="contactName"
                label="Nome do contato"
                type="text"
                value={newContact.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                placeholder="Nome do contato"
                icon="person"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="contactRole"
                label="Cargo"
                type="text"
                value={newContact.role}
                onChange={(e) => handleContactChange('role', e.target.value)}
                placeholder="Cargo ou função"
                icon="work"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="contactPhone"
                label="Telefone"
                type="tel"
                value={newContact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="(00) 00000-0000"
                icon="phone"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="contactEmail"
                label="Email"
                type="email"
                value={newContact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                icon="mail"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
            </FormGrid>

            <AddContactButton
              type="button"
              onClick={addContact}
              $isDarkMode={isDarkMode}
              disabled={!newContact.name.trim() || !newContact.role.trim() || isLoading}
            >
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
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
              placeholder="Adicione observações ou notas sobre o cliente..."
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
              {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Salvar Cliente')}
            </SaveButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default ClientForm;