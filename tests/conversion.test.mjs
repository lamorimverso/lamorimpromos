import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildPublicConvertRequest,
  normalizePublicConversionResponse,
  validateInputUrl,
} from '../lib/conversion.js';

test('validateInputUrl rejeita valor vazio', () => {
  const result = validateInputUrl('   ');
  assert.equal(result.ok, false);
  assert.match(result.message, /link/i);
});

test('validateInputUrl rejeita protocolo que não seja HTTP(S)', () => {
  const result = validateInputUrl('javascript:alert(1)');
  assert.equal(result.ok, false);
});

test('validateInputUrl normaliza URL HTTP válida', () => {
  const result = validateInputUrl('  https://www.amazon.com.br/dp/B0TESTE  ');
  assert.deepEqual(result, {
    ok: true,
    url: 'https://www.amazon.com.br/dp/B0TESTE',
  });
});

test('buildPublicConvertRequest nunca inclui segredo e força provider auto', () => {
  const payload = buildPublicConvertRequest('https://shopee.com.br/product/1/2');
  assert.deepEqual(payload, {
    url: 'https://shopee.com.br/product/1/2',
    provider: 'auto',
    source_site: 'lamorimpromos-github-pages',
  });
  assert.doesNotMatch(JSON.stringify(payload), /token|secret|authorization/i);
});

test('normalizePublicConversionResponse só libera sucesso com safe_to_publish e final_url HTTP(S)', () => {
  const result = normalizePublicConversionResponse({
    ok: true,
    result_type: 'success',
    safe_to_publish: true,
    final_url: 'https://amzn.to/abc123',
    provider: 'amazon',
    status_message: 'Link pronto.',
  });
  assert.equal(result.status, 'success');
  assert.equal(result.finalUrl, 'https://amzn.to/abc123');
  assert.equal(result.provider, 'amazon');
});

test('normalizePublicConversionResponse não libera final_url quando safe_to_publish é false', () => {
  const result = normalizePublicConversionResponse({
    ok: false,
    result_type: 'attention',
    safe_to_publish: false,
    final_url: 'https://amzn.to/nao-usar',
    provider: 'amazon',
    status_message: 'Conversão requer atenção.',
  });
  assert.equal(result.status, 'attention');
  assert.equal(result.finalUrl, '');
});

test('normalizePublicConversionResponse trata payload inválido como erro sanitizado', () => {
  const result = normalizePublicConversionResponse('<html>erro</html>');
  assert.deepEqual(result, {
    status: 'error',
    finalUrl: '',
    provider: '',
    message: 'Não foi possível converter este link agora. Tente novamente.',
  });
});
