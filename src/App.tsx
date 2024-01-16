import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { FetchProvider } from './context/fetch'
import { AuthProvider } from './context/auth'

import MainLayout from 'containers/main-layout'
import Home from 'pages/home'
import Login from 'pages/login'
import StoreDetails from 'pages/store-details'

const { VITE_REACT_APP_API_URL } = import.meta.env

console.info(VITE_REACT_APP_API_URL)

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <QueryClientProvider client={queryClient}>
            <MainLayout>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<div>404</div>} />
                <Route path='/login' element={<Login />} />
                <Route path='/:store' element={<StoreDetails />} />
              </Routes>
            </MainLayout>
          </QueryClientProvider>
        </FetchProvider>
      </AuthProvider>
    </Router>
  )
}
