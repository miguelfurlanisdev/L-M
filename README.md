# 💖 Site do pedido — Miguel & Luani

Site estático (HTML/CSS/JS puro, sem instalar nada).

## 1. Personalizar
Edite **só** `js/conteudo.js`. Cada bloco tem um **cartão comentado** (`✍️ CARTÃO`) dizendo o que escrever.
Procure por `✍️` para achar tudo que ainda falta preencher. Salve e atualize a página.

## 2. Ver no seu computador
Os modelos 3D exigem um servidor (não funcionam abrindo o arquivo com duplo clique):
- VS Code: extensão **Live Server** → botão direito em `index.html` → *Open with Live Server*, ou
- Terminal na pasta: `python3 -m http.server 8000` e abra http://localhost:8000

## 3. Publicar grátis no GitHub Pages
1. Crie um repositório no GitHub (ex.: `pedido`) e envie todos estes arquivos (pode arrastar no site do GitHub: *Add file → Upload files*).
2. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
3. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/pedido/`.
4. Teste no celular e gere um QR Code desse link para o grande dia.

## 4. Os 3 tesouros em 3D
- **Anel**: modelo próprio (caixinha que abre/fecha ao clicar, solitário com pedra azul e aliança).
- **Unicórnio**: pelúcia original genérica.
- **Homem-Aranha**: mostra a sua foto num cartão 3D giratório.

Para mostrar o **objeto real** de cada um: escaneie o objeto com o celular (apps grátis: **Polycam**, **Luma AI**, **KIRI Engine**), exporte como `.glb`, coloque na pasta `modelos/` e escreva em `conteudo.js`, por exemplo `modelo: "modelos/homem-aranha.glb"`. Dica: arquivos abaixo de ~15 MB.

## 5. Tour pelo Jardim Botânico
Veja o **CARTÃO 7** em `conteudo.js`. Dois jeitos:
- **Street View**: preencha `lat`/`lng` de cada ponto (clique direito no Google Maps → copiar coordenadas).
- **Fotos 360° suas**: salve em `tour/` e use `foto360: "tour/entrada.jpg"`.
Sem nada preenchido, o site mostra o mapa por satélite do jardim.
**Faça isso ANTES do dia 14** e teste no celular.

## 6. Música (opcional)
Coloque um `.mp3` em `musica/` e escreva o caminho em `abertura.musica`.

## Estrutura
```
index.html  css/style.css  js/conteudo.js  js/main.js  js/visualizador3d.js
fotos/  videos/  modelos/  tour/  musica/
```
O 3D usa three.js via CDN (jsdelivr); precisa de internet.
