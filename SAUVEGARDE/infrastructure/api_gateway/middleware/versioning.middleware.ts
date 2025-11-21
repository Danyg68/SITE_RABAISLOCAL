/**
 * API VERSIONING MIDDLEWARE
 *
 * Gère les versions d'API (v1, v2, etc.)
 */

import { Request, Response, NextFunction } from 'express';

export type ApiVersion = 'v1' | 'v2' | 'v3';

/**
 * Middleware pour extraire la version de l'API depuis l'URL ou le header
 *
 * @example
 * URL: /api/v1/users → req.apiVersion = 'v1'
 * Header: Accept-Version: v2 → req.apiVersion = 'v2'
 */
export const extractApiVersion = (req: any, res: Response, next: NextFunction) => {
  // Méthode 1: Depuis l'URL (/api/v1/...)
  const urlMatch = req.path.match(/\/api\/(v\d+)\//);
  if (urlMatch) {
    req.apiVersion = urlMatch[1] as ApiVersion;
    return next();
  }

  // Méthode 2: Depuis le header Accept-Version
  const headerVersion = req.headers['accept-version'];
  if (headerVersion) {
    req.apiVersion = headerVersion as ApiVersion;
    return next();
  }

  // Par défaut: v1
  req.apiVersion = 'v1';
  next();
};

/**
 * Middleware pour vérifier que la version requise est supportée
 *
 * @param supportedVersions - Versions supportées pour cette route
 */
export const requireVersion = (supportedVersions: ApiVersion[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const currentVersion = req.apiVersion || 'v1';

    if (!supportedVersions.includes(currentVersion)) {
      return res.status(400).json({
        success: false,
        error: `Version d'API non supportée: ${currentVersion}`,
        code: 'UNSUPPORTED_API_VERSION',
        supportedVersions: supportedVersions,
        currentVersion: currentVersion
      });
    }

    next();
  };
};

/**
 * Middleware pour marquer une version comme dépréciée
 *
 * @param deprecatedVersion - Version dépréciée
 * @param sunsetDate - Date de fin de support (ISO string)
 * @param migrationGuide - URL du guide de migration
 */
export const deprecateVersion = (
  deprecatedVersion: ApiVersion,
  sunsetDate: string,
  migrationGuide?: string
) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.apiVersion === deprecatedVersion) {
      // Ajouter headers de dépréciation
      res.set('Deprecation', 'true');
      res.set('Sunset', sunsetDate);
      if (migrationGuide) {
        res.set('Link', `<${migrationGuide}>; rel="deprecation"`);
      }

      // Ajouter un warning dans la réponse
      const originalJson = res.json;
      res.json = function (data: any) {
        if (typeof data === 'object') {
          data._warning = {
            message: `L'API ${deprecatedVersion} est dépréciée`,
            sunsetDate: sunsetDate,
            migrationGuide: migrationGuide || 'https://docs.rabaislocal.com/api/migration'
          };
        }
        return originalJson.call(this, data);
      };
    }

    next();
  };
};

/**
 * Middleware pour router vers différents handlers selon la version
 *
 * @param versionHandlers - Map des versions vers leurs handlers
 *
 * @example
 * router.get('/users',
 *   extractApiVersion,
 *   versionRouter({
 *     v1: getUsersV1,
 *     v2: getUsersV2
 *   })
 * );
 */
export const versionRouter = (versionHandlers: Partial<Record<ApiVersion, any>>) => {
  return (req: any, res: Response, next: NextFunction) => {
    const version = req.apiVersion || 'v1';
    const handler = versionHandlers[version];

    if (!handler) {
      return res.status(400).json({
        success: false,
        error: `Pas de handler disponible pour la version ${version}`,
        code: 'NO_HANDLER_FOR_VERSION',
        availableVersions: Object.keys(versionHandlers)
      });
    }

    return handler(req, res, next);
  };
};
