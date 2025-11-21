// ============================================================================
// RABAISLOCAL - BACKEND API SERVER
// ============================================================================
// Description: Point d'entrée principal du serveur backend
// Version: 1.0.0
// Date: 2025-11-09
// ============================================================================

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Charger les variables d'environnement
dotenv.config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================================================
// INITIALISATION DE L'APPLICATION
// ============================================================================

const app: Application = express();

// ============================================================================
// MIDDLEWARE GLOBAL
// ============================================================================

// Sécurité
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: '1.0.0'
  });
});

// ============================================================================
// ROUTE PRINCIPALE
// ============================================================================

app.get('/', (req, res) => {
  res.json({
    message: '🎉 Bienvenue sur l\'API RabaisLocal',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health'
  });
});

// ============================================================================
// GESTION DES ERREURS 404
// ============================================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    path: req.path
  });
});

// ============================================================================
// DÉMARRAGE DU SERVEUR
// ============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     🚀 RabaisLocal API Server Started     ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║ Port:        ${PORT}                         ║`);
  console.log(`║ Environment: ${NODE_ENV.padEnd(21)}║`);
  console.log(`║ URL:         http://localhost:${PORT}      ║`);
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
});

// ============================================================================
// GESTION ARRÊT GRACIEUX
// ============================================================================

process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt gracieux du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT reçu. Arrêt gracieux du serveur...');
  process.exit(0);
});

export default app;
