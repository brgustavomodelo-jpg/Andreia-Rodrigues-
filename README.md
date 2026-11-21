# By Andreia Rodrigues® — site v3.1 (correções + nova Hero)

Site estático (HTML, CSS e JavaScript puros, sem build e sem bibliotecas). O design, os textos, as fotografias, os links e os dados da boutique são os mesmos da v2.

## Abrir localmente
Dê dois cliques em `index.html`. Todos os caminhos são relativos.

## Publicar
- **GitHub Pages:** envie esta pasta para o repositório (substituindo a versão anterior), ative Settings > Pages e escolha a branch `main`, pasta `/ (root)`.
- **Qualquer hospedagem estática** (Netlify, Vercel, Cloudflare Pages, cPanel): envie o conteúdo da pasta.

## Estrutura
- `index.html` (Início) e `galeria.html` (Galeria)
- `assets/css/` — `style.css` (base e Início) e `gallery.css` (galeria e lightbox)
- `assets/js/` — `main.js` (menu, transições, revelação, parallax, botões flutuantes, tratamento de imagens), `animations.js` (abertura e texto cinético), `gallery.js` (lightbox)
- `assets/images/` — `hero/`, `gallery/` e `details/` em WebP
- `assets/fonts/` — vazia: as fontes ainda vêm do Google Fonts (ver abaixo)

## O que mudou na v3
**Causa do desaparecimento das fotos.** As fotos "Seleção de looks", "A boutique" e "Localização" começam recortadas por `clip-path` e eram reveladas por um `IntersectionObserver`. O Chrome/Android não notifica elementos totalmente recortados, então essas fotos nunca eram reveladas. Agora a revelação usa a posição real do elemento (`getBoundingClientRect`), reavaliada em rolagem, resize, giro de tela, retorno à página e por um verificador periódico.

**Conteúdo nunca depende de animação.**
- Os estados "escondidos" só valem com a classe `js` (adicionada no `<head>`).
- Se algum script falhar ou demorar mais de 5 s, a classe `no-anim` deixa tudo visível.
- A tela de abertura nunca prende a página (limite de 4,2 s) e a cortina de transição se libera sozinha.

**Imagens.**
- Primeira tela com `loading="eager"` e `fetchpriority="high"` na foto principal; demais com `lazy`.
- Pré-carregamento em segundo plano, desligado com economia de dados ou 2G/3G.
- Nova tentativa automática em caso de erro, com moldura neutra se a falha persistir.
- `width`/`height` em todas as fotos reservam o espaço.

**Compatibilidade.**
- Alturas do hero em `svh` com reserva para `vh`.
- Reserva de proporção para navegadores sem `aspect-ratio` (iOS < 15).
- Hovers só em dispositivos com mouse.

**Hero (v3.1) — nova composição editorial.** A montagem de fotos de roupas com o nome atravessando as imagens foi removida. A primeira tela agora tem: rótulo "Boutique · Xaxim, Curitiba", título "Andreia / Rodrigues®" em duas linhas escalonadas (sem sobreposição), a foto da Andreia em proporção 4:5 (a foto original é quadrada; o recorte mostra a figura inteira) e os botões "Conhecer a galeria" e "Conversar no WhatsApp". No celular é uma coluna única que cabe na primeira tela em aparelhos de 360 a 430 px de largura; em telas muito baixas a página rola um pouco. No desktop e no celular deitado, o texto fica à esquerda e a foto à direita. Entrada discreta: o título sobe suavemente, a foto se revela de baixo para cima com um zoom lento, e o restante surge em fade. Respeita `prefers-reduced-motion` e a rede de segurança (`no-anim`). A foto está em `assets/images/hero/andreia.webp` (1080 px) e `andreia-720.webp` (celular). Os arquivos antigos do hero continuam na pasta, sem uso na Hero (`hero/04.webp` ainda é o `og:image`).

**WhatsApp flutuante.** Fica oculto sobre os botões da primeira tela (celular) e sobre o rodapé; respeita as áreas seguras. O botão "voltar ao topo" vai para a direita no rodapé.

**Menu e lightbox.**
- Menu: trava o scroll de fundo, links fechados fora do foco, ESC fecha.
- Lightbox: trava e restaura o scroll, devolve o foco, contador de fotos, aviso se uma foto falhar, deslize horizontal no toque, setas no teclado.
- Corrigido o contador do lightbox, que cobria os botões ← → no celular.

## Dependências externas
Apenas Google Fonts (Cormorant Garamond e Jost), via CDN, com `display=swap`. Sem internet, o site usa as fontes de reserva do sistema. Para usar offline, baixe as fontes para `assets/fonts/` e declare `@font-face` em `style.css`.

## Observações
- Respeita `prefers-reduced-motion`.
- O caminho de `og:image` é relativo; para pré-visualização em redes sociais, troque pela URL completa do site depois de publicar.
