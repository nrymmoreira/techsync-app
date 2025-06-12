import React, { useEffect } from 'react';
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalHeader, 
  ModalTitle, 
  ModalCloseButton, 
  ModalContent 
} from './Modal.styles';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  $isDarkMode,
  ...props 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      $isDarkMode={$isDarkMode}
      {...props}
    >
      <ModalContainer onClick={(e) => e.stopPropagation()} $isDarkMode={$isDarkMode}>
        <ModalHeader $isDarkMode={$isDarkMode}>
          <ModalTitle id="modal-title" $isDarkMode={$isDarkMode}>{title}</ModalTitle>
          <ModalCloseButton 
            onClick={onClose}
            aria-label="Fechar modal"
            $isDarkMode={$isDarkMode}
          >
            <span className="material-symbols-outlined">close</span>
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent $isDarkMode={$isDarkMode}>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;