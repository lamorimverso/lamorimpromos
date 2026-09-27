import { BrandMark } from '@/components/brand-mark';
import { ToolSwitcher } from '@/components/tool-switcher';

export default function HomePage() {
  return (
    <main id="topo" className="site-page">
      <header className="site-hero">
        <div className="site-hero-inner">
          <BrandMark />
        </div>
      </header>

      <div className="site-content">
        <ToolSwitcher />

        <footer className="site-footer">
          <p>Links de afiliados. Ao usar, você concorda com nossos Termos de Uso.</p>
          <p>© 2026 Lamorim das Promoções.</p>
        </footer>
      </div>
    </main>
  );
}
