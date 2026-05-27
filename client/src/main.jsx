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

const router = createBrowserRouter([
  {
    path: '/rooms',
    element: <RoomSelectionPage />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:roomId',
    element: <App />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)

