'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import type { Salle } from '@/lib/types'

interface VenueMapProps {
  salle: Salle
  className?: string
}

export function VenueMap({ salle, className = '' }: VenueMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p>Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  return <MapContent salle={salle} className={className} />
}

function MapContent({ salle, className }: VenueMapProps) {
  const [MapContainer, setMapContainer] = useState<typeof import('react-leaflet').MapContainer | null>(null)
  const [TileLayer, setTileLayer] = useState<typeof import('react-leaflet').TileLayer | null>(null)
  const [Marker, setMarker] = useState<typeof import('react-leaflet').Marker | null>(null)
  const [Popup, setPopup] = useState<typeof import('react-leaflet').Popup | null>(null)
  const [L, setL] = useState<typeof import('leaflet') | null>(null)

  useEffect(() => {
    import('react-leaflet').then(mod => {
      setMapContainer(() => mod.MapContainer)
      setTileLayer(() => mod.TileLayer)
      setMarker(() => mod.Marker)
      setPopup(() => mod.Popup)
    })
    import('leaflet').then(mod => {
      setL(() => mod.default)
    })
  }, [])

  useEffect(() => {
    if (L) {
      // Fix for default marker icons in Leaflet with webpack
      delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    }
  }, [L])

  if (!MapContainer || !TileLayer || !Marker || !Popup || !L) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p>Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <MapContainer
        center={[salle.latitude, salle.longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className={`rounded-lg ${className}`}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[salle.latitude, salle.longitude]}>
          <Popup>
            <div className="text-center">
              <strong>{salle.nom}</strong>
              <br />
              <span className="text-sm">{salle.localisation}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}
