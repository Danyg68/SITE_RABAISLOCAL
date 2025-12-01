'use client';

// ============================================================================
// DASHBOARD LAYOUT - Layout du tableau de bord utilisateur
// ============================================================================

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, type AuthUser } from '@/services/authService';

export default function DashboardLayout() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      const currentUser = await getCurrentUser();

      if (!isMounted) return;

      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        router.push('/connexion');
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E53A5] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur, ne rien afficher (redirection en cours)
  if (!user) {
    return null;
  }

  // Mapper les rôles vers des labels en français
  const getRoleLabel = (role: string): string => {
    const roleMap: Record<string, string> = {
      consumer: 'Consommateur',
      merchant: 'Commerçant',
      affiliate: 'Affilié',
      admin: 'Administrateur',
    };
    return roleMap[role] || role;
  };

  // Obtenir la couleur du badge selon le rôle
  const getRoleBadgeColor = (role: string): string => {
    const colorMap: Record<string, string> = {
      consumer: 'bg-blue-100 text-blue-800',
      merchant: 'bg-green-100 text-green-800',
      affiliate: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800',
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#F5F8FF]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo / Titre */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#3E53A5]">RabaisLocal</h1>
            </div>

            {/* User info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user.prenom} {user.nom}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm py-2 px-4"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue, {user.prenom} ! 👋
              </h2>
              <p className="text-gray-600">
                Ravi de vous revoir sur votre tableau de bord RabaisLocal.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profil</p>
                <p className="text-2xl font-bold text-gray-900">Actif</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Statut</p>
                <p className="text-2xl font-bold text-gray-900">Vérifié</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Membre depuis</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date().toLocaleDateString('fr-CA')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="card bg-gradient-to-r from-[#3E53A5] to-[#5A6FBF] text-white">
          <h3 className="text-2xl font-bold mb-4">Prochaines étapes</h3>
          <p className="mb-6 opacity-90">
            Complétez votre profil et commencez à profiter des rabais exclusifs de votre région !
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-[#3E53A5] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Compléter mon profil
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30">
              Explorer les offres
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} RabaisLocal - Fait avec ❤️ pour l'économie locale
            québécoise
          </p>
        </div>
      </footer>
    </div>
  );
}
