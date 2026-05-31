'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, DollarSign, Star } from 'lucide-react'
import type { Salle, Reservation } from '@/lib/types'

interface SalleStatsProps {
  salles: Salle[]
  reservations: Reservation[]
}

export function SalleStats({ salles, reservations }: SalleStatsProps) {
  const confirmedReservations = reservations.filter(r => r.statut === 'confirmee')
  const totalRevenue = confirmedReservations.reduce((sum, r) => sum + r.prixTotal, 0)
  const avgRating = salles.length > 0 
    ? (salles.reduce((sum, s) => sum + s.note, 0) / salles.length).toFixed(1)
    : 0

  const stats = [
    {
      label: 'Mes salles',
      value: salles.length,
      icon: Building2,
      color: 'bg-blue-100 text-blue-900'
    },
    {
      label: 'Réservations',
      value: confirmedReservations.length,
      icon: Users,
      color: 'bg-green-100 text-green-900'
    },
    {
      label: 'Revenu',
      value: `${totalRevenue.toLocaleString('fr-DZ')} DA`,
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-900'
    },
    {
      label: 'Note moyenne',
      value: avgRating,
      icon: Star,
      color: 'bg-purple-100 text-purple-900'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
