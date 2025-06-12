import styled from 'styled-components';
import { breakpoints } from '../../styles/GlobalStyles';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.$size === 'large' ? '2rem' : '1rem'};

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: ${props => props.$size === 'large' ? '1.5rem' : '0.75rem'};
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${props => props.$size === 'large' ? '1rem' : '0.5rem'};
  }
`;

export const LogoImage = styled.img`
  height: ${props => {
    switch (props.$size) {
      case 'small': return '40px';
      case 'medium': return '60px';
      case 'large': 
      default: return '80px';
    }
  }};
  width: auto;
  filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.3));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 0 30px rgba(249, 115, 22, 0.5));
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: ${props => {
      switch (props.$size) {
        case 'small': return '32px';
        case 'medium': return '48px';
        case 'large': 
        default: return '64px';
      }
    }};
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: ${props => {
      switch (props.$size) {
        case 'small': return '28px';
        case 'medium': return '40px';
        case 'large': 
        default: return '48px';
      }
    }};
  }
`;