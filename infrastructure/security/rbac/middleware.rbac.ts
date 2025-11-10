/**
 * RBAC MIDDLEWARE - Middleware de vérification des permissions
 */

import { checkPermission } from './permissions';
import { UserRole } from './roles';

export { checkPermission };

// Re-export pour utilisation dans auth.middleware
export function hasPermission(role: UserRole, permission: string): boolean {
  return checkPermission(role, permission);
}
