import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useAuth } from '../../context/auth'

const HomeScreen = ({ navigation }) => {
  const { user, fetchUserMe, signOut } = useAuth()

  useEffect(() => {
    if (!user) {
      fetchUserMe().then((data) => {
        if (!(data?.id && data?.email)) {
          navigation.navigate('Login')
        }
      })
    }
  }, [user])

  const onSingOut = () => {
    signOut()
    navigation.navigate('Login')
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">HOME</Text>
      <Button onPress={onSingOut}>Log out</Button>
    </Layout>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

export default HomeScreen
