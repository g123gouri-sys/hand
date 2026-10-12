import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TableList from './pages/Products'
import Typography from './pages/Typography'
import Settings from './pages/Settings'
import UpgradeToPro from './pages/UpgradeToPro'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import { isAuthenticated } from './lib/auth'

function ProtectedRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/table-list" element={<TableList />} />
        <Route path="/Orders" element={<Typography />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Navigate to="/settings" replace />} />
        <Route path="/upgrade-to-pro" element={<UpgradeToPro />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes> 
   </BrowserRouter>
}

export default App
   
