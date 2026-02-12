import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Fallback from './fallback/fallback.jsx'
import './index.css'
import { PassphrasePage } from './components/auth/PassphrasePage'
import { RoomSelectionPage } from './components/rooms/RoomSelectionPage'
import { getToken } from './utils/api'
import { useNavigate } from 'react-router-dom'

function AuthGuard({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/auth" replace />
  return children
}

function GuestGuard({ children }) {
  const token = getToken()
  if (token) {
    return <Navigate to="/rooms" replace />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/rooms',
    element: <AuthGuard><RoomSelectionPage /></AuthGuard>,
  },
  {
    path: '/',
    element: <AuthGuard><App /></AuthGuard>,
  },
  {
    path: '/:roomId',
    element: <AuthGuard><App /></AuthGuard>,
  },
  {
    path: '/auth',
    element: <GuestGuard><PassphrasePage /></GuestGuard>,
  },
  {
    path: '*',
    element: <GuestGuard><Fallback /></GuestGuard>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)

