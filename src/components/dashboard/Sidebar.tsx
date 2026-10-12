import { CircleUserRound, ClipboardList, LayoutDashboard, Rocket, Settings, ShoppingCart, Sparkles } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [[LayoutDashboard, 'Dashboard', '/'],
 [CircleUserRound, 'User Profile', '/user-profile'], 
 [ClipboardList, 'Products', '/table-list'],
 [ShoppingCart, 'Orders', '/orders'], 
 [Settings, 'Settings', '/settings']] as const

export function Sidebar() {
  const navigate = useNavigate()
  return <aside className="sidebar">
    <div className="brand"><Sparkles size={39} strokeWidth={1.6} />
     <span>CREATIVE TIM</span>
    </div>
    <nav className="side-nav">{navItems.map(([Icon, label, path]) =>
      <NavLink key={label} to={path} end={path === '/'} className={({ isActive }) => `nav-item ${label === 'Orders' ? 'orders-nav-item' : ''} ${isActive ? 'active' : ''}`}><Icon /><span>{label}</span></NavLink>
    )}</nav>
    <button className="upgrade" onClick={() => navigate('/upgrade-to-pro')}><Rocket />
     <span>UPGRADE TO PRO</span>
    </button>
  </aside>
}
