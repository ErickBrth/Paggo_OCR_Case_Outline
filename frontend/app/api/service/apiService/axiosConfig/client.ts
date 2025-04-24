import axios from 'axios'
import { getSession } from 'next-auth/react'
import type { InternalAxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
})

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession()
    const token = session?.idToken

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
