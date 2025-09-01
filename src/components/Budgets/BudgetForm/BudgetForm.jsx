import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Select from "../../Select/Select";
import { authService } from "../../../services/api";
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
  ServicesSection,
  ServiceCard,
  ServiceHeader,
  ServiceInfo,
  ServiceActions,
  AddServiceButton,
  SummarySection,
  SummaryGrid,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  TotalValue,
  ObservationsSection,
  ObservationsTextarea,
  FormActions,
  SaveButton,
  CancelButton,
  GeneratePdfButton,
} from "./BudgetForm.styles";

const BudgetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    clientId: "",
    discount: 0,
    observations: "",
  });

  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    value: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [clientOptions, setClientOptions] = useState([
    { value: "", label: "Selecione um cliente" },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const clients = await authService.getAllClients();
        setClientOptions([
          { value: "", label: "Selecione um cliente" },
          ...clients.map((c) => ({ value: String(c.id), label: c.nome })),
        ]);

        if (isEditing) {
          const budget = await authService.getBudgetById(id);
          setFormData({
            clientId: String(budget.cliente?.id ?? ""),
            discount: budget.desconto ?? 0,
            observations: budget.observacoes ?? "",
          });
          setServices(
            budget.servicos?.map((s) => ({
              id: s.id,
              name: s.descricao,
              value: s.valor,
              quantidade: s.quantidade,
            })) || []
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [id, isEditing]);

  const calculateSubtotal = () => {
    return services.reduce(
      (total, service) => total + parseFloat(service.value || 0),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = parseFloat(formData.discount || 0);
    return Math.max(0, subtotal - discount);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientId) {
      newErrors.clientId = "Cliente é obrigatório";
    }

    if (services.length === 0) {
      newErrors.services = "Adicione pelo menos um serviço";
    }

    const discount = parseFloat(formData.discount || 0);
    const subtotal = calculateSubtotal();
    if (discount > subtotal) {
      newErrors.discount = "Desconto não pode ser maior que o subtotal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateServiceForm = () => {
    const serviceErrors = {};

    if (!newService.name.trim()) {
      serviceErrors.serviceName = "Nome do serviço é obrigatório";
    }

    if (!newService.value || parseFloat(newService.value) <= 0) {
      serviceErrors.serviceValue = "Valor deve ser maior que zero";
    }

    setErrors((prev) => ({ ...prev, ...serviceErrors }));
    return Object.keys(serviceErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleServiceChange = (field, value) => {
    setNewService((prev) => ({ ...prev, [field]: value }));

    if (errors[`service${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`service${field.charAt(0).toUpperCase() + field.slice(1)}`]: "",
      }));
    }
  };

  const addService = () => {
    if (validateServiceForm()) {
      setServices((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newService.name,
          value: parseFloat(newService.value),
          quantidade: 1,
        },
      ]);
      setNewService({ name: "", value: "" });

      if (errors.services) {
        setErrors((prev) => ({ ...prev, services: "" }));
      }
    }
  };

  const removeService = (serviceId) => {
    setServices((prev) => prev.filter((service) => service.id !== serviceId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        cliente: { id: Number(formData.clientId) },
        desconto: parseFloat(formData.discount || 0),
        observacoes: formData.observations,
        servicos: services.map((s) => ({
          descricao: s.name,
          valor: parseFloat(s.value),
          quantidade: s.quantidade ?? 1,
        })),
        status: "PENDENTE",
      };

      if (isEditing) {
        await authService.updateBudget(id, payload);
      } else {
        await authService.createBudget(payload);
      }
      navigate("/orcamentos");
    } catch (error) {
      setErrors({ api: "Erro ao salvar orçamento" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (!isEditing) {
      alert("Salve o orçamento antes de gerar o PDF");
      return;
    }

    try {
      const blob = await authService.generateBudgetPdf(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, "_blank");
    } catch (error) {
      alert("Erro ao gerar PDF");
    }
  };

  const handleCancel = () => {
    navigate("/orcamentos");
  };

  return (
    <FormContainer $isDarkMode={isDarkMode}>
      <Navbar />
      <FormContent>
        <FormHeader>
          <BackButton
            onClick={() => navigate("/orcamentos")}
            $isDarkMode={isDarkMode}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </BackButton>
          <HeaderContent>
            <PageTitle $isDarkMode={isDarkMode}>
              {isEditing ? "Editar Orçamento" : "Novo Orçamento"}
            </PageTitle>
            <PageDescription $isDarkMode={isDarkMode}>
              {isEditing
                ? "Atualize as informações do orçamento"
                : "Preencha os dados do novo orçamento"}
            </PageDescription>
          </HeaderContent>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
              Informações Básicas
            </SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Dados principais do orçamento
            </SectionDescription>

            <FormGrid>
              <Select
                id="clientId"
                label="Cliente"
                value={formData.clientId}
                onChange={(e) => handleInputChange("clientId", e.target.value)}
                options={clientOptions}
                error={errors.clientId}
                placeholder="Selecione um cliente"
                required
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
            </FormGrid>
          </FormSection>

          <ServicesSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Serviços</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Adicione os serviços que serão incluídos no orçamento
            </SectionDescription>

            {errors.services && (
              <div
                style={{
                  color: "#ef4444",
                  fontSize: "0.8125rem",
                  marginBottom: "1rem",
                }}
              >
                {errors.services}
              </div>
            )}

            {services.map((service) => (
              <ServiceCard key={service.id} $isDarkMode={isDarkMode}>
                <ServiceHeader>
                  <ServiceInfo>
                    <h4>{service.name}</h4>
                    <span>{formatCurrency(service.value)}</span>
                  </ServiceInfo>
                  <ServiceActions>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      title="Remover serviço"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </ServiceActions>
                </ServiceHeader>
              </ServiceCard>
            ))}

            <FormGrid>
              <Input
                id="serviceName"
                label="Nome do serviço"
                type="text"
                value={newService.name}
                onChange={(e) => handleServiceChange("name", e.target.value)}
                error={errors.serviceName}
                placeholder="Ex: Desenvolvimento de website"
                icon="work"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />

              <Input
                id="serviceValue"
                label="Valor"
                type="number"
                step="0.01"
                min="0"
                value={newService.value}
                onChange={(e) => handleServiceChange("value", e.target.value)}
                error={errors.serviceValue}
                placeholder="0,00"
                icon="attach_money"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
            </FormGrid>

            <AddServiceButton
              type="button"
              onClick={addService}
              $isDarkMode={isDarkMode}
              disabled={
                !newService.name.trim() || !newService.value || isLoading
              }
            >
              <span className="material-symbols-outlined">add</span>
              Adicionar Serviço
            </AddServiceButton>
          </ServicesSection>

          <SummarySection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
              Resumo Financeiro
            </SectionTitle>

            <FormGrid style={{ marginBottom: "1.5rem" }}>
              <Input
                id="discount"
                label="Desconto"
                type="number"
                step="0.01"
                min="0"
                max={calculateSubtotal()}
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
                error={errors.discount}
                placeholder="0,00"
                icon="percent"
                $isDarkMode={isDarkMode}
                disabled={isLoading}
              />
            </FormGrid>

            <SummaryGrid>
              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Subtotal:</SummaryLabel>
                <SummaryValue $isDarkMode={isDarkMode}>
                  {formatCurrency(calculateSubtotal())}
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Desconto:</SummaryLabel>
                <SummaryValue $isDarkMode={isDarkMode}>
                  - {formatCurrency(parseFloat(formData.discount || 0))}
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Total:</SummaryLabel>
                <TotalValue $isDarkMode={isDarkMode}>
                  {formatCurrency(calculateTotal())}
                </TotalValue>
              </SummaryItem>
            </SummaryGrid>
          </SummarySection>

          <ObservationsSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
            <SectionDescription $isDarkMode={isDarkMode}>
              Informações adicionais sobre o orçamento
            </SectionDescription>

            <ObservationsTextarea
              value={formData.observations}
              onChange={(e) =>
                handleInputChange("observations", e.target.value)
              }
              placeholder="Adicione observações ou detalhes sobre o orçamento..."
              rows={4}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            />
          </ObservationsSection>

          <FormActions>
            <div style={{ display: "flex", gap: "1rem" }}>
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
                  ? "Salvando..."
                  : isEditing
                  ? "Salvar Alterações"
                  : "Salvar Orçamento"}
              </SaveButton>
            </div>

            <GeneratePdfButton
              type="button"
              onClick={handleGeneratePdf}
              $isDarkMode={isDarkMode}
              disabled={isLoading}
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Gerar PDF
            </GeneratePdfButton>
          </FormActions>
        </form>
      </FormContent>
    </FormContainer>
  );
};

export default BudgetForm;
