import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'
import AppRoutes from './AppRoutes'
import { useAuth } from '../context/auth'

const { Navigator, Screen } = createNativeStackNavigator()

const AppNavigator = () => {
  const { user } = useAuth()
  return (
    <Navigator>
      {user ? (
        <Screen name={AppRoutes.HOME} component={HomeNavigator} options={{ headerShown: false }} />
      ) : (
        <Screen name={AppRoutes.AUTH} component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </Navigator>
  )
}

export default AppNavigator
