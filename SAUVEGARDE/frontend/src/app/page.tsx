// ============================================================================
// RABAISLOCAL - HOME PAGE
// ============================================================================

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🎉 Bienvenue sur RabaisLocal
        </h1>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">
            La Plateforme Québécoise de Rabais Locaux
          </h2>
          <p className="text-lg mb-4">
            Zéro commission • IA Intelligente • Économie Locale
          </p>
          <ul className="space-y-2">
            <li>✅ Consommateurs : Rabais exclusifs</li>
            <li>✅ Commerçants : Visibilité sans commission</li>
            <li>✅ Affiliés : Revenu passif automatisé</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Version 1.0.0 - En développement</p>
          <p className="text-sm mt-2">Fait avec ❤️ pour l'économie locale québécoise</p>
        </div>
      </div>
    </main>
  );
}
