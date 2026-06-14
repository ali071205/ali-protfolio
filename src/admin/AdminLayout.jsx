import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const adminNav = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/admin/projects', label: 'Projects', icon: 'work' },
  { path: '/admin/skills', label: 'Skills', icon: 'psychology' },
  { path: '/admin/about', label: 'About', icon: 'person' },
]

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    if (!loading && !user) navigate('/admin')
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary-fixed-dim text-4xl animate-spin-slow">progress_activity</span>
          <p className="font-inter text-on-surface-variant">Loading system...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <div className="w-8 h-8 rounded-full border border-primary-container/30 cursor-pointer active:scale-95 transition-transform flex items-center justify-center bg-surface-container-low">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">home</span>
            </div>
          </Link>
          <span className="font-headline-md text-headline-md tracking-tighter text-on-background">ADMIN</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={signOut} className="text-on-surface-variant hover:text-error transition-colors text-sm font-label-caps uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </header>

      {/* Side Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full z-40 bg-surface-container-low border-r border-white/10 w-72 pt-24 pb-8">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg object-cover bg-surface-container flex items-center justify-center text-primary-fixed-dim">
              <span className="material-symbols-outlined text-3xl">shield_person</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary-fixed-dim leading-none">A. Ahmad</h3>
              <p className="font-label-caps text-[10px] text-primary-container mt-1">System Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {adminNav.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 transition-all ${
                  isActive
                    ? 'text-primary-fixed-dim font-bold border-l-4 border-primary-fixed-dim bg-white/5'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-8 pt-8 border-t border-white/5">
          <div className="glass-card p-4 rounded-xl border-primary-container/10">
            <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 font-bold uppercase tracking-widest">SYSTEM LOAD</p>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-[42%] shadow-[0_0_8px_rgba(0,255,170,0.4)]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 md:pl-80 md:pr-12 md:pt-28 min-h-screen">
        <Outlet />
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-4 bg-surface-container/90 backdrop-blur-xl border-t border-white/5 rounded-t-3xl shadow-[0_-4px_24px_rgba(0,255,170,0.1)] md:hidden">
        {adminNav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container rounded-full shadow-[0_0_15px_rgba(0,255,170,0.3)]'
                  : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
