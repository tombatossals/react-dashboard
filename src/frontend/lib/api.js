import Horizon from '@horizon/client'

const horizon = Horizon({
  secure: false
})

const init = () => {
  horizon.connect()
}

const getCurrentUser = () => {
  return horizon.currentUser()
}

export default {
  init,
  getCurrentUser,
  horizon
}
