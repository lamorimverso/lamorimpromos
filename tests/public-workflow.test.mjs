import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../ops/n8n/lamorimpromos-site-public-convert.json', import.meta.url);

function loadWorkflow() {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function nodeByName(workflow, name) {
  return workflow?.nodes?.find((node) => node.name === name);
}

test('workflow público é separado, começa inativo e expõe apenas POST do site', () => {
  const workflow = loadWorkflow();
  assert.ok(workflow, 'workflow público deve existir e ser JSON válido');
  assert.equal(workflow.active, false);
  const webhook = nodeByName(workflow, 'Webhook — site público');
  assert.ok(webhook);
  assert.equal(webhook.type, 'n8n-nodes-base.webhook');
  assert.equal(webhook.parameters.httpMethod, 'POST');
  assert.equal(webhook.parameters.path, 'lamorimpromos/site/v1/convert');
  assert.equal(webhook.parameters.responseMode, 'responseNode');
});

test('webhook fixa CORS no GitHub Pages e impede cache da resposta', () => {
  const workflow = loadWorkflow();
  const webhook = nodeByName(workflow, 'Webhook — site público');
  const headers = webhook?.parameters?.options?.responseHeaders?.entries ?? [];
  assert.ok(headers.some((h) => h.name.toLowerCase() === 'access-control-allow-origin' && h.value === 'https://lamorimverso.github.io'));
  assert.ok(headers.some((h) => h.name.toLowerCase() === 'cache-control' && /no-store/i.test(h.value)));
  assert.ok(headers.some((h) => h.name.toLowerCase() === 'vary' && /origin/i.test(h.value)));
});

test('entrada valida origem, tamanho, HTTP(S), rede privada e aplica rate limit por IP', () => {
  const workflow = loadWorkflow();
  const code = nodeByName(workflow, 'Validar e limitar entrada')?.parameters?.jsCode ?? '';
  assert.match(code, /https:\/\/lamorimverso\.github\.io/);
  assert.match(code, /MAX_URL_LENGTH/);
  assert.match(code, /https\?:/i);
  assert.match(code, /localhost|127\.0\.0\.1/);
  assert.match(code, /cf-connecting-ip/i);
  assert.match(code, /\$getWorkflowStaticData\(['"]global['"]\)/);
  assert.match(code, /RATE_LIMIT_MAX/);
  assert.match(code, /429/);
});

test('proxy chama somente o webhook canônico local com token do ambiente', () => {
  const workflow = loadWorkflow();
  const request = nodeByName(workflow, 'Converter no workflow canônico');
  assert.ok(request);
  assert.match(String(request.parameters.url), /127\.0\.0\.1:5678\/webhook\/lamorimpromos\/v3\/convert/);
  const raw = JSON.stringify(request.parameters);
  assert.match(raw, /LAMORIMPROMOS_API_TOKEN/);
  assert.match(raw, /Bearer/);
  assert.doesNotMatch(raw, /eyJ[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{10,}/);
});

test('normalizador só devolve final_url quando safe_to_publish é verdadeiro e sanitiza a resposta', () => {
  const workflow = loadWorkflow();
  const code = nodeByName(workflow, 'Sanitizar resposta pública')?.parameters?.jsCode ?? '';
  assert.match(code, /safe_to_publish\s*===\s*true/);
  assert.match(code, /final_url:\s*safe\s*\?/);
  assert.match(code, /status_message/);
  assert.doesNotMatch(code, /cookies?|session|authorization/i);

  const responder = nodeByName(workflow, 'Responder ao site');
  assert.ok(responder);
  assert.equal(responder.parameters.respondWith, 'json');
  assert.match(String(responder.parameters.responseBody), /\$json/);
});
