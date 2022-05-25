import {
  Icon,
  Text,
  Layout,
  useTheme,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BackIcon = (props) => <Icon {...props} name="arrow-back" />

export const Header = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const { title, subTitle } = route.params

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} appearance="control" onPress={() => navigation.goBack()} />
  )

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
            {title}
          </Text>
        )}
        accessoryLeft={renderBackAction}
      />
    </Layout>
  )
}

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
      subTitle: PropTypes.string,
    }).isRequired,
  }),
}

export default Header
