import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LamorimPromos | Gere seu link com desconto',
  description: 'Converta links de lojas parceiras em links de afiliado do LamorimPromos.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
