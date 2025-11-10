/**
 * AUTH MIDDLEWARE - Vérification authentification JWT + RBAC
 *
 * Vérifie le token JWT et les permissions selon le rôle utilisateur
 */

import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../../security/jwt/jwtService';
import { checkPermission } from '../../security/rbac/middleware.rbac';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'consumer' | 'merchant' | 'affiliate' | 'admin';
    permissions: string[];
  };
}

/**
 * Middleware d'authentification JWT
 * Vérifie le token dans l'en-tête Authorization
 */
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Récupérer le token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token d\'authentification manquant',
        code: 'MISSING_TOKEN'
      });
    }

    const token = authHeader.substring(7); // Retirer "Bearer "

    // Vérifier et décoder le token
    const decoded = await jwtService.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide ou expiré',
        code: 'INVALID_TOKEN'
      });
    }

    // Attacher les infos utilisateur à la requête
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      permissions: decoded.permissions || []
    };

    next();
  } catch (error) {
    console.error('Erreur authentification:', error);
    return res.status(401).json({
      success: false,
      error: 'Erreur lors de la vérification du token',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Middleware pour autoriser seulement certains rôles
 *
 * @param allowedRoles - Liste des rôles autorisés
 *
 * @example
 * router.get('/admin/users', authenticate, authorize(['admin']), getUsersHandler);
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Utilisateur non authentifié',
        code: 'NOT_AUTHENTICATED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Accès refusé - Rôle insuffisant',
        code: 'FORBIDDEN',
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Middleware pour vérifier une permission spécifique
 *
 * @param permission - Permission requise (ex: 'offers:create', 'users:read')
 *
 * @example
 * router.post('/offers', authenticate, requirePermission('offers:create'), createOfferHandler);
 */
export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Utilisateur non authentifié',
        code: 'NOT_AUTHENTICATED'
      });
    }

    const hasPermission = checkPermission(req.user.role, permission);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        error: 'Permission insuffisante',
        code: 'INSUFFICIENT_PERMISSION',
        requiredPermission: permission,
        userRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Middleware optionnel - Authentifie si token présent mais ne bloque pas
 * Utile pour les routes publiques qui peuvent bénéficier d'un contexte utilisateur
 */
export const optionalAuthenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = await jwtService.verifyToken(token);

      if (decoded) {
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          permissions: decoded.permissions || []
        };
      }
    }

    next();
  } catch (error) {
    // En cas d'erreur, on continue sans utilisateur authentifié
    next();
  }
};
