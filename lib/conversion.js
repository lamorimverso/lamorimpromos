const DEFAULT_ERROR = 'Não foi possível converter este link agora. Tente novamente.';

/** @typedef {{ok: true, url: string} | {ok: false, message: string}} ValidationResult */
/** @typedef {{status: 'success', finalUrl: string, provider: string, message: string} | {status: 'attention' | 'error', finalUrl: '', provider: string, message: string}} PublicConversionResult */

function isHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/** @returns {ValidationResult} */
export function validateInputUrl(input) {
  const value = typeof input === 'string' ? input.trim() : '';
  if (!value) {
    return { ok: false, message: 'Cole um link para continuar.' };
  }
  if (!isHttpUrl(value)) {
    return { ok: false, message: 'Cole um link válido começando com http:// ou https://.' };
  }
  return { ok: true, url: value };
}

export function buildPublicConvertRequest(url) {
  return {
    url,
    provider: 'auto',
    source_site: 'lamorimpromos-github-pages',
  };
}

function safeMessage(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.slice(0, 220);
}

/** @returns {PublicConversionResult} */
export function normalizePublicConversionResponse(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { status: 'error', finalUrl: '', provider: '', message: DEFAULT_ERROR };
  }

  const provider = typeof payload.provider === 'string' ? payload.provider.trim().slice(0, 40) : '';
  const finalUrl = typeof payload.final_url === 'string' ? payload.final_url.trim() : '';
  const safe = payload.safe_to_publish === true && isHttpUrl(finalUrl);

  if (safe) {
    return {
      status: 'success',
      finalUrl,
      provider,
      message: safeMessage(payload.status_message, 'Link convertido com sucesso.'),
    };
  }

  const attention = payload.result_type === 'attention' || payload.needs_attention === true || payload.retryable === true;
  return {
    status: attention ? 'attention' : 'error',
    finalUrl: '',
    provider,
    message: safeMessage(payload.status_message || payload.error_message, attention ? 'Este link requer atenção antes de ser usado.' : DEFAULT_ERROR),
  };
}
