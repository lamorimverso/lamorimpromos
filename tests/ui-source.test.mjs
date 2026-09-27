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
  const brand = await read('../components/brand-mark.tsx');
  assert.match(brand, /Lamorim das Promoções/);
  assert.match(brand, /Seu canal de promoções em games, tech, geek e muito mais\./i);
  assert.match(source, /ToolSwitcher/);
  const switcher = await read('../components/tool-switcher.tsx');
  assert.match(switcher, /LinkGenerator/);
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

test('layout permanece responsivo em modo escuro com identidade própria', async () => {
  const css = await read('../app/globals.css');
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /--page:\s*#0b0f14/i);
  assert.match(css, /--surface:\s*#121820/i);
  assert.match(css, /max-width/);
  assert.match(css, /@media/);
});

test('visual da página segue as medidas da referência com identidade LamorimPromos', async () => {
  const page = await read('../app/page.tsx');
  const brand = await read('../components/brand-mark.tsx');
  const generator = await read('../components/link-generator.tsx');
  const css = await read('../app/globals.css');

  assert.match(brand, /lamorimpromos-avatar\.png/);
  assert.match(brand, /112/);
  assert.match(css, /object-fit:\s*contain/);
  assert.doesNotMatch(css, /brand-avatar[\s\S]{0,180}border-radius:\s*999px/);
  assert.match(page, /site-hero/);
  assert.match(page, /site-content/);
  assert.match(css, /font-family:\s*Poppins/);
  assert.match(css, /max-width:\s*540px/);
  assert.match(css, /border-radius:\s*0\s+0\s+20px\s+20px/);
  assert.match(css, /border-radius:\s*20px/);
  assert.match(css, /padding:\s*24px/);
  assert.match(css, /#24bc88/i);
  assert.match(generator, /Converter para meu link de afiliado/i);
  assert.match(generator, /Colar da área de transferência/i);
});

test('avatar respeita o basePath do GitHub Pages', async () => {
  const brand = await read('../components/brand-mark.tsx');
  const layout = await read('../app/layout.tsx');

  assert.match(brand, /GITHUB_REPOSITORY/);
  assert.match(brand, /GITHUB_ACTIONS/);
  assert.doesNotMatch(brand, /src=\"\/lamorimpromos-avatar\.png\"/);
  assert.match(layout, /GITHUB_REPOSITORY/);
  assert.match(layout, /GITHUB_ACTIONS/);
});

test('metadados usam o nome completo da marca', async () => {
  const layout = await read('../app/layout.tsx');
  const page = await read('../app/page.tsx');
  assert.match(layout, /Lamorim das Promoções/);
  assert.match(layout, /Seu canal de promoções em games, tech, geek e muito mais\./i);
  assert.match(page, /© 2026 Lamorim das Promoções/);
});

test('navegação principal usa abas Gerar link e Alertas com semântica acessível', async () => {
  const page = await read('../app/page.tsx');
  const switcher = await read('../components/tool-switcher.tsx');
  assert.match(page, /ToolSwitcher/);
  assert.match(switcher, /role="tablist"/);
  assert.match(switcher, /role="tab"/);
  assert.match(switcher, /aria-selected/);
  assert.match(switcher, /🔗/);
  assert.match(switcher, /Gerar link/);
  assert.match(switcher, /🔔/);
  assert.match(switcher, /Alertas/);
  assert.match(switcher, /useState<'links' \| 'alerts'>\('links'\)/);
  assert.match(switcher, /role="tabpanel"/);
});

test('gerador comunica conversão para o link de afiliado e loja reconhecida', async () => {
  const generator = await read('../components/link-generator.tsx');
  assert.match(generator, /Converter para meu link de afiliado/i);
  assert.match(generator, /reconhecida/i);
  assert.match(generator, /Seu link de afiliado está pronto/i);
  assert.match(generator, /safe_to_publish|normalizePublicConversionResponse/);
});

test('aba Alertas é uma prévia visual separada e não finge integração ativa', async () => {
  const alerts = await read('../components/alerts-panel.tsx');
  assert.match(alerts, /O que você quer acompanhar\?/i);
  assert.match(alerts, /PlayStation 5/i);
  assert.match(alerts, /RTX 5070/i);
  assert.match(alerts, /Prévia do módulo/i);
  assert.match(alerts, /disabled/);
  assert.doesNotMatch(alerts, /fetch\(/);
});
