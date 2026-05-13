LivePlay Site - pacote corrigido seguro

Este pacote foi feito para substituir o pacote anterior que usava WebP.
Ele preserva a estrutura original do seu site: index.html, styles.css, script.js e imagens na raiz.

O que mudou:
- O botão Assinar PRO agora vai para um formulário no próprio site.
- O formulário envia o e-mail para https://liveplay-backend.onrender.com/payments/create-checkout.
- O checkout retornado pelo backend abre em uma nova aba.
- As imagens NÃO foram convertidas para WebP.
- O arquivo tiktok.png foi corrigido para ser PNG de verdade, porque o original tinha bytes WebP com extensão .png.
- O erro de HTML duplicado no FAQ foi corrigido.
- Links externos usam rel="noopener noreferrer".

Como publicar:
1. Faça backup dos arquivos atuais do site.
2. Entre na pasta pública da hospedagem, normalmente public_html, www ou htdocs.
3. Envie os arquivos deste pacote para essa pasta.
4. Substitua index.html, styles.css, script.js e imagens.
5. Não envie a pasta inteira para dentro de public_html se isso criar public_html/liveplay-site-corrigido-seguro/.
   O index.html deste pacote precisa ficar diretamente na raiz do site.

Teste depois de publicar:
- https://site.liveplayoverlay.com/
- Botão Baixar grátis
- Botão Assinar PRO
- Campo de e-mail do PRO
- Abertura do checkout

Se o checkout der erro no site, mas funcionar no app, a causa provável é CORS no backend.
Nesse caso, libere o domínio https://site.liveplayoverlay.com no endpoint /payments/create-checkout.


Atualização desta versão:
- Texto da seção de demo visual ajustado para não parecer instrução interna.
- Placeholder do vídeo trocado por uma mensagem pública/profissional.
