'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Star, Utensils, Palette, Music, Camera, Car, Snowflake, Waves, Trees } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Salle } from '@/lib/types'
import { formatPrice, getSaisonLabel, getServiceById } from '@/lib/data'

const serviceIcons: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-3 w-3" />,
  palette: <Palette className="h-3 w-3" />,
  music: <Music className="h-3 w-3" />,
  camera: <Camera className="h-3 w-3" />,
  car: <Car className="h-3 w-3" />,
  snowflake: <Snowflake className="h-3 w-3" />,
  waves: <Waves className="h-3 w-3" />,
  trees: <Trees className="h-3 w-3" />,
}

interface SalleCardProps {
  salle: Salle
}

export function SalleCard({ salle }: SalleCardProps) {
  const displayedServices = salle.services.slice(0, 4)
  const remainingServices = salle.services.length - 4

  return (
    <Link href={`/salles/${salle.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={salle.images[0]}
            alt={salle.nom}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {getSaisonLabel(salle.saison)}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{salle.note}</span>
            <span className="text-xs text-muted-foreground">({salle.nombreAvis})</span>
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {salle.nom}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{salle.quartier}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{salle.capacite} personnes</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {displayedServices.map((serviceId) => {
              const service = getServiceById(serviceId)
              if (!service) return null
              return (
                <Badge key={serviceId} variant="outline" className="text-xs gap-1">
                  {serviceIcons[service.icon]}
                  {service.nom}
                </Badge>
              )
            })}
            {remainingServices > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingServices}
              </Badge>
            )}
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-lg font-bold text-primary">
              {formatPrice(salle.prix)}
            </p>
            <p className="text-xs text-muted-foreground">par evenement</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
