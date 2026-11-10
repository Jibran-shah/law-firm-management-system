import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import theme from './theme'
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router}/>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
