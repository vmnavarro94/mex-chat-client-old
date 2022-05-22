import {
  Icon,
  Text,
  Layout,
  useTheme,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

const EditIcon = (props) => <Icon {...props} name="edit" />

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />

const InfoIcon = (props) => <Icon {...props} name="info" />

const LogoutIcon = (props) => <Icon {...props} name="log-out" />

export const Header = () => {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />

  const renderRightActions = () => (
    <>
      <TopNavigationAction icon={EditIcon} appearance="control" />
    </>
  )

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} appearance="control" />

  return (
    <Layout
      style={{
        paddingTop: insets.top,
        backgroundColor: theme['color-primary-default'],
      }}
      level="1"
    >
      <TopNavigation
        style={{ backgroundColor: theme['color-primary-default'] }}
        alignment="center"
        title={(props) => (
          <Text
            {...props}
            status="control"
            style={[props.style, { color: theme['color-primary-100'] }]}
          >
            Chats
          </Text>
        )}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    </Layout>
  )
}

export default Header
