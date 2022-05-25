import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppRoutes from './AppRoutes'
import TabNavigator from './TabNavigator'
import ChatScreen from '../pages/Chat/ChatScreen'
import { Header as ChatsHeader } from '../pages/Chat/partials'

const { Navigator, Screen } = createNativeStackNavigator()

const HomeNavigator = () => (
  <Navigator>
    <Screen name={AppRoutes.HOME_TABS} component={TabNavigator} options={{ headerShown: false }} />
    <Screen
      name={AppRoutes.CHAT}
      component={ChatScreen}
      options={({ navigation, route }) => ({
        header: () => <ChatsHeader navigation={navigation} route={route} />,
      })}
    />
  </Navigator>
)

export default HomeNavigator
