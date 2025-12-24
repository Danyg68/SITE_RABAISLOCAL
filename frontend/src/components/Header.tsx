'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-white rounded-full px-4 py-2">
              <span className="text-blue-700 font-bold text-lg">RABAIS</span>
              <span className="text-red-600 font-bold text-lg">LOCAL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/offres" className="hover:text-gray-200 transition">
              Offres
            </Link>
            <Link href="/categories" className="hover:text-gray-200 transition">
              Catégories
            </Link>
            <Link href="/a-propos" className="hover:text-gray-200 transition">
              À propos
            </Link>
            <Link href="/contact" className="hover:text-gray-200 transition">
              Contact
            </Link>
            <Link
              href="/connexion"
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Se connecter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/offres"
              className="block hover:text-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Offres
            </Link>
            <Link
              href="/categories"
              className="block hover:text-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Catégories
            </Link>
            <Link
              href="/a-propos"
              className="block hover:text-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="block hover:text-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/connexion"
              className="block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Se connecter
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
