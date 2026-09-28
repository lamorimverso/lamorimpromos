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

  return (
    <section className="recent-section" aria-labelledby="recent-title">
      <div className="recent-heading">
        <h2 id="recent-title">Links recentes</h2>
        <span>{items.length} {items.length === 1 ? 'link' : 'links'}</span>
      </div>

      {items.length === 0 ? (
        <div className="recent-empty">
          <strong>Nenhum link gerado ainda.</strong>
          <p>Os links desta sessão aparecem aqui.</p>
        </div>
      ) : (
        <div className="recent-list">
          {items.map((item) => (
            <article className="recent-item" key={`${item.finalUrl}-${item.timestamp}`}>
              <div className="recent-copy">
                <strong>{providerLabel(item.provider)}</strong>
                <span className="recent-url">{item.finalUrl}</span>
                <div className="recent-actions">
                  <button type="button" onClick={() => copy(item.finalUrl)}>Copiar</button>
                  <a href={item.finalUrl} target="_blank" rel="noreferrer">Abrir oferta ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
