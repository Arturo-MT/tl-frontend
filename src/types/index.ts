export interface StoreInterface {
  id: string
  name: string
  logo: string
}

export interface LoginFormValues {
  username: string
  password: string
  email?: string
}

export interface StateType {
  user: UserType | null
  loading: boolean
  loginError: string | null
}

export interface UserType {
  username: string
  access: string
  refresh: string
}

export type ActionType =
  | { type: 'FETCH_USER' }
  | { type: 'SET_USER'; payload: { user: UserType } }
  | { type: 'REMOVE_USER' }
  | {
      type: 'SET_LOGIN_ERROR'
      payload: { loginError: string | null }
    }

export interface AuthContextType {
  loginWithPassword: (values: LoginFormValues) => Promise<void>
  logout: () => void
  user: UserType | null
  loading: boolean
  renewToken: () => Promise<void>
  loginError: string | null
  registerUser: (values: LoginFormValues) => Promise<void>
}
