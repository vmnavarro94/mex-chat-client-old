import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

import AppRoutes from './AppRoutes'
import { Header as ChatsHeader } from '../pages/Home/partials'
import { Header as ContactsHeader } from '../pages/ContactList/partials'
import { ContactListScreen, ChatListScreen, SettingsScreen } from '../pages'

const { Navigator, Screen } = createBottomTabNavigator()

const TabIcon = ({ name, ...props }) => (
  <Icon {...props} name={name} style={{ ...props.style, width: 28, height: 28 }} />
)

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
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
      <BottomNavigationTab
        title="Contacts"
        icon={(props) => <TabIcon {...props} name="people" />}
      />
      <BottomNavigationTab
        title="Chats"
        icon={(props) => <TabIcon {...props} name="message-circle" />}
      />
      <BottomNavigationTab
        title="Settings"
        icon={(props) => <TabIcon {...props} name="settings-2" />}
      />
    </BottomNavigation>
  )
}

HomeTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
}

const TabNavigator = () => {
  return (
    <Navigator initialRouteName={AppRoutes.CHAT_LIST} tabBar={(props) => <HomeTabBar {...props} />}>
      <Screen
        name={AppRoutes.CONTACT_LIST}
        component={ContactListScreen}
        options={{ header: () => <ContactsHeader /> }}
      />
      <Screen
        name={AppRoutes.CHAT_LIST}
        component={ChatListScreen}
        options={{ header: () => <ChatsHeader /> }}
      />
      <Screen
        name={AppRoutes.SETTINGS}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default TabNavigator
