// ============================================================================
// PAGE DASHBOARD - Tableau de bord utilisateur
// ============================================================================

import DashboardLayout from '@/components/DashboardLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord - RabaisLocal',
  description: 'Accédez à votre tableau de bord RabaisLocal et gérez vos rabais exclusifs.',
};

export default function DashboardPage() {
  return <DashboardLayout />;
}
