# Proxy público do site

Workflow isolado para `POST /webhook/lamorimpromos/site/v1/convert`.

- aceita somente origem `https://lamorimverso.github.io`;
- usa `text/plain` no frontend para evitar preflight CORS;
- limita requisições por IP com janela curta no static data do workflow;
- rejeita localhost/redes privadas antes do workflow canônico;
- chama internamente `/webhook/lamorimpromos/v3/convert` com `LAMORIMPROMOS_API_TOKEN`;
- retorna apenas campos sanitizados e nunca devolve o token ao navegador.

O arquivo é importado **inativo**. Ative apenas depois de validar o workflow importado e o health do workflow canônico.

## Produção

Em 27/09/2026 foi confirmado que já existe um workflow equivalente ativo no n8n com o mesmo endpoint público, CORS para `lamorimverso.github.io`, rate limit de 20 requisições/minuto por IP, bloqueio de destinos privados, autenticação interna do workflow canônico e sanitização da resposta. O JSON deste repositório permanece `active: false` para importação segura/rollback.
