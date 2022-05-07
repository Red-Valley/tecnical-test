import React from 'react'
import { Link } from 'react-router-dom'
import { IButtonProps } from '.'
import './Button.scss'

export const Button: React.FC<IButtonProps> = ({ text = '', className = '', href = '', disabled = false, onClick }) => (
  <button
    className={`button ${className} button-${disabled ? 'disabled' : 'enabled'}`}
    disabled={disabled}
    onClick={onClick}
  >
    {href ? <Link to={href}>{text}</Link> : text}
  </button>
)
