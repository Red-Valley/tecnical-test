import React from 'react'
import { IModalProps } from '.'
import './Modal.scss'

export const Modal: React.FC<IModalProps> = ({
  children,
  title = 'Inicia sesión en ChatApp',
  show = true,
  toggleModal = () => {},
}) => {
  return (
    <div className={`modal ${show ? 'block' : 'hidden'}`}>
      <div className="modal__content">
        <i className="text-xl text-white fa-brands fa-rocketchat" />
        <span
          className="absolute hidden text-2xl text-white transition-all duration-300 cursor-pointer left-4 top-4 hover:rotate-180"
          onClick={toggleModal}
        >
          x
        </span>
        <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
        {children}
      </div>
    </div>
  )
}
