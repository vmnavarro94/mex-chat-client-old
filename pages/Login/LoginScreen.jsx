import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Layout, Input, Button, Icon, Text, useTheme } from '@ui-kitten/components'
import { useAuth } from '../../context/auth'

const renderSecureIcon = (secureTextEntry, setSecureTextEntry, props) => (
  <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
)

const validationSchema = Yup.object({
  isSignUp: Yup.boolean(),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters long').required('Required'),
  cPassword: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .when('isSignUp', {
      is: true,
      then: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
})

const renderCaption = (touched, text) => {
  return touched && text ? (
    <View style={styles.captionContainer}>
      <Text style={styles.captionText} status="danger">
        {text}
      </Text>
    </View>
  ) : null
}

const LoginScreen = ({ navigation, route }) => {
  const { variant } = route.params
  const [securePassword, setSecurePassword] = useState(true)
  const [secureCPassword, setSecureCPassword] = useState(true)
  const theme = useTheme()
  const { signUp, signIn, user } = useAuth()
  const isSignUp = variant === 'signUp'

  useEffect(() => {
    if (user?.token) navigation.navigate('Home')
  }, [user?.token])

  const formik = useFormik({
    initialValues: {
      isSignUp,
      email: '',
      password: '',
      cPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values
      if (isSignUp) {
        const callback = () => navigation.push('Login', { variant: 'signIn' })
        signUp({ email, password, callback })
      } else {
        signIn({ email, password })
      }
      resetForm()
    },
  })

  const handleChangeScreen = () => {
    const variant = isSignUp ? 'signIn' : 'signUp'
    navigation.push('Login', { variant })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Layout style={styles.inner}>
          <Layout style={{ ...styles.header, backgroundColor: theme['color-primary-default'] }}>
            <Text category="h1" style={styles.input} status="control">
              Mex Chat
            </Text>
          </Layout>
          <Layout style={styles.content}>
            <Input
              size="large"
              placeholder="your@mail.com"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              accessoryRight={(props) => <Icon {...props} name="email" />}
              autoCapitalize="none"
              status={`${formik.touched.email && formik.errors.email ? 'danger' : 'basic'}`}
              caption={() => renderCaption(formik.touched.email, formik.errors.email)}
              style={styles.input}
            />
            <Input
              size="large"
              placeholder="Password"
              secureTextEntry={securePassword}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              status={`${formik.touched.password && formik.errors.password ? 'danger' : 'basic'}`}
              caption={() => renderCaption(formik.touched.password, formik.errors.password)}
              accessoryRight={(props) => renderSecureIcon(securePassword, setSecurePassword, props)}
              style={styles.input}
            />
            {isSignUp && (
              <Input
                size="large"
                placeholder="Confirm your password"
                secureTextEntry={secureCPassword}
                value={formik.values.cPassword}
                onChangeText={formik.handleChange('cPassword')}
                onBlur={formik.handleBlur('cPassword')}
                status={`${
                  formik.touched.cPassword && formik.errors.cPassword ? 'danger' : 'basic'
                }`}
                caption={() => renderCaption(formik.touched.cPassword, formik.errors.cPassword)}
                accessoryRight={(props) =>
                  renderSecureIcon(secureCPassword, setSecureCPassword, props)
                }
                style={styles.input}
              />
            )}
          </Layout>
          <Layout style={styles.footer}>
            <Button size="giant" style={{ width: '100%' }} onPress={formik.handleSubmit}>
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </Button>
            <Button style={{ width: '100%' }} appearance="ghost" onPress={handleChangeScreen}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </Button>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

LoginScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  input: {
    marginBottom: 20,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
  },
})

export default LoginScreen
