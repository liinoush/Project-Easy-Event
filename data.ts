import type { User, Salle, Service, Reservation, Avis, Paiement } from './types'

export const services: Service[] = [
  { id: 's1', nom: 'Traiteur', icon: 'utensils' },
  { id: 's2', nom: 'Decoration', icon: 'palette' },
  { id: 's3', nom: 'DJ', icon: 'music' },
  { id: 's4', nom: 'Photographe', icon: 'camera' },
  { id: 's5', nom: 'Parking', icon: 'car' },
  { id: 's6', nom: 'Climatisation', icon: 'snowflake' },
  { id: 's7', nom: 'Piscine', icon: 'waves' },
  { id: 's8', nom: 'Jardin', icon: 'trees' },
]

export const quartiers = [
  'Centre-ville',
  'Seybouse',
  'La Colonne',
  'Plage Chapuis',
  'Plage Ain Achir',
  'El Bouni',
  'Sidi Amar',
]

export const mockUsers: User[] = [
  {
    id: 'u1',
    nom: 'Ahmed Benali',
    email: 'ahmed@email.com',
    role: 'client',
    createdAt: '2024-01-15',
  },
  {
    id: 'u2',
    nom: 'Fatima Khelifi',
    email: 'fatima@email.com',
    role: 'proprietaire',
    createdAt: '2024-01-10',
  },
  {
    id: 'u3',
    nom: 'Admin EasyEvent',
    email: 'admin@easyevent.dz',
    role: 'admin',
    createdAt: '2024-01-01',
  },
  {
    id: 'u4',
    nom: 'Karim Mansouri',
    email: 'karim@email.com',
    role: 'client',
    createdAt: '2024-02-20',
  },
  {
    id: 'u5',
    nom: 'Sara Boudiaf',
    email: 'sara@email.com',
    role: 'proprietaire',
    createdAt: '2024-02-01',
  },
]

