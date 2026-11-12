/* ═══════════════════════════════════════════════════════════════════════════
   💌  CONTEÚDO DO SITE  —  É AQUI QUE VOCÊ ESCREVE TUDO!

   Este é o ÚNICO arquivo que você precisa editar para personalizar o site.
   Procure pelos cartões assim:

   ┌───────────────────────────────────────────┐
   │ ✍️ CARTÃO  →  explica O QUE escrever       │
   └───────────────────────────────────────────┘

   Regras de ouro:
   • Mexa só no texto que fica entre aspas  "assim".
   • Se quiser usar aspas dentro do texto, escreva \"assim\".
   • Para pular de linha dentro de um texto, escreva <br>.
   • Não apague vírgulas nem chaves { } [ ].
   • Salvou? Atualize a página (F5) e veja o resultado.
   ═══════════════════════════════════════════════════════════════════════════ */

window.CONTEUDO = {

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 1 — O CASAL                                                  │
     │ O QUE ESCREVER: os nomes, a data do pedido e o lugar.                 │
     │ Aparece na tela de abertura, no topo do site e no final.              │
     └──────────────────────────────────────────────────────────────────────┘ */
  casal: {
    nome1: "Miguel",
    nome2: "Luani",
    dataPedido: "14 de novembro",
    local: "Jardim Botânico de Sorocaba",
  },

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 2 — ABERTURA (primeira tela)                                 │
     │ envelope: texto que fica no envelope antes de abrir (ex: "Para a Luani")│
     │ frase:    frase que aparece "digitando" no topo. Curta e de coração.   │
     │ musica:   (opcional) caminho de uma música da pasta /musica.           │
     │           Ex: "musica/nossa-musica.mp3". Deixe "" para não ter música. │
     └──────────────────────────────────────────────────────────────────────┘ */
  abertura: {
    envelope: "Para Luani Yamazaki",
    frase: "Fiz algo especial para você…",
    musica: "",
  },

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 3 — NOSSA HISTÓRIA (linha do tempo)                          │
     │ Cada { ... } é um momento. Copie e cole um bloco para criar mais.     │
     │   data:   quando foi (ex: "Março de 2024", "Nosso 1º rolê").           │
     │   titulo: nome curto do momento.                                       │
     │   texto:  conte o que aconteceu, o que você sentiu, por que importa.   │
     │           2 a 4 frases ficam ótimas.                                   │
     │   foto:   caminho da foto (pasta /fotos). Pode ser "" se não tiver.    │
     │ DICA: troque a ORDEM dos blocos para contar na ordem certa!            │
     └──────────────────────────────────────────────────────────────────────┘ */
  historia: [
    {
      data: "06/04/25 - Um culto de Domingo",
      titulo: "O começo de tudo",
      texto: "Consigo lembrar até hoje do primeiro dia que te vi, numa Santa Ceia de Páscoa... Você chegando atrasada na hora do louvor kkk, meu mundo parou naquele momento, meu coração deu um duplo mortal carpado (E olha que nem sabia que corações faziam isso). Eu só conseguia pensar quem é essa garota?",
      foto: "fotos/selfie-coracoes.jpg",
    },
    {
      data: "02/11 - Um dia inteiro juntos ",
      titulo: "Nosso primeiro selinho",
      texto: "Depois de tanto tempo, finalmente aconteceu kkk... A gente se olhou no carro e só aconteceu, nem pareceu que foi o primeiro de tão natural e leve que foi.",
      foto: "fotos/carro-1.jpg",
    },
    {
      data: "24/10 - Primeira vez que você veio em casa",
      titulo: "Primeiro louvor gravado",
      texto: "A gente sentou lado a lado depois de alguns minutos decidindo aonde que iriamos gravar e nem pareceu que foi a primeira vez também, até porque tudo com você é tão leve e bom que chega a ser inexplicavel, cantamos Até que o Senhor Venha e Encontre Aqui",
      foto: "fotos/violao.jpg",
    },
    {
      data: "✍️ Escreva a data / momento",
      titulo: "Rindo à toa",
      texto: "✍️ Aquele dia em que vocês só riram. Onde foi? Qual era a piada? Por que esse dia é especial?",
      foto: "fotos/balanco.jpg",
    },
    {
      data: "✍️ Escreva a data / momento",
      titulo: "Dias de diversão",
      texto: "✍️ Fliperama, shopping, passeio… conte um lugar divertido que vocês foram juntos e o que aconteceu lá.",
      foto: "fotos/fliperama.jpg",
    },
    {
      data: "✍️ Escreva a data / momento",
      titulo: "Flores pra você",
      texto: "✍️ Conte sobre o dia das flores: como foi a surpresa, o que ela falou, como ela reagiu.",
      foto: "fotos/flores-casal.jpg",
    },
    {
      data: "✍️ Escreva a data / momento",
      titulo: "M + L",
      texto: "✍️ Quem escreveu as iniciais? Onde fica esse lugar? O que ele significa pra vocês?",
      foto: "fotos/tronco-ml.jpg",
    },
  ],

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 4 — GALERIA DE FOTOS                                         │
     │ foto:    caminho da foto.                                              │
     │ legenda: frase curta embaixo da foto (pode ser só uma palavra ou emoji)│
     │ Para adicionar fotos: coloque o arquivo na pasta /fotos e crie um novo │
     │ bloco igual aos de baixo.                                              │
     └──────────────────────────────────────────────────────────────────────┘ */
  galeria: [
    { foto: "fotos/selfie-orelhinhas.jpg", legenda: "✍️ legenda" },
    { foto: "fotos/carro-2.jpg",           legenda: "✍️ legenda" },
    { foto: "fotos/balanco-pb.jpg",        legenda: "✍️ legenda" },
    { foto: "fotos/flores-ela.jpg",        legenda: "✍️ legenda" },
    { foto: "fotos/surpresa.jpg",          legenda: "✍️ legenda" },
    { foto: "fotos/caixinha-mao.jpg",      legenda: "✍️ legenda" },
    { foto: "fotos/carro-1.jpg",           legenda: "✍️ legenda" },
    { foto: "fotos/selfie-coracoes.jpg",   legenda: "✍️ legenda" },
  ],

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 5 — VÍDEOS                                                   │
     │ arquivo: vídeo em .mp4 na pasta /videos. legenda: o que é o vídeo.     │
     │ capa: imagem de capa (opcional). Apague o bloco se não quiser vídeos.  │
     └──────────────────────────────────────────────────────────────────────┘ */
  videos: [
    { arquivo: "videos/video1.mp4", capa: "videos/video1.jpg", legenda: "✍️ Qual momento é esse?" },
    { arquivo: "videos/video2.mp4", capa: "videos/video2.jpg", legenda: "✍️ Qual momento é esse?" },
  ],

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 6 — OS TRÊS TESOUROS 3D (anel, Homem-Aranha, unicórnio)       │
     │ Objetos que a pessoa pode girar, arrastar e dar zoom.                  │
     │                                                                        │
     │ titulo:    nome do objeto.                                             │
     │ subtitulo: uma frase curta (ex: "O que eu guardei pra você").          │
     │ descricao: ✍️ AQUI É O MAIS IMPORTANTE! Explique POR QUE esse objeto   │
     │            está aqui: de onde veio, qual é a história, o que significa │
     │            pra vocês. Ex (Homem-Aranha): "Quando você… eu comprei… e   │
     │            desde então…". Ex (unicórnio): "O dia em que ganhei…".      │
     │ modelo:    (opcional) arquivo 3D .glb da pasta /modelos para mostrar   │
     │            o objeto REAL em 3D. Ex: "modelos/homem-aranha.glb".        │
     │            Deixe "" para usar o modelo padrão do site.                 │
     │            Veja o README.md: como transformar sua foto em .glb.        │
     └──────────────────────────────────────────────────────────────────────┘ */
  tesouros: [
    {
      id: "anel",
      titulo: "O anel",
      subtitulo: "Pequeno por fora, enorme por dentro",
      descricao: "✍️ Conte sobre o anel: por que você escolheu esse modelo, por que a pedra é azul, o que ele representa pra você e o que você quer dizer entregando ele.",
      modelo: "",
    },
    {
      id: "aranha",
      titulo: "O Homem-Aranha",
      subtitulo: "Tem uma história aqui",
      descricao: "✍️ Explique por que o Homem-Aranha está aqui: foi um presente? É uma piada interna? Lembra algum dia? Escreva a história completa!",
      modelo: "",           // ex: "modelos/homem-aranha.glb"
      foto: "fotos/homem-aranha.jpg",   // mostrada enquanto você não tem o .glb
    },
    {
      id: "unicornio",
      titulo: "O unicórnio",
      subtitulo: "Ele também faz parte da gente",
      descricao: "✍️ Explique por que o unicórnio está aqui: quem deu, quando, o que ele significa pra ela e por que ele não podia ficar de fora.",
      modelo: "",           // ex: "modelos/unicornio.glb"
    },
  ],

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 7 — TOUR PELO JARDIM BOTÂNICO                                │
     │ intro: texto curto antes do tour (ex: "Venha andar comigo pelo lugar   │
     │        onde tudo vai acontecer…").                                     │
     │ pontos: cada { ... } é uma parada do tour. Use quantas quiser.         │
     │   nome:     nome do ponto (ex: "Entrada", "Lago", "Nosso cantinho").   │
     │   descricao: o que tem ali e POR QUE esse ponto importa.               │
     │                                                                        │
     │   📍 COMO ANDAR NO LUGAR (Street View do Google) — escolha UM jeito:   │
     │                                                                        │
     │   JEITO A — Street View (mais fácil)                                   │
     │     1. Abra o Google Maps no computador e procure o ponto.             │
     │     2. Arraste o bonequinho amarelo até a rua/trilha do jardim.        │
     │     3. Clique com o botão direito no chão → clique nos números         │
     │        (ex: -23.50123, -47.45123) para copiar.                          │
     │     4. Cole em lat e lng abaixo. (heading = para onde olhar, 0 a 360:  │
     │        0 norte, 90 leste, 180 sul, 270 oeste.)                         │
     │                                                                        │
     │   JEITO B — Suas próprias fotos 360° (mais lindo e funciona em        │
     │     qualquer lugar, até dentro do jardim)                               │
     │     1. No celular, use o app "Google Street View" (modo Foto 360) ou   │
     │        o modo Panorama do celular, e tire a foto no ponto.             │
     │     2. Coloque o arquivo na pasta /tour e escreva em foto360:          │
     │        foto360: "tour/entrada.jpg"                                     │
     │                                                                        │
     │   Se lat/lng e foto360 estiverem vazios, o site mostra o mapa do lugar.│
     └──────────────────────────────────────────────────────────────────────┘ */
  tour: {
    intro: "Quer conhecer o lugar onde tudo vai acontecer? Venha andar comigo. Arraste para olhar em volta e clique nas setinhas para caminhar.",
    enderecoBusca: "Jardim Botânico Irmãos Villas-Bôas, Sorocaba, SP",   // usado quando não há lat/lng
    pontos: [
      {
        nome: "A entrada",
        descricao: "✍️ Por aqui começa o nosso dia.",
        lat: null, lng: null, heading: 0,
        foto360: "",
      },
      {
        nome: "O caminho",
        descricao: "✍️ Descreva o trecho do passeio: o que tem de bonito, o que vocês vão fazer ali.",
        lat: null, lng: null, heading: 90,
        foto360: "",
      },
      {
        nome: "O nosso cantinho",
        descricao: "✍️ O lugar exato do pedido! Conte por que você escolheu este ponto.",
        lat: null, lng: null, heading: 180,
        foto360: "",
      },
    ],
  },

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 8 — O PEDIDO (final do site)                                 │
     │ titulo:    título da seção (ex: "Chegou o grande momento").            │
     │ texto:     sua declaração! Aqui vale falar tudo o que você sente.      │
     │ pergunta:  a pergunta final (aparece grande, com os botões).           │
     │ resposta:  mensagem que aparece quando ela clica em "Sim".             │
     │ como:      (opcional) conte COMO foi o pedido, depois que acontecer.   │
     │            Fica numa caixinha "Como foi". Deixe "" por enquanto.       │
     └──────────────────────────────────────────────────────────────────────┘ */
  pedido: {
    titulo: "Chegou o grande momento",
    texto: "✍️ Escreva aqui sua declaração: o que ela representa pra você, o que mudou na sua vida desde que ela chegou, o que você promete.",
    pergunta: "Luani, quer namorar comigo?",
    resposta: "✍️ Ela disse SIM! Escreva aqui uma mensagem de comemoração que aparece quando ela clicar em Sim. 💖",
    como: "",
  },

  /* ┌──────────────────────────────────────────────────────────────────────┐
     │ ✍️ CARTÃO 9 — RODAPÉ                                                   │
     │ Frase pequena no fim da página.                                        │
     └──────────────────────────────────────────────────────────────────────┘ */
  rodape: "Feito com amor, só pra você.",
};
