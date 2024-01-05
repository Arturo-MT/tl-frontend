import React, { useMemo, useReducer, useEffect, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

import { omitNull } from './utils'
import { ActionType, AuthContextType, StateType, UserType } from '@/src/types'

const AuthContext = React.createContext({} as AuthContextType)
const USER_STORAGE_KEY = 'TL_USER'
const API_URL = import.meta.env.VITE_REACT_APP_API_URL

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, user: null, loading: true }
    case 'SET_USER':
      return { ...state, user: action.payload.user, loading: false }
    case 'REMOVE_USER':
      localStorage.removeItem(USER_STORAGE_KEY)
      return { ...state, user: null, loading: false }
    default:
      throw new Error('Action not supported')
  }
}

const initialState: AuthContextType = {
  user: null,
  loginWithPassword: async () => {},
  logout: () => {},
  loading: true,
  renewToken: async () => {}
}

interface AuthProviderInterface {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  function handleUser(res: AxiosResponse) {
    if (!res.data) {
      console.error('Response is null')
      return
    }

    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    const parsedUser = storedUser ? JSON.parse(storedUser) : {}

    const user: UserType = {
      ...parsedUser,
      ...res.data
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    dispatch({ type: 'SET_USER', payload: { user } })
  }

  const loginWithPassword = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      const res = await axios.post(`${API_URL}/token/`, {
        username,
        password
      })
      handleUser(res)
      console.info('User logged in')
    },
    []
  )

  const renewToken = useCallback(async () => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    const user = { ...omitNull(parsedUser) }

    if (!storedUser)
      throw new Error('Tried to refresh the token but there is no user saved')

    try {
      const result = await axios.post(`${API_URL}/token/refresh/`, {
        refresh_token: user.refresh_token
      })
      handleUser(result)
    } catch (error) {
      dispatch({ type: 'REMOVE_USER' })
      return await Promise.reject(error)
    }
  }, [])

  const verifyToken = useCallback(async (accessToken: string) => {
    if (accessToken) {
      try {
        await axios.post(`${API_URL}/token/verify/`, { token: accessToken })
        return true
      } catch (error) {
        return false
      }
    }
  }, [])

  const validateUser = useCallback(async () => {
    const storedUserString = localStorage.getItem(USER_STORAGE_KEY)
    if (!storedUserString) {
      dispatch({ type: 'REMOVE_USER' })
      return
    }

    let user
    try {
      user = JSON.parse(storedUserString) as UserType
    } catch (e) {
      console.warn('Failed parsing user token')
      dispatch({ type: 'REMOVE_USER' })
      return
    }

    const isAccessTokenValid = await verifyToken(user.access)
    if (isAccessTokenValid) {
      dispatch({ type: 'SET_USER', payload: { user } })
      return
    }

    const isRefreshTokenValid = await verifyToken(user.refresh)
    if (isRefreshTokenValid) {
      console.info('Access token expired, refresh token still valid')
      return renewToken()
    }

    console.info('Both access and refresh tokens are expired')
    dispatch({ type: 'REMOVE_USER' })
  }, [renewToken, verifyToken])

  useEffect(() => {
    validateUser()
  }, [validateUser])

  const logout = useCallback(() => {
    dispatch({ type: 'REMOVE_USER' })
    navigate('/')
  }, [navigate])

  const value = useMemo(() => {
    return {
      user: state.user,
      loginWithPassword,
      logout,
      renewToken,
      loading: state.loading
    }
  }, [state.user, state.loading, renewToken, logout, loginWithPassword])

  if (state.loading) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
