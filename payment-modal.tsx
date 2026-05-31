'use client'

import { useState } from 'react'
import { CreditCard, Loader } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/data'
import type { Versement } from '@/lib/types'

interface PaymentModalProps {
  versement: Versement
  trigger?: React.ReactNode
  onPaymentSuccess?: () => void
}

export function PaymentModal({ versement, trigger, onPaymentSuccess }: PaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'carte' | 'virement' | 'cheque'>('carte')
  const [cardData, setCardData] = useState({
    numero: '',
    nom: '',
    expiry: '',
    cvc: '',
  })

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === 'carte') {
      if (!cardData.numero || !cardData.nom || !cardData.expiry || !cardData.cvc) {
        toast.error('Veuillez remplir tous les champs')
        return
      }

      if (cardData.numero.length < 13) {
        toast.error('Numéro de carte invalide')
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsOpen(false)

    // Reset form
    setCardData({ numero: '', nom: '', expiry: '', cvc: '' })

    toast.success('Paiement effectué avec succès!')
    onPaymentSuccess?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Effectuer le paiement
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paiement sécurisé</DialogTitle>
          <DialogDescription>
            Versement de {formatPrice(versement.montant)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePaymentSubmit} className="space-y-6 py-4">
          {/* Amount Display */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Montant à payer</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(versement.montant)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="method">Méthode de paiement</Label>
            <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Sélectionner une méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carte">Carte bancaire</SelectItem>
                <SelectItem value="virement">Virement bancaire</SelectItem>
                <SelectItem value="cheque">Chèque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'carte' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.numero}
                  onChange={(e) =>
                    setCardData({ ...cardData, numero: e.target.value.replace(/\s/g, '') })
                  }
                  maxLength={16}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nom du titulaire</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardData.nom}
                  onChange={(e) => setCardData({ ...cardData, nom: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Date d&apos;expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    type="password"
                    value={cardData.cvc}
                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer Info */}
          {paymentMethod === 'virement' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm space-y-2 text-blue-900">
              <p className="font-semibold">Détails de virement:</p>
              <p>Bénéficiaire: EasyEvent Annaba</p>
              <p>IBAN: DZ58 0000 1234 5678 9012 34</p>
              <p>BIC: BALADZ22</p>
              <p className="text-xs">Veuillez communiquer votre numéro de réservation en référence</p>
            </div>
          )}

          {/* Check Info */}
          {paymentMethod === 'cheque' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-2 text-amber-900">
              <p className="font-semibold">Paiement par chèque:</p>
              <p>Veuillez faire un chèque à l&apos;ordre de: <span className="font-semibold">EasyEvent Annaba</span></p>
              <p>Adresse: Avenue Larbi Ben M&apos;hidi, Annaba 23000</p>
              <p className="text-xs">Merci d&apos;indiquer votre numéro de réservation au dos du chèque</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isProcessing} className="flex-1">
              {isProcessing ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Confirmer le paiement
                </>
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-center text-muted-foreground">
            <p>🔒 Paiement sécurisé et crypté</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
