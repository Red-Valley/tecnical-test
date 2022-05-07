import React from 'react'
import { IInputProps } from '.'
import './Input.scss'

export const Input: React.FC<IInputProps> = ({
  label = '',
  type = 'text',
  wrapperClassName = '',
  inputClassName = '',
  required = true,
  ...props
}) => (
  <div className={`input-wrapper ${wrapperClassName}`}>
    <input type={type} className={`input ${inputClassName}`} required={required} {...props} />
    <label className="input__label">{label}</label>
  </div>
)

export const CheckBox: React.FC<IInputProps> = ({
  label = '',
  wrapperClassName = '',
  inputClassName = '',
  ...props
}) => (
  <div className={`flex items-center gap-2 ${wrapperClassName}`}>
    <input type="checkbox" {...props} />
    <label className="text-white">{label}</label>
  </div>
)
