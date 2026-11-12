# 💖 L♥M — Um site de namoro
 
Site romântico feito à mão para o meu **namoro**, com nossas história, galeria de fotos e vídeos, objetos em **3D interativo**, um **tour virtual** pelo local do pedido e uma pergunta final.
 
> HTML, CSS e JavaScript puros. Sem framework, sem build e sem instalar nada. Roda direto no **GitHub Pages**.
 
---
 
## ✨ O que o site tem
 
| Seção | O que faz |
|---|---|
| **Envelope de abertura** | Um envelope animado que abre ao toque. A carta sai na frente e a tela some com fade. Também é o momento em que a música começa. |
| **Início** | Nomes do casal em destaque, frase que aparece "digitando" e pétalas e corações caindo pela tela. |
| **Nossa história** | Linha do tempo com fotos em moldura de polaroid, que inclinam em 3D ao passar o mouse e aparecem conforme a página rola. |
| **Momentos nossos** | Galeria de polaroids com zoom (lightbox) e vídeos do casal. |
| **Nossos tesouros (3D)** | Três objetos que o visitante pode girar, arrastar e dar zoom: um anel com caixinha que abre e fecha ao clicar, uma pelúcia de unicórnio e um cartão de foto 3D. |
| **Um passeio pelo lugar** | Tour virtual com Street View do Google ou fotos 360° próprias, com pontos de parada e botões de navegação. |
| **O pedido** | Declaração, pergunta final e dois botões: o **"Sim"** solta confete e corações, e o **"Não"** foge do dedo ou do mouse. |
| **Música** | Trilha de fundo opcional, com botão para pausar. |
 
---
 
## 🛠️ Tecnologias
 
- **HTML5 / CSS3**: Grid, Flexbox, `clip-path`, animações com `@keyframes`, variáveis CSS e `prefers-reduced-motion` (respeita quem desativa animações).
- **JavaScript (ES6+)**: sem dependências para a lógica principal. Usa `IntersectionObserver` para animar ao rolar, `<canvas>` 2D para pétalas e confete e `ResizeObserver`.
- **[three.js](https://threejs.org/) (r160)**, carregado por CDN com `importmap`:
  - `OrbitControls` para girar e dar zoom nos objetos,
  - `RoundedBoxGeometry`, `RoomEnvironment` (reflexos nos metais) e `GLTFLoader` (modelos `.glb` reais).
- **Google Fonts**: Playfair Display, Great Vibes e Poppins.
- **Google Maps (embed)**: Street View sem chave de API.
### Como o 3D foi feito
 
- O **anel**, a **caixinha de veludo** e a **pelúcia** são modelados **por código** (geometrias do three.js), sem arquivos de modelo.
- Qualquer objeto pode ser trocado por um modelo real, em `.glb`, informando o caminho em `js/conteudo.js`.
- Cada visualizador só renderiza quando está visível na tela, para economizar bateria no celular.
- No celular, arrastar na horizontal gira o objeto e arrastar na vertical rola a página.
---
 
## 📁 Estrutura
 
```
├── index.html            # estrutura da página
├── css/
│   └── style.css         # visual e animações
├── js/
│   ├── conteudo.js       # ✍️ TODOS os textos e configurações (único arquivo a editar)
│   ├── main.js           # lógica: envelope, linha do tempo, galeria, tour, pedido, partículas
│   └── visualizador3d.js # objetos 3D e tour em foto 360°
├── fotos/                # fotos otimizadas
├── videos/               # vídeos (.mp4) e capas
├── modelos/              # modelos 3D opcionais (.glb)
├── musica/               # trilha sonora (.mp3)
└── tour/                 # fotos 360° opcionais
```
 
---
 
## ✏️ Como personalizar
 
Todo o conteúdo fica em **`js/conteudo.js`**, organizado em **cartões comentados** que explicam o que escrever em cada campo: nomes, história, galeria, vídeos, descrição dos objetos 3D, pontos do tour, texto do pedido e música.
 
- **Fotos e vídeos**: coloque os arquivos nas pastas e informe o caminho em `conteudo.js`.
- **Objeto 3D real**: escaneie o objeto com um app (Polycam, Luma AI, KIRI Engine), exporte em `.glb`, salve em `modelos/` e preencha o campo `modelo`.
- **Tour**: informe `lat` e `lng` (Street View) ou `foto360` (foto 360° própria) em cada ponto.
- **Música**: coloque um `.mp3` em `musica/` e preencha `abertura.musica`.
---
 
## ♿ Acessibilidade e desempenho
 
- Respeita `prefers-reduced-motion`.
- Imagens com carregamento preguiçoso (`loading="lazy"`).
- Layout responsivo, pensado primeiro para o celular.
- Os visualizadores 3D só renderizam quando aparecem na tela.
---
 
## 💌 Sobre
 
Projeto pessoal, feito com carinho para um momento especial.
O código pode ser usado como base para outros sites de pedido, aniversário ou declaração.
 