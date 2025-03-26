import React, { useState, forwardRef } from 'react'

const BaseInput = forwardRef((props, ref) => {
  const {
    id,
    label,
    value,
    placeholder,
    onChange,
    onBlur,
    errorMessage,
    helperText,
    className = '',
    inputSize = 'medium',
    required = false,
    disabled = false,
    variant = 'outlined',
    showSuccess = false,
    validationRegex,
    width,
    height,
    style,
    labelAlign = 'left',
    labelStyle,
    type = 'text',
    ...restProps
  } = props

  const [isTouched, setIsTouched] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Default values for non-preset usage
  const defaultPlaceholder = 'Enter text'
  const defaultErrorMessage = 'Invalid input'
  const defaultValidationRegex = /^[a-zA-Z0-9]+$/

  // Extend preset condition to include 'numeric'
  const isPreset =
    variant === 'name' ||
    variant === 'username' ||
    variant === 'address' ||
    variant === 'numeric' ||
    variant === 'email' ||
    variant === 'password'

  // Preset settings for different input types
  const presetSettings = {
    name: {
      placeholder: 'Enter your full name',
      errorMessage: 'Name should only contain letters and spaces',
      validationRegex: /^[a-zA-Z\s]+$/,
    },
    username: {
      placeholder: 'Enter your username',
      errorMessage: 'Username can only contain letters, numbers, and underscores',
      validationRegex: /^[a-zA-Z0-9_]+$/,
    },
    address: {
      placeholder: 'Enter your address',
      errorMessage: 'Address can only contain letters, numbers, spaces, commas, periods, slashes, and dashes',
      validationRegex: /^[a-zA-Z0-9\s,./-]+$/,
    },
    numeric: {
      placeholder: 'Enter a number',
      errorMessage: 'Only numeric values are allowed',
      validationRegex: /^[0-9]+(\.[0-9]+)?$/,
    },
    email: {
      placeholder: 'Enter your email',
      errorMessage: 'Please enter a valid email address',
      validationRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      placeholder: 'Enter your password',
      errorMessage: 'Password must be at least 8 characters',
      validationRegex: /^.{8,}$/,
    },
  }

  // Use the user-provided value if available, otherwise use the preset/default
  const effectivePlaceholder = isPreset
    ? (placeholder ?? presetSettings[variant].placeholder ?? defaultPlaceholder)
    : (placeholder ?? defaultPlaceholder)

  const effectiveErrorMessage = isPreset
    ? (errorMessage ?? presetSettings[variant].errorMessage ?? defaultErrorMessage)
    : (errorMessage ?? defaultErrorMessage)

  const effectiveValidationRegex = isPreset
    ? (validationRegex ?? presetSettings[variant].validationRegex ?? defaultValidationRegex)
    : (validationRegex ?? defaultValidationRegex)

  const handleBlur = (e) => {
    setIsTouched(true)
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const isValidInput = (input) => {
    if (input.length === 0) return !required
    return effectiveValidationRegex.test(input)
  }

  const showErrorFlag = isTouched && value.length > 0 && !isValidInput(value)
  const isValid = value.length > 0 && isValidInput(value)

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-4 py-3 text-lg',
  }

  const variantClasses = {
    outlined: 'bg-white border-2',
    filled: 'bg-gray-50 border',
  }

  const visualVariant = 
    variant === 'outlined' || variant === 'filled' ? variant : 'outlined'

  const wrapperStyle = width ? { width, ...style } : style

  const stateClasses = {
    default: 'border-gray-300 hover:border-gray-400',
    focused: 'border-blue-500 ring-2 ring-blue-100',
    error: 'border-red-500 hover:border-red-600 ring-0 ring-red-100',
    success: 'border-green-500 hover:border-green-600 ring-0 ring-green-100',
    disabled: 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-75',
  }

  return (
    <div className={`relative space-y-1 ${className}`} style={wrapperStyle}>
      {label && (
        <label
          htmlFor={id}
          style={{ textAlign: labelAlign, ...labelStyle }}
          className={`
            block text-sm font-medium mb-1
            ${disabled ? 'text-gray-400' : 'text-gray-700'}
            ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={effectivePlaceholder}
          disabled={disabled}
          ref={ref}
          style={{ width, height, ...style }}
          aria-required={required}
          aria-invalid={showErrorFlag ? 'true' : 'false'}
          aria-describedby={
            showErrorFlag
              ? `${id}-error`
              : helperText
                ? `${id}-helper`
                : undefined
          }
          className={`
            w-full rounded-md transition-all duration-200
            ${sizeClasses[inputSize]}
            ${variantClasses[visualVariant]}
            ${
              disabled
                ? stateClasses.disabled
                : showErrorFlag
                  ? stateClasses.error
                  : isValid && showSuccess
                    ? stateClasses.success
                    : isFocused
                      ? stateClasses.focused
                      : stateClasses.default
            }
            focus:outline-none
          `}
          {...restProps}
        />

        {!disabled && value.length > 0 && (
          <div className="absolute right-0 inset-y-0 flex items-center pr-3 pointer-events-none">
            {showErrorFlag ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-red-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            ) : isValid && showSuccess ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-green-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            ) : null}
          </div>
        )}
      </div>

      {helperText && !showErrorFlag && (
        <p id={`${id}-helper`} className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
      {showErrorFlag && (
        <p
          id={`${id}-error`}
          className="text-left text-sm text-red-500 mt-1 ml-1"
          role="alert"
          aria-live="assertive"
        >
          {effectiveErrorMessage}
        </p>
      )}
    </div>
  )
})

BaseInput.displayName = 'BaseInput'
export default BaseInput