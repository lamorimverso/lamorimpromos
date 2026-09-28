# Lamorim das Promoções — Task-First Product App

## Objetivo

Refinar a interface pública do Lamorim das Promoções usando uma combinação de UX Task-First com acabamento de Product App, mantendo a conversão de afiliados como tarefa principal e Alertas como segunda ferramenta.

## Princípios

- A ação principal deve aparecer antes de conteúdo secundário.
- As abas Gerar link e Alertas permanecem como navegação principal.
- A interface deve evitar aparência de dashboard administrativo.
- Filtros e recursos avançados ficam progressivamente revelados.
- Estados de sistema devem combinar texto, ícone e cor.
- O conversor só comunica sucesso quando a resposta real for validada.
- A aba Alertas continua sem backend nesta etapa; não deve simular funcionalidade inexistente.

## Fluxo Gerar link

1. Cole o link do produto.
2. O sistema reconhece a loja.
3. O usuário aciona a conversão.
4. O resultado mostra validação explícita antes de copiar ou abrir.
5. Links recentes permanecem visíveis mesmo vazios.
6. Compatibilidade e Como funciona aparecem como suporte, não como concorrentes da ação principal.

## Navegação

- Gerar link abre por padrão.
- Abas usam semântica tablist/tab/tabpanel.
- Teclas ArrowLeft, ArrowRight, Home e End permitem alternar e focar as abas.
- Movimento entre painéis é sutil e respeita prefers-reduced-motion.

## Identidade visual

- Dark mode como padrão.
- Verde #24BC88 como destaque funcional.
- Arte completa da marca, sem corte circular.
- Hierarquia mais compacta no cabeçalho para levar o usuário mais rapidamente à tarefa principal.
- Card principal com aparência de aplicativo, reduzindo excesso de cartões internos.

## Fora do escopo

- Backend real de Alertas.
- Integração Telegram.
- Alterações no conversor canônico ou em provedores afiliados.
- Dashboard, métricas ou histórico global.
