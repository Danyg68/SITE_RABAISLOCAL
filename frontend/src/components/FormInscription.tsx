'use client';

// ============================================================================
// FORM INSCRIPTION - Formulaire d'inscription utilisateur
// ============================================================================

import { useState } from 'react';
import { register, type RegisterData } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function FormInscription() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'consumer',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Gestion des changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
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
    setSuccessMessage('');

    try {
      const result = await register(formData);

      if (result.success) {
        setSuccessMessage('Inscription réussie ! Redirection...');
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          role: 'consumer',
        });

        // Rediriger vers le dashboard après 2 secondes
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setErrors({ submit: result.error || 'Erreur lors de l\'inscription' });
      }
    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Message de succès */}
      {successMessage && (
        <div className="success-message">
          <p className="font-medium">✓ {successMessage}</p>
        </div>
      )}

      {/* Erreur générale */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          <p className="text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Prénom */}
      <div>
        <label htmlFor="prenom" className="label-field">
          Prénom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          className={`input-field ${errors.prenom ? 'border-red-500' : ''}`}
          placeholder="Votre prénom"
        />
        {errors.prenom && <p className="error-message">{errors.prenom}</p>}
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="nom" className="label-field">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className={`input-field ${errors.nom ? 'border-red-500' : ''}`}
          placeholder="Votre nom"
        />
        {errors.nom && <p className="error-message">{errors.nom}</p>}
      </div>

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
          placeholder="Minimum 8 caractères"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {/* Rôle */}
      <div>
        <label htmlFor="role" className="label-field">
          Rôle <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input-field"
        >
          <option value="consumer">Consommateur</option>
          <option value="merchant">Commerçant</option>
          <option value="affiliate">Affilié</option>
        </select>
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
            Inscription en cours...
          </span>
        ) : (
          "S'inscrire"
        )}
      </button>

      {/* Lien vers connexion */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Vous avez déjà un compte ?{' '}
        <a href="/connexion" className="text-[#3E53A5] hover:underline font-medium">
          Se connecter
        </a>
      </p>
    </form>
  );
}
