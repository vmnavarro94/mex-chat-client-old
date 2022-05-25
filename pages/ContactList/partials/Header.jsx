import {
  Icon,
  Text,
  Layout,
  useTheme,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BackIcon = (props) => <Icon {...props} name="arrow-back" />
const AddIcon = (props) => <Icon {...props} name="plus" />

export const Header = () => {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const renderRightActions = () => (
    <>
      <TopNavigationAction icon={AddIcon} appearance="control" />
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
            Contacts
          </Text>
        )}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    </Layout>
  )
}

export default Header
