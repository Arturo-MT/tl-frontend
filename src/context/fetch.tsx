import React, { createContext, FC, ReactNode } from 'react'

import axios, { AxiosInstance } from 'axios'

const FetchContext = createContext({
  client: {} as AxiosInstance,
  publicClient: {} as AxiosInstance
})
const { Provider } = FetchContext

interface FetchProviderInterface {
  children: ReactNode
}

const FetchProvider: FC<FetchProviderInterface> = ({ children }) => {
  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
  })

  const publicAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
  })

  return (
    <Provider value={{ client: authAxios, publicClient: publicAxios }}>
      {children}
    </Provider>
  )
}

const useFetch = () => React.useContext(FetchContext)

// eslint-disable-next-line react-refresh/only-export-components
export { FetchProvider, useFetch }
