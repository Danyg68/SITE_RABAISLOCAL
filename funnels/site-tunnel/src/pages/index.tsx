import Head from 'next/head';

// ========================================
// COMPOSANT : Bandeau noir supérieur
// ========================================
function TopBlackBanner() {
  return (
    <div className="bg-black text-white text-center py-2 text-sm">
      Fait partie des premiers Québécois à activer ta carte
    </div>
  );
}

// ========================================
// COMPOSANT : Bannière bleue principale
// ========================================
function BlueBanner() {
  return (
    <div className="bg-primary text-white text-center py-3 font-semibold">
      Fait partie des premiers Québécois à activer ta carte
    </div>
  );
}

// ========================================
// COMPOSANT : Section Hero (Logo + Accroches)
// ========================================
function HeroSection() {
  return (
    <section className="text-center py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo RabaisLocal */}
        <div className="mb-6">
          <img
            src="https://statics.myclickfunnels.com/workspace/jklqVP/image/17823503/file/d5fb15091926d11524543af90a9a5e26.png"
            alt="RabaisLocal"
            className="mx-auto max-w-[280px] md:max-w-[320px] h-auto"
          />
        </div>

        {/* Phrase d'accroche */}
        <p className="text-primary text-lg md:text-xl mb-3 px-4">
          Découvre comment économiser, vendre plus ou bâtir un revenu dès aujourd'hui.
        </p>

        {/* Slogan en gras */}
        <p className="text-[#1B2240] font-bold text-base md:text-lg">
          RabaisLocal, c'est LA solution locale faite pour toi.
        </p>
      </div>
    </section>
  );
}

// ========================================
// COMPOSANT : Section Vidéo YouTube
// ========================================
function VideoSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre de la section */}
        <h2 className="text-primary text-2xl md:text-3xl font-bold mb-3">
          🎥 Découvre en 1 minute ce qu'est RabaisLocal
        </h2>

        {/* Sous-titre */}
        <p className="text-gray-700 text-base md:text-lg mb-8 max-w-3xl mx-auto">
          Une plateforme 100 % québécoise qui connecte{' '}
          <strong>Consommateurs</strong>, <strong>Commerçants</strong> et{' '}
          <strong>Affiliés</strong> pour faire circuler la richesse locale.
        </p>

        {/* Conteneur vidéo responsive */}
        <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/qk4nJTvNO8k"
            title="C'est quoi RabaisLocal – Présentation rapide"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

// ========================================
// COMPOSANT : Carte de rôle (Consommateur, Commerçant, Affilié)
// ========================================
interface RoleCardProps {
  imageUrl: string;
  title: string;
  description: string;
  testimonial: string;
  author: string;
}

function RoleCard({ imageUrl, title, description, testimonial, author }: RoleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image du rôle */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu de la carte */}
      <div className="p-6 flex flex-col flex-1 text-center">
        {/* Titre du rôle */}
        <h3 className="text-primary text-xl font-bold mb-3">{title}</h3>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Citation / Témoignage */}
        <div className="border-t pt-4 mt-auto">
          <p className="italic text-gray-500 text-sm">
            {testimonial}
            <br />
            <span className="text-xs">– {author}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

// ========================================
// COMPOSANT : Section des 3 rôles
// ========================================
function RolesSection() {
  const roles = [
    {
      imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb4c?w=500&h=350&fit=crop",
      title: "Consommateur",
      description: "Découvre des offres exclusives et locales qui allègent ton budget dès aujourd'hui.",
      testimonial: "« J'en parle autour de moi, tout le monde veut embarquer! »",
      author: "Pierre B., Shawinigan"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=350&fit=crop",
      title: "Commerçant",
      description: "Attire plus de clients sans dépendre de gros sites ou payer des commissions folles.",
      testimonial: "« Je veux être là dès le départ! »",
      author: "Megan V., Québec"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=350&fit=crop",
      title: "Affilié",
      description: "Recommande RabaisLocal, aide ton monde et bâtis un revenu même en dormant – SANS VENTE!",
      testimonial: "« J'ai jamais pensé que ça pouvait aller aussi vite. »",
      author: "Bruno L., St-Hyacinthe"
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <RoleCard key={index} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// COMPOSANT : Section Mission
// ========================================
function MissionSection() {
  return (
    <section className="bg-secondary py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center border-2 border-primary/10">
          {/* Titre avec emoji coeur */}
          <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4">
            💙 Notre Mission
          </h2>

          {/* Texte de la mission */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-2">
            Acheter local. Économiser facilement. Bâtir un revenu durable.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Une plateforme <strong>locale, humaine et sans intermédiaire</strong> qui
            redonne le pouvoir à la communauté.
          </p>
        </div>
      </div>
    </section>
  );
}

// ========================================
// COMPOSANT : Section CTA "Rejoins le mouvement"
// ========================================
function CTASection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Titre avec emoji */}
        <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4">
          🚀 Rejoins le mouvement RabaisLocal
        </h2>

        {/* Sous-titre avec GRATUITE en rouge */}
        <p className="text-gray-700 text-base md:text-lg mb-8">
          <strong>
            Inscription 100 %{' '}
            <span className="text-accent font-bold">GRATUITE</span> et{' '}
            <u>sans engagement</u>.
          </strong>
        </p>

        {/* Bouton CTA principal */}
        <button className="bg-primary hover:bg-[#2d4189] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
          Je m'inscris gratuitement
        </button>
      </div>
    </section>
  );
}

// ========================================
// COMPOSANT : Footer
// ========================================
function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-6">
      <p className="text-sm md:text-base">
        © 2025 <strong>RabaisLocal</strong> — Fait avec 💙 au Québec
      </p>
    </footer>
  );
}

// ========================================
// COMPOSANT PRINCIPAL : Page d'accueil
// ========================================
export default function Home() {
  return (
    <>
      <Head>
        <title>RabaisLocal - Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Plateforme 100% québécoise qui connecte Consommateurs, Commerçants et Affiliés pour faire circuler la richesse locale."
        />
      </Head>

      {/* Structure de la page */}
      <div className="font-sans bg-secondary text-[#1B2240] min-h-screen">
        <TopBlackBanner />
        <BlueBanner />
        <HeroSection />
        <VideoSection />
        <RolesSection />
        <MissionSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
