'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { services, quartiers } from '@/lib/data'
import type { FilterState } from '@/lib/types'

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onReset: () => void
}

function FilterContent({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    capacite: true,
    budget: true,
    localisation: true,
    saison: true,
    services: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleServiceToggle = (serviceId: string) => {
    const newServices = filters.services.includes(serviceId)
      ? filters.services.filter(id => id !== serviceId)
      : [...filters.services, serviceId]
    onFiltersChange({ ...filters, services: newServices })
  }

  return (
    <div className="space-y-6">
      {/* Capacite */}
      <Collapsible open={openSections.capacite}>
        <CollapsibleTrigger 
          onClick={() => toggleSection('capacite')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Capacite (personnes)
          {openSections.capacite ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capaciteMin" className="text-xs">Min</Label>
              <Input
                id="capaciteMin"
                type="number"
                min={0}
                value={filters.capaciteMin || ''}
                onChange={(e) => onFiltersChange({ ...filters, capaciteMin: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capaciteMax" className="text-xs">Max</Label>
              <Input
                id="capaciteMax"
                type="number"
                min={0}
                value={filters.capaciteMax || ''}
                onChange={(e) => onFiltersChange({ ...filters, capaciteMax: parseInt(e.target.value) || 1000 })}
                placeholder="1000"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Budget */}
      <Collapsible open={openSections.budget}>
        <CollapsibleTrigger 
          onClick={() => toggleSection('budget')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium border-t border-border pt-4"
        >
          Budget (DA)
          {openSections.budget ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.prixMin, filters.prixMax]}
              onValueChange={([min, max]) => onFiltersChange({ ...filters, prixMin: min, prixMax: max })}
              min={0}
              max={500000}
              step={10000}
              className="mt-4"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{filters.prixMin.toLocaleString()} DA</span>
              <span>{filters.prixMax.toLocaleString()} DA</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Localisation */}
      <Collapsible open={openSections.localisation}>
        <CollapsibleTrigger 
          onClick={() => toggleSection('localisation')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium border-t border-border pt-4"
        >
          Localisation
          {openSections.localisation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <Select
            value={filters.localisation}
            onValueChange={(value) => onFiltersChange({ ...filters, localisation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les quartiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les quartiers</SelectItem>
              {quartiers.map((quartier) => (
                <SelectItem key={quartier} value={quartier}>
                  {quartier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Saison */}
      <Collapsible open={openSections.saison}>
        <CollapsibleTrigger 
          onClick={() => toggleSection('saison')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium border-t border-border pt-4"
        >
          Saison
          {openSections.saison ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <Select
            value={filters.saison}
            onValueChange={(value) => onFiltersChange({ ...filters, saison: value as FilterState['saison'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les saisons" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les saisons</SelectItem>
              <SelectItem value="ete">Ete</SelectItem>
              <SelectItem value="hiver">Hiver</SelectItem>
              <SelectItem value="toute_annee">Toute l&apos;annee</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Services */}
      <Collapsible open={openSections.services}>
        <CollapsibleTrigger 
          onClick={() => toggleSection('services')}
          className="flex items-center justify-between w-full py-2 text-sm font-medium border-t border-border pt-4"
        >
          Services
          {openSections.services ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={filters.services.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                  {service.nom}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Reset Button */}
      <Button variant="outline" onClick={onReset} className="w-full mt-4">
        <X className="h-4 w-4 mr-2" />
        Reinitialiser les filtres
      </Button>
    </div>
  )
}

export function FilterSidebar(props: FilterSidebarProps) {
  const activeFiltersCount = [
    props.filters.capaciteMin > 0,
    props.filters.capaciteMax < 1000,
    props.filters.prixMin > 0,
    props.filters.prixMax < 500000,
    props.filters.localisation !== '',
    props.filters.saison !== '',
    props.filters.services.length > 0,
  ].filter(Boolean).length

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
            {activeFiltersCount > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h2>
          <FilterContent {...props} />
        </div>
      </aside>

      {/* Mobile filter sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
