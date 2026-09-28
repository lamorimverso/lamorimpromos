'use client';

import { KeyboardEvent, useState } from 'react';
import { LinkGenerator } from '@/components/link-generator';
import { AlertsPanel } from '@/components/alerts-panel';

const partners = ['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'AliExpress', 'Shein', 'eBay', 'Petz'];
type Tool = 'links' | 'alerts';

export function ToolSwitcher() {
  const [activeTool, setActiveTool] = useState<Tool>('links');

  function focusTool(tool: Tool) {
    setActiveTool(tool);
    window.requestAnimationFrame(() => document.getElementById(`tab-${tool}`)?.focus());
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTool(activeTool === 'links' ? 'alerts' : 'links');
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusTool('links');
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusTool('alerts');
    }
  }

  return (
    <section className="tools-shell" aria-label="Ferramentas Lamorim das Promoções">
      <div className="tool-tabs" role="tablist" aria-label="Escolha uma ferramenta" aria-orientation="horizontal">
        <button
          id="tab-links"
          className={`tool-tab ${activeTool === 'links' ? 'is-active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTool === 'links'}
          aria-controls="panel-links"
          tabIndex={activeTool === 'links' ? 0 : -1}
          onClick={() => setActiveTool('links')}
          onKeyDown={handleTabKeyDown}
        >
          Gerar link
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
          onKeyDown={handleTabKeyDown}
        >
          Alertas
        </button>
      </div>

      {activeTool === 'links' ? (
        <div id="panel-links" className="tool-panel" role="tabpanel" aria-labelledby="tab-links">
          <div className="task-primary">
            <div className="tool-heading link-tool-heading">
              <h2>Gerar link de afiliado</h2>
              <p>Cole o link de uma loja compatível.</p>
            </div>

            <LinkGenerator />
          </div>

          <section className="partner-section" aria-labelledby="partners-title">
            <h3 id="partners-title">Lojas compatíveis</h3>
            <div className="partner-strip" aria-label="Lojas compatíveis com o conversor">
              {partners.map((partner) => <span key={partner}>{partner}</span>)}
            </div>
          </section>

          <details className="how-it-works">
            <summary>Como funciona</summary>
            <ol>
              <li><strong>Cole</strong> o link do produto.</li>
              <li><strong>Convertemos</strong> para o seu afiliado.</li>
              <li><strong>Copie</strong> o resultado e publique.</li>
            </ol>
          </details>
        </div>
      ) : (
        <div id="panel-alerts" className="tool-panel" role="tabpanel" aria-labelledby="tab-alerts">
          <AlertsPanel />
        </div>
      )}
    </section>
  );
}
