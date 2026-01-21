import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './component/index'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import RequestDemo from './pages/RequestDemo'
import CashierDashboard from './pages/CashierDashboard'
import AdminDashboard from './pages/AdminDashboard'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import StoreManagerDashboard from './pages/StoreManagerDashboard'
import BranchManagerDashboard from './pages/BranchManagerDashboard'
import UserDashboard from './pages/UserDashboard'
import PointOfSale from './component/PointOfSale'
import Inventory from './component/Inventory'
import Analytics from './component/Analytics'

const Layout = ({ children, theme, setTheme }) => {
  const location = useLocation();
  // Hide Navbar on dashboard routes
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {!isDashboard && <Navbar theme={theme} setTheme={setTheme} />}
      {children}
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <Router>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/cashier/dashboard" element={<CashierDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/store-manager/dashboard" element={<StoreManagerDashboard />} />
          <Route path="/branch-manager/dashboard" element={<BranchManagerDashboard theme={theme} setTheme={setTheme} />} />
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* Feature Pages */}
          <Route path="/features/point-of-sale" element={<PointOfSale />} />
          <Route path="/features/inventory" element={<Inventory />} />
          <Route path="/features/analytics" element={<Analytics />} />

          {/* Fallback Route: Redirect unknown paths to Home to prevent blank screens */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
