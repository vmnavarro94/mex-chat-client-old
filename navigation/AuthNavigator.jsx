import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppRoutes from './AppRoutes.js'
import SignUpForm from '../pages/Auth/SignUpForm'
import SignInForm from '../pages/Auth/SignInForm'

const { Navigator, Screen } = createNativeStackNavigator()

const AuthNavigator = () => (
  <Navigator>
    <Screen name={AppRoutes.SIGN_UP} component={SignUpForm} options={{ headerShown: false }} />
    <Screen name={AppRoutes.SIGN_IN} component={SignInForm} options={{ headerShown: false }} />
  </Navigator>
)

export default AuthNavigator
