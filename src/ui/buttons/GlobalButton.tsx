import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type ButtonVariant = 'default' | 'gray' | 'transparent' | 'black' | 'white'

interface PropsType {
  callback?: () => void
  children: ReactNode
  className?: string | React.CSSProperties
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  variant?: ButtonVariant
}

type variantClassNameType = { [Key in ButtonVariant]: Key }
const variantClassName: variantClassNameType = {
  black: 'black',
  default: 'default',
  transparent: 'transparent',
  gray: 'gray',
  white: 'white',
}

export const GlobalButton: FC<PropsType> = ({
  children,
  callback,
  type = 'button',
  disabled,
  variant = 'default',
  className,
  ...restProps
}) => {
  return (
    <button
      onClick={callback}
      type={type}
      disabled={disabled}
      {...restProps}
      className={`mainBtn ${variantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
