import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import { RoomSelectionPage } from './components/rooms/RoomSelectionPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/rooms" replace />, 
  },
  {
    path: '/rooms',
    element: <RoomSelectionPage />,
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
