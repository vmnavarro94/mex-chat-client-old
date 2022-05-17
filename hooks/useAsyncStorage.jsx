import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsyncStorage = (key) => {
  const [storedData, setStoredData] = useState(null)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(key, value)
      setStoredData(value)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const storageValue = await AsyncStorage.getItem(key)
        if (storageValue !== null) {
          setStoredData(storageValue)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getData()
  }, [key])

  return [storedData, storeData]
}

export default useAsyncStorage
