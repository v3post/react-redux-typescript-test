import React from 'react'
import { CartIcon } from '../../icons/CartIcon'
import './styles.scss'

interface ButtonProps {
  title: string,
  themeClass?: string,
  showIcon?: boolean,
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ title, themeClass, showIcon, onClick }) => (
  <button className={`Button ${themeClass}`} onClick={onClick}>
    <span className='ButtonText'>
      {showIcon && (
        <span className='ButtonIcon'>
          <CartIcon />
        </span>
      )}
      {title}
    </span>
  </button>
)