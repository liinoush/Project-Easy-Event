'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Salle } from './types'
import { mockSalles } from './data'

interface SalleStore {
  salles: Salle[]
  addSalle: (salle: Salle) => void
  getSallesByProprietaire: (proprietaireId: string) => Salle[]
  updateSalle: (id: string, updates: Partial<Salle>) => void
  deleteSalle: (id: string) => void
}

export const useSalleStore = create<SalleStore>()(
  persist(
    (set, get) => ({
      salles: mockSalles,
      
      addSalle: (salle: Salle) => {
        set((state) => ({
          salles: [...state.salles, salle]
        }))
      },

      getSallesByProprietaire: (proprietaireId: string) => {
        const state = get()
        return state.salles.filter(s => s.proprietaireId === proprietaireId)
      },

      updateSalle: (id: string, updates: Partial<Salle>) => {
        set((state) => ({
          salles: state.salles.map(s =>
            s.id === id ? { ...s, ...updates } : s
          )
        }))
      },

      deleteSalle: (id: string) => {
        set((state) => ({
          salles: state.salles.filter(s => s.id !== id)
        }))
      },
    }),
    {
      name: 'easyevent-salles',
    }
  )
)
