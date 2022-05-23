import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

import AppRoutes from './AppRoutes'
import { Header } from '../pages/Home/partials'
import { ContactListScreen, ChatListScreen, SettingsScreen } from '../pages'

const { Navigator, Screen } = createBottomTabNavigator()

const TabIcon = ({ name, ...props }) => (
  <Icon {...props} name={name} style={{ ...props.style, width: 32, height: 32 }} />
)

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

const HomeTabBar = ({ navigation, state }) => {
  const insets = useSafeAreaInsets()

  return (
    <BottomNavigation
      selectedIndex={state.index}
      appearance="noIndicator"
      style={{ paddingBottom: insets.bottom }}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={(props) => <TabIcon {...props} name="people" />} />
      <BottomNavigationTab icon={(props) => <TabIcon {...props} name="message-circle" />} />
      <BottomNavigationTab icon={(props) => <TabIcon {...props} name="settings-2" />} />
    </BottomNavigation>
  )
}

HomeTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
}

const HomeNavigator = () => {
  return (
    <Navigator initialRouteName={AppRoutes.CHAT_LIST} tabBar={(props) => <HomeTabBar {...props} />}>
      <Screen name={AppRoutes.CONTACT_LIST} component={ContactListScreen} />
      <Screen
        name={AppRoutes.CHAT_LIST}
        component={ChatListScreen}
        options={{ header: () => <Header /> }}
      />
      <Screen name={AppRoutes.SETTINGS} component={SettingsScreen} />
    </Navigator>
  )
}

export default HomeNavigator
