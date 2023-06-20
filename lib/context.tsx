import { ReactNode, createContext, useEffect, useState } from 'react'
import { IUser } from './useUser'

// Define the shape of your context value

interface ContextProviderProps {
  children: ReactNode
}
interface ContextValue {
  user: IUser | null
  loading: boolean
  updateUser: (newUser: IUser | null) => void
  destroyUser: () => void
}

// Create the context
export const AppContext = createContext<ContextValue>({
  user: null,
  loading: true,
  updateUser: () => {},
  destroyUser: () => {},
})

// Create a provider component
export const ContextProvider: React.FC<ContextProviderProps> = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Read user data from localStorage
    const storedUser = localStorage.getItem('unsoedfair-user')
    // console.log('user ', storedUser)

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

  const updateUser = (newUser: IUser | null) => {
    setUser(newUser)
    // Update localStorage with the new user data
    localStorage.setItem('unsoedfair-user', JSON.stringify({ ...newUser }))
  }
  const destroyUser = () => {
    setUser(null)
    // Update localStorage with the new user data
    localStorage.removeItem('unsoedfair-user')
  }

  const contextValue: ContextValue = {
    user,
    loading,
    updateUser,
    destroyUser,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
