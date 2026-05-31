-- ============================================
-- EASYEVENT ANNABA - SCHEMA SUPABASE COMPLET
-- CODE SQL PRET A COPIER-COLLER
-- ============================================

-- ============================================
-- 1. CREATION DES TABLES
-- ============================================

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  role VARCHAR(50) NOT NULL CHECK (role IN ('client', 'proprietaire', 'admin')),
  adresse VARCHAR(500),
  ville VARCHAR(100),
  date_inscription TIMESTAMP DEFAULT NOW(),
  derniere_connexion TIMESTAMP,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des salles
CREATE TABLE IF NOT EXISTS salles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  capacite INTEGER NOT NULL CHECK (capacite > 0),
  prix DECIMAL(10, 2) NOT NULL CHECK (prix > 0),
  localisation VARCHAR(500) NOT NULL,
  quartier VARCHAR(100),
  saison VARCHAR(50) NOT NULL CHECK (saison IN ('printemps', 'ete', 'automne', 'hiver', 'toute_annee')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  note DECIMAL(3, 1) DEFAULT 4.0 CHECK (note >= 0 AND note <= 5),
  nombre_avis INTEGER DEFAULT 0,
  proprietaire_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  statut VARCHAR(50) DEFAULT 'active' CHECK (statut IN ('active', 'inactive', 'suspendue')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des images de salles
CREATE TABLE IF NOT EXISTS salle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de relation Many-to-Many entre salles et services
CREATE TABLE IF NOT EXISTS salle_services (
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (salle_id, service_id)
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  heure_debut TIME DEFAULT '08:00:00',
  heure_fin TIME DEFAULT '23:59:59',
  nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes > 0),
  prix_total DECIMAL(10, 2) NOT NULL CHECK (prix_total > 0),
  statut VARCHAR(50) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'rejetee', 'annulee', 'completee')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT dates_valides CHECK (date_fin >= date_debut)
);

-- Table des avis
CREATE TABLE IF NOT EXISTS avis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
  titre VARCHAR(255),
  contenu TEXT NOT NULL,
  date_avis TIMESTAMP DEFAULT NOW(),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favoris (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(client_id, salle_id)
);

-- Table des disponibilités
CREATE TABLE IF NOT EXISTS disponibilites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salle_id UUID NOT NULL REFERENCES salles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  disponible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT horaires_valides CHECK (heure_fin > heure_debut)
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expediteur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  destinataire_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sujet VARCHAR(255),
  contenu TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  titre VARCHAR(255) NOT NULL,
  message TEXT,
  lu BOOLEAN DEFAULT FALSE,
  lien VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 2. CREATION DES INDEX
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_salles_proprietaire ON salles(proprietaire_id);
CREATE INDEX idx_salles_quartier ON salles(quartier);
CREATE INDEX idx_salles_saison ON salles(saison);
CREATE INDEX idx_salles_lat_lon ON salles(latitude, longitude);
CREATE INDEX idx_reservations_salle ON reservations(salle_id);
CREATE INDEX idx_reservations_client ON reservations(client_id);
CREATE INDEX idx_reservations_statut ON reservations(statut);
CREATE INDEX idx_reservations_dates ON reservations(date_debut, date_fin);
CREATE INDEX idx_avis_salle ON avis(salle_id);
CREATE INDEX idx_avis_client ON avis(client_id);
CREATE INDEX idx_favoris_client ON favoris(client_id);
CREATE INDEX idx_disponibilites_salle ON disponibilites(salle_id);
CREATE INDEX idx_disponibilites_date ON disponibilites(date);

-- ============================================
-- 3. INSERTION DES DONNEES
-- ============================================

