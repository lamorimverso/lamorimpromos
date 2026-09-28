const examples = ['PlayStation 5', 'RTX 5070', 'Nintendo Switch', 'iPhone'];

export function AlertsPanel() {
  return (
    <div className="alerts-preview">
      <div className="tool-heading alerts-heading">
        <div className="alerts-title-row">
          <span className="tool-kicker">Monitoramento inteligente</span>
          <span className="telegram-badge"><span aria-hidden="true">●</span> Integração Telegram: em breve</span>
        </div>
        <h2>Alertas de promoções</h2>
        <p>Monitore produtos e termos importantes. A estrutura já está pronta para receber as ofertas que depois serão processadas pelo Lamorim das Promoções.</p>
      </div>

      <div className="alert-composer" aria-labelledby="alert-question">
        <label id="alert-question" htmlFor="alert-preview-input">O que você quer monitorar?</label>
        <div className="alert-input-row">
          <input
            id="alert-preview-input"
            type="text"
            placeholder="Ex.: PlayStation 5, RTX 5070"
            disabled
            aria-describedby="alert-preview-help"
          />
          <button type="button" disabled aria-label="Adicionar alerta">+</button>
        </div>
        <p id="alert-preview-help">A criação real será ativada na etapa de integração com Telegram.</p>
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
            <span className="filter-label positive">+ Deve conter</span>
            <p>slim, digital, 1TB</p>
          </div>
          <div>
            <span className="filter-label negative">− Ignorar</span>
            <p>usado, recondicionado</p>
          </div>
        </div>
      </details>

      <section className="alerts-list" aria-labelledby="alerts-list-title">
        <div className="alerts-list-heading">
          <div>
            <span className="section-kicker">Monitoramento</span>
            <h3 id="alerts-list-title">Seus alertas</h3>
          </div>
          <span>0 ativos</span>
        </div>
        <div className="alert-empty-state">
          <span className="alert-empty-icon" aria-hidden="true">🔔</span>
          <div>
            <strong>Nenhum alerta criado ainda</strong>
            <p>Depois da integração com Telegram, seus termos monitorados, quantidade de ofertas e histórico aparecerão aqui.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
