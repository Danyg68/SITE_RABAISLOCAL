// ============================================================================
// PAGE INSCRIPTION - Page d'inscription utilisateur
// ============================================================================

import FormInscription from '@/components/FormInscription';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription - RabaisLocal',
  description: 'Créez votre compte RabaisLocal et profitez des rabais exclusifs des commerces locaux au Québec.',
};

export default function InscriptionPage() {
  return (
    <div className="page-container">
      <div className="form-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Rejoignez RabaisLocal
          </h1>
          <p className="text-gray-600">
            Créez votre compte et profitez des meilleurs rabais locaux
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <FormInscription />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            En vous inscrivant, vous acceptez nos{' '}
            <a href="/conditions" className="text-[#3E53A5] hover:underline">
              conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="/confidentialite" className="text-[#3E53A5] hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Rabais exclusifs</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Commerce local</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">IA personnalisée</p>
          </div>
        </div>
      </div>
    </div>
  );
}
