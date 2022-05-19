import { useEffect } from 'react'
import PropTypes from 'prop-types'
import AuthContext from './authContext'

import useAuth from './useAuth'

const AuthProvider = ({ children }) => {
  const auth = useAuth()

  useEffect(() => {
    auth.fetchUserMe()
  }, [])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AuthProvider