export const mockSalles: Salle[] = [
  {
    id: 'sal1',
    nom: 'Taj El Marhaba',
    capacite: 400,
    prix: 220000,
    localisation: 'Route du Cap de Garde, Annaba (WQJ5+3X5)',
    quartier: 'Cap de Garde',
    description: 'Salle d\'événement spacieuse et élégante avec décoration professionnelle. Service impeccable et ambiance très agréable pour tous vos événements.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle1.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.9120,
    longitude: 7.7810,
    note: 3.5,
    nombreAvis: 49,
  },
  {
    id: 'sal2',
    nom: 'Salle Des Fêtes Lara & Sofia',
    capacite: 150,
    prix: 95000,
    localisation: 'Centre-ville, Annaba (WQWF+P88)',
    quartier: 'Centre-ville',
    description: 'Petite salle intime et chaleureuse, parfaite pour les petites célébrations et événements familiaux. Service personnalisé et accueil sympathique.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle2.jpg'],
    services: ['s1', 's2', 's4'],
    latitude: 36.9045,
    longitude: 7.7545,
    note: 1.0,
    nombreAvis: 1,
  },
  {
    id: 'sal3',
    nom: 'Salle de fête BEDDINE',
    capacite: 300,
    prix: 150000,
    localisation: 'Boulevard Bouzerad Hocine, Annaba (VPQW+M6P)',
    quartier: 'Bouzerad',
    description: 'Salle moderne avec équipements professionnels. Atmosphère conviviale et service de qualité. Idéale pour tous types d\'événements.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle3.jpg'],
    services: ['s1', 's2', 's3', 's5', 's6'],
    latitude: 36.8960,
    longitude: 7.7610,
    note: 4.4,
    nombreAvis: 5,
  },
  {
    id: 'sal4',
    nom: 'Salle des Fêtes El Hadja',
    capacite: 380,
    prix: 200000,
    localisation: 'Rue de l\'Avant Port, Annaba (WQ39+CR6)',
    quartier: 'Port',
    description: 'Très belle salle avec personnel top. Ambiance professionnelle et raffinée. Service excellent pour tous vos événements.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle4.jpg'],
    services: ['s1', 's2', 's3', 's5', 's6'],
    latitude: 36.9088,
    longitude: 7.7688,
    note: 4.0,
    nombreAvis: 25,
  },
  {
    id: 'sal5',
    nom: 'Salle des fêtes Florida Palace',
    capacite: 450,
    prix: 250000,
    localisation: 'Centre Annaba (VPQG+JH5)',
    quartier: 'Centre-ville',
    description: 'Salle luxueuse avec décoration élégante et florale. Ambiance festive et accueil chaleureux pour vos célébrations.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle5.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.9008,
    longitude: 7.7508,
    note: 4.0,
    nombreAvis: 39,
  },
  {
    id: 'sal6',
    nom: 'Salle des fêtes cristal Bénini',
    capacite: 320,
    prix: 180000,
    localisation: 'Plage Belvédère, Route du Cap de Garde, Annaba 23000',
    quartier: 'Belvédère',
    description: 'Grand espace bien aménagé en bord de plage. Vue magnifique sur la mer. Idéal pour les événements spéciaux avec ambiance côtière.',
    proprietaireId: 'u5',
    saison: 'ete',
    images: ['/salle6.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's7'],
    latitude: 36.9158,
    longitude: 7.7908,
    note: 4.3,
    nombreAvis: 15,
  },
  {
    id: 'sal7',
    nom: 'Salle des fêtes el yasmine',
    capacite: 360,
    prix: 190000,
    localisation: 'Annaba (VPRC+4J4)',
    quartier: 'El Yasmine',
    description: 'Salle élégante avec décoration raffinée. Ambiance chaleureuse et service attentif pour un mariage ou événement inoubliable.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle7.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.8958,
    longitude: 7.7608,
    note: 4.1,
    nombreAvis: 31,
  },
  {
    id: 'sal8',
    nom: 'Salle des fêtes Babylone',
    capacite: 280,
    prix: 140000,
    localisation: 'Annaba, Algérie',
    quartier: 'Centre-ville',
    description: 'Salle moderne pour concerts et événements. Ambiance dynamique et accueil professionnel. Équipements de qualité.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle8.jpg'],
    services: ['s1', 's2', 's3', 's5'],
    latitude: 36.9028,
    longitude: 7.7528,
    note: 3.9,
    nombreAvis: 17,
  },
  {
    id: 'sal9',
    nom: 'Salle des fêtes Lala Meriem',
    capacite: 320,
    prix: 165000,
    localisation: 'Annaba (VPRJ+CVC)',
    quartier: 'Lala Meriem',
    description: 'Salle de luxe avec décoration somptueuse. Accueil chaleureux et service impeccable pour vos événements importants.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle9.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.8968,
    longitude: 7.7568,
    note: 3.9,
    nombreAvis: 25,
  },
  {
    id: 'sal10',
    nom: 'Hasna Events',
    capacite: 250,
    prix: 130000,
    localisation: 'Rond-Point Les Hongrois, Annaba (VPQ8+586)',
    quartier: 'Les Hongrois',
    description: 'Espace événementiel moderne et fonctionnel. Personnel professionnel et service fiable pour tous vos besoins.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle10.jpg'],
    services: ['s1', 's2', 's4', 's5', 's6'],
    latitude: 36.8858,
    longitude: 7.7458,
    note: 3.8,
    nombreAvis: 14,
  },
  {
    id: 'sal11',
    nom: 'Salle Prestige Annaba',
    capacite: 400,
    prix: 210000,
    localisation: 'Centre-ville, Annaba',
    quartier: 'Centre-ville',
    description: 'Salle de prestige avec équipements modernes. Service professionnel et ambiance parfaite pour vos célébrations.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle11.jpg'],
    services: ['s1', 's2', 's3', 's5', 's6'],
    latitude: 36.9058,
    longitude: 7.7558,
    note: 4.5,
    nombreAvis: 32,
  },
  {
    id: 'sal12',
    nom: 'Salle Royale',
    capacite: 350,
    prix: 175000,
    localisation: 'Annaba',
    quartier: 'Centre-ville',
    description: 'Salle élégante avec decoration soignée. Personnel attentif et service impeccable pour un événement réussi.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle12.jpg'],
    services: ['s1', 's2', 's3', 's4'],
    latitude: 36.9018,
    longitude: 7.7518,
    note: 4.2,
    nombreAvis: 28,
  },
  {
    id: 'sal13',
    nom: 'Salle des Fêtes Azur',
    capacite: 500,
    prix: 270000,
    localisation: 'Annaba',
    quartier: 'Seraidi',
    description: 'Salle de banquet spacieuse avec grande capacité. Décoration élégante et service de qualité supérieure.',
    proprietaireId: 'u2',
    saison: 'toute_annee',
    images: ['/salle13.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.8808,
    longitude: 7.7308,
    note: 4.6,
    nombreAvis: 45,
  },
  {
    id: 'sal14',
    nom: 'Salle Elite Events',
    capacite: 550,
    prix: 300000,
    localisation: 'Centre-ville, Annaba',
    quartier: 'Centre-ville',
    description: 'Salle premium avec tout le confort et luxe. Équipements haut de gamme et service d\'exception pour vos événements les plus importants.',
    proprietaireId: 'u5',
    saison: 'toute_annee',
    images: ['/salle14.jpg'],
    services: ['s1', 's2', 's3', 's4', 's5', 's6'],
    latitude: 36.9008,
    longitude: 7.7558,
    note: 4.8,
    nombreAvis: 87,
  },
]

