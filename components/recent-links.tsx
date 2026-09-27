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

function displayUrl(value: string) {
  try {
    const url = new URL(value);
    return `${url.hostname.replace(/^www\./, '')}${url.pathname === '/' ? '' : url.pathname}`;
  } catch {
    return value;
  }
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
        <h2 id="recent-title">Recentes</h2>
        <span>{items.length} {items.length === 1 ? 'link' : 'links'}</span>
      </div>

      {items.length === 0 ? (
        <p className="recent-empty">Seus links convertidos nesta sessão aparecerão aqui.</p>
      ) : (
        <div className="recent-list">
          {items.map((item) => (
            <article className="recent-item" key={`${item.finalUrl}-${item.timestamp}`}>
              <div className="recent-copy">
                <strong>{providerLabel(item.provider)}</strong>
                <span title={item.finalUrl}>{displayUrl(item.finalUrl)}</span>
              </div>
              <div className="recent-actions">
                <button type="button" onClick={() => copy(item.finalUrl)}>Copiar</button>
                <a href={item.finalUrl} target="_blank" rel="noreferrer">Ver produto</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
