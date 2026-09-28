'use client';

import { useState } from 'react';
import { LinkGenerator } from '@/components/link-generator';
import { AlertsPanel } from '@/components/alerts-panel';

const partners = ['Amazon', 'Shopee', 'Mercado Livre', 'Magalu', 'AliExpress', 'Shein', 'eBay', 'Petz'];

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
          <div className="tool-heading link-tool-heading">
            <span className="tool-kicker">Conversor de afiliados</span>
            <h2>Transforme o link do produto no seu link de afiliado</h2>
            <p>Cole um link compatível. Identificamos a loja e só liberamos o resultado quando o conversor confirmar que está pronto para publicação.</p>
          </div>

          <LinkGenerator />

          <section className="partner-section" aria-labelledby="partners-title">
            <div className="section-heading-inline">
              <span className="section-kicker">Cobertura</span>
              <h3 id="partners-title">Lojas compatíveis</h3>
            </div>
            <div className="partner-strip">
              {partners.map((partner) => <span key={partner}>{partner}</span>)}
            </div>
          </section>

          <section className="flow-section" aria-labelledby="flow-title">
            <div className="section-heading-inline">
              <span className="section-kicker">Simples e seguro</span>
              <h3 id="flow-title">Como funciona</h3>
            </div>
            <div className="flow-grid">
              <article className="flow-step">
                <span>01</span>
                <strong>Cole o link</strong>
                <p>Use a URL do produto de uma loja compatível.</p>
              </article>
              <article className="flow-step">
                <span>02</span>
                <strong>Nós convertemos</strong>
                <p>O Lamorim identifica a loja e processa o seu afiliado.</p>
              </article>
              <article className="flow-step">
                <span>03</span>
                <strong>Pronto para divulgar</strong>
                <p>O link só aparece como sucesso depois da validação.</p>
              </article>
            </div>
          </section>
        </div>
      ) : (
        <div id="panel-alerts" className="tool-panel" role="tabpanel" aria-labelledby="tab-alerts">
          <AlertsPanel />
        </div>
      )}
    </section>
  );
}
