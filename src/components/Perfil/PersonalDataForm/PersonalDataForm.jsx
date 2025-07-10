import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import { authService } from '../../../services/api';

import {
    FormContainer,
    SectionTitle,
    FormGrid,
    SaveButtonContainer
} from './PersonalDataForm.styles';

const PersonalDataForm = ({ currentUser, onUpdateSuccess }) => { // Recebe onUpdateSuccess
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        email: "",
        telefone: "",
        cpf: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                nomeCompleto: currentUser.nome || '',
                email: currentUser.email || '',
                telefone: currentUser.telefone || '',
                cpf: currentUser.cpf || '',
            });
        }
    }, [currentUser]);

    const validateCPF = (cpf) => {
        const cleanCPF = cpf.replace(/[^\d]/g, '');
        if (!cleanCPF) return true;
        if (cleanCPF.length !== 11) return false;

        if (/^(\d)\1+$/.test(cleanCPF)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
        }
        let digit = 11 - (sum % 11);
        if (digit === 10 || digit === 11) digit = 0;
        if (parseInt(cleanCPF.charAt(9)) !== digit) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
        }
        digit = 11 - (sum % 11);
        if (digit === 10 || digit === 11) digit = 0;
        return parseInt(cleanCPF.charAt(10)) === digit;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        if (!cleanPhone) return true;
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nomeCompleto.trim()) {
            newErrors.nomeCompleto = 'Nome completo é obrigatório';
        } else if (formData.nomeCompleto.trim().split(' ').length < 2) {
            newErrors.nomeCompleto = 'Digite seu nome completo';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.telefone.trim() && !validatePhone(formData.telefone)) {
            newErrors.telefone = 'Telefone inválido';
        }
        if (formData.cpf.trim() && !validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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

        setIsLoading(true);
        setApiError('');

        const dataToUpdate = {
            id: currentUser.id,
            nome: formData.nomeCompleto,
            email: formData.email,
            telefone: formData.telefone.trim() || null,
            cpf: formData.cpf.trim() || null,
        };

        try {
            const updatedUser = await authService.updateUser(currentUser.id, dataToUpdate);

            // ATUALIZA O LOCALSTORAGE COM OS DADOS FRESCOS DO BACKEND
            localStorage.setItem('techsync-user', JSON.stringify(updatedUser));

            // CHAMA A FUNÇÃO PASSADA PELO PAI PARA ATUALIZAR O ESTADO LÁ
            if (onUpdateSuccess) {
                onUpdateSuccess(updatedUser);
            }

            setShowSuccessModal(true);
        } catch (error) {
            const errorMessage = error.message || 'Erro ao salvar dados. Tente novamente.';
            setApiError(errorMessage);
            console.error('Erro ao salvar dados pessoais:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
    };

    return (
        <FormContainer $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
                Informações Pessoais
            </SectionTitle>

            {apiError && (
                <div style={{ color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                    {apiError}
                </div>
            )}

            <FormGrid>
                <Input
                    id="nomeCompleto"
                    label="Nome completo"
                    type="text"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                    error={errors.nomeCompleto}
                    placeholder="Digite seu nome completo"
                    icon="person"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    placeholder="Digite seu email"
                    icon="mail"
                    required
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Input
                    id="telefone"
                    label="Telefone (Opcional)"
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    error={errors.telefone}
                    placeholder="(11) 99999-9999"
                    icon="phone"
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />

                <Input
                    id="cpf"
                    label="CPF (Opcional)"
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    error={errors.cpf}
                    placeholder="000.000.000-00"
                    icon="badge"
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                />
            </FormGrid>

            <SaveButtonContainer>
                <Button
                    type="button"
                    variant="primary"
                    size="medium"
                    icon="save"
                    onClick={handleSaveChanges}
                    $isDarkMode={isDarkMode}
                    disabled={isLoading}
                >
                    {isLoading ? 'Salvando...' : 'Salvar alterações'}
                </Button>
            </SaveButtonContainer>

            {/* Modal de Sucesso */}
            <Modal
                isOpen={showSuccessModal}
                onClose={handleSuccessModalClose}
                title="Sucesso!"
                $isDarkMode={isDarkMode}
            >
                <p>Seus dados pessoais foram atualizados com sucesso!</p>
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

export default PersonalDataForm;