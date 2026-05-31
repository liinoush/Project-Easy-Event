'use client'

import { useState } from 'react'
import { User, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/star-rating'
import { useAuthStore } from '@/lib/auth-store'
import { getAvisBySalleId, formatDate, mockAvis, getUserById } from '@/lib/data'
import type { Avis } from '@/lib/types'

interface ReviewsSectionProps {
  salleId: string
}

export function ReviewsSection({ salleId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Avis[]>(getAvisBySalleId(salleId))
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuthStore()

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour laisser un avis')
      return
    }

    if (newRating === 0) {
      toast.error('Veuillez donner une note')
      return
    }

    if (!newComment.trim()) {
      toast.error('Veuillez ecrire un commentaire')
      return
    }

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    const newReview: Avis = {
      id: `a${Date.now()}`,
      userId: user.id,
      salleId,
      note: newRating,
      commentaire: newComment,
      createdAt: new Date().toISOString().split('T')[0],
      user: user,
    }

    mockAvis.push(newReview)
    setReviews([newReview, ...reviews])
    setNewRating(0)
    setNewComment('')
    setIsSubmitting(false)
    toast.success('Merci pour votre avis!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Avis ({reviews.length})
      </h2>

      {/* Add Review Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-medium">Donner votre avis</h3>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Votre note</label>
            <StarRating
              rating={newRating}
              size="lg"
              interactive
              onRatingChange={setNewRating}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Votre commentaire</label>
            <Textarea
              placeholder="Partagez votre experience..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
          </div>
          <Button 
            onClick={handleSubmitReview}
            disabled={isSubmitting || !user}
          >
            {isSubmitting ? 'Envoi...' : 'Publier l\'avis'}
          </Button>
          {!user && (
            <p className="text-xs text-muted-foreground">
              Connectez-vous pour laisser un avis.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucun avis pour le moment. Soyez le premier a donner votre avis!
          </p>
        ) : (
          reviews.map((review) => {
            const reviewer = review.user || getUserById(review.userId)
            return (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">
                          {reviewer?.nom || 'Utilisateur'}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <StarRating rating={review.note} size="sm" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {review.commentaire}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
