'use client';

import { useState } from 'react';
import { LinkGenerator } from '@/components/link-generator';
import { AlertsPanel } from '@/components/alerts-panel';

export function ToolSwitcher() {
  const [activeTool, setActiveTool] = useState<'links' | 'alerts'>('links');

  return (
    <section className="tools-shell" aria-label="Ferramentas Lamorim das Promoções">
      <div className="tool-tabs" role="tablist" aria-label="Escolha uma ferramenta">
        <button
          id="tab-links"
          className={`tool-tab ${activeTool === 'links' ? 'is-active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTool === 'links'}
          aria-controls="panel-links"
          tabIndex={activeTool === 'links' ? 0 : -1}
          onClick={() => setActiveTool('links')}
        >
          <span aria-hidden="true">🔗</span> Gerar link
        </button>
        <button
          id="tab-alerts"
          className={`tool-tab ${activeTool === 'alerts' ? 'is-active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTool === 'alerts'}
          aria-controls="panel-alerts"
          tabIndex={activeTool === 'alerts' ? 0 : -1}
          onClick={() => setActiveTool('alerts')}
        >
          <span aria-hidden="true">🔔</span> Alertas
        </button>
      </div>

      {activeTool === 'links' ? (
        <div id="panel-links" className="tool-panel" role="tabpanel" aria-labelledby="tab-links">
          <div className="tool-heading">
            <span className="tool-kicker">Conversor de afiliados</span>
            <h2>Transforme o link do produto no seu link de afiliado</h2>
            <p>Cole um link compatível. A loja é identificada e o resultado só é liberado após validação do conversor.</p>
          </div>
          <LinkGenerator />
        </div>
      ) : (
        <div id="panel-alerts" className="tool-panel" role="tabpanel" aria-labelledby="tab-alerts">
          <AlertsPanel />
        </div>
      )}
    </section>
  );
}
