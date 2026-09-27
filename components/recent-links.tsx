'use client';

type RecentLink = {
  provider: string;
  originalUrl: string;
  finalUrl: string;
  timestamp: number;
};

type Props = {
  items: RecentLink[];
};

function providerLabel(provider: string) {
  const labels: Record<string, string> = {
    amazon: 'Amazon',
    ebay: 'eBay',
    shein: 'Shein',
    lomadee: 'Lomadee',
    magalu: 'Magalu',
    mercadolivre: 'Mercado Livre',
    'mercado-livre': 'Mercado Livre',
    shopee: 'Shopee',
    aliexpress: 'AliExpress',
    awin: 'Awin',
    rakuten: 'Rakuten',
    petz: 'Petz',
  };
  return labels[provider] || provider || 'Link convertido';
}

export function RecentLinks({ items }: Props) {
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard é conveniência; abrir o link continua disponível.
    }
  }

  if (items.length === 0) return null;

  return (
    <section className="recent-section" aria-labelledby="recent-title">
      <div className="recent-heading">
        <h2 id="recent-title">Recentes</h2>
        <span>{items.length} {items.length === 1 ? 'link' : 'links'}</span>
      </div>

      <div className="recent-list">
        {items.map((item) => (
          <article className="recent-item" key={`${item.finalUrl}-${item.timestamp}`}>
            <div className="recent-thumb" aria-hidden="true">🛍️</div>
            <div className="recent-copy">
              <strong>{providerLabel(item.provider)}</strong>
              <div className="recent-actions">
                <a href={item.finalUrl} target="_blank" rel="noreferrer">Ver produto</a>
                <button type="button" onClick={() => copy(item.finalUrl)}>Copiar</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
