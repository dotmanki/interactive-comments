'use client'

import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User } from '../models/user'

interface AuthContextProps {
  currentUser: User | null
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state: user, setState: setUser } = useLocalStorage<User | null>(
    'user',
    null,
  )
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth`, {
          cache: 'no-cache',
        })
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [setUser])

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {children}
    </AuthContext.Provider>
  )
}