-- Insertion des services
INSERT INTO services (id, nom, description, icon) VALUES
('00000001-0000-0000-0000-000000000001', 'Restauration', 'Service de restauration et catering', 'utensils'),
('00000001-0000-0000-0000-000000000002', 'DJ/Musique', 'Service de DJ et animation musicale', 'music'),
('00000001-0000-0000-0000-000000000003', 'Décoration', 'Service de décoration et arrangement floral', 'sparkles'),
('00000001-0000-0000-0000-000000000004', 'Parking', 'Parking gratuit et sécurisé', 'car'),
('00000001-0000-0000-0000-000000000005', 'Climatisation', 'Système de climatisation moderne', 'snowflake'),
('00000001-0000-0000-0000-000000000006', 'WiFi', 'Internet haute vitesse', 'wifi'),
('00000001-0000-0000-0000-000000000007', 'Accès plage', 'Accès direct à la plage', 'waves'),
('00000001-0000-0000-0000-000000000008', 'Vestiaires', 'Vestiaires et salles de repos', 'door-open');

-- Insertion des utilisateurs
INSERT INTO users (id, email, password_hash, nom, prenom, telephone, role, adresse, ville, actif) VALUES
('10000001-0000-0000-0000-000000000001', 'client1@easypevent.com', '$2b$10$hashedpassword123', 'Benali', 'Ahmed', '+213665432123', 'client', '123 Rue de la Paix', 'Annaba', TRUE),
('10000001-0000-0000-0000-000000000002', 'client2@easypevent.com', '$2b$10$hashedpassword456', 'Medjahed', 'Fatima', '+213665432124', 'client', '456 Boulevard Khemisti', 'Annaba', TRUE),
('10000001-0000-0000-0000-000000000003', 'client3@easypevent.com', '$2b$10$hashedpassword789', 'Kadri', 'Mohamed', '+213665432125', 'client', '789 Avenue Zirout Youcef', 'Annaba', TRUE),
('20000001-0000-0000-0000-000000000001', 'owner1@easypevent.com', '$2b$10$hashedpassword111', 'Saïdi', 'Karim', '+213665432126', 'proprietaire', 'Route de Seraidi', 'Annaba', TRUE),
('20000001-0000-0000-0000-000000000002', 'owner2@easypevent.com', '$2b$10$hashedpassword222', 'Boudjema', 'Nassira', '+213665432127', 'proprietaire', 'Plage Chapuis', 'Annaba', TRUE),
('30000001-0000-0000-0000-000000000001', 'admin@easypevent.com', '$2b$10$hashedpassword999', 'Admin', 'EasyEvent', '+213665432128', 'admin', 'Bureau Principal', 'Annaba', TRUE);

