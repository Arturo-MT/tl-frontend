import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen bg-black dark">
        <h1 className="text-white">Hello World</h1>
      </div>
    </QueryClientProvider>
  )
}
