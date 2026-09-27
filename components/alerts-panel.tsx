const examples = ['PlayStation 5', 'RTX 5070', 'Nintendo Switch'];

export function AlertsPanel() {
  return (
    <div className="alerts-preview">
      <div className="tool-heading">
        <div className="alerts-title-row">
          <span className="tool-kicker">Prévia do módulo</span>
          <span className="preview-badge">Em preparação</span>
        </div>
        <h2>Crie alertas para as promoções que você quer encontrar</h2>
        <p>O layout já está organizado para monitoramento por palavra-chave. A conexão real com alertas será feita na próxima etapa.</p>
      </div>

      <div className="alerts-status" aria-label="Status do módulo de alertas">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <strong>Monitoramento ainda não conectado</strong>
          <span>Esta tela é somente a prévia visual do redesign.</span>
        </div>
      </div>

      <div className="alert-composer" aria-labelledby="alert-question">
        <label id="alert-question" htmlFor="alert-preview-input">O que você quer acompanhar?</label>
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
        <p id="alert-preview-help">Na versão funcional, você poderá criar, pausar e excluir alertas sem sair desta aba.</p>
      </div>

      <div className="alert-examples" aria-label="Exemplos de alertas">
        <span>Exemplos</span>
        <div className="alert-chips">
          {examples.map((example) => <span key={example}>{example}</span>)}
        </div>
      </div>

      <div className="alert-empty-state">
        <span className="alert-empty-icon" aria-hidden="true">🔔</span>
        <strong>Seus alertas aparecerão aqui</strong>
        <p>Depois da integração, cada alerta mostrará status, quantidade de ofertas encontradas e acesso ao histórico.</p>
      </div>
    </div>
  );
}
