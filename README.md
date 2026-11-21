# By Andreia Rodrigues® — site v2

Site estático (HTML, CSS e JavaScript puros, sem build).

## Abrir localmente
Dê dois cliques em `index.html`. Todos os caminhos são relativos.

## Publicar
- **GitHub Pages:** envie esta pasta para um repositório, ative Settings > Pages e escolha a branch `main`, pasta `/ (root)`.
- **Qualquer hospedagem estática** (Netlify, Vercel, Cloudflare Pages, cPanel): envie o conteúdo da pasta.

## Estrutura
- `index.html` (Início) e `galeria.html` (Galeria)
- `assets/css/` style.css (base e Início) e gallery.css
- `assets/js/` main.js (menu, transições, revelações, parallax), animations.js (abertura, texto cinético), gallery.js (lightbox)
- `assets/images/` hero/, gallery/ e details/ em WebP (1000 px; hero 1600 px)

## Dependências externas
Apenas Google Fonts (Cormorant Garamond e Jost), via CDN. Sem internet, o site usa as fontes de reserva (Times New Roman e Helvetica/Arial). Para usar offline, baixe as fontes para `assets/fonts/` e declare `@font-face` em style.css.
Não há GSAP, Lenis nem outras bibliotecas: as animações usam CSS, IntersectionObserver e requestAnimationFrame.

## Observações
- Imagens originais (extraídas do Instagram da loja) não estão incluídas; o ZIP traz as versões otimizadas.
- Respeita `prefers-reduced-motion`.
