const examples = ['PlayStation 5', 'RTX 5070', 'Nintendo Switch', 'iPhone'];

export function AlertsPanel() {
  return (
    <div className="alerts-preview">
      <div className="tool-heading alerts-heading">
        <h2>Alertas de promoções</h2>
        <p>Escolha o que você quer acompanhar.</p>
        <p className="integration-note">Telegram: integração em breve.</p>
      </div>

      <div className="alert-composer" aria-labelledby="alert-question">
        <label id="alert-question" htmlFor="alert-preview-input">O que você quer monitorar?</label>
        <div className="alert-input-row">
          <input
            id="alert-preview-input"
            type="text"
            placeholder="Ex.: PlayStation 5"
            disabled
            aria-describedby="alert-preview-help"
          />
          <button type="button" disabled aria-label="Adicionar alerta">Adicionar</button>
        </div>
        <p id="alert-preview-help">A criação será liberada quando a integração com Telegram estiver conectada.</p>
      </div>

      <div className="alert-examples" aria-label="Sugestões de alertas">
        <span>Sugestões</span>
        <div className="alert-chips">
          {examples.map((example) => <span key={example}>{example}</span>)}
        </div>
      </div>

      <details className="advanced-filters">
        <summary>Filtros avançados</summary>
        <div className="advanced-filter-grid">
          <div>
            <span className="filter-label positive">Deve conter</span>
            <p>slim, digital, 1TB</p>
          </div>
          <div>
            <span className="filter-label negative">Ignorar</span>
            <p>usado, recondicionado</p>
          </div>
        </div>
      </details>

      <section className="alerts-list" aria-labelledby="alerts-list-title">
        <div className="alerts-list-heading">
          <h3 id="alerts-list-title">Seus alertas</h3>
          <span>0 ativos</span>
        </div>
        <div className="alert-empty-state">
          <strong>Nenhum alerta criado ainda.</strong>
          <p>Quando a integração estiver ativa, seus alertas aparecerão aqui.</p>
        </div>
      </section>
    </div>
  );
}
