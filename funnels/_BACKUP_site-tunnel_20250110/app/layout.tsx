import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Site Tunnel - RabaisLocal",
  description: "Funnel de conversion RabaisLocal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
