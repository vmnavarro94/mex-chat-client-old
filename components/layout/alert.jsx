import { useEffect, useRef } from 'react'
import { StyleSheet, Dimensions, Animated } from 'react-native'
import { Modal, Card, Text } from '@ui-kitten/components'
import { useAlertsContext } from '../../context/ui'

const windowHeight = Dimensions.get('window').height

const Alert = () => {
  const { alert, setAlert } = useAlertsContext()
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    alert.show &&
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(200),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setAlert({ show: false })
      })
  }, [alert.show])

  return (
    <Modal visible={false} style={styles.container}>
      <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [windowHeight, windowHeight / 2 - 45],
              }),
            },
          ],
        }}
      >
        <Card status={alert.type} style={styles.card}>
          <Text style={styles.text}>{alert.text}</Text>
        </Card>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    width: '100%',
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
  },
  card: {
    minHeight: 90,
  },
  text: {
    alignSelf: 'center',
    transform: [{ rotate: '180deg' }],
  },
})

export default Alert
