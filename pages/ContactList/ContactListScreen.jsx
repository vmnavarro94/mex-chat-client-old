import PropTypes from 'prop-types'
import { getContacts } from '../../api/users'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import AppRoutes from '../../navigation/AppRoutes'
import { Layout, Text, List, ListItem, Divider } from '@ui-kitten/components'

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const { token } = user
    if (token) {
      getContacts({ token }).then(({ contacts }) => setContacts(contacts))
    }
  }, [user?.token])

  const renderItem = ({ item }) => {
    const {
      name,
      user: { email },
    } = item
    return (
      <ListItem
        title={name}
        description={email}
        onPress={() => navigation.navigate(AppRoutes.CHAT, { title: name })}
      />
    )
  }

  ListItem.propTypes = {
    item: PropTypes.object,
  }

  return (
    <List
      style={{ flex: 1 }}
      data={contacts}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  )
}

ContactListScreen.propTypes = {
  navigation: PropTypes.object,
}

export default ContactListScreen
