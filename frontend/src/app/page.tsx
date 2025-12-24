import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OfferCard from '@/components/OfferCard';
import PopularCategories from '@/components/PopularCategories';
import Footer from '@/components/Footer';

export default function Home() {
  // Données d'exemple pour les offres
  const featuredOffers = [
    {
      id: '1',
      title: 'Restaurant Le Gourmet',
      description: '- 20% de rabais',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      badge: {
        text: '20%',
        subtext: 'de rabais',
      },
      rating: 5,
    },
    {
      id: '2',
      title: 'Boutique Mode Locale',
      description: '- 2 pour 1',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      badge: {
        text: '2 pour',
        subtext: '1',
      },
      rating: 5,
    },
    {
      id: '3',
      title: 'Service de Réparation',
      description: '- 15% off',
      image: 'https://images.unsplash.com/photo-1581093458791-9d42e4e6b4e7?auto=format&fit=crop&w=800&q=80',
      badge: {
        text: '15%',
        subtext: 'off',
      },
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Featured Offers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredOffers.map((offer) => (
                <OfferCard key={offer.id} {...offer} />
              ))}
            </div>
          </div>
        </section>

        <PopularCategories />
      </main>

      <Footer />
    </div>
  );
}
