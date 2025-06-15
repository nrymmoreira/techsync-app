import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  FormContainer,
  SectionTitle,
  FormGrid,
  SaveButtonContainer
} from './CompanyDataForm.styles';

const CompanyDataForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nomeEmpresa: "TechDev Solutions",
    cnpj: "12.345.678/0001-90",
    telefoneEmpresa: "(11) 3456-7890",
    site: "www.techdevsolutions.com.br",
    cep: "07024-167",
    endereco: "Av. Paulista",
    numero: "1000",
    complemento: "Sala 1003",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "São Paulo"
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving company data:", formData);
    // Aqui você implementaria a lógica de salvamento
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <SectionTitle $isDarkMode={isDarkMode}>
        Dados da Empresa
      </SectionTitle>

      <FormGrid>
        <Input
          id="nomeEmpresa"
          label="Nome da empresa"
          type="text"
          value={formData.nomeEmpresa}
          onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
          placeholder="TechDev Solutions"
          icon="business"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cnpj"
          label="CNPJ"
          type="text"
          value={formData.cnpj}
          onChange={(e) => handleInputChange("cnpj", e.target.value)}
          placeholder="12.345.678/0001-90"
          icon="badge"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="telefoneEmpresa"
          label="Telefone"
          type="tel"
          value={formData.telefoneEmpresa}
          onChange={(e) => handleInputChange("telefoneEmpresa", e.target.value)}
          placeholder="(11) 3456-7890"
          icon="phone"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="site"
          label="Site"
          type="url"
          value={formData.site}
          onChange={(e) => handleInputChange("site", e.target.value)}
          placeholder="www.techdevsolutions.com.br"
          icon="language"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cep"
          label="CEP"
          type="text"
          value={formData.cep}
          onChange={(e) => handleInputChange("cep", e.target.value)}
          placeholder="07024-167"
          icon="location_on"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="endereco"
          label="Endereço"
          type="text"
          value={formData.endereco}
          onChange={(e) => handleInputChange("endereco", e.target.value)}
          placeholder="Av. Paulista"
          icon="home"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="numero"
          label="Número"
          type="text"
          value={formData.numero}
          onChange={(e) => handleInputChange("numero", e.target.value)}
          placeholder="1000"
          icon="tag"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="complemento"
          label="Complemento"
          type="text"
          value={formData.complemento}
          onChange={(e) => handleInputChange("complemento", e.target.value)}
          placeholder="Sala 1003"
          icon="apartment"
          $isDarkMode={isDarkMode}
        />

        <Input
          id="bairro"
          label="Bairro"
          type="text"
          value={formData.bairro}
          onChange={(e) => handleInputChange("bairro", e.target.value)}
          placeholder="Bela Vista"
          icon="location_city"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="cidade"
          label="Cidade"
          type="text"
          value={formData.cidade}
          onChange={(e) => handleInputChange("cidade", e.target.value)}
          placeholder="São Paulo"
          icon="location_city"
          required
          $isDarkMode={isDarkMode}
        />

        <Input
          id="estado"
          label="Estado"
          type="text"
          value={formData.estado}
          onChange={(e) => handleInputChange("estado", e.target.value)}
          placeholder="São Paulo"
          icon="map"
          required
          $isDarkMode={isDarkMode}
        />
      </FormGrid>

      <SaveButtonContainer>
        <Button
          variant="primary"
          size="medium"
          icon="save"
          onClick={handleSaveChanges}
          $isDarkMode={isDarkMode}
        >
          Salvar alterações
        </Button>
      </SaveButtonContainer>
    </FormContainer>
  );
};

export default CompanyDataForm;