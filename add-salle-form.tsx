'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { useSalleStore } from '@/lib/salle-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import type { Salle } from '@/lib/types'
import { services, quartiers } from '@/lib/data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddSalleForm() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { addSalle } = useSalleStore()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    capacite: 100,
    prix: 0,
    localisation: '',
    quartier: quartiers[0],
    saison: 'toute_annee' as const,
    latitude: 36.9,
    longitude: 7.7,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacite' || name === 'prix' || name === 'latitude' || name === 'longitude'
        ? parseFloat(value)
        : value
    }))
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || user.role !== 'proprietaire') {
      toast.error('Vous devez être connecté en tant que propriétaire')
      return
    }

    if (!formData.nom || !formData.description || formData.capacite <= 0 || formData.prix <= 0) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsLoading(true)

    try {
      // Simule un délai API
      await new Promise(resolve => setTimeout(resolve, 800))

      // Crée une nouvelle salle
      const newSalle: Salle = {
        id: `sal${Date.now()}`,
        nom: formData.nom,
        description: formData.description,
        capacite: formData.capacite,
        prix: formData.prix,
        localisation: formData.localisation,
        quartier: formData.quartier,
        saison: formData.saison,
        latitude: formData.latitude,
        longitude: formData.longitude,
        proprietaireId: user.id,
        images: ['/salle1.jpg', '/salle2.jpg'], // Images par défaut
        services: selectedServices,
        note: 4.5,
        nombreAvis: 0,
      }

      // Ajoute à la liste des salles via le store
      addSalle(newSalle)

      toast.success('Salle ajoutée avec succès!')
      router.push('/dashboard/proprietaire')
    } catch (error) {
      console.error('[v0] Erreur lors de l\'ajout de la salle:', error)
      toast.error('Erreur lors de l\'ajout de la salle')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/proprietaire">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Ajouter une salle</h1>
          <p className="text-muted-foreground mt-1">
            Enregistrez votre nouvelle salle sur la plateforme
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
            <CardDescription>
              Remplissez les détails principaux de votre salle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la salle *</Label>
                <Input
                  id="nom"
                  name="nom"
                  placeholder="Ex: Salle El Mountazah"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacite">Capacité (personnes) *</Label>
                <Input
                  id="capacite"
                  name="capacite"
                  type="number"
                  min="1"
                  placeholder="200"
                  value={formData.capacite}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décrivez votre salle, ses caractéristiques, l'ambiance..."
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prix">Prix (DA) *</Label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  min="0"
                  placeholder="250000"
                  value={formData.prix}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saison">Saison disponible</Label>
                <select
                  id="saison"
                  name="saison"
                  value={formData.saison}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="toute_annee">Toute l'année</option>
                  <option value="ete">Été</option>
                  <option value="hiver">Hiver</option>
                  <option value="printemps">Printemps</option>
                  <option value="automne">Automne</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Localisation */}
        <Card>
          <CardHeader>
            <CardTitle>Localisation</CardTitle>
            <CardDescription>
              Où se trouve votre salle à Annaba
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="localisation">Adresse complète</Label>
              <Input
                id="localisation"
                name="localisation"
                placeholder="Ex: Route de Seraidi, Annaba"
                value={formData.localisation}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quartier">Quartier</Label>
              <select
                id="quartier"
                name="quartier"
                value={formData.quartier}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                {quartiers.map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.0001"
                  placeholder="36.9051"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.0001"
                  placeholder="7.7661"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services proposés</CardTitle>
            <CardDescription>
              Sélectionnez les services disponibles dans votre salle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {services.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label htmlFor={service.id} className="font-normal cursor-pointer">
                    {service.nom}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/proprietaire')}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Ajout en cours...' : 'Ajouter la salle'}
          </Button>
        </div>
      </form>
    </div>
  )
}