-- Insertion des salles
INSERT INTO salles (id, nom, description, capacite, prix, localisation, quartier, saison, latitude, longitude, note, nombre_avis, proprietaire_id, statut) VALUES
('30000001-0000-0000-0000-000000000001', 'Salle El Mountazah', 'Magnifique salle de fetes avec vue panoramique sur la mer. Ideale pour les grands mariages et evenements prestigieux. Dispose d''un grand parking et d''un jardin amenage.', 500, 250000, 'Route de Seraidi, Annaba', 'Seybouse', 'toute_annee', 36.9051, 7.7661, 4.8, 124, '20000001-0000-0000-0000-000000000001', 'active'),
('30000001-0000-0000-0000-000000000002', 'Palais des Roses', 'Salle elegante au coeur d''Annaba. Decoration raffinee et service de qualite superieure. Parfaite pour les mariages intimes et les receptions de prestige.', 350, 180000, 'Boulevard du 1er Novembre, Centre-ville', 'Centre-ville', 'toute_annee', 36.9000, 7.7500, 4.6, 89, '20000001-0000-0000-0000-000000000001', 'active'),
('30000001-0000-0000-0000-000000000003', 'Villa Marina', 'Villa luxueuse en bord de mer avec acces prive a la plage. Vue imprenable sur la Mediterranee. Ideal pour les evenements d''ete.', 200, 150000, 'Plage Chapuis, Annaba', 'Plage Chapuis', 'ete', 36.9150, 7.7800, 4.9, 67, '20000001-0000-0000-0000-000000000002', 'active'),
('30000001-0000-0000-0000-000000000004', 'Espace Seybouse', 'Grande salle moderne avec equipements dernier cri. Systeme audio-visuel professionnel. Convient pour conferences et grands evenements.', 400, 200000, 'Rue Didouche Mourad, Seybouse', 'Seybouse', 'toute_annee', 36.8950, 7.7550, 4.5, 156, '20000001-0000-0000-0000-000000000002', 'active'),
('30000001-0000-0000-0000-000000000005', 'Jardin d''Eden', 'Charmant jardin couvert pour vos celebrations. Ambiance chaleureuse et intime. Parfait pour les evenements de taille moyenne.', 150, 120000, 'La Colonne, Annaba', 'La Colonne', 'ete', 36.8900, 7.7400, 4.7, 43, '20000001-0000-0000-0000-000000000001', 'active'),
('30000001-0000-0000-0000-000000000006', 'Le Crystal', 'La plus grande salle d''Annaba. Architecture moderne et installations de luxe. Pour les evenements exceptionnels et les grandes celebrations.', 600, 300000, 'Route d''El Bouni, Annaba', 'El Bouni', 'toute_annee', 36.8500, 7.7200, 4.4, 198, '20000001-0000-0000-0000-000000000002', 'active'),
('30000001-0000-0000-0000-000000000007', 'Plage d''Or', 'Espace de reception en bord de plage. Coucher de soleil magnifique. Specialise dans les mariages d''ete romantiques.', 180, 160000, 'Plage Ain Achir, Annaba', 'Plage Ain Achir', 'ete', 36.9200, 7.7900, 4.8, 76, '20000001-0000-0000-0000-000000000001', 'active'),
('30000001-0000-0000-0000-000000000008', 'Salle El Ferdaous', 'Salle traditionnelle avec une touche moderne. Service chaleureux et cuisine locale raffinee. Ideal pour les fetes familiales.', 250, 140000, 'Sidi Amar, Annaba', 'Sidi Amar', 'hiver', 36.8700, 7.6900, 4.3, 112, '20000001-0000-0000-0000-000000000002', 'active');

-- Insertion des images de salles
INSERT INTO salle_images (salle_id, url, ordre) VALUES
('30000001-0000-0000-0000-000000000001', '/salle1.jpg', 1),
('30000001-0000-0000-0000-000000000001', '/salle2.jpg', 2),
('30000001-0000-0000-0000-000000000002', '/salle3.jpg', 1),
('30000001-0000-0000-0000-000000000002', '/salle4.jpg', 2),
('30000001-0000-0000-0000-000000000003', '/salle5.jpg', 1),
('30000001-0000-0000-0000-000000000003', '/salle6.jpg', 2),
('30000001-0000-0000-0000-000000000004', '/salle4.jpg', 1),
('30000001-0000-0000-0000-000000000004', '/salle3.jpg', 2),
('30000001-0000-0000-0000-000000000005', '/salle5.jpg', 1),
('30000001-0000-0000-0000-000000000005', '/salle1.jpg', 2),
('30000001-0000-0000-0000-000000000006', '/salle6.jpg', 1),
('30000001-0000-0000-0000-000000000006', '/salle2.jpg', 2),
('30000001-0000-0000-0000-000000000007', '/salle7.jpg', 1),
('30000001-0000-0000-0000-000000000007', '/salle6.jpg', 2),
('30000001-0000-0000-0000-000000000008', '/salle8.jpg', 1),
('30000001-0000-0000-0000-000000000008', '/salle3.jpg', 2);

