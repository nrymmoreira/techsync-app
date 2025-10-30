// React automatic JSX runtime in use — explicit import not required
import { CheckboxContainer, CheckboxInput, CheckboxLabel, CheckboxIcon } from './Checkbox.styles';

const Checkbox = ({ 
  id,
  checked,
  onChange,
  children,
  disabled = false,
  $isDarkMode,
  ...props 
}) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        $isDarkMode={$isDarkMode}
        {...props}
      />
      <CheckboxLabel htmlFor={id} $disabled={disabled} $isDarkMode={$isDarkMode}>
        <CheckboxIcon $checked={checked} $disabled={disabled} $isDarkMode={$isDarkMode}>
          {checked && (
            <span className="material-symbols-outlined">
              check
            </span>
          )}
        </CheckboxIcon>
        {children}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;