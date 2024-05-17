import { LocalStorage } from '@/core/constants'
import { IAuthStore, IRememberedUserType } from '@/core/types/auth.types'

export const getStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export const getParsedStorage = (key: LocalStorage) => {
  const value = window.localStorage.getItem(key)
  try {
    if (value) {
      const parsedStorage = JSON.parse(value)
      return parsedStorage
    }
    return null
  } catch (error) {
    return null
  }
}

export const setStorage = (key: LocalStorage, data: string) => {
  window.localStorage.setItem(key, data)
}

export const getAuthFromStorage = (): IAuthStore | null => {
  return getParsedStorage(LocalStorage.AUTH)
}
export const getRememberedUserFromStorage = (): IRememberedUserType | null => {
  return getParsedStorage(LocalStorage.REMEMBEREDUSER)
}

export const clearStorage = () => {
  // window.localStorage.clear()
  localStorage.removeItem('auth')
}

export const clearRememberedUser = () => {
  localStorage.removeItem('rememberedUser')
}

export const rememberMeHandler = (rememberStatus: boolean | undefined, username: string) => {
  if (rememberStatus === true) {
    setStorage(
      LocalStorage.REMEMBEREDUSER,
      JSON.stringify({
        username,
      }),
    )
  } else {
    clearRememberedUser()
  }
}