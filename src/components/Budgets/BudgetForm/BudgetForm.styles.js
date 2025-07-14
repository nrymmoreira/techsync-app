import styled from 'styled-components';
import { getTheme } from '../../../styles/themes';
import { fonts, breakpoints } from '../../../styles/GlobalStyles';

export const FormContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.background;
  }};
`;

export const FormContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    transform: translateY(-1px);
  }

  span {
    font-size: 1.25rem;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const PageTitle = styled.h1`
  font-family: ${fonts.primary};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const PageDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  line-height: 1.5;
`;

export const FormSection = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surface;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${breakpoints.desktop}) {
    padding: 2rem;
  }
`;

export const SectionTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  margin-bottom: 0.5rem;
`;

export const SectionDescription = styled.p`
  font-family: ${fonts.secondary};
  font-size: 0.875rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ServicesSection = styled(FormSection)``;

export const ServiceCard = styled.div`
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border: 1px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ServiceInfo = styled.div`
  h4 {
    font-family: ${fonts.secondary};
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
    margin: 0 0 0.25rem 0;
  }

  span {
    font-family: ${fonts.secondary};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
  }
`;

export const ServiceActions = styled.div`
  button {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceBorder;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.error;
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return `${theme.colors.error}20`;
      }};
      border-color: ${props => {
        const theme = getTheme(props.$isDarkMode);
        return theme.colors.error;
      }};
    }

    span {
      font-size: 0.875rem;
    }
  }
`;

export const AddServiceButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 2px dashed ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primary;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    font-size: 1.125rem;
  }
`;

export const SummarySection = styled(FormSection)``;

export const SummaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceHover;
  }};
  border-radius: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryLabel = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
`;

export const SummaryValue = styled.span`
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
`;

export const TotalValue = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
`;

export const ObservationsSection = styled(FormSection)``;

export const ObservationsTextarea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.background;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.input.border;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textPrimary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textSecondary;
    }};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.borderFocus;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.backgroundFocus;
    }};
    box-shadow: 0 0 0 3px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryLight;
    }};
  }

  &:hover:not(:focus) {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.input.borderHover;
    }};
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    
    > div {
      width: 100%;
      display: flex;
      gap: 1rem;
      
      button {
        flex: 1;
      }
    }
  }
`;

export const SaveButton = styled.button`
  padding: 0.875rem 2rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.primary;
  }};
  border-radius: 8px;
  color: white;
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryHover;
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.primaryShadow;
    }};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

export const CancelButton = styled.button`
  padding: 0.875rem 2rem;
  background: transparent;
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.surfaceBorder;
  }};
  border-radius: 8px;
  color: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.textSecondary;
  }};
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
    color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.textPrimary;
    }};
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return theme.colors.surfaceHover;
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const GeneratePdfButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.success;
  }};
  border: 2px solid ${props => {
    const theme = getTheme(props.$isDarkMode);
    return theme.colors.success;
  }};
  border-radius: 8px;
  color: white;
  font-family: ${fonts.secondary};
  font-size: 0.9375rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return '#16a34a';
    }};
    border-color: ${props => {
      const theme = getTheme(props.$isDarkMode);
      return '#16a34a';
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  span {
    font-size: 1.125rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;