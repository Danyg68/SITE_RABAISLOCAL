import { sendToMake } from '../utils/webhook';

export default function FormInscription() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      first_name: { value: string };
      last_name: { value: string };
      email: { value: string };
    };
    const data = {
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      email: target.email.value,
      ref_code: new URLSearchParams(window.location.search).get('ref') || '',
    };
    const ok = await sendToMake(data);
    if (ok) window.location.href = '/merci';
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input name="first_name" placeholder="Prénom" required className="border p-2 rounded" />
      <input name="last_name" placeholder="Nom" required className="border p-2 rounded" />
      <input name="email" placeholder="Courriel" required type="email" className="border p-2 rounded" />
      <button type="submit" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Je m'inscris gratuitement
      </button>
    </form>
  );
}
