import { Modal, Spinner } from '@ui-kitten/components'
import { useLoadingScreenContext } from '../../context/ui'

const LoadingScreen = () => {
  const { show } = useLoadingScreenContext()
  return (
    <Modal visible={show} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Spinner size="giant" />
    </Modal>
  )
}

export default LoadingScreen
