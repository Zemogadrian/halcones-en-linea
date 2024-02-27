import { UserTypes } from './types'

const urls = {
  [UserTypes.ADMIN]: '/admin',
  [UserTypes.PROFESSOR]: '/professor',
  [UserTypes.STUDENT]: '/student',
  [UserTypes.COORDINATOR]: '/coordinator'
}

export const foundUserRedirect = (userType: UserTypes) => urls[userType] ?? '/not-found'

export const userHasPermissionToEnter = (userType: UserTypes, pathname: string) => {
  if (userType === UserTypes.ADMIN) return true

  if (userType === UserTypes.PROFESSOR && pathname.startsWith(urls[2])) return true

  if (userType === UserTypes.STUDENT && pathname.startsWith(urls[3])) return true

  if (userType === UserTypes.COORDINATOR && pathname.startsWith(urls[4])) return true

  if (pathname === '/not-found') return true

  return false
}
