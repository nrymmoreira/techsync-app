import React from 'react';
import { LogoContainer, LogoImage } from './Logo.styles';

const Logo = ({ size = 'large', ...props }) => {
  return (
    <LogoContainer $size={size} {...props}>
      <LogoImage 
        src="/Logo.svg" 
        alt="TechSync - Sistema de Gestão para Micro-empresas de TI"
        $size={size}
      />
    </LogoContainer>
  );
};

export default Logo;