export type UserRole = 'client' | 'proprietaire' | 'admin'

export interface User {
  id: string
  nom: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export type Saison = 'ete' | 'hiver' | 'toute_annee'

export interface Service {
  id: string
  nom: string
  icon: string
}

export interface Salle {
  id: string
  nom: string
  capacite: number
  prix: number
  localisation: string
  quartier: string
  description: string
  proprietaireId: string
  saison: Saison
  images: string[]
  services: string[]
  latitude: number
  longitude: number
  note: number
  nombreAvis: number
}

export type StatutReservation = 'en_attente' | 'confirme' | 'annule'

export interface Reservation {
  id: string
  userId: string
  salleId: string
  date: string
  statut: StatutReservation
  createdAt: string
  salle?: Salle
  user?: User
}

export interface Avis {
  id: string
  userId: string
  salleId: string
  note: number
  commentaire: string
  createdAt: string
  user?: User
}

export interface FilterState {
  capaciteMin: number
  capaciteMax: number
  prixMin: number
  prixMax: number
  localisation: string
  saison: Saison | ''
  services: string[]
  search: string
}

export type StatutPaiement = 'en_attente' | 'partiel' | 'paye' | 'annule'
export type TypeVersement = '50_50' | 'tiers' | 'personnalise'

export interface Versement {
  id: string
  paiementId: string
  montant: number
  statut: StatutPaiement
  dateEcheance: string
  datePaiement?: string
  description: string
}

export interface Paiement {
  id: string
  reservationId: string
  montantTotal: number
  montantPaye: number
  typeVersement: TypeVersement
  statut: StatutPaiement
  versements: Versement[]
  methode?: 'carte' | 'virement' | 'cheque'
  dateCreation: string
}
