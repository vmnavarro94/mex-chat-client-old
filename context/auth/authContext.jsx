import { createContext } from 'react'

const initialValue = {
  loading: true,
  user: null,
  signIn: () => null,
  signOut: () => null,
  updateUser: () => null,
  fetchUser: () => null,
}

const authContext = createContext(initialValue)

export default authContext
