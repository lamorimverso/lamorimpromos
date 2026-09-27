/**
 * @typedef {Object} Affiliate
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {readonly string[]} domains
 * @property {string} tone
 */

/** @type {readonly Affiliate[]} */
export const AFFILIATES = [
  { id: 'amazon', name: 'Amazon', shortName: 'AMZ', domains: ['amazon.com.br', 'amazon.com', 'amzn.to'], tone: 'from-amber-400 to-orange-500' },
  { id: 'ebay', name: 'eBay', shortName: 'EB', domains: ['ebay.com', 'ebay.com.br'], tone: 'from-blue-500 to-rose-500' },
  { id: 'shein', name: 'Shein', shortName: 'SH', domains: ['shein.com'], tone: 'from-zinc-700 to-zinc-950' },
  { id: 'lomadee', name: 'Lomadee', shortName: 'LO', domains: ['lomadee.com', 'lomadee.com.br'], tone: 'from-fuchsia-500 to-violet-600' },
  { id: 'magalu', name: 'Magalu', shortName: 'MG', domains: ['magazineluiza.com.br', 'magalu.com'], tone: 'from-sky-400 to-blue-600' },
  { id: 'mercado-livre', name: 'Mercado Livre', shortName: 'ML', domains: ['mercadolivre.com.br', 'mercadolivre.com', 'mercado.li'], tone: 'from-yellow-300 to-amber-400' },
  { id: 'shopee', name: 'Shopee', shortName: 'SP', domains: ['shopee.com.br', 'shopee.com'], tone: 'from-orange-500 to-red-500' },
  { id: 'aliexpress', name: 'AliExpress', shortName: 'AE', domains: ['aliexpress.com', 'aliexpress.us'], tone: 'from-red-500 to-rose-600' },
  { id: 'awin', name: 'Awin', shortName: 'AW', domains: ['awin.com', 'awin1.com'], tone: 'from-indigo-500 to-violet-600' },
  { id: 'rakuten', name: 'Rakuten', shortName: 'RK', domains: ['rakuten.com', 'rakuten.com.br'], tone: 'from-rose-500 to-red-700' },
  { id: 'petz', name: 'Petz', shortName: 'PZ', domains: ['petz.com.br'], tone: 'from-cyan-500 to-blue-600' },
];

function hostnameMatches(hostname, domain) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

/**
 * @param {string} input
 * @returns {Affiliate | null}
 */
export function detectAffiliate(input) {
  try {
    const url = new URL(input.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    return AFFILIATES.find((affiliate) =>
      affiliate.domains.some((domain) => hostnameMatches(hostname, domain)),
    ) ?? null;
  } catch {
    return null;
  }
}
