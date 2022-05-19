import { useState } from 'react'
import { login, register } from '../../api/auth'
import { getUser } from '../../api/users'
import { useAlertsContext } from '../ui/alertsContext'
import { useAsyncStorage } from '../../hooks'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getToken, setToken] = useAsyncStorage('token')
  const { setAlert } = useAlertsContext()

  const signUp = async ({ email, password, callback }) => {
    setLoading(true)
    try {
      const data = await register({ email, password })
      setAlert({ type: 'success', text: `${data.email} registered, please login`, show: true })
      callback && callback()
    } catch (error) {
      if (error.statusCode === 409) {
        setAlert({ type: 'danger', text: 'Email already registered', show: true })
      }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async ({ email, password, callback }) => {
    setLoading(true)
    try {
      const data = await login({ email, password })
      await setToken(data.token)
      setAlert({ type: 'success', text: `Logged as: ${data.user.email}`, show: true })
      setUser({ email: data.user.email, token: data.token })
      callback && callback()
    } catch (error) {
      const errorMessage =
        error.statusCode === 401 || error.statusCode == 404
          ? 'Incorrect user or password'
          : 'Unabled to login'
      setAlert({ type: 'danger', text: errorMessage, show: true })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserMe = async () => {
    const token = await getToken()
    if (!token) {
      return
    }
    const { sub } = jwtDecode(token)
    try {
      const data = await getUser({ id: sub, token })
      setAlert({ type: 'success', text: `Logged as: ${data.email}`, show: true })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    await setToken('')
    setUser(null)
    setAlert({ type: 'warning', text: `Logged out`, show: true })
  }

  return {
    user,
    signUp,
    signIn,
    signOut,
    fetchUserMe,
    loading,
  }
}

export default useAuth
