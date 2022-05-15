import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Layout, Input, Button, Icon } from '@ui-kitten/components'

const renderSecureIcon = (secureTextEntry, setSecureTextEntry, props) => (
  <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
)

const LoginScreen = () => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [securePassword, setSecurePassword] = useState(true)
  const [secureCPassword, setSecureCPassword] = useState(true)

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <Input
        placeholder="your@mail.com"
        value={mail}
        onChangeText={setMail}
        accessoryRight={(props) => <Icon {...props} name="email" />}
      />
      <Input
        placeholder="Password"
        secureTextEntry={securePassword}
        value={password}
        accessoryRight={(props) => renderSecureIcon(securePassword, setSecurePassword, props)}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirm your password"
        secureTextEntry={secureCPassword}
        value={cPassword}
        accessoryRight={(props) => renderSecureIcon(secureCPassword, setSecureCPassword, props)}
        onChangeText={setCPassword}
      />
      <Button size="giant" style={{ width: '100%' }}>
        SIGN UP
      </Button>
      <Button style={{ width: '100%' }} appearance="ghost">
        Already have an account? Sign In
      </Button>
    </Layout>
  )
}

export default LoginScreen