export const mockReservations: Reservation[] = [
  {
    id: 'r1',
    userId: 'u1',
    salleId: 'sal1',
    date: '2024-06-15',
    statut: 'confirme',
    createdAt: '2024-03-01',
  },
  {
    id: 'r2',
    userId: 'u1',
    salleId: 'sal3',
    date: '2024-07-20',
    statut: 'en_attente',
    createdAt: '2024-03-10',
  },
  {
    id: 'r3',
    userId: 'u4',
    salleId: 'sal2',
    date: '2024-05-25',
    statut: 'confirme',
    createdAt: '2024-02-28',
  },
  {
    id: 'r4',
    userId: 'u4',
    salleId: 'sal6',
    date: '2024-08-10',
    statut: 'annule',
    createdAt: '2024-03-05',
  },
  {
    id: 'r5',
    userId: 'u1',
    salleId: 'sal9',
    date: '2024-09-15',
    statut: 'confirme',
    createdAt: '2024-03-08',
  },
  {
    id: 'r6',
    userId: 'u4',
    salleId: 'sal10',
    date: '2024-10-20',
    statut: 'confirme',
    createdAt: '2024-03-12',
  },
  {
    id: 'r7',
    userId: 'u1',
    salleId: 'sal11',
    date: '2024-07-15',
    statut: 'en_attente',
    createdAt: '2024-03-15',
  },
  {
    id: 'r8',
    userId: 'u4',
    salleId: 'sal12',
    date: '2024-06-08',
    statut: 'confirme',
    createdAt: '2024-03-20',
  },
  {
    id: 'r9',
    userId: 'u1',
    salleId: 'sal13',
    date: '2024-11-25',
    statut: 'confirme',
    createdAt: '2024-03-22',
  },
  {
    id: 'r10',
    userId: 'u4',
    salleId: 'sal14',
    date: '2024-09-30',
    statut: 'en_attente',
    createdAt: '2024-03-25',
  },
]

export const mockAvis: Avis[] = [
  {
    id: 'a1',
    userId: 'u1',
    salleId: 'sal1',
    note: 5,
    commentaire: 'Magnifique salle! Le personnel etait tres professionnel et la decoration etait parfaite. Je recommande vivement.',
    createdAt: '2024-02-20',
  },
  {
    id: 'a2',
    userId: 'u4',
    salleId: 'sal1',
    note: 4,
    commentaire: 'Tres belle salle avec une vue imprenable. Le service traiteur etait excellent.',
    createdAt: '2024-02-15',
  },
  {
    id: 'a3',
    userId: 'u1',
    salleId: 'sal2',
    note: 5,
    commentaire: 'Le Palais des Roses a fait de notre mariage un moment inoubliable. Merci pour tout!',
    createdAt: '2024-01-30',
  },
  {
    id: 'a4',
    userId: 'u4',
    salleId: 'sal3',
    note: 5,
    commentaire: 'La vue sur la mer est a couper le souffle. Parfait pour notre fete d\'ete.',
    createdAt: '2024-03-01',
  },
  {
    id: 'a5',
    userId: 'u1',
    salleId: 'sal9',
    note: 5,
    commentaire: 'Salle Medina est magnifique! L\'atmosphere authentique a rendu notre fete tres speciale.',
    createdAt: '2024-03-10',
  },
  {
    id: 'a6',
    userId: 'u4',
    salleId: 'sal10',
    note: 5,
    commentaire: 'Espace Prestige a depasse toutes nos attentes. Personnel tres professionnel et ambiance luxueuse.',
    createdAt: '2024-03-15',
  },
  {
    id: 'a7',
    userId: 'u1',
    salleId: 'sal11',
    note: 5,
    commentaire: 'Villa Tropicale est paradisiaque! Le cadre directement sur la plage est inoubliable.',
    createdAt: '2024-03-18',
  },
  {
    id: 'a8',
    userId: 'u4',
    salleId: 'sal12',
    note: 4,
    commentaire: 'Salle Horizon offre une belle vue et une excellente organisation. Tres satisfait.',
    createdAt: '2024-03-20',
  },
  {
    id: 'a9',
    userId: 'u1',
    salleId: 'sal13',
    note: 5,
    commentaire: 'Chateau Belle Vue est simplement extraordinaire! Notre mariage sera inoubliable grace a ce lieu magique.',
    createdAt: '2024-03-22',
  },
  {
    id: 'a10',
    userId: 'u4',
    salleId: 'sal14',
    note: 5,
    commentaire: 'Salle Elegance combine raffinage et confort. Le traiteur gastronomique etait excellent.',
    createdAt: '2024-03-25',
  },
]

