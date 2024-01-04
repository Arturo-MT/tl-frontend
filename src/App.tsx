import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { FetchProvider } from './context/fetch'
import Home from 'pages/home'
import MainLayout from './containers/main-layout'

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
      <FetchProvider>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </MainLayout>
        </QueryClientProvider>
      </FetchProvider>
    </Router>
  )
}