-- Association des services aux salles
INSERT INTO salle_services (salle_id, service_id) VALUES
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000003'),
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000004'),
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000006'),
('30000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000003'),
('30000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000006'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000004'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000007'),
('30000001-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000008'),
('30000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000003'),
('30000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000004', '00000001-0000-0000-0000-000000000006'),
('30000001-0000-0000-0000-000000000005', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000005', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000005', '00000001-0000-0000-0000-000000000004'),
('30000001-0000-0000-0000-000000000005', '00000001-0000-0000-0000-000000000008'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000003'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000004'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000006', '00000001-0000-0000-0000-000000000006'),
('30000001-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000003'),
('30000001-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000004'),
('30000001-0000-0000-0000-000000000007', '00000001-0000-0000-0000-000000000007'),
('30000001-0000-0000-0000-000000000008', '00000001-0000-0000-0000-000000000001'),
('30000001-0000-0000-0000-000000000008', '00000001-0000-0000-0000-000000000002'),
('30000001-0000-0000-0000-000000000008', '00000001-0000-0000-0000-000000000005'),
('30000001-0000-0000-0000-000000000008', '00000001-0000-0000-0000-000000000006');

-- Insertion des avis
INSERT INTO avis (salle_id, client_id, note, titre, contenu, date_avis) VALUES
('30000001-0000-0000-0000-000000000001', '10000001-0000-0000-0000-000000000001', 5, 'Magnifique mariage!', 'Salle extraordinaire! Tout etait parfait, equipe tres professionnelle.', NOW() - INTERVAL '30 days'),
('30000001-0000-0000-0000-000000000001', '10000001-0000-0000-0000-000000000002', 5, 'Parfait!', 'L''equipement et la decoration etaient formidables.', NOW() - INTERVAL '25 days'),
('30000001-0000-0000-0000-000000000002', '10000001-0000-0000-0000-000000000001', 4, 'Tres bon', 'Belle salle, personnel attentif. Un peu bruyant vers 23h.', NOW() - INTERVAL '20 days'),
('30000001-0000-0000-0000-000000000003', '10000001-0000-0000-0000-000000000002', 5, 'Vue a couper le souffle', 'Vue sur la mer exceptionnelle! Les couchers de soleil sont magnifiques.', NOW() - INTERVAL '15 days'),
('30000001-0000-0000-0000-000000000004', '10000001-0000-0000-0000-000000000003', 4, 'Moderne et spacieuse', 'Excellente acoustique pour notre conference.', NOW() - INTERVAL '10 days'),
('30000001-0000-0000-0000-000000000005', '10000001-0000-0000-0000-000000000001', 5, 'Intime et charmant', 'Parfait pour un petit mariage. Ambiance tres chaleureuse.', NOW() - INTERVAL '5 days');

-- Insertion des réservations
INSERT INTO reservations (salle_id, client_id, date_debut, date_fin, nombre_personnes, prix_total, statut, notes) VALUES
('30000001-0000-0000-0000-000000000001', '10000001-0000-0000-0000-000000000001', '2024-05-15', '2024-05-15', 250, 250000, 'confirmee', 'Mariage avec cocktail'),
('30000001-0000-0000-0000-000000000002', '10000001-0000-0000-0000-000000000002', '2024-06-20', '2024-06-20', 180, 180000, 'confirmee', 'Anniversaire'),
('30000001-0000-0000-0000-000000000003', '10000001-0000-0000-0000-000000000003', '2024-07-10', '2024-07-10', 150, 150000, 'en_attente', 'Reunion familiale'),
('30000001-0000-0000-0000-000000000004', '10000001-0000-0000-0000-000000000001', '2024-08-05', '2024-08-05', 300, 200000, 'confirmee', 'Conference'),
('30000001-0000-0000-0000-000000000005', '10000001-0000-0000-0000-000000000002', '2024-09-12', '2024-09-12', 120, 120000, 'confirmee', 'Petit mariage intime');

-- ============================================
-- 4. VERIFICATION DES INSERTIONS
-- ============================================

SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Salles', COUNT(*) FROM salles
UNION ALL
SELECT 'Salle Images', COUNT(*) FROM salle_images
UNION ALL
SELECT 'Reservations', COUNT(*) FROM reservations
UNION ALL
SELECT 'Avis', COUNT(*) FROM avis
ORDER BY table_name;
