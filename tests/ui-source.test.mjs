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

test('página mantém marca e ferramentas principais sem cards institucionais excessivos', async () => {
  const source = await read('../app/page.tsx');
  const brand = await read('../components/brand-mark.tsx');
  const switcher = await read('../components/tool-switcher.tsx');
  assert.match(brand, /Lamorim das Promoções/);
  assert.match(brand, /Seu canal de promoções em games, tech, geek e muito mais\./i);
  assert.match(source, /ToolSwitcher/);
  assert.match(switcher, /LinkGenerator/);
  assert.match(source, /Links de afiliados/i);
  assert.doesNotMatch(source, /AffiliateGrid/);
  assert.doesNotMatch(source, /MODELO V1/i);
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

test('recentes permanece visível mesmo vazio e oferece copiar/abrir quando houver dados', async () => {
  const source = await read('../components/recent-links.tsx');
  assert.match(source, /items/);
  assert.match(source, /Links recentes/i);
  assert.match(source, /Nenhum link convertido nesta sessão ainda/i);
  assert.match(source, /Copiar/i);
  assert.match(source, /Abrir oferta|Ver produto/i);
  assert.doesNotMatch(source, /if\s*\(items\.length\s*===\s*0\)\s*return\s+null/);
  assert.doesNotMatch(source, /RECENT\s*=/);
});

test('layout usa identidade dark com largura fluida e não fica preso em 540px', async () => {
  const css = await read('../app/globals.css');
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /--page:\s*#0b0f14/i);
  assert.match(css, /--surface:\s*#121820/i);
  assert.match(css, /--content-width:\s*min\(/i);
  assert.match(css, /680px/);
  assert.doesNotMatch(css, /max-width:\s*540px/);
  assert.match(css, /@media/);
});

test('marca usa a arte completa e mantém o basePath do GitHub Pages', async () => {
  const brand = await read('../components/brand-mark.tsx');
  const css = await read('../app/globals.css');
  const layout = await read('../app/layout.tsx');

  assert.match(brand, /lamorimpromos-brand\.png/);
  assert.match(brand, /GITHUB_REPOSITORY/);
  assert.match(brand, /GITHUB_ACTIONS/);
  assert.match(css, /object-fit:\s*contain/);
  assert.match(css, /brand-art/);
  assert.doesNotMatch(brand, /lamorimpromos-avatar\.png/);
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
  assert.match(switcher, /useState<Tool>\('links'\)/);
  assert.match(switcher, /role="tabpanel"/);
});

test('troca de ferramenta tem movimento sutil e respeita redução de movimento', async () => {
  const css = await read('../app/globals.css');
  assert.match(css, /@keyframes\s+panel-enter/i);
  assert.match(css, /animation:\s*panel-enter/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
});

test('gerador comunica conversão afiliada, lojas e fluxo em três passos', async () => {
  const generator = await read('../components/link-generator.tsx');
  const switcher = await read('../components/tool-switcher.tsx');
  assert.match(generator, /Converter para meu link de afiliado/i);
  assert.match(generator, /reconhecida/i);
  assert.match(generator, /Seu link de afiliado está pronto/i);
  assert.match(generator, /safe_to_publish|normalizePublicConversionResponse/);
  assert.match(switcher, /Lojas compatíveis/i);
  assert.match(switcher, /Como funciona/i);
  assert.match(switcher, /Cole o link/i);
  assert.match(switcher, /Nós convertemos/i);
  assert.match(switcher, /Pronto para divulgar/i);
});

test('aba Alertas parece produto completo sem fingir backend ativo', async () => {
  const alerts = await read('../components/alerts-panel.tsx');
  assert.match(alerts, /Alertas de promoções/i);
  assert.match(alerts, /O que você quer monitorar\?/i);
  assert.match(alerts, /PlayStation 5/i);
  assert.match(alerts, /RTX 5070/i);
  assert.match(alerts, /Filtros avançados/i);
  assert.match(alerts, /Seus alertas/i);
  assert.match(alerts, /Nenhum alerta criado ainda/i);
  assert.match(alerts, /Integração Telegram:\s*em breve/i);
  assert.doesNotMatch(alerts, /Prévia do módulo/i);
  assert.doesNotMatch(alerts, /Em preparação/i);
  assert.doesNotMatch(alerts, /fetch\(/);
});

test('UX task-first oferece navegação por teclado, microcopy de confiança e fluxo simplificado', async () => {
  const switcher = await read('../components/tool-switcher.tsx');
  const generator = await read('../components/link-generator.tsx');
  const css = await read('../app/task-first.css');
  const layout = await read('../app/layout.tsx');

  assert.match(switcher, /task-primary/);
  assert.match(switcher, /onKeyDown/);
  assert.match(switcher, /ArrowRight/);
  assert.match(switcher, /ArrowLeft/);
  assert.match(switcher, /Home/);
  assert.match(switcher, /End/);
  assert.match(switcher, /Cole/i);
  assert.match(switcher, /Convertemos/i);
  assert.match(switcher, /Copie/i);
  assert.match(generator, /Só liberamos links validados/i);
  assert.match(generator, /Validado para publicação/i);
  assert.match(css, /\.task-primary/);
  assert.match(css, /\.task-assurance/);
  assert.match(layout, /task-first\.css/);
});
