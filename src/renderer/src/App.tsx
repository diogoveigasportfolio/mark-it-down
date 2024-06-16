import { createHashRouter, RouterProvider } from 'react-router-dom'

import Toaster from './components/Toaster'
import Error from './pages/Error'
import Home from './pages/Home'
import Settings from './pages/Settings'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
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
