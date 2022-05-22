import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Layout, Text, useTheme } from '@ui-kitten/components'

const Header = ({ style }) => {
  const theme = useTheme()
  return (
    <Layout style={{ ...style, ...styles.header, backgroundColor: theme['color-primary-default'] }}>
      <Text category="h1" status="control">
        Mex Chat
      </Text>
    </Layout>
  )
}

Header.propTypes = {
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
})

export default Header
