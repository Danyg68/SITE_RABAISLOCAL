/**
 * JWT SERVICE - Génération et validation de tokens JWT
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // 7 jours
const REFRESH_TOKEN_EXPIRES_IN = '30d'; // 30 jours

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'consumer' | 'merchant' | 'affiliate' | 'admin';
  permissions?: string[];
}

export interface DecodedToken extends JWTPayload {
  iat: number;
  exp: number;
}

class JWTService {
  /**
   * Générer un access token
   */
  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'rabaislocal',
      audience: 'rabaislocal-api'
    });
  }

  /**
   * Générer un refresh token
   */
  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    });
  }

  /**
   * Vérifier et décoder un token
   */
  verifyToken(token: string): DecodedToken | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'rabaislocal',
        audience: 'rabaislocal-api'
      }) as DecodedToken;

      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Décoder un token sans vérifier (pour debug)
   */
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwt.decode(token) as DecodedToken;
    } catch (error) {
      return null;
    }
  }
}

export const jwtService = new JWTService();
