import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppContextProvider } from './context'
import { Alert } from './components/layout'

import { HomeScreen, LoginScreen } from './pages'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
                initialParams={{ variant: 'signUp' }}
              />
            </Stack.Navigator>
          </NavigationContainer>

          <Alert />
        </AppContextProvider>
      </ApplicationProvider>
    </>
  )
}
