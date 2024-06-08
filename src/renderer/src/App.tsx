import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Toaster from './components/Toaster'
import Home from './pages/Home'
import Settings from './pages/Settings'
import ErrorPage from './error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/settings',
    element: <Settings />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
