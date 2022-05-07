import axios, { Method } from 'axios'
const baseUrl = process.env.REACT_APP_API_URL

export interface IUser {
  endpoint: string
  data?: any
  method?: Method
}

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const client = async ({ endpoint, data, method = 'GET' }: IUser) => {
  const url = `${baseUrl}/${endpoint}`

  if (method === HTTP_METHOD.GET) {
    return axios(url)
  } else {
    return axios(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    })
  }
}

export const clientWithToken = async ({ endpoint, data = {}, method = 'GET' }: IUser) => {
  const url = `${baseUrl}/${endpoint}`
  const token = localStorage['token'] || ''

  if (method === HTTP_METHOD.GET) {
    return axios(url, {
      headers: {
        authorization: token,
      },
    })
  } else {
    return axios(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    })
  }
}
