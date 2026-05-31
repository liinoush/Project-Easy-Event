'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/auth-store'
import { formatPrice, mockReservations, getTypeVersementLabel } from '@/lib/data'
import type { Salle, TypeVersement } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BookingModalProps {
  salle: Salle
  trigger?: React.ReactNode
}

export function BookingModal({ salle, trigger }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [typeVersement, setTypeVersement] = useState<TypeVersement>('50_50')
  const { user } = useAuthStore()
  const router = useRouter()

  // Get booked dates for this venue
  const bookedDates = mockReservations
    .filter(r => r.salleId === salle.id && r.statut !== 'annule')
    .map(r => new Date(r.date))

  const isDateBooked = (day: Date) => {
    return bookedDates.some(
      bookedDate => 
        bookedDate.getDate() === day.getDate() &&
        bookedDate.getMonth() === day.getMonth() &&
        bookedDate.getFullYear() === day.getFullYear()
    )
  }

  const handleBooking = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour reserver')
      router.push('/connexion')
      return
    }

    if (!date) {
      toast.error('Veuillez selectionner une date')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add to mock reservations
    const reservationId = `r${Date.now()}`
    mockReservations.push({
      id: reservationId,
      userId: user.id,
      salleId: salle.id,
      date: format(date, 'yyyy-MM-dd'),
      statut: 'en_attente',
      createdAt: new Date().toISOString().split('T')[0],
    })

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setIsOpen(false)
      setIsSuccess(false)
      setDate(undefined)
      toast.success('Reservation envoyee avec succes!')
      // Redirect to payments page
      setTimeout(() => router.push('/paiements'), 500)
    }, 1500)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsSuccess(false)
      setDate(undefined)
    }
    setIsOpen(open)
  }

  // Calculate installments
  const getInstallments = () => {
    switch (typeVersement) {
      case '50_50':
        return [
          { label: 'Acompte', percent: 50 },
          { label: 'Solde', percent: 50 }
        ]
      case 'tiers':
        return [
          { label: 'Versement 1/3', percent: 33 },
          { label: 'Versement 2/3', percent: 33 },
          { label: 'Versement 3/3', percent: 34 }
        ]
      default:
        return []
    }
  }

  const installments = getInstallments()

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="w-full">
            Reserver cette salle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reservation envoyee!</h3>
            <p className="text-muted-foreground">
              Votre demande de reservation a ete envoyee au proprietaire. Vous recevrez une confirmation sous peu.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reserver {salle.nom}</DialogTitle>
              <DialogDescription>
                Selectionnez une date et votre mode de versement
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date de l&apos;evenement</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, 'PPP', { locale: fr })
                      ) : (
                        'Choisir une date'
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) => 
                        day < new Date() || isDateBooked(day)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">
                  Les dates en gris sont deja reservees ou passees.
                </p>
              </div>

              {/* Payment Plan Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Plan de versement</label>
                <RadioGroup value={typeVersement} onValueChange={(value: any) => setTypeVersement(value)}>
                  <div className="space-y-2">
                    {/* 50/50 Option */}
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => setTypeVersement('50_50')}
                    >
                      <RadioGroupItem value="50_50" id="plan-50" />
                      <Label htmlFor="plan-50" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">50% à la confirmation, 50% avant l&apos;événement</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice((salle.prix / 2))} maintenant, {formatPrice((salle.prix / 2))} plus tard
                          </p>
                        </div>
                      </Label>
                    </div>

                    {/* 1/3 Option */}
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => setTypeVersement('tiers')}
                    >
                      <RadioGroupItem value="tiers" id="plan-tiers" />
                      <Label htmlFor="plan-tiers" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">Versement en 3 fois</p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(Math.round(salle.prix / 3))} × 3 versements
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Installment Preview */}
              {installments.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Détail des versements</p>
                  <div className="space-y-1">
                    {installments.map((inst, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{inst.label}</span>
                        <span className="font-semibold text-primary">
                          {formatPrice(Math.round((salle.prix * inst.percent) / 100))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salle</span>
                  <span className="font-medium">{salle.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacite</span>
                  <span>{salle.capacite} personnes</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-muted-foreground">Prix total</span>
                  <span className="font-bold text-primary">{formatPrice(salle.prix)}</span>
                </div>
              </div>

              <Button 
                onClick={handleBooking} 
                className="w-full" 
                disabled={!date || isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la reservation'}
              </Button>

              {!user && (
                <p className="text-xs text-center text-muted-foreground">
                  Vous devez etre connecte pour reserver.{' '}
                  <button 
                    onClick={() => router.push('/connexion')}
                    className="text-primary hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
