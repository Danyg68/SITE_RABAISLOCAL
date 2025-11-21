/**
 * RATE LIMITING MIDDLEWARE
 *
 * Limite le nombre de requêtes par IP ou par utilisateur
 */

import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

// Configuration des limiteurs
const limiters = {
  // Limites globales par IP
  global: new RateLimiterMemory({
    points: 100, // 100 requêtes
    duration: 60, // par minute
  }),

  // Limites pour authentification (plus strictes)
  auth: new RateLimiterMemory({
    points: 5, // 5 tentatives
    duration: 300, // par 5 minutes
  }),

  // Limites pour webhooks externes
  webhook: new RateLimiterMemory({
    points: 10, // 10 webhooks
    duration: 60, // par minute
  }),

  // Limites pour IA (coûteux)
  ai: new RateLimiterMemory({
    points: 20, // 20 requêtes IA
    duration: 3600, // par heure
  }),

  // Limites pour création de contenu (merchants)
  creation: new RateLimiterMemory({
    points: 50, // 50 créations
    duration: 3600, // par heure
  }),
};

/**
 * Middleware de rate limiting générique
 *
 * @param limiterType - Type de limiteur à utiliser
 */
export const rateLimit = (limiterType: keyof typeof limiters = 'global') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limiter = limiters[limiterType];

      // Utiliser l'IP comme clé (ou user ID si authentifié)
      const key = req.ip || req.socket.remoteAddress || 'unknown';

      await limiter.consume(key);

      next();
    } catch (rateLimiterRes) {
      const error = rateLimiterRes as RateLimiterRes;

      // Calculer le temps d'attente en secondes
      const retryAfter = Math.ceil(error.msBeforeNext / 1000);

      res.set('Retry-After', String(retryAfter));
      res.set('X-RateLimit-Limit', String(limiters[limiterType].points));
      res.set('X-RateLimit-Remaining', String(error.remainingPoints));
      res.set('X-RateLimit-Reset', String(new Date(Date.now() + error.msBeforeNext).toISOString()));

      return res.status(429).json({
        success: false,
        error: 'Trop de requêtes. Veuillez réessayer plus tard.',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: retryAfter,
        message: `Limite de ${limiters[limiterType].points} requêtes atteinte. Réessayez dans ${retryAfter} secondes.`
      });
    }
  };
};

/**
 * Rate limiting par utilisateur authentifié
 * Utilise le user ID au lieu de l'IP
 */
export const rateLimitByUser = (limiterType: keyof typeof limiters = 'global') => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const limiter = limiters[limiterType];

      // Utiliser le user ID si authentifié, sinon l'IP
      const key = req.user?.id || req.ip || 'unknown';

      await limiter.consume(key);

      next();
    } catch (rateLimiterRes) {
      const error = rateLimiterRes as RateLimiterRes;
      const retryAfter = Math.ceil(error.msBeforeNext / 1000);

      res.set('Retry-After', String(retryAfter));

      return res.status(429).json({
        success: false,
        error: 'Limite de requêtes atteinte',
        code: 'USER_RATE_LIMIT_EXCEEDED',
        retryAfter: retryAfter
      });
    }
  };
};

// Export des middlewares pré-configurés
export const globalRateLimit = rateLimit('global');
export const authRateLimit = rateLimit('auth');
export const webhookRateLimit = rateLimit('webhook');
export const aiRateLimit = rateLimit('ai');
export const creationRateLimit = rateLimit('creation');
