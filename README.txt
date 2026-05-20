LivePlay Site Oficial — versão ajustada

Arquivos principais:
- index.html
- styles.css
- script.js
- robots.txt
- assets/images/*

O que foi corrigido:
- O botão "Assinar PRO" não baixa mais o instalador.
- O site agora abre um modal pedindo o email da conta LivePlay.
- O modal chama o mesmo endpoint usado pelo app:
  POST https://liveplay-backend.onrender.com/payments/create-checkout
  body: { "email": "email-da-conta@exemplo.com" }
- O checkout retornado pelo backend é aberto em nova aba.
- O usuário é orientado a usar o mesmo email no app para sincronizar a licença PRO.
- Foi adicionada a comparação FREE x PRO com os limites encontrados na tela de Planos do app.
- O botão placeholder de Discord foi removido da chamada principal.
- Links externos usam rel="noopener noreferrer".
- Imagens foram convertidas para WebP e movidas para assets/images.
- Imagens abaixo da primeira dobra usam loading="lazy" e decoding="async".
- Foram adicionados metadados sociais básicos, robots.txt e Content Security Policy inicial.

Configurações:
No script.js, confira:
- LIVEPLAY_CONFIG.DOWNLOAD_URL
- LIVEPLAY_CONFIG.API_BASE

Atenção sobre CORS:
Para o checkout funcionar no navegador, o backend precisa permitir CORS para o domínio onde o site será hospedado.
Se o CORS não estiver liberado, o endpoint pode funcionar no app Electron, mas falhar no site.

Como testar:
1. Hospede a pasta em um servidor local ou no domínio real.
2. Abra o site no navegador.
3. Clique em "Assinar PRO".
4. Informe o email da conta LivePlay.
5. Confirme se o checkout abre.
6. Depois do pagamento aprovado, abra o app com o mesmo email e sincronize a licença na tela de Planos.


Atualização Sons Of The Forest:
- Adicionado card de Sons Of The Forest nos recursos.
- Adicionado Sons Of The Forest na área "LivePlay em ação".
- Adicionado Sons Of The Forest na galeria/compatibilidade.
- Adicionada linha de limite na comparação FREE x PRO: 8 presets FREE / 60 PRO.
- Adicionada imagem assets/images/sons.webp.


Atualização aplicada:
- GTA V foi renomeado visualmente para Grand Theft Auto V Legacy.
- Green Hell foi adicionado nas seções principais do site.
- A comparação FREE x PRO recebeu a linha de Green Hell.
- As imagens inferiores de Sons Of The Forest foram trocadas por imagens de personagens/mutantes.
- Foram adicionadas imagens de Jaguar/Puma e logo Green Hell.
