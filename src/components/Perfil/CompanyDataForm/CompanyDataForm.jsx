import { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import Select from '../../Select/Select';
import { authService } from '../../../services/api';
import {
    FormContainer,
    SectionTitle,
    FormGrid,
    SaveButtonContainer,
    ErrorMessage
} from './CompanyDataForm.styles';

const CompanyDataForm = ({ currentUser, onUpdateSuccess }) => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        nome: "",
        cnpj: "",
        currency: "BRL",
        timezone: "GMT-3"
    });

    const currencyOptions = [
        { value: 'BRL', label: 'Real Brasileiro (BRL)' },
        { value: 'USD', label: 'Dólar Americano (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'Libra Esterlina (GBP)' }
    ];

    const timezoneOptions = [
        { value: 'GMT-3', label: 'Horário de Brasília (GMT-3)' },
        { value: 'GMT-5', label: 'Nova Iorque (EST / GMT-5)' },
        { value: 'GMT+0', label: 'Londres / Lisboa (GMT)' },
        { value: 'GMT+9', label: 'Tóquio (JST / GMT+9)' },
        { value: 'UTC',   label: 'UTC' },
    ];

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    useEffect(() => {
        if (currentUser?.empresa) {
            setFormData({
                nome: currentUser.empresa.nome || '',
                cnpj: String(currentUser.empresa.cnpj || ''),
                currency: currentUser.empresa.currency || 'BRL',
                timezone: currentUser.empresa.timezone || 'GMT-3'
            });
        }
    }, [currentUser]);

    const validateCNPJ = (cnpj) => {
        const cleanCNPJ = String(cnpj).replace(/[^\d]/g, '');
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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nome.trim()) newErrors.nome = 'Nome da empresa é obrigatório';
        if (!String(formData.cnpj).trim()) {
            newErrors.cnpj = 'CNPJ é obrigatório';
        } else if (!validateCNPJ(formData.cnpj)) {
            newErrors.cnpj = 'CNPJ inválido';
        }
        if (!formData.currency) newErrors.currency = 'Moeda é obrigatória';
        if (!formData.timezone) newErrors.timezone = 'Fuso horário é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        setApiError('');
    };

    const handleSaveChanges = async () => {
        if (!validateForm()) {
            setApiError('Preencha os campos corretamente para salvar.');
            return;
        }

        // --- CORREÇÃO APLICADA AQUI ---
        // A verificação agora checa explicitamente por null ou undefined, permitindo que o ID 0 seja válido.
        if (currentUser?.empresa?.id == null) {
            setApiError('Não foi possível encontrar o ID da empresa para atualizar.');
            return;
        }

        setIsLoading(true);
        setApiError('');

        const companyPayload = {
            nome: formData.nome,
            cnpj: String(formData.cnpj).replace(/[^\d]/g, ''),
            currency: formData.currency,
            timezone: formData.timezone,
        };
        
        try {
            const savedCompany = await authService.updateCompany(currentUser.empresa.id, companyPayload);

            if (onUpdateSuccess) {
                onUpdateSuccess({ ...currentUser, empresa: savedCompany });
            }

            setShowSuccessModal(true);
        } catch (error) {
            const errorMessage = error.message || 'Erro ao salvar dados da empresa. Tente novamente.';
            setApiError(errorMessage);
            console.error('Erro na chamada da API:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        window.location.reload();
    };

    return (
        <FormContainer $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
                Dados da Empresa
            </SectionTitle>

            {apiError && (
                <ErrorMessage $isDarkMode={isDarkMode}>
                    {apiError}
                </ErrorMessage>
            )}

            <FormGrid>
                <Input
                    id="nome"
                    label="Nome da empresa"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    error={errors.nome}
                    placeholder="TechDev Solutions"
                    icon="business"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Input
                    id="cnpj"
                    label="CNPJ"
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange("cnpj", e.target.value)}
                    error={errors.cnpj}
                    placeholder="12.345.678/0001-90"
                    icon="badge"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Select
                    id="currency"
                    label="Moeda"
                    value={formData.currency}
                    onChange={(e) => handleInputChange("currency", e.target.value)}
                    options={currencyOptions}
                    error={errors.currency}
                    placeholder="Selecione a moeda"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Select
                    id="timezone"
                    label="Fuso Horário"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange("timezone", e.target.value)}
                    options={timezoneOptions}
                    error={errors.timezone}
                    placeholder="Selecione o fuso horário"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />
            </FormGrid>

            <SaveButtonContainer>
                <Button
                    variant="primary"
                    size="medium"
                    icon="save"
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    $isDarkMode={isDarkMode}
                >
                    {isLoading ? 'Salvando...' : 'Salvar alterações'}
                </Button>
            </SaveButtonContainer>

            <Modal
                isOpen={showSuccessModal}
                onClose={handleSuccessModalClose}
                title="Sucesso!"
                $isDarkMode={isDarkMode}
            >
                <p>Os dados da empresa foram salvos com sucesso!</p>
                <Button
                    variant="primary"
                    size="medium"
                    onClick={handleSuccessModalClose}
                    $isDarkMode={isDarkMode}
                    style={{ marginTop: '1rem' }}
                >
                    Ok
                </Button>
            </Modal>
        </FormContainer>
    );
};

export default CompanyDataForm;
