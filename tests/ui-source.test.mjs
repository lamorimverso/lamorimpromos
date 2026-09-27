import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  try {
    return await readFile(new URL(path, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

test('página segue a composição enxuta da referência', async () => {
  const source = await read('../app/page.tsx');
  assert.match(source, /LamorimPromos/);
  assert.match(source, /Descontos exclusivos para você/i);
  assert.match(source, /Gere seu link com desconto/i);
  assert.match(source, /LinkGenerator/);
  assert.match(source, /Links de afiliados/i);
  assert.doesNotMatch(source, /AffiliateGrid/);
  assert.doesNotMatch(source, /Lojas compatíveis/i);
  assert.doesNotMatch(source, /MODELO V1/i);
  assert.doesNotMatch(source, /Próxima etapa/i);
});

test('gerador usa endpoint público configurável e estados reais de conversão', async () => {
  const source = await read('../components/link-generator.tsx');
  assert.match(source, /NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL/);
  assert.match(source, /buildPublicConvertRequest/);
  assert.match(source, /normalizePublicConversionResponse/);
  assert.match(source, /status:\s*'loading'/);
  assert.match(source, /sessionStorage/);
  assert.match(source, /RecentLinks/);
  assert.doesNotMatch(source, /lamorimpromos\.example/);
  assert.doesNotMatch(source, /demonstração/i);
});

test('recentes recebe apenas dados reais e oferece copiar/abrir', async () => {
  const source = await read('../components/recent-links.tsx');
  assert.match(source, /items/);
  assert.match(source, /Copiar/i);
  assert.match(source, /Ver produto/i);
  assert.doesNotMatch(source, /RECENT\s*=/);
  assert.doesNotMatch(source, /Demonstração/i);
});

test('layout permanece responsivo sem hero escuro da V1', async () => {
  const page = await read('../app/page.tsx');
  const css = await read('../app/globals.css');
  assert.doesNotMatch(page, /bg-\[#07111f\]/);
  assert.match(css, /max-width/);
  assert.match(css, /@media/);
});
