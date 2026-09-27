# LamorimPromos — Conversor de links

Frontend do conversor público do **LamorimPromos**, com a composição enxuta da página de referência: marca, subtítulo, gerador, histórico recente da sessão e rodapé.

O navegador não recebe credenciais das redes de afiliados. A conversão real é feita pelo backend canônico do LamorimPromos por meio de um proxy público separado e sanitizado.

## Fluxo

```text
GitHub Pages (estático)
  -> POST /webhook/lamorimpromos/site/v1/convert
  -> workflow público com validação/rate limit
  -> /webhook/lamorimpromos/v3/convert (privado)
  -> adaptadores dos 11 afiliados
  -> resposta sanitizada
  -> navegador
```

O frontend só libera um link para copiar/abrir quando a resposta informa `safe_to_publish=true` e contém `final_url` HTTP(S) válida.

## Afiliados reconhecidos

- Amazon
- eBay
- Shein
- Lomadee
- Magalu
- Mercado Livre
- Shopee
- AliExpress
- Awin
- Rakuten
- Petz

## Stack

- Next.js 16.3.6
- React 19.3
- TypeScript
- Tailwind CSS 4.3
- Node.js 22+
- GitHub Actions / GitHub Pages

## Rodar localmente

```bash
npm install
NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL="https://SEU-ENDPOINT-PUBLICO" npm run dev
```

Abra `http://localhost:3000`.

## Testes

```bash
npm test
```

## Build estático

```bash
NEXT_PUBLIC_LAMORIMPROMOS_CONVERT_URL="https://SEU-ENDPOINT-PUBLICO" npm run build
```

O build de produção é gerado em `out/` e não requer servidor Node.js.

## GitHub Pages

O workflow `.github/workflows/pages.yml` faz testes, cria o export estático e publica `out/`. Em repositórios de projeto, `basePath` e `assetPrefix` são calculados automaticamente a partir de `GITHUB_REPOSITORY`.

O endpoint público usado no build é:

```text
https://lamorimpromos-n8n-edge.lamorimverso.workers.dev/webhook/lamorimpromos/site/v1/convert
```

## Segurança

- `LAMORIMPROMOS_API_TOKEN` e `N8N_CREDENTIAL_BRIDGE_TOKEN` nunca entram no bundle do frontend.
- O frontend não chama diretamente o webhook canônico autenticado.
- O proxy público devolve apenas campos aprovados para o navegador.
- O backend canônico continua responsável por identidade do produto, ownership, conversão, short oficial e `safe_to_publish`.

## Estrutura principal

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  brand-mark.tsx
  link-generator.tsx
  recent-links.tsx
lib/
  affiliates.js
  conversion.js
  recent-links.js
ops/n8n/
  lamorimpromos-site-public-convert.json
.github/workflows/
  ci.yml
  pages.yml
```

## Estado validado em 27/09/2026

- suíte automatizada: **28/28 testes aprovados**;
- build estático Next.js validado em Node.js 22.23.0 / npm 10.9.8;
- `out/index.html` gerado com sucesso;
- endpoint público `POST /webhook/lamorimpromos/site/v1/convert` ativo;
- CORS restrito a `https://lamorimverso.github.io`;
- conversão real Amazon validada com `safe_to_publish=true`;
- resposta pública verificada sem token, cookie, sessão ou segredo.

A publicação do repositório depende apenas de o GitHub conectado conceder acesso de escrita a um repositório.
