import { useState, useEffect } from 'react'

export interface IUser {
  createdAt: string
  email: string
  fullname: string
  id: string
  password: string
  role: string
  updatedAt: string
}

export function useUser() {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Read user data from localStorage
    const storedUser = localStorage.getItem('unsoedfair-user')

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
      }
    }
    setLoading(false)
  }, [])

  return [user, loading]
}
