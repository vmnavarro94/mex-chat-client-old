import { useContext } from 'react'
import authContext from './authContext'

const useAuth = () => {
  if (!authContext) {
    throw new Error('Missing AuthProvider')
  }
  return useContext(authContext)
}

export default useAuth
