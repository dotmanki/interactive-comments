'use client'

import { AuthProvider } from '../context/AuthContext'
import { User } from '../models/user'

const UserContainer = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: User
}) => {
  return <AuthProvider value={{ currentUser: value }}>{children}</AuthProvider>
}

export default UserContainer
