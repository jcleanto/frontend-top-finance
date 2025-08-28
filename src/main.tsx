import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StateContextProvider } from './context'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      refetchOnWindowFocus: false
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)
