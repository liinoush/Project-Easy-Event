'use client'

import { CheckCircle2, Clock, AlertCircle, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatPrice, getTypeVersementLabel, getStatutPaiementLabel } from '@/lib/data'
import type { Paiement } from '@/lib/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface PaymentDetailProps {
  paiement: Paiement
  onPaymentClick?: () => void
}

export function PaymentDetail({ paiement, onPaymentClick }: PaymentDetailProps) {
  const progressPercent = (paiement.montantPaye / paiement.montantTotal) * 100

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'paye':
        return 'bg-green-100 text-green-800'
      case 'partiel':
        return 'bg-yellow-100 text-yellow-800'
      case 'en_attente':
        return 'bg-blue-100 text-blue-800'
      case 'annule':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getVersementIcon = (statut: string) => {
    switch (statut) {
      case 'paye':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'en_attente':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'annule':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paiement
            </CardTitle>
            <CardDescription>
              {getTypeVersementLabel(paiement.typeVersement)}
            </CardDescription>
          </div>
          <Badge className={getStatutColor(paiement.statut)}>
            {getStatutPaiementLabel(paiement.statut)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progression du paiement</span>
            <span className="font-semibold">
              {formatPrice(paiement.montantPaye)} / {formatPrice(paiement.montantTotal)}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {Math.round(progressPercent)}% payé
          </p>
        </div>

        {/* Payment Breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Montant total</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(paiement.montantTotal)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Payé</p>
            <p className="text-lg font-bold text-green-600">
              {formatPrice(paiement.montantPaye)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Restant</p>
            <p className="text-lg font-bold text-yellow-600">
              {formatPrice(paiement.montantTotal - paiement.montantPaye)}
            </p>
          </div>
        </div>

        {/* Installments */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Détail des versements</h4>
          <div className="space-y-2">
            {paiement.versements.map((versement, index) => (
              <div
                key={versement.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getVersementIcon(versement.statut)}
                  <div>
                    <p className="text-sm font-medium">{versement.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Échéance: {format(new Date(versement.dateEcheance), 'dd MMM yyyy', { locale: fr })}
                    </p>
                    {versement.datePaiement && (
                      <p className="text-xs text-green-600">
                        Payé le: {format(new Date(versement.datePaiement), 'dd MMM yyyy', { locale: fr })}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPrice(versement.montant)}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {versement.statut === 'paye' ? '✓ Payé' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {paiement.statut !== 'paye' && (
          <Button className="w-full" onClick={onPaymentClick}>
            <CreditCard className="h-4 w-4 mr-2" />
            Payer le versement suivant
          </Button>
        )}

        {paiement.statut === 'paye' && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✓ Tous les versements ont été effectués
            </p>
          </div>
        )}

        {/* Method Info */}
        {paiement.methode && (
          <div className="pt-3 border-t border-border text-xs text-muted-foreground">
            <p>Méthode de paiement: <span className="capitalize">{paiement.methode}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
