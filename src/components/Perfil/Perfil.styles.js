import styled from 'styled-components';

export const PerfilContainer = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;
`;

export const PerfilContent = styled.div`
  display: flex;
  padding: 40px;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

export const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;

export const CameraButton = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff6b35;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e55a2b;
  }
`;

export const UserName = styled.h3`
  color: white;
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const UserEmail = styled.p`
  color: #888;
  margin: 0;
  font-size: 14px;
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 30px;
`;

export const TabButton = styled.button`
  padding: 12px 24px;
  border: none;
  background-color: ${props => props.$active ? '#ff6b35' : '#2a2a2a'};
  color: ${props => props.$active ? 'white' : '#888'};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  &:last-child {
    border-radius: 0 8px 0 0;
  }

  &:hover {
    background-color: ${props => props.$active ? '#e55a2b' : '#333'};
  }
`;

export const TabContent = styled.div`
  background-color: #2a2a2a;
  padding: 30px;
  border-radius: 0 8px 8px 8px;
  border: 1px solid #333;
`;

export const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: white;
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 12px;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #ff6b35;
  }
`;

export const InputIcon = styled.span`
  color: #888;
  margin-right: 10px;
  font-size: 16px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 100%;
  font-size: 14px;

  &::placeholder {
    color: #666;
  }
`;

export const SaveButton = styled.button`
  background-color: #ff6b35;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e55a2b;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const PlaceholderContent = styled.div`
  h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 20px;
  }

  p {
    color: #888;
    line-height: 1.5;
  }
`;