'use client'

import { useState } from 'react'
import { Edit, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useSalleStore } from '@/lib/salle-store'
import { services, quartiers } from '@/lib/data'
import type { Salle } from '@/lib/types'

interface EditSalleModalProps {
  salle: Salle
}

export function EditSalleModal({ salle }: EditSalleModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>(salle.services)
  const [formData, setFormData] = useState({
    nom: salle.nom,
    description: salle.description,
    capacite: salle.capacite,
    prix: salle.prix,
    localisation: salle.localisation,
    quartier: salle.quartier,
    saison: salle.saison,
    latitude: salle.latitude,
    longitude: salle.longitude,
  })

  const { updateSalle } = useSalleStore()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'capacite' || name === 'prix' || name === 'latitude' || name === 'longitude'
          ? parseFloat(value)
          : value,
    }))
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nom || !formData.description || formData.capacite <= 0 || formData.prix <= 0) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsLoading(true)

    try {
      // Simule un délai API
      await new Promise(resolve => setTimeout(resolve, 800))

      const updatedSalle: Salle = {
        ...salle,
        ...formData,
        services: selectedServices,
      }

      updateSalle(salle.id, updatedSalle)

      toast.success('Salle mise à jour avec succès!')
      setIsOpen(false)
    } catch (error) {
      console.error('[v0] Erreur lors de la mise à jour:', error)
      toast.error('Erreur lors de la mise à jour de la salle')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Edit className="h-4 w-4" />
      </Button>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la salle</DialogTitle>
          <DialogDescription>Mettez à jour les informations de votre salle</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informations de base</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la salle</Label>
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
                <Label htmlFor="capacite">Capacité (personnes)</Label>
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
              <Label htmlFor="description">Description</Label>
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
                <Label htmlFor="prix">Prix (DA)</Label>
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
                  <option value="toute_annee">Toute l&apos;année</option>
                  <option value="ete">Été</option>
                  <option value="hiver">Hiver</option>
                </select>
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Localisation</h3>

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
                  <option key={q} value={q}>
                    {q}
                  </option>
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
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services proposés</h3>

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
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end border-t pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Mise à jour...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
