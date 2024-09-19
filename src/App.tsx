import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Home, Login, Registration, Leads, Profile } from './pages'

function App() {
  const ProtectedRoute = () => {
    const checkAuthCookies = Cookies.get('Authorization')
    if (!checkAuthCookies) {
      alert('Autenticação necessária')
      return <Navigate to="/" replace />
    }

    return <Outlet />
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/perfil" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
