import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Fallback from './fallback/fallback.jsx'
import './index.css'
import { PassphrasePage } from './components/auth/PassphrasePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    element: <PassphrasePage />,
  },
  {
    path: '*',
    element: <Fallback />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)
