import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsyncStorage = (key) => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log(error)
    }
  }
  const getStoredData = async () => {
    try {
      const storageValue = await AsyncStorage.getItem(key)
      return storageValue
    } catch (e) {
      console.error(e)
    }
  }

  return [getStoredData, storeData]
}

export default useAsyncStorage
