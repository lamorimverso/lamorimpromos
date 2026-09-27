import { BrandMark } from '@/components/brand-mark';
import { LinkGenerator } from '@/components/link-generator';

export default function HomePage() {
  return (
    <main id="topo" className="site-page">
      <div className="site-shell">
        <header className="site-header">
          <BrandMark />
          <p className="site-tagline">Descontos exclusivos para você</p>
        </header>

        <section className="generator-section" aria-labelledby="generator-title">
          <h1 id="generator-title">Gere seu link com desconto</h1>
          <p className="generator-help">
            Cole um link válido de uma loja parceira do LamorimPromos.
          </p>
          <LinkGenerator />
        </section>

        <footer className="site-footer">
          <p>Links de afiliados. Ao usar, você concorda com nossos Termos de Uso.</p>
          <p>© 2026 LamorimPromos.</p>
        </footer>
      </div>
    </main>
  );
}
