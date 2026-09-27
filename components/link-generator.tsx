'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { detectAffiliate } from '@/lib/affiliates';
import {
  buildPublicConvertRequest,
  normalizePublicConversionResponse,
  validateInputUrl,
} from '@/lib/conversion';
import { addRecentLink, normalizeRecentLinks } from '@/lib/recent-links';
import { RecentLinks } from '@/components/recent-links';

type RecentLink = {
  provider: string;
  originalUrl: string;
  finalUrl: string;
  timestamp: number;
};

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' | 'attention'; message: string }
  | { status: 'success'; message: string; finalUrl: string; provider: string };

const STORAGE_KEY = 'lamorimpromos:recent-links:v1';

export function LinkGenerator() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<State>({ status: 'idle' });
  const [recentLinks, setRecentLinks] = useState<RecentLink[]>([]);
  const [copied, setCopied] = useState(false);

  const detected = useMemo(() => (url.trim() ? detectAffiliate(url) : null), [url]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setRecentLinks(normalizeRecentLinks(parsed));
    } catch {
      setRecentLinks([]);
    }
  }, []);

  function persistRecent(next: RecentLink[]) {
    setRecentLinks(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // A conversão não depende do armazenamento local.
    }
  }

  async function convert(value: string) {
    const validated = validateInputUrl(value);
    if (!validated.ok) {
      setState({ status: 'error', message: validated.message });
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL?.trim();
    if (!endpoint) {
      setState({ status: 'error', message: 'O conversor está temporariamente indisponível.' });
      return;
    }

    setCopied(false);
    setState({ status: 'loading' });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(buildPublicConvertRequest(validated.url)),
      });

      const raw = await response.text();
      let payload: unknown = null;
      try {
        payload = JSON.parse(raw);
      } catch {
        payload = null;
      }

      const normalized = normalizePublicConversionResponse(payload);
      if (normalized.status === 'success') {
        const next = addRecentLink(recentLinks, {
          provider: normalized.provider || detected?.id || '',
          originalUrl: validated.url,
          finalUrl: normalized.finalUrl,
          timestamp: Date.now(),
        });
        persistRecent(next);
        setState({
          status: 'success',
          message: normalized.message,
          finalUrl: normalized.finalUrl,
          provider: normalized.provider || detected?.name || '',
        });
        return;
      }

      setState({ status: normalized.status, message: normalized.message });
    } catch {
      setState({
        status: 'error',
        message: 'Não foi possível conectar ao conversor agora. Tente novamente.',
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await convert(url);
  }

  async function pasteFromClipboard() {
    try {
      const value = (await navigator.clipboard.readText()).trim();
      if (!value) return;
      setUrl(value);
      setState({ status: 'idle' });
    } catch {
      document.getElementById('product-url')?.focus();
    }
  }

  async function copyResult() {
    if (state.status !== 'success') return;
    try {
      await navigator.clipboard.writeText(state.finalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Abrir o link continua disponível se clipboard estiver bloqueado.
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="link-form" noValidate>
        <label className="sr-only" htmlFor="product-url">Link do produto</label>
        <div className="link-input-wrap">
          <input
            id="product-url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (state.status !== 'idle') setState({ status: 'idle' });
            }}
            placeholder="Cole aqui o link do produto…"
            inputMode="url"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            className="paste-button"
            type="button"
            onClick={pasteFromClipboard}
            title="Colar da área de transferência"
            aria-label="Colar da área de transferência"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

        {detected ? (
          <p className="provider-recognition" role="status">
            <span aria-hidden="true">✓</span> {detected.name} reconhecida
          </p>
        ) : null}

        <button className="generate-button" type="submit" disabled={state.status === 'loading'}>
          {state.status === 'loading' ? (
            <span className="generate-loading"><span className="spinner" aria-hidden="true" /> Gerando seu link de afiliado…</span>
          ) : 'Converter para meu link de afiliado'}
        </button>
      </form>

      {state.status === 'error' || state.status === 'attention' ? (
        <div className={`result-card ${state.status === 'attention' ? 'result-attention' : 'result-error'}`} role="alert">
          <p>{state.message}</p>
        </div>
      ) : null}

      {state.status === 'success' ? (
        <div className="result-card result-success" aria-live="polite">
          <strong>✅ Seu link de afiliado está pronto</strong>
          <a className="result-product-button" href={state.finalUrl} target="_blank" rel="noreferrer">
            🛍️&nbsp;&nbsp;VER PRODUTO
          </a>
          <div className="result-secondary-actions">
            <button type="button" onClick={copyResult}>{copied ? '✅ Copiado!' : '📋 Copiar link'}</button>
            <a href={state.finalUrl} target="_blank" rel="noreferrer">↗ Abrir link</a>
          </div>
        </div>
      ) : null}

      <RecentLinks items={recentLinks} />
    </>
  );
}
