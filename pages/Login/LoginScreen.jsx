import React, { useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import PropTypes from 'prop-types'
import { Layout } from '@ui-kitten/components'
import { useAuth } from '../../context/auth'
import { Header, SignUpForm, SignInForm } from './partials'

const LoginScreen = ({ navigation, route }) => {
  const { variant } = route.params
  const { user } = useAuth()
  const isSignUp = variant === 'signUp'

  useEffect(() => {
    if (user?.token) navigation.navigate('Home')
  }, [user?.token])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout style={styles.inner}>
          <Header />
          {isSignUp ? (
            <SignUpForm navigation={navigation} />
          ) : (
            <SignInForm navigation={navigation} />
          )}
        </Layout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

LoginScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
  },
})

export default LoginScreen
