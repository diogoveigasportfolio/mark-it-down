import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
  return <RouterProvider router={router} />
}

export default App