export const mockPaiements: Paiement[] = [
  {
    id: 'p1',
    reservationId: 'r1',
    montantTotal: 220000,
    montantPaye: 110000,
    typeVersement: '50_50',
    statut: 'partiel',
    methode: 'carte',
    dateCreation: '2024-03-01',
    versements: [
      {
        id: 'v1',
        paiementId: 'p1',
        montant: 110000,
        statut: 'paye',
        dateEcheance: '2024-03-15',
        datePaiement: '2024-03-10',
        description: 'Acompte 50%',
      },
      {
        id: 'v2',
        paiementId: 'p1',
        montant: 110000,
        statut: 'en_attente',
        dateEcheance: '2024-06-01',
        description: 'Solde 50%',
      },
    ],
  },
  {
    id: 'p2',
    reservationId: 'r2',
    montantTotal: 150000,
    montantPaye: 50000,
    typeVersement: 'tiers',
    statut: 'partiel',
    methode: 'carte',
    dateCreation: '2024-03-10',
    versements: [
      {
        id: 'v3',
        paiementId: 'p2',
        montant: 50000,
        statut: 'paye',
        dateEcheance: '2024-03-20',
        datePaiement: '2024-03-15',
        description: 'Versement 1/3',
      },
      {
        id: 'v4',
        paiementId: 'p2',
        montant: 50000,
        statut: 'en_attente',
        dateEcheance: '2024-05-20',
        description: 'Versement 2/3',
      },
      {
        id: 'v5',
        paiementId: 'p2',
        montant: 50000,
        statut: 'en_attente',
        dateEcheance: '2024-06-20',
        description: 'Versement 3/3',
      },
    ],
  },
  {
    id: 'p3',
    reservationId: 'r5',
    montantTotal: 165000,
    montantPaye: 165000,
    typeVersement: '50_50',
    statut: 'paye',
    methode: 'carte',
    dateCreation: '2024-03-08',
    versements: [
      {
        id: 'v6',
        paiementId: 'p3',
        montant: 82500,
        statut: 'paye',
        dateEcheance: '2024-03-20',
        datePaiement: '2024-03-18',
        description: 'Acompte 50%',
      },
      {
        id: 'v7',
        paiementId: 'p3',
        montant: 82500,
        statut: 'paye',
        dateEcheance: '2024-08-20',
        datePaiement: '2024-08-18',
        description: 'Solde 50%',
      },
    ],
  },
]

export function getSalleById(id: string): Salle | undefined {
  return mockSalles.find(s => s.id === id)
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id)
}

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id)
}

export function getAvisBySalleId(salleId: string): Avis[] {
  return mockAvis.filter(a => a.salleId === salleId).map(avis => ({
    ...avis,
    user: getUserById(avis.userId)
  }))
}

export function getReservationsByUserId(userId: string): Reservation[] {
  return mockReservations.filter(r => r.userId === userId).map(res => ({
    ...res,
    salle: getSalleById(res.salleId)
  }))
}

export function getReservationsBySalleId(salleId: string): Reservation[] {
  return mockReservations.filter(r => r.salleId === salleId).map(res => ({
    ...res,
    user: getUserById(res.userId)
  }))
}

export function getSallesByProprietaireId(proprietaireId: string): Salle[] {
  return mockSalles.filter(s => s.proprietaireId === proprietaireId)
}

export function formatPrice(prix: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(prix) + ' DA'
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function getStatutLabel(statut: string): string {
  const labels: Record<string, string> = {
    'en_attente': 'En attente',
    'confirme': 'Confirme',
    'annule': 'Annule'
  }
  return labels[statut] || statut
}

export function getSaisonLabel(saison: string): string {
  const labels: Record<string, string> = {
    'ete': 'Ete',
    'hiver': 'Hiver',
    'toute_annee': 'Toute l\'annee'
  }
  return labels[saison] || saison
}

export function getPaiementByReservationId(reservationId: string): Paiement | undefined {
  return mockPaiements.find(p => p.reservationId === reservationId)
}

export function getPaiementsByUserId(userId: string): Paiement[] {
  return mockReservations
    .filter(r => r.userId === userId)
    .map(r => getPaiementByReservationId(r.id))
    .filter((p): p is Paiement => p !== undefined)
}

export function getTypeVersementLabel(type: string): string {
  const labels: Record<string, string> = {
    '50_50': '50% à la confirmation, 50% avant l\'événement',
    'tiers': 'Versement en 3 fois',
    'personnalise': 'Versement personnalisé'
  }
  return labels[type] || type
}

export function getStatutPaiementLabel(statut: string): string {
  const labels: Record<string, string> = {
    'en_attente': 'En attente',
    'partiel': 'Paiement partiel',
    'paye': 'Payé',
    'annule': 'Annulé'
  }
  return labels[statut] || statut
}
