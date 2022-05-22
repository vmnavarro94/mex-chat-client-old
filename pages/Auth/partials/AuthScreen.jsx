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
import { useAuth } from '../../../context/auth'
import Header from './Header'

const LoginScreen = ({ navigation, children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout style={styles.inner}>
          <Header />
          {children}
        </Layout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  children: PropTypes.node.isRequired,
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
