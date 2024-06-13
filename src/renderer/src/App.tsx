import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Toaster from './components/Toaster'
import Home from './pages/Home'
import Settings from './pages/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
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
