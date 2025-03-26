import React, { forwardRef } from 'react'

const BaseButton = forwardRef((props, ref) => {
  const {
    children,
    type = 'button',
    disabled = false,
    className = '',
    style,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    rounded = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    leftIcon,
    rightIcon,
    loading = false,
    loadingText,
    ariaLabel,
    title,
    ...restProps
  } = props

  const variantStyles = {
    primary: {
      base: 'bg-[#713EF5] text-white hover:[#713EF5] focus:ring-purple-200',
      disabled: 'bg-blue-300 text-blue-100 cursor-not-allowed',
    },
    secondary: {
      base: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
      disabled: 'bg-gray-300 text-gray-100 cursor-not-allowed',
    },
    outline: {
      base: 'border-2 border-purple-600 text-black font-semibold bg-[#C3B7E8] hover:bg-blue-50 focus:ring-blue-300',
      disabled: 'border-blue-300 text-blue-300 cursor-not-allowed',
    },
    ghost: {
      base: 'bg-transparent text-blue-500 hover:bg-blue-50 focus:ring-blue-300',
      disabled: 'text-blue-300 cursor-not-allowed',
    },
    danger: {
      base: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
      disabled: 'bg-red-300 text-red-100 cursor-not-allowed',
    },
  }

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }

  const buttonVariant = variantStyles[variant] || variantStyles.primary
  const sizeClass = sizeStyles[size] || sizeStyles.medium

  const dynamicClassName = `
    ${buttonVariant[disabled || loading ? 'disabled' : 'base']}
    ${sizeClass}
    ${fullWidth ? 'w-full' : 'inline-flex'}
    ${rounded ? 'rounded-full' : 'rounded-md'}
    transition-all duration-200 ease-in-out
    flex items-center justify-center
    focus:outline-none focus:ring-2
    disabled:pointer-events-none
    ${className}
  `

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText || 'Loading'}
        </>
      )
    }

    return (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={dynamicClassName}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      title={title}
      {...restProps}
    >
      {renderContent()}
    </button>
  )
})

BaseButton.displayName = 'BaseButton'
export default BaseButton