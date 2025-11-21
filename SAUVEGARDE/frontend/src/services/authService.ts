// ============================================================================
// AUTH SERVICE - Gestion de l'authentification
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: 'consumer' | 'merchant' | 'affiliate';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: {
      id: string;
      email: string;
      prenom: string;
      nom: string;
      role: string;
    };
    token: string;
  };
  error?: string;
}

/**
 * Inscription d'un nouvel utilisateur
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors de l\'inscription');
    }

    // Sauvegarder le token dans localStorage
    if (result.data?.token) {
      localStorage.setItem('auth_token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  } catch (error) {
    console.error('Erreur inscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Connexion d'un utilisateur
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors de la connexion');
    }

    // Sauvegarder le token dans localStorage
    if (result.data?.token) {
      localStorage.setItem('auth_token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  } catch (error) {
    console.error('Erreur connexion:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Déconnexion
 */
export function logout(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  window.location.href = '/connexion';
}

/**
 * Récupérer l'utilisateur connecté
 */
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Vérifier si l'utilisateur est connecté
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('auth_token');
  return !!token;
}

/**
 * Récupérer le token d'authentification
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem('auth_token');
}
