export interface IAuthStore {
  xs: string | null
  refreshToken: string | null
}
export interface IRememberedUserType {
  username: string | null
  rememberMe: boolean | null
}

export interface ILoginRequestBody {
  username: string
  password: string
  grant_type?: string
  rememberMe?: boolean
}

export interface ContainerErrType {
  visible?: boolean | string
}
