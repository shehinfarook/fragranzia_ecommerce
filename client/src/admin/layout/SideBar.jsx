import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { label: '📊 Dashboard', path: '/admin/dashboard' },
  { label: '🛍️ Products', path: '/admin/products' },
  { label: '➕ Add Product', path: '/admin/products/add' },
  { label: '📁 Categories', path: '/admin/categories' },
  { label: '🎁 Offers', path: '/admin/offers' },
  { label: '📦 Orders', path: '/admin/orders' },
]

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const linkStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '8px',
    background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
    transition: 'all 0.3s ease',
    fontWeight: isActive ? '600' : '400',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  })

  return (
    <div style={{ width: '260px', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', color: '#fff', padding: '24px', height: '100vh', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', textAlign: 'center', borderRadius: '12px', padding: '16px', marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Admin Panel</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {links.map(({ label, path }) => (
          <NavLink key={path} to={path} style={({ isActive }) => linkStyle(isActive)}>
            {label}
          </NavLink>
        ))}
      </nav>

      <button onClick={handleLogout} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'none', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        🚪 Logout
      </button>
    </div>
  )
}

export default Sidebar
