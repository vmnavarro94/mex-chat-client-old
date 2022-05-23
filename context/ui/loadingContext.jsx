import PropTypes from 'prop-types'
import { useAuth } from '../auth'
import { useState, useEffect, useContext, createContext } from 'react'

const defaultValue = {
  show: false,
}

const Context = createContext(defaultValue)

export const useLoadingScreenContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Missing LoadingScreenProvider')
  }

  return context
}

export const LoadingScreenProvider = ({ children }) => {
  const [loadingScreen, setLoadingScreen] = useState(defaultValue)
  const { loading } = useAuth()

  useEffect(() => {
    setLoadingScreen({ show: loading })
  }, [loading])

  return <Context.Provider value={loadingScreen}>{children}</Context.Provider>
}

LoadingScreenProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
