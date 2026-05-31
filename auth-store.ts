'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from './types'
import { mockUsers } from './data'

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (nom: string, email: string, password: string, role: 'client' | 'proprietaire') => Promise<boolean>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      
      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const user = mockUsers.find(u => u.email === email)
        if (user) {
          set({ user, isLoading: false })
          return true
        }
        set({ isLoading: false })
        return false
      },
      
      register: async (nom: string, email: string, _password: string, role: 'client' | 'proprietaire') => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newUser: User = {
          id: `u${Date.now()}`,
          nom,
          email,
          role,
          createdAt: new Date().toISOString().split('T')[0],
        }
        
        mockUsers.push(newUser)
        set({ user: newUser, isLoading: false })
        return true
      },
      
      logout: () => {
        set({ user: null })
      },
      
      setUser: (user) => {
        set({ user })
      },
    }),
    {
      name: 'easyevent-auth',
    }
  )
)
