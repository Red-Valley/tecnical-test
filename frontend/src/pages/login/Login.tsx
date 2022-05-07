import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Modal } from 'components/modal'
import { LoginForm } from 'components/auth'
import { login } from 'redux/auth/actions'
import useForm from 'hooks/useForm'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, handleChange, resetData } = useForm({
    email: '',
    password: '123456',
    remindMe: !!localStorage['email'],
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const { email, password } = data

    saveEmail()

    const isCorrectResponse = await dispatch(login({ email, password }))

    if (!isCorrectResponse) Swal.fire('Error', 'Verifique los datos', 'error')
    else {
      resetData()
      navigate('/')
    }
  }

  const saveEmail = () => {
    if (data.remindMe) localStorage.setItem('email', data.email)
    else localStorage.removeItem('email')
  }

  return (
    <Modal show>
      <LoginForm data={data} handleChange={handleChange} onSubmit={onSubmit} />
    </Modal>
  )
}

export default Login
