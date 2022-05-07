import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Modal } from 'components/modal'
import { RegisterForm } from 'components/auth'
import useForm from 'hooks/useForm'
import { registerUser } from 'redux/auth/actions'
import { getNickname } from 'utils/nickname'

const Register: React.FC = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()]

  const { data, handleChange, resetData } = useForm({ name: '', email: '', password: '' })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const user = { ...data, name: data.name || (await getNickname()) }

    const isCorrectResponse = await dispatch(registerUser(user))
    if (isCorrectResponse) {
      Swal.fire('Success', `Correo creado correctamente`, 'success')
      resetData()
      navigate('/login')
    } else Swal.fire('Error', 'Hubo un error', 'error')
  }

  return (
    <Modal show title="Registrarte">
      <RegisterForm data={data} handleChange={handleChange} onSubmit={onSubmit} />
    </Modal>
  )
}

export default Register
