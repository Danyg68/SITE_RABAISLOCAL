// ============================================================================
// RABAISLOCAL - ROOT LAYOUT
// ============================================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RabaisLocal - Plateforme de Rabais Locaux Québécoise',
  description: 'Découvrez les meilleures offres et rabais exclusifs des commerces locaux au Québec. Zéro commission pour les commerçants.',
  keywords: 'rabais, promotions, Québec, commerce local, affiliation, économie locale',
  authors: [{ name: 'RabaisLocal' }],
  creator: 'RabaisLocal',
  publisher: 'RabaisLocal',
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://rabaislocal.com',
    siteName: 'RabaisLocal',
    title: 'RabaisLocal - Rabais Locaux au Québec',
    description: 'La plateforme québécoise de référence pour l\'économie locale intelligente',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RabaisLocal'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RabaisLocal - Rabais Locaux au Québec',
    description: 'La plateforme québécoise de référence pour l\'économie locale intelligente',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
