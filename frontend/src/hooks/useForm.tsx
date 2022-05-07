import { useState, useEffect } from 'react'
import { IUser } from 'pages/login'

const useForm = (initialState: any) => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    getEmail()
  }, [])

  const getEmail = () => {
    const email = localStorage['email']
    if (email) {
      setData((data: IUser) => ({
        ...data,
        ...(data.remindMe && { remindMe: true }),
        email: data.remindMe ? email : data.email,
      }))
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [target.name]: Object.keys(target).includes('checked') ? target.checked : target.value,
    })
  }

  const resetData = () => setData(initialState)

  return {
    data,
    handleChange,
    resetData,
  }
}

export default useForm
