'use client';

// ============================================================================
// FORM CONNEXION - Formulaire de connexion utilisateur
// ============================================================================

import { useState } from 'react';
import { login, type LoginData } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function FormConnexion() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Gestion des changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        // Rediriger vers le dashboard
        router.push('/dashboard');
      } else {
        setErrors({ submit: result.error || 'Email ou mot de passe incorrect' });
      }
    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Erreur générale */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          <p className="text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-field">
          Courriel <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
          placeholder="votre@email.com"
          autoComplete="email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="label-field">
          Mot de passe <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`input-field ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Votre mot de passe"
          autoComplete="current-password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {/* Lien mot de passe oublié */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#3E53A5] focus:ring-[#3E53A5] border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <a
            href="/mot-de-passe-oublie"
            className="text-[#3E53A5] hover:underline font-medium"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Connexion en cours...
          </span>
        ) : (
          'Se connecter'
        )}
      </button>

      {/* Lien vers inscription */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Vous n'avez pas de compte ?{' '}
        <a href="/inscription" className="text-[#3E53A5] hover:underline font-medium">
          S'inscrire
        </a>
      </p>
    </form>
  );
}
