import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Layout, Input, Text, Icon, Button } from '@ui-kitten/components'

import { AuthScreen, SecureIcon } from './partials'
import { useAuth } from '../../context/auth'

const renderCaption = (touched, text) => {
  return touched && text ? (
    <View style={styles.captionContainer}>
      <Text style={styles.captionText} status="danger">
        {text}
      </Text>
    </View>
  ) : null
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters long').required('Required'),
})

const SignUpForm = ({ navigation }) => {
  const [securePassword, setSecurePassword] = useState(true)
  const { signIn } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values
      signIn({ email, password })
      resetForm()
    },
  })

  return (
    <AuthScreen>
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
          accessoryRight={(props) => (
            <SecureIcon
              secureTextEntry={securePassword}
              setSecureTextEntry={setSecurePassword}
              {...props}
            />
          )}
          style={styles.input}
        />
      </Layout>
      <Layout style={styles.footer}>
        <Button size="giant" style={{ width: '100%' }} onPress={formik.handleSubmit}>
          {'SIGN IN'}
        </Button>
        <Button style={{ width: '100%' }} appearance="ghost" onPress={() => navigation.goBack()}>
          {"Don't have an account? Create one"}
        </Button>
      </Layout>
    </AuthScreen>
  )
}

const styles = StyleSheet.create({
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

SignUpForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
}

export default SignUpForm
