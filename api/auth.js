import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.manifest.extra.API_URL

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/auth/login`, { userName: email, password })
    return res.data
  } catch (error) {
    const { response } = error
    throw response.data
  }
}

export const register = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/users`, { email, password })
    return res.data
  } catch (error) {
    const { response } = error
    throw response.data
  }
}
