import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from './AuthNavigator'
import { HomeScreen } from '../pages'
import AppRoutes from './AppRoutes'
import { useAuth } from '../context/auth'

const { Navigator, Screen } = createNativeStackNavigator()

const AppNavigator = () => {
  const { user } = useAuth()
  return (
    <Navigator>
      {user ? (
        <Screen name={AppRoutes.HOME} component={HomeScreen} />
      ) : (
        <Screen name={AppRoutes.AUTH} component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </Navigator>
  )
}

export default AppNavigator
