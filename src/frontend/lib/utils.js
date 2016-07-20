import { UserStatus } from './constants'

export const isAnonymous = (user) => {
  return user.status === UserStatus.ANONYMOUS
}

export const isAuthenticated = (user) => {
  return user.status === UserStatus.AUTHENTICATED
}
