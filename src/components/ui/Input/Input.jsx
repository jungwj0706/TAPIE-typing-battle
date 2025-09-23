import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  size = 'medium',
  className = '',
  ...props 
}, ref) => {
  const inputClass = `
    input 
    input--${size}
    ${error ? 'input--error' : ''}
    ${disabled ? 'input--disabled' : ''}
    ${className}
  `.trim();

  return (
    <div className="input-wrapper">
      <input
        ref={ref}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && errorMessage && (
        <span className="input-error-message">
          {errorMessage}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;