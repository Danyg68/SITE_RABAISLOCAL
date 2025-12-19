// ============================================================================
// AUTH SERVICE - Gestion de l'authentification
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'auth_token';
const CSRF_COOKIE_NAME = process.env.CSRF_COOKIE_NAME || 'csrf_token';

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

export interface AuthUser {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user?: AuthUser;
    token?: string;
  };
  error?: string;
}

const defaultJsonHeaders = {
  'Content-Type': 'application/json',
};

// Récupère un cookie non-httpOnly (utile pour un schéma double-submit CSRF)
function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';').map((c) => c.trim());
  const entry = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return entry ? entry.split('=')[1] : null;
}

function withCsrf(headers: Record<string, string>) {
  const csrfToken = getCookieValue(CSRF_COOKIE_NAME);
  return csrfToken ? { ...headers, 'X-CSRF-Token': csrfToken } : headers;
}

/**
 * Inscription d'un nouvel utilisateur (le backend doit définir un cookie httpOnly + secure)
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: withCsrf(defaultJsonHeaders),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erreur lors de l'inscription");
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
 * Connexion d'un utilisateur (le backend doit définir un cookie httpOnly + secure)
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: withCsrf(defaultJsonHeaders),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors de la connexion');
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
 * Déconnexion (attend que l'API supprime le cookie de session)
 */
export function logout(): void {
  fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).finally(() => {
    window.location.href = '/connexion';
  });
}

/**
 * Récupérer l'utilisateur connecté via l'API (session basée cookie)
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (typeof window === 'undefined') return null;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: withCsrf(defaultJsonHeaders),
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return (result?.data?.user as AuthUser) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur", error);
    return null;
  }
}

/**
 * Vérifier si l'utilisateur est connecté en s'appuyant sur la session serveur
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user);
}

/**
 * (Optionnel) Récupérer le token si le cookie n'est pas httpOnly
 */
export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';').map((c) => c.trim());
  const sessionCookie = cookies.find((cookie) => cookie.startsWith(`${SESSION_COOKIE_NAME}=`));
  return sessionCookie ? sessionCookie.split('=')[1] : null;
}
