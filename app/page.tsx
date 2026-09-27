import { BrandMark } from '@/components/brand-mark';
import { LinkGenerator } from '@/components/link-generator';

export default function HomePage() {
  return (
    <main id="topo" className="site-page">
      <header className="site-hero">
        <div className="site-hero-inner">
          <BrandMark />
        </div>
      </header>

      <div className="site-content">
        <section className="generator-card" aria-labelledby="generator-title">
          <h2 id="generator-title">Gere seu link com desconto</h2>
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
