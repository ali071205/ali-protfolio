import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('aliahmad071205@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md z-10 relative">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-primary-container/30 bg-white/5 mb-6 mint-glow">
            <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-4xl text-primary-fixed-dim tracking-tight">System Auth</h1>
          <p className="font-body-md text-on-surface-variant mt-2">Identify yourself to access the control panel</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 border border-primary-container/20">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-container/20 border border-error/50 flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-xl">error</span>
              <p className="font-body-md text-sm text-error">{error}</p>
            </div>
          )}

          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label htmlFor="login-email" className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">mail</span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="form-input bg-background/50 focus:bg-background pl-12"
                  placeholder="admin@domain.com"
                />
              </div>
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label htmlFor="login-password" className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">
                Passphrase
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">key</span>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="form-input bg-background/50 focus:bg-background pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-5 mt-4 bg-primary-container text-on-primary-container font-label-caps tracking-widest uppercase rounded-2xl
                hover:brightness-110 mint-glow transition-all active:scale-[0.98] disabled:opacity-70
                flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin-slow text-xl">progress_activity</span>
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  AUTHORIZE ACCESS
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
              RESTRICTED ACCESS AREA • SYSTEM V2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
