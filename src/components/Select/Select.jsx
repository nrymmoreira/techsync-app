import React, { useState, useRef, useEffect } from 'react';
import {
  SelectContainer,
  SelectLabel,
  SelectButton,
  SelectIcon,
  SelectDropdown,
  SelectOption,
  ErrorMessage
} from './Select.styles';

const Select = ({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione uma opção",
  error,
  required = false,
  disabled = false,
  $isDarkMode,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange({ target: { value: option.value } });
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <SelectContainer ref={selectRef} {...props}>
      {label && (
        <SelectLabel htmlFor={id} $isDarkMode={$isDarkMode}>
          {label}
          {required && <span aria-label="obrigatório"> *</span>}
        </SelectLabel>
      )}
      
      <div style={{ position: 'relative' }}>
        <SelectButton
          id={id}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          $isOpen={isOpen}
          $hasError={!!error}
          $isDarkMode={$isDarkMode}
          disabled={disabled}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={!!error}
        >
          <span>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <SelectIcon 
            className="material-symbols-outlined" 
            $isOpen={isOpen}
            $isDarkMode={$isDarkMode}
          >
            expand_more
          </SelectIcon>
        </SelectButton>

        {isOpen && (
          <SelectDropdown $isDarkMode={$isDarkMode} role="listbox">
            {options.map((option) => (
              <SelectOption
                key={option.value}
                onClick={() => handleOptionClick(option)}
                $isSelected={selectedOption?.value === option.value}
                $isDarkMode={$isDarkMode}
                role="option"
                aria-selected={selectedOption?.value === option.value}
              >
                {option.label}
              </SelectOption>
            ))}
          </SelectDropdown>
        )}
      </div>

      {error && (
        <ErrorMessage $isDarkMode={$isDarkMode}>
          {error}
        </ErrorMessage>
      )}
    </SelectContainer>
  );
};

export default Select;