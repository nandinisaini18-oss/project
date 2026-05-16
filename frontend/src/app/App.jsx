import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { routes } from './app.routes'
import "./App.css"

function App() {
  return (
      <RouterProvider router={routes} />
  )
}

export default App
