# NONRE — Segurança & Casa Inteligente

Site de **instalação de câmeras (CFTV), automação residencial, iluminação e tomadas inteligentes**, com controle pelo celular e pela Alexa.

- Abertura animada feita só com CSS (aparece uma vez por visita)
- Casa interativa no topo: o visitante liga luzes, tomada e câmera e testa as cenas "Alexa, cheguei" e "Alexa, boa noite"
- Seções: Serviços, Comando de voz, Como funciona, Benefícios, Dúvidas e Contato
- Todos os botões abrem o WhatsApp com uma mensagem pronta
- Site estático (HTML + CSS + JS): sem banco de dados e sem build

## Configurar o WhatsApp

Abra `assets/js/main.js` e preencha a primeira linha com o seu número (55 + DDD + número, só números):

```js
const WHATSAPP = "5511987654321";
```

Enquanto estiver vazio, os botões levam para a seção de contato e aparece um aviso lá.

## Ver no computador

Abra o arquivo `index.html` no navegador, ou, na pasta do projeto, rode:

```bash
python -m http.server 8000
```

e acesse <http://localhost:8000>.

## Versionar no GitHub

1. Crie um repositório **vazio** no GitHub (sem README), por exemplo `nonre-site`.
2. Na pasta do projeto:

```bash
git remote add origin https://github.com/SEU-USUARIO/nonre-site.git
git push -u origin main
```

(O projeto já vem com o primeiro commit.)

## Publicar na Railway

1. **New Project → Deploy from GitHub repo →** escolha `nonre-site`.
   A Railway reconhece o `index.html` e publica como site estático (servidor Caddy). Não precisa de variáveis nem de banco.
2. **Settings → Networking → Generate Domain** para ter o endereço público.
3. Cada `git push` publica a nova versão automaticamente.

### Domínio próprio (ex.: www.nonre.com.br)

Na Railway, vá em **Settings → Networking → Custom Domain**, adicione `www.seudominio.com.br` e crie no seu provedor de DNS os dois registros que ela mostrar: o **CNAME** (`www` → `....up.railway.app`) e o **TXT** (`_railway-verify.www`).

## Estrutura

```
index.html              página
favicon.svg             ícone da aba
assets/css/style.css    visual e animações (inclui a abertura)
assets/js/main.js       WhatsApp, menu, casa interativa
assets/img/logo-mark.svg  símbolo da marca
```

## Personalizar

- **Textos:** direto no `index.html`. Cada seção está marcada com um comentário (`<!-- SERVIÇOS -->`, etc.).
- **Cores:** no começo do `style.css` (`--ambar`, `--verde`, `--fundo`...).
- **Logo:** `assets/img/logo-mark.svg` (casa + lente de câmera + sinal). É só trocar o arquivo quando a logo definitiva ficar pronta.
