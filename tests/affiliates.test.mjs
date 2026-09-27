import test from 'node:test';
import assert from 'node:assert/strict';

async function loadModule() {
  try {
    return await import('../lib/affiliates.js');
  } catch {
    return null;
  }
}

test('catálogo contém os 11 afiliados previstos no LamorimPromos', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.AFFILIATES.length, 11);
  assert.deepEqual(
    mod.AFFILIATES.map((item) => item.name),
    ['Amazon', 'eBay', 'Shein', 'Lomadee', 'Magalu', 'Mercado Livre', 'Shopee', 'AliExpress', 'Awin', 'Rakuten', 'Petz'],
  );
});

test('detectAffiliate identifica Shopee por subdomínio', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.detectAffiliate('https://s.shopee.com.br/abc')?.id, 'shopee');
});

test('detectAffiliate identifica atalho da Amazon', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.detectAffiliate('https://amzn.to/exemplo')?.id, 'amazon');
});

test('detectAffiliate identifica atalho do Mercado Livre', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.detectAffiliate('https://mercadolivre.com/sec/xyz')?.id, 'mercado-livre');
});

test('detectAffiliate retorna null para URL inválida', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.detectAffiliate('isso não é uma url'), null);
});

test('detectAffiliate retorna null para domínio desconhecido', async () => {
  const mod = await loadModule();
  assert.ok(mod, 'lib/affiliates.js deve existir');
  assert.equal(mod.detectAffiliate('https://example.org/produto'), null);
});
