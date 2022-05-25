import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.manifest.extra.API_URL

export const getUser = async ({ id, token }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/v1/profiles/user/${id}`, config)
    return res.data
  } catch (error) {
    const { response } = error
    throw response.error
  }
}

export const getContacts = async ({ token }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/v1/profiles/contacts`, config)
    return res.data
  } catch (error) {
    const { response } = error
    throw response.error
  }
}
