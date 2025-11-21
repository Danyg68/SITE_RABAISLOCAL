import Script from 'next/script';

export default function Offre() {
  return (
    <>
      <h1 className="text-2xl text-center text-primary mt-10 font-bold">Activer mon accès affilié</h1>
      <div id="paypal-button-container" className="max-w-md mx-auto mt-8" />
      <Script src={`https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID`} strategy="afterInteractive" />
      <Script id="paypal-init" strategy="afterInteractive">
        {`
          paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({
              purchase_units: [{ amount: { value: '47.00' } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(() => window.location.href = '/merci')
          }).render('#paypal-button-container');
        `}
      </Script>
    </>
  );
}
