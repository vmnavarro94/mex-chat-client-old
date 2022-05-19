import PropTypes from 'prop-types'
import { useState, useContext, createContext } from 'react'

const defaultValue = {
  text: 'My Alert',
  type: 'info',
  show: false,
}

const Context = createContext(defaultValue)

export const useAlertsContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Missing AlertsProvider')
  }

  return context
}

export const AlertsProvider = ({ children }) => {
  const [alert, setAlert] = useState(defaultValue)

  return <Context.Provider value={{ alert, setAlert }}>{children}</Context.Provider>
}

AlertsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
