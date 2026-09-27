import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const nextConfig = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
const pagesWorkflow = (() => {
  try {
    return readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  } catch {
    return '';
  }
})();
const ciWorkflow = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');

const PUBLIC_CONVERT_URL = 'https://lamorimpromos-n8n-edge.lamorimverso.workers.dev/webhook/lamorimpromos/site/v1/convert';

test('Next exporta site estático e desativa otimização de imagens para Pages', () => {
  assert.match(nextConfig, /output\s*:\s*['\"]export['\"]/);
  assert.match(nextConfig, /unoptimized\s*:\s*true/);
  assert.match(nextConfig, /basePath/);
  assert.match(nextConfig, /assetPrefix/);
});

test('workflow Pages faz build e publica o diretório out sem segredos', () => {
  assert.match(pagesWorkflow, /actions\/configure-pages@v5/);
  assert.match(pagesWorkflow, /actions\/upload-pages-artifact@v3/);
  assert.match(pagesWorkflow, /actions\/deploy-pages@v4/);
  assert.match(pagesWorkflow, /path:\s*\.\/out/);
  assert.match(pagesWorkflow, /NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL/);
  assert.match(pagesWorkflow, new RegExp(PUBLIC_CONVERT_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(pagesWorkflow, /LAMORIMPROMOS_API_TOKEN|N8N_CREDENTIAL_BRIDGE_TOKEN/);
});

test('CI valida testes e build estático com o endpoint público', () => {
  assert.match(ciWorkflow, /npm\s+(?:install|ci)/);
  assert.match(ciWorkflow, /npm test/);
  assert.match(ciWorkflow, /npm run build/);
  assert.match(ciWorkflow, /NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL/);
});
