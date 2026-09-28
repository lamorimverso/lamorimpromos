import type { Metadata } from 'next';
import './globals.css';
import './task-first.css';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const repositoryOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repositoryName);
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath = isGitHubPagesBuild && !isUserSite ? `/${repositoryName}` : '';
const avatarPath = `${basePath}/lamorimpromos-avatar.png`;

export const metadata: Metadata = {
  title: 'Lamorim das Promoções | Gere seu link com desconto',
  description: 'Seu canal de promoções em games, tech, geek e muito mais. Converta links de lojas parceiras em links de afiliado do Lamorim das Promoções.',
  icons: {
    icon: avatarPath,
    apple: avatarPath,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
