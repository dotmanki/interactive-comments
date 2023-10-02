import { createContext } from 'react'
import { User } from '../models/user'

interface AuthContextValue {
  currentUser: User | null
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
})

export const AuthProvider = AuthContext.Provider
