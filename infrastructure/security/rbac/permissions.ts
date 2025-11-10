/**
 * PERMISSIONS - Vérification des permissions RBAC
 */

import { UserRole, getRolePermissions } from './roles';

/**
 * Vérifier si un rôle a une permission spécifique
 *
 * @param role - Rôle utilisateur
 * @param permission - Permission requise (format: 'resource:action' ou 'resource:action:scope')
 * @returns true si le rôle a la permission
 *
 * @example
 * checkPermission('merchant', 'offers:create') // true
 * checkPermission('consumer', 'offers:create') // false
 * checkPermission('admin', 'users:delete') // true (admin a *)
 */
export function checkPermission(role: UserRole, permission: string): boolean {
  const permissions = getRolePermissions(role);

  // Admin a toutes les permissions
  if (permissions.includes('*:*')) {
    return true;
  }

  // Vérifier correspondance exacte
  if (permissions.includes(permission)) {
    return true;
  }

  // Vérifier wildcard (ex: 'offers:*' pour 'offers:create')
  const [resource, action] = permission.split(':');
  const wildcardPermission = `${resource}:*`;
  if (permissions.includes(wildcardPermission)) {
    return true;
  }

  return false;
}

/**
 * Vérifier plusieurs permissions (ET logique)
 */
export function checkAllPermissions(role: UserRole, requiredPermissions: string[]): boolean {
  return requiredPermissions.every(perm => checkPermission(role, perm));
}

/**
 * Vérifier plusieurs permissions (OU logique)
 */
export function checkAnyPermission(role: UserRole, requiredPermissions: string[]): boolean {
  return requiredPermissions.some(perm => checkPermission(role, perm));
}
