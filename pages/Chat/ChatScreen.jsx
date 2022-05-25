import { Layout, Text } from '@ui-kitten/components'
import { KeyboardAvoidingView, Platform } from 'react-native'

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h1">Chat Room</Text>
      </Layout>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
