import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import { Icon } from '@ui-kitten/components'

const SecureIcon = ({ secureTextEntry, setSecureTextEntry, ...props }) => (
  <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  </TouchableWithoutFeedback>
)

SecureIcon.propTypes = {
  secureTextEntry: PropTypes.bool.isRequired,
  setSecureTextEntry: PropTypes.func.isRequired,
}

export default SecureIcon
