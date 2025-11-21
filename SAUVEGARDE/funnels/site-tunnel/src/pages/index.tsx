import Head from 'next/head';

type Role = {
  imageUrl: string;
  title: string;
  description: string;
  testimonial: string;
  author: string;
};

function BlueBanner() {
  return (
    <div className="bg-indigo-600 text-white text-center py-2 text-sm">
      Fait partie des premiers Québécois à activer ta carte
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6">
          <img
            src="https://statics.myclickfunnels.com/workspace/jklqVP/image/17823503/file/d5fb15091926d11524543af90a9a5e26.png"
            alt="Logo RabaisLocal"
            className="mx-auto max-w-[320px] h-auto"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-3">
          Découvre comment économiser, vendre plus ou bâtir un revenu dès aujourd'hui.
        </h1>

        <p className="text-slate-700 text-base md:text-lg font-semibold">
          RabaisLocal, c'est LA solution locale faite pour toi.
        </p>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-indigo-700 text-2xl md:text-3xl font-bold mb-3">
          Découvre en 1 minute ce qu'est RabaisLocal
        </h2>
        <p className="text-slate-700 text-base md:text-lg mb-8 max-w-3xl mx-auto">
          Une plateforme 100 % québécoise qui connecte <strong>Consommateurs</strong>,{' '}
          <strong>Commerçants</strong> et <strong>Affiliés</strong> pour faire circuler la richesse locale.
        </p>

        <div className="relative max-w-3xl mx-auto pt-[56.25%]">
          <iframe
            src="https://www.youtube.com/embed/qk4nJTvNO8k"
            title="C'est quoi RabaisLocal ? Présentation rapide"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

function RoleCard({ imageUrl, title, description, testimonial, author }: Role) {
  return (
    <article className="bg-white rounded-xl shadow transition-transform duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col overflow-hidden">
      <div className="w-full h-44 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-1 text-center">
        <h3 className="text-indigo-700 text-lg font-semibold mb-3">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{description}</p>
        <div className="border-t border-slate-200 pt-4 mt-auto">
          <p className="italic text-slate-500 text-sm">
            {testimonial}
            <br />
            <span className="text-xs">— {author}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

function RolesSection() {
  const roles: Role[] = [
    {
      imageUrl: '/images/consommateur.png',
      title: 'Consommateur',
      description: "Découvre des offres exclusives et locales qui allègent ton budget dès aujourd'hui.",
      testimonial: "« J'en parle autour de moi, tout le monde veut embarquer ! »",
      author: 'Pierre B., Shawinigan',
    },
    {
      imageUrl: '/images/cie.png',
      title: 'Commerçant',
      description:
        'Attire plus de clients sans dépendre de gros sites ni payer des commissions folles.',
      testimonial: '« Je veux être là dès le départ ! »',
      author: 'Megan V., Québec',
    },
    {
      imageUrl: '/images/image_affilie.png',
      title: 'Affilié',
      description:
        'Recommande RabaisLocal, aide ton monde et bâtis un revenu même en dormant — SANS VENTE !',
      testimonial: "« J'ai jamais pensé que ça pouvait aller aussi vite. »",
      author: 'Bruno L., St‑Hyacinthe',
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <RoleCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-8 md:p-12 text-center border border-indigo-200">
          <h2 className="text-indigo-700 text-2xl md:text-3xl font-bold mb-4">Notre Mission</h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-2">
            Acheter local. Économiser facilement. Bâtir un revenu durable.
          </p>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            Une plateforme <strong>locale, humaine et sans intermédiaire</strong> qui redonne le
            pouvoir à la communauté.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-indigo-700 text-2xl md:text-3xl font-bold mb-4">
          Rejoins le mouvement RabaisLocal
        </h2>
        <p className="text-slate-700 text-base md:text-lg mb-8">
          <strong>
            Inscription 100 % <span className="text-rose-600">GRATUITE</span> et <u>sans engagement</u>.
          </strong>
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
          Je m'inscris gratuitement
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-700 text-white text-center py-6">
      <p className="text-sm md:text-base">
        © 2025 <strong>RabaisLocal</strong> — Fait avec ❤️ au Québec
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>RabaisLocal — Accueil</title>
        <meta name="description" content="Solution locale pour consommateurs, commerçants et affiliés." />
      </Head>
      <BlueBanner />
      <HeroSection />
      <VideoSection />
      <RolesSection />
      <MissionSection />
      <CTASection />
      <Footer />
    </>
  );
}
