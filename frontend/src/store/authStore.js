import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      },
      isAuthenticated: () => !!get().token,
      hasRole: (roles) => {
        const user = get().user
        return user ? roles.includes(user.role) : false
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
