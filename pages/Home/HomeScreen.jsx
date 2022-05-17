import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Layout, Text } from '@ui-kitten/components'
import { useAsyncStorage } from '../../hooks'

const HomeScreen = ({ navigation }) => {
  const [token] = useAsyncStorage('token')

  useEffect(() => {
    if (!token) navigation.navigate('Login')
  }, [])

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">HOME</Text>
    </Layout>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
}

export default HomeScreen
