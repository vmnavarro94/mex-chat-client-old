import { AlertsProvider, LoadingScreenProvider } from './ui'
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

const providers = [AlertsProvider, AuthProvider, LoadingScreenProvider]

export const AppContextProvider = composeProviders(...providers)
