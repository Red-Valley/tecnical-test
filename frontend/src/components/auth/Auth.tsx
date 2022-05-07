import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'components/button'
import { Input, CheckBox } from 'components/input'
import { hasEmptyFields } from 'utils/validationFields'
import { IAuthFormProps } from '.'

export const LoginForm: React.FC<IAuthFormProps> = React.memo(
  ({ data = {}, handleChange = () => {}, onSubmit = () => {} }) => (
    <>
      <div className="flex flex-col w-full gap-4">
        <Input label="Correo electrónico" name="email" value={data.email} onChange={handleChange} />
        <Input label="Contraseña" type="password" name="password" value={data.password} onChange={handleChange} />
        <CheckBox label="Recordarme" name="remindMe" checked={data.remindMe} onChange={handleChange} />
      </div>
      <Button
        className="w-full mt-6"
        text="Iniciar sesión"
        disabled={hasEmptyFields(data, ['email', 'password'])}
        onClick={onSubmit}
      />
      <div className="border w-full h-0.5 mt-6" />
      <Button className="w-full mt-6 bg-green-600" text="Crear cuenta nueva" href="/register" />
    </>
  )
)

export const RegisterForm: React.FC<IAuthFormProps> = React.memo(
  ({ data = {}, handleChange = () => {}, onSubmit = () => {} }) => {
    const disableButton = hasEmptyFields(data, ['email', 'password'])

    return (
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-4 mb-2">
          <Input label="Nombre" name="name" value={data.name} onChange={handleChange} required={disableButton} />
          <Input label="Correo electrónico" name="email" value={data.email} onChange={handleChange} />
          <Input label="Contraseña" type="password" name="password" value={data.password} onChange={handleChange} />
        </div>
        <Link to="/login" className="ml-auto text-right text-white cursor-pointer hover:underline">
          ¿Ya tienes una cuenta?
        </Link>
        <Button
          className={`w-full mt-6 ${!disableButton ? 'bg-green-600' : ''}`}
          text="Crear cuenta nueva"
          disabled={disableButton}
        />
      </form>
    )
  }
)
