import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const ADMIN_EMAIL = 'aliahmad071205@gmail.com'
const ADMIN_PASS = 'aliahmad001'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for existing session
    const session = localStorage.getItem('portfolio_admin_session')
    if (session === 'active') {
      setUser({ email: ADMIN_EMAIL })
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setUser({ email: ADMIN_EMAIL })
      localStorage.setItem('portfolio_admin_session', 'active')
      return true
    } else {
      throw new Error('Invalid email or password. Please try again.')
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('portfolio_admin_session')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
