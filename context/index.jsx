import { AlertsProvider } from './ui/alertsContext'
import AuthProvider from './auth/AuthProvider'

const composeProviders = (...providers) => {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children }) =>
        (
          <AccumulatedProviders>
            <CurrentProvider>{children}</CurrentProvider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  )
}

const providers = [AlertsProvider, AuthProvider]

export const AppContextProvider = composeProviders(...providers)
