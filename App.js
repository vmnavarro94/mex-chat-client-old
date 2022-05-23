import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppContextProvider } from './context'
import { Alert, LoadingScreen } from './components/layout'
import { AppRoutes, AppNavigator } from './navigation'

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppContextProvider>
          <NavigationContainer>
            <AppNavigator initialRouteName={AppRoutes.AUTH} />
          </NavigationContainer>
          <LoadingScreen />
          <Alert />
        </AppContextProvider>
      </ApplicationProvider>
    </>
  )
}
