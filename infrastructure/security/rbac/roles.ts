/**
 * ROLES - Définition des rôles utilisateurs
 */

export type UserRole = 'consumer' | 'merchant' | 'affiliate' | 'admin';

export interface RoleDefinition {
  name: UserRole;
  description: string;
  permissions: string[];
}

/**
 * Définition complète des rôles et permissions
 */
export const ROLES: Record<UserRole, RoleDefinition> = {
  consumer: {
    name: 'consumer',
    description: 'Consommateur - Cherche et utilise des rabais',
    permissions: [
      'offers:read',
      'offers:search',
      'offers:activate',
      'offers:favorite',
      'profile:read',
      'profile:update',
      'reviews:create',
      'reviews:read',
    ]
  },

  merchant: {
    name: 'merchant',
    description: 'Commerçant - Crée et gère des offres',
    permissions: [
      'offers:read',
      'offers:create',
      'offers:update:own',
      'offers:delete:own',
      'offers:stats',
      'credits:read',
      'credits:purchase',
      'profile:read',
      'profile:update',
      'ai:generate:content',
      'reviews:read',
    ]
  },

  affiliate: {
    name: 'affiliate',
    description: 'Affilié - Génère du trafic via liens parrainage',
    permissions: [
      'offers:read',
      'affiliate:links:create',
      'affiliate:links:read',
      'affiliate:commissions:read',
      'affiliate:payouts:read',
      'affiliate:payouts:request',
      'profile:read',
      'profile:update',
      'ai:recommendations',
    ]
  },

  admin: {
    name: 'admin',
    description: 'Administrateur - Accès total',
    permissions: [
      '*:*', // Toutes les permissions
    ]
  },
};

/**
 * Vérifier si un rôle existe
 */
export function isValidRole(role: string): role is UserRole {
  return role in ROLES;
}

/**
 * Obtenir les permissions d'un rôle
 */
export function getRolePermissions(role: UserRole): string[] {
  return ROLES[role]?.permissions || [];
}
