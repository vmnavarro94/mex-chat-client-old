import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Layout, Input, Text, Icon, Button } from '@ui-kitten/components'

import { AuthScreen, SecureIcon } from './partials'
import { useAuth } from '../../context/auth'
import AppRoutes from '../../navigation/AppRoutes'

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
  name: Yup.string().min(3, 'Must be at least 3 characters long').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters long').required('Required'),
  cPassword: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const SignUpForm = ({ navigation }) => {
  const [securePassword, setSecurePassword] = useState(true)
  const [secureCPassword, setSecureCPassword] = useState(true)
  const { signUp } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      cPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { name, email, password } = values
      const callback = () => navigation.push('Login', { variant: 'signIn' })
      signUp({ name, email, password, callback })
      resetForm()
    },
  })

  return (
    <AuthScreen>
      <Layout style={styles.content}>
        <Input
          size="large"
          placeholder="Name (ie. Mary Sue)"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          accessoryRight={(props) => <Icon {...props} name="person" />}
          autoCapitalize="none"
          status={`${formik.touched.name && formik.errors.name ? 'danger' : 'basic'}`}
          caption={() => renderCaption(formik.touched.name, formik.errors.name)}
          style={styles.input}
        />
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
        <Input
          size="large"
          placeholder="Confirm your password"
          secureTextEntry={secureCPassword}
          value={formik.values.cPassword}
          onChangeText={formik.handleChange('cPassword')}
          onBlur={formik.handleBlur('cPassword')}
          status={`${formik.touched.cPassword && formik.errors.cPassword ? 'danger' : 'basic'}`}
          caption={() => renderCaption(formik.touched.cPassword, formik.errors.cPassword)}
          accessoryRight={(props) => {
            return (
              <SecureIcon
                secureTextEntry={secureCPassword}
                setSecureTextEntry={setSecureCPassword}
                {...props}
              />
            )
          }}
          style={styles.input}
        />
      </Layout>
      <Layout style={styles.footer}>
        <Button size="giant" style={{ width: '100%' }} onPress={formik.handleSubmit}>
          {'SIGN UP'}
        </Button>
        <Button
          style={{ width: '100%' }}
          appearance="ghost"
          onPress={() => navigation.push(AppRoutes.SIGN_IN)}
        >
          {'Already have an account? Sign In'}
        </Button>
      </Layout>
    </AuthScreen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 40,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {
    marginBottom: 10,
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
    push: PropTypes.func.isRequired,
  }),
}

export default SignUpForm
