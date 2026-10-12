import { useEffect, useRef, useState } from 'react'
import { LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearAuthentication, getInitials, getProfileUser, getUserDisplayName } from '../../lib/auth'

export function Navbar({ title = 'Dashboard', subtitle }: { title?: string; subtitle?: string }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(() => getProfileUser())
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  useEffect(() => {
    const refreshUser = () => setUser(getProfileUser())
    window.addEventListener('dashboard-user-updated', refreshUser)
    return () => window.removeEventListener('dashboard-user-updated', refreshUser)
  }, [])

  const logout = () => {
    clearAuthentication()
    navigate('/login', { replace: true })
  }

  return <header className="topbar">
    <button className="mobile-menu" aria-label="Open navigation"><Menu /></button>
    <div className="flex flex-col justify-center">
      <h1 className="leading-tight text-[28px] font-semibold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
    <div className="account-links">
      <div className="gs-menu" ref={menuRef}>
        <button className="gs-trigger" type="button" aria-label="Open account menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span>{user.avatar ? <img src={user.avatar} alt={getUserDisplayName(user)} /> : getInitials(user.firstName, user.lastName)}</span></button>
        {menuOpen && <div className="gs-menu-items" role="menu">
          <button className="gs-theme-action" type="button" role="menuitem" onClick={() => { setDarkMode(!darkMode); setMenuOpen(false) }}>
            {darkMode ? <><Sun aria-hidden="true" /><span>Light Mode</span></> : <><Moon aria-hidden="true" /><span>Dark Mode</span></>}
          </button>
          <button className="gs-logout-action" type="button" role="menuitem" onClick={logout}><LogOut aria-hidden="true" /><span>Logout</span></button>
        </div>}
      </div>
    </div>
  </header>
}
