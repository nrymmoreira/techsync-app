import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import Navbar from "../../Navbar/Navbar";
import Button from "../../Button/Button";
import Select from "../../Select/Select";
import Modal from "../../Modal/Modal";
import { authService } from "../../../services/api";
import {
  DetailContainer,
  DetailContent,
  DetailHeader,
  BackButton,
  HeaderContent,
  BudgetTitle,
  BudgetSubtitle,
  HeaderActions,
  StatusSection,
  StatusLabel,
  StatusActions,
  BudgetInfo,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  StatusBadge,
  ServicesSection,
  SectionTitle,
  ServicesList,
  ServiceItem,
  ServiceName,
  ServiceValue,
  SummarySection,
  SummaryGrid,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  TotalValue,
  ObservationsSection,
  ObservationsText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "./BudgetDetail.styles";

const BudgetDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [budget, setBudget] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = [
    { value: "aberto", label: "Aberto" },
    { value: "aguardando_aprovacao", label: "Aguardando Aprovação" },
    { value: "aprovado", label: "Aprovado" },
    { value: "pago", label: "Pago" },
  ];
  useEffect(() => {
    async function fetchBudget() {
      try {
        const data = await authService.getBudgetById(id);
        setBudget(data);
        setNewStatus(data.status);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBudget();
  }, [id]);

  const handleStatusChange = () => {
    setShowStatusModal(true);
  };

  const handleStatusUpdate = async () => {
    try {
      await authService.updateBudget(id, { status: newStatus });
      setBudget((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error(error);
    } finally {
      setShowStatusModal(false);
    }
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      aberto: "Aberto",
      aguardando_aprovacao: "Aguardando Aprovação",
      aprovado: "Aprovado",
      pago: "Pago",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "aberto":
        return "warning";
      case "aguardando_aprovacao":
        return "info";
      case "aprovado":
        return "success";
      case "pago":
        return "success";
      default:
        return "info";
    }
  };

  const calculateSubtotal = () => {
    return (
      budget?.services.reduce((total, service) => total + service.value, 0) || 0
    );
  };

  const handleGeneratePdf = async () => {
    try {
      const blob = await authService.generateBudgetPdf(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await authService.deleteBudget(id);
        navigate("/orcamentos");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!budget) {
    return (
      <DetailContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DetailContent>
          <EmptyState $isDarkMode={isDarkMode}>
            <EmptyStateIcon className="material-symbols-outlined">
              error
            </EmptyStateIcon>
            <EmptyStateTitle $isDarkMode={isDarkMode}>
              Orçamento não encontrado
            </EmptyStateTitle>
            <EmptyStateDescription $isDarkMode={isDarkMode}>
              O orçamento solicitado não foi encontrado ou foi removido.
            </EmptyStateDescription>
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate("/orcamentos")}
              $isDarkMode={isDarkMode}
              style={{ marginTop: "1rem" }}
            >
              Voltar para Orçamentos
            </Button>
          </EmptyState>
        </DetailContent>
      </DetailContainer>
    );
  }

  return (
    <>
      <DetailContainer $isDarkMode={isDarkMode}>
        <Navbar />
        <DetailContent>
          <DetailHeader>
            <BackButton
              onClick={() => navigate("/orcamentos")}
              $isDarkMode={isDarkMode}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </BackButton>
            <HeaderContent>
              <BudgetTitle $isDarkMode={isDarkMode}>
                {budget.number}
              </BudgetTitle>
              <BudgetSubtitle $isDarkMode={isDarkMode}>
                <span className="material-symbols-outlined">schedule</span>
                Criado em {formatDate(budget.createdAt)}
              </BudgetSubtitle>
            </HeaderContent>
            <HeaderActions>
              <Button
                variant="secondary"
                size="medium"
                icon="picture_as_pdf"
                onClick={handleGeneratePdf}
                $isDarkMode={isDarkMode}
              >
                Gerar PDF
              </Button>
              <Button
                variant="secondary"
                size="medium"
                icon="edit"
                onClick={() => navigate(`/orcamentos/${id}/editar`)}
                $isDarkMode={isDarkMode}
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="medium"
                icon="delete"
                onClick={handleDelete}
                $isDarkMode={isDarkMode}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  borderColor: "#ef4444",
                }}
              >
                Excluir
              </Button>
            </HeaderActions>
          </DetailHeader>

          <StatusSection $isDarkMode={isDarkMode}>
            <StatusLabel $isDarkMode={isDarkMode}>
              Status do Orçamento
            </StatusLabel>
            <StatusActions>
              <StatusBadge
                $status={getStatusColor(budget.status)}
                $isDarkMode={isDarkMode}
              >
                {getStatusLabel(budget.status)}
              </StatusBadge>
              <Button
                variant="secondary"
                size="small"
                icon="edit"
                onClick={handleStatusChange}
                $isDarkMode={isDarkMode}
              >
                Alterar Status
              </Button>
            </StatusActions>
          </StatusSection>
          <BudgetInfo $isDarkMode={isDarkMode}>
            <InfoGrid>
              <InfoItem>
                <InfoLabel $isDarkMode={isDarkMode}>Cliente</InfoLabel>
                <InfoValue $isDarkMode={isDarkMode}>
                  {budget.clientName}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel $isDarkMode={isDarkMode}>Valor Total</InfoLabel>
                <InfoValue $isDarkMode={isDarkMode} $isHighlight={true}>
                  {formatCurrency(budget.totalValue)}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel $isDarkMode={isDarkMode}>Data de Criação</InfoLabel>
                <InfoValue $isDarkMode={isDarkMode}>
                  {formatDate(budget.createdAt)}
                </InfoValue>
              </InfoItem>
            </InfoGrid>
          </BudgetInfo>

          <ServicesSection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>Serviços</SectionTitle>
            <ServicesList>
              {budget.services.map((service) => (
                <ServiceItem key={service.id} $isDarkMode={isDarkMode}>
                  <ServiceName $isDarkMode={isDarkMode}>
                    {service.name}
                  </ServiceName>
                  <ServiceValue $isDarkMode={isDarkMode}>
                    {formatCurrency(service.value)}
                  </ServiceValue>
                </ServiceItem>
              ))}
            </ServicesList>
          </ServicesSection>

          <SummarySection $isDarkMode={isDarkMode}>
            <SectionTitle $isDarkMode={isDarkMode}>
              Resumo Financeiro
            </SectionTitle>
            <SummaryGrid $isDarkMode={isDarkMode}>
              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Subtotal:</SummaryLabel>
                <SummaryValue $isDarkMode={isDarkMode}>
                  {formatCurrency(calculateSubtotal())}
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Desconto:</SummaryLabel>
                <SummaryValue $isDarkMode={isDarkMode}>
                  - {formatCurrency(budget.discount)}
                </SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel $isDarkMode={isDarkMode}>Total:</SummaryLabel>
                <TotalValue $isDarkMode={isDarkMode}>
                  {formatCurrency(budget.totalValue)}
                </TotalValue>
              </SummaryItem>
            </SummaryGrid>
          </SummarySection>

          {budget.observations && (
            <ObservationsSection $isDarkMode={isDarkMode}>
              <SectionTitle $isDarkMode={isDarkMode}>Observações</SectionTitle>
              <ObservationsText $isDarkMode={isDarkMode}>
                {budget.observations}
              </ObservationsText>
            </ObservationsSection>
          )}
        </DetailContent>
      </DetailContainer>

      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="Alterar Status do Orçamento"
        $isDarkMode={isDarkMode}
      >
        <div style={{ padding: "1rem 0" }}>
          <Select
            id="newStatus"
            label="Novo Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={statusOptions}
            placeholder="Selecione o novo status"
            $isDarkMode={isDarkMode}
          />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="ghost"
              size="medium"
              onClick={() => setShowStatusModal(false)}
              $isDarkMode={isDarkMode}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleStatusUpdate}
              $isDarkMode={isDarkMode}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BudgetDetail;
