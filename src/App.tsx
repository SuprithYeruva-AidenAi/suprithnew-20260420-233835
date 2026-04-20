import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import CreateAccount from './pages/CreateAccount'
import CreateAccountPassword from './pages/CreateAccountPassword'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-account-password" element={<CreateAccountPassword />} />
        <Route path="/home" element={<div className="min-h-screen flex items-center justify-center text-2xl">Welcome — logged in (placeholder dashboard)</div>} />
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </BrowserRouter>
  )
}
