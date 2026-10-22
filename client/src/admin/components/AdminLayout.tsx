import { useState } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'

const navItems = [
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/brands', label: 'Brands' },
  { to: '/admin/videos', label: 'Videos' },
  { to: '/admin/deal', label: 'Deal of the week' },
  { to: '/admin/settings', label: 'Shop settings' },
]

export default function AdminLayout() {
  const { authenticated, logout } = useAdminAuth()
  const [navOpen, setNavOpen] = useState(false)

  if (authenticated === null) {
    return <div className="flex min-h-screen items-center justify-center text-text-muted">Loading…</div>
  }

  if (authenticated === false) {
    return <Navigate to="/admin/login" replace />
  }

  const sidebar = (
    <>
      <div className="flex items-center gap-2 border-b border-border px-5 py-5">
        <img src="/brand/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
        <div>
          <p className="font-extrabold text-navy">Smart Arada</p>
          <p className="text-xs text-text-muted">Admin</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setNavOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-navy text-white' : 'text-text-secondary hover:bg-bg-light'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-bg-light"
        >
          View site ↗
        </a>
        <button
          type="button"
          onClick={() => logout()}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-bg-light"
        >
          Log out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col bg-bg-light lg:flex-row">
      <header className="flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/brand/logo-icon.png" alt="" className="h-7 w-7 object-contain" />
          <span className="font-extrabold text-navy">Smart Arada Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setNavOpen((v) => !v)}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-navy"
        >
          {navOpen ? '✕' : '☰'}
        </button>
      </header>

      {navOpen && (
        <div className="flex flex-col border-b border-border bg-white lg:hidden">{sidebar}</div>
      )}

      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-white lg:flex">
        {sidebar}
      </aside>

      <main className="flex-1 overflow-x-auto p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
