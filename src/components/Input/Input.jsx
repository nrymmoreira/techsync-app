import { useState } from 'react';
import { 
  InputContainer, 
  InputLabel, 
  InputField, 
  InputIcon,
  ErrorMessage,
  PasswordToggle,
  PasswordRequirements,
  RequirementItem
} from './Input.styles';

const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
  showPasswordRequirements = false,
  $isDarkMode,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const validatePassword = (password) => {
    return {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const passwordValidation = isPasswordType ? validatePassword(value || '') : {};

  return (
    <InputContainer>
      {label && (
        <InputLabel htmlFor={props.id} $isDarkMode={$isDarkMode}>
          {label}
          {required && <span aria-label="obrigatório"> *</span>}
        </InputLabel>
      )}
      
      <div style={{ position: 'relative' }}>
        {icon && (
          <InputIcon className="material-symbols-outlined" $isDarkMode={$isDarkMode}>
            {icon}
          </InputIcon>
        )}
        
        <InputField
          {...props}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          $hasIcon={!!icon}
          $hasError={!!error}
          $isPasswordType={isPasswordType}
          $isDarkMode={$isDarkMode}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />
        
        {isPasswordType && (
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            $isDarkMode={$isDarkMode}
          >
            <span className="material-symbols-outlined">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </PasswordToggle>
        )}
      </div>
      
      {error && (
        <ErrorMessage id={`${props.id}-error`} role="alert" $isDarkMode={$isDarkMode}>
          {error}
        </ErrorMessage>
      )}
      
      {showPasswordRequirements && isPasswordType && isFocused && (
        <PasswordRequirements $isDarkMode={$isDarkMode}>
          <RequirementItem $isValid={passwordValidation.length} $isDarkMode={$isDarkMode}>
            <span className="material-symbols-outlined">
              {passwordValidation.length ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            Mínimo de 12 caracteres
          </RequirementItem>
          <RequirementItem $isValid={passwordValidation.uppercase} $isDarkMode={$isDarkMode}>
            <span className="material-symbols-outlined">
              {passwordValidation.uppercase ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            Pelo menos uma letra maiúscula
          </RequirementItem>
          <RequirementItem $isValid={passwordValidation.lowercase} $isDarkMode={$isDarkMode}>
            <span className="material-symbols-outlined">
              {passwordValidation.lowercase ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            Pelo menos uma letra minúscula
          </RequirementItem>
          <RequirementItem $isValid={passwordValidation.number} $isDarkMode={$isDarkMode}>
            <span className="material-symbols-outlined">
              {passwordValidation.number ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            Pelo menos um número
          </RequirementItem>
          <RequirementItem $isValid={passwordValidation.symbol} $isDarkMode={$isDarkMode}>
            <span className="material-symbols-outlined">
              {passwordValidation.symbol ? 'check_circle' : 'radio_button_unchecked'}
            </span>
            Pelo menos um símbolo (como ! @ # $ %)
          </RequirementItem>
        </PasswordRequirements>
      )}
    </InputContainer>
  );
};

export default Input;