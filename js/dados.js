// Dados do site: categorias e produtos (baseados no Figma)

const categorias = [
  "Corrida",
  "Ciclismo",
  "Futebol",
  "Academia",
  "Natação",
  "Raquetes",
  "Lutas",
  "Trilha e outdoor"
];

const produtos = [
  { id: 1, nome: "Tênis de corrida Vento Pro 3 amortecimento responsivo", categoria: "Corrida", preco: 549.90, precoAntigo: 699.90, condicao: "novo", grau: "", vendedor: "Pista Store", parcelas: 10, freteGratis: true, oferta: true, resumo: "Tênis de corrida com amortecimento responsivo para treinos e provas de rua.", imagem: "img/tenis-vento-pro-3.jpg" },
  { id: 2, nome: "Bola de futsal Campo Liso Pro costurada", categoria: "Futebol", preco: 129.90, precoAntigo: 159.90, condicao: "novo", grau: "", vendedor: "Arena Esportes", parcelas: 3, freteGratis: true, oferta: true, resumo: "Bola oficial de futsal, costurada à mão, com boa pegada.", imagem: "img/bola-futsal.jpg" },
  { id: 3, nome: "Garrafa térmica Fôlego 750 ml aço inox", categoria: "Corrida", preco: 79.90, precoAntigo: 99.90, condicao: "novo", grau: "", vendedor: "Pista Store", parcelas: 2, freteGratis: false, oferta: true, resumo: "Garrafa de aço inox com parede dupla, gelada por até 24 horas.", imagem: "img/garrafa-folego.jpg" },
  { id: 4, nome: "Luva de boxe Guarda 12 oz couro sintético", categoria: "Lutas", preco: 189.90, precoAntigo: 239.90, condicao: "novo", grau: "", vendedor: "Dojo Center", parcelas: 6, freteGratis: true, oferta: true, resumo: "Luva de boxe de 12 oz em couro sintético para treino.", imagem: "img/luva-boxe.jpg" },
  { id: 5, nome: "Mochila esportiva Trilha 25 L impermeável", categoria: "Trilha e outdoor", preco: 219.90, precoAntigo: 279.90, condicao: "novo", grau: "", vendedor: "Rota Outdoor", parcelas: 6, freteGratis: true, oferta: true, resumo: "Mochila de trilha de 25 litros, impermeável, para passeios longos.", imagem: "img/mochila-trilha-25l.jpg" },
  { id: 6, nome: "Bike speed Rota C2 carbono aro 700 quadro 54", categoria: "Ciclismo", preco: 4890.00, precoAntigo: 8990.00, condicao: "seminovo", grau: "A", vendedor: "Rafael M. · pessoa física", parcelas: 12, freteGratis: false, oferta: false, resumo: "Bike speed de carbono aro 700, quadro 54, como nova.", imagem: "img/bike-rota-c2.jpg" },
  { id: 7, nome: "Capacete de ciclismo Vórtice com regulagem", categoria: "Ciclismo", preco: 259.90, precoAntigo: 449.90, condicao: "seminovo", grau: "A", vendedor: "Giro Bikes", parcelas: 5, freteGratis: true, oferta: true, resumo: "Capacete de ciclismo com regulagem, seminovo verificado grau A.", imagem: "img/capacete-vortice.jpg" },
  { id: 8, nome: "Raquete de tênis Saque 300 g encordoada", categoria: "Raquetes", preco: 420.00, precoAntigo: 899.00, condicao: "seminovo", grau: "B", vendedor: "Juliana P. · pessoa física", parcelas: 6, freteGratis: true, oferta: true, resumo: "Raquete de tênis de 300 g já encordoada, seminovo verificado grau B.", imagem: "img/raquete-saque.jpg" },
  { id: 9, nome: "Par de halteres emborrachados 10 kg cada", categoria: "Academia", preco: 230.00, precoAntigo: 389.90, condicao: "seminovo", grau: "A", vendedor: "Fit Usados", parcelas: 4, freteGratis: true, oferta: true, resumo: "Par de halteres emborrachados de 10 kg cada, seminovo verificado grau A.", imagem: "img/halteres-10kg.jpg" },
  { id: 10, nome: "Chuteira society Drible tamanho 41", categoria: "Futebol", preco: 160.00, precoAntigo: 349.90, condicao: "seminovo", grau: "B", vendedor: "Lucas T. · pessoa física", parcelas: 3, freteGratis: true, oferta: true, resumo: "Chuteira society tamanho 41, seminovo verificado grau B.", imagem: "img/chuteira-drible.jpg" },
  { id: 11, nome: "Tênis Vento Leve treino diário unissex", categoria: "Corrida", preco: 389.90, precoAntigo: 459.90, condicao: "novo", grau: "", vendedor: "Pista Store", parcelas: 8, freteGratis: true, oferta: true, resumo: "Tênis leve para treino diário, modelo unissex.", imagem: "img/tenis-vento-leve.jpg" },
  { id: 12, nome: "Tênis Trilha Grip para corrida em terra", categoria: "Corrida", preco: 310.00, precoAntigo: 649.90, condicao: "seminovo", grau: "A", vendedor: "Carla S. · pessoa física", parcelas: 5, freteGratis: true, oferta: false, resumo: "Tênis para corrida em terra, seminovo verificado grau A.", imagem: "img/tenis-trilha-grip.jpg" },
  { id: 13, nome: "Tênis Ritmo 2 placa de propulsão", categoria: "Corrida", preco: 989.90, precoAntigo: 1199.90, condicao: "novo", grau: "", vendedor: "Maratona Shop", parcelas: 12, freteGratis: true, oferta: true, resumo: "Tênis com placa de propulsão para treinos e provas.", imagem: "img/tenis-ritmo-2.jpg" },
  { id: 14, nome: "Tênis Passada feminino respirável", categoria: "Corrida", preco: 459.90, precoAntigo: 0, condicao: "novo", grau: "", vendedor: "Pista Store", parcelas: 9, freteGratis: true, oferta: false, resumo: "Tênis respirável para corrida, modelo feminino.", imagem: "img/tenis-passada.jpg" },
  { id: 15, nome: "Tênis Vento Pro 2 tamanho 41 pouco uso", categoria: "Corrida", preco: 280.00, precoAntigo: 599.90, condicao: "seminovo", grau: "B", vendedor: "Diego R. · pessoa física", parcelas: 4, freteGratis: true, oferta: false, resumo: "Tênis Vento Pro 2 tamanho 41, pouco uso, seminovo grau B.", imagem: "img/tenis-vento-pro-2.jpg" },
  { id: 16, nome: "Tênis Asfalto Max para longas distâncias", categoria: "Corrida", preco: 639.90, precoAntigo: 799.90, condicao: "novo", grau: "", vendedor: "Maratona Shop", parcelas: 10, freteGratis: true, oferta: false, resumo: "Tênis com amortecimento para longas distâncias.", imagem: "img/tenis-asfalto-max.jpg" },
  { id: 17, nome: "Tênis Sprint Junior infantil leve", categoria: "Corrida", preco: 229.90, precoAntigo: 0, condicao: "novo", grau: "", vendedor: "Kids Sport", parcelas: 4, freteGratis: true, oferta: false, resumo: "Tênis leve infantil para corrida.", imagem: "img/tenis-sprint-junior.jpg" },
  { id: 18, nome: "Camiseta de corrida Brisa dry fit", categoria: "Corrida", preco: 119.90, precoAntigo: 149.90, condicao: "novo", grau: "", vendedor: "Pista Store", parcelas: 3, freteGratis: true, oferta: true, resumo: "Camiseta de corrida em tecido dry fit para treino.", imagem: "img/camiseta-brisa.jpg" },
  { id: 19, nome: "Mochila de hidratação Trilha 5 L", categoria: "Trilha e outdoor", preco: 199.90, precoAntigo: 249.90, condicao: "novo", grau: "", vendedor: "Rota Outdoor", parcelas: 5, freteGratis: true, oferta: true, resumo: "Mochila de hidratação de 5 litros para corridas e pedaladas.", imagem: "img/mochila-hidratacao-5l.jpg" },
  { id: 20, nome: "Óculos esportivo Reflexo com proteção UV", categoria: "Corrida", preco: 149.90, precoAntigo: 0, condicao: "novo", grau: "", vendedor: "Visão Sport", parcelas: 3, freteGratis: true, oferta: false, resumo: "Óculos esportivo com proteção UV e lente espelhada.", imagem: "img/oculos-reflexo.jpg" },
  { id: 22, nome: "Bike speed Rota A1 alumínio aro 700", categoria: "Ciclismo", preco: 3299.00, precoAntigo: 3899.00, condicao: "novo", grau: "", vendedor: "Giro Bikes", parcelas: 12, freteGratis: true, oferta: true, resumo: "Bike speed de alumínio aro 700, nova.", imagem: "img/bike-rota-a1.jpg" }
];

// Só estes dois produtos podem ser comprados; bike C2 e bola abrem a página de detalhe
const detalhes = {
  1: {
    titulo: "Tênis de corrida Vento Pro 3 com amortecimento responsivo",
    nota: "4,8", avaliacoes: 126, vendidos: "+2.300 vendidos", estoque: 12, compra: true,
    caminho: ["Corrida", "Tênis"],
    tamanhos: [37, 38, 39, 40, 41, 42, 43, 44], esgotados: [38],
    descricao: "Feito para quem treina de 3 a 5 vezes por semana. A entressola de espuma responsiva devolve energia a cada passada, enquanto o cabedal em mesh mantém o pé ventilado mesmo em treinos longos. Ideal para corridas de rua de 5 km até meia maratona.",
    destaques: ["Amortecimento responsivo com retorno de energia", "Cabedal respirável que seca rápido", "Solado de borracha com alta aderência em piso molhado", "Palmilha removível, compatível com palmilhas ortopédicas"],
    ficha: [["Modalidade", "Corrida de rua"], ["Indicação", "Treinos e provas até 21 km"], ["Drop", "8 mm"], ["Peso", "248 g (tamanho 41)"], ["Cabedal", "Mesh respirável"], ["Entressola", "Espuma responsiva"], ["Garantia", "90 dias contra defeitos de fabricação"]],
    comentarios: [["Ana P.", "12 de outubro de 2026", "Uso para treinos de 10 km e o conforto surpreendeu. Veio no tamanho certo e chegou antes do prazo."], ["Marcos V.", "3 de outubro de 2026", "Bem leve e com ótima aderência na chuva. Só achei o cadarço um pouco curto."]]
  },
  3: {
    titulo: "Garrafa térmica Fôlego 750 ml em aço inox com parede dupla",
    nota: "4,9", avaliacoes: 312, vendidos: "+4.100 vendidos", estoque: 38, compra: true,
    caminho: ["Corrida", "Hidratação"], tamanhos: [], esgotados: [],
    descricao: "Garrafa com parede dupla a vácuo que mantém a água gelada por até 24 horas. A tampa de rosca com alça não vaza na mochila e o aço inox não deixa gosto na bebida.",
    destaques: ["Mantém gelado por 24 h e quente por 12 h", "Tampa de rosca à prova de vazamento", "Aço inox 304, sem gosto e sem cheiro", "Cabe no porta-garrafa da bike"],
    ficha: [["Capacidade", "750 ml"], ["Material", "Aço inox 304, parede dupla"], ["Gelado", "Até 24 horas"], ["Quente", "Até 12 horas"], ["Peso", "380 g"], ["Tampa", "Rosca com alça"], ["Garantia", "1 ano contra defeitos de fabricação"]],
    comentarios: []
  },
  6: {
    titulo: "Bike speed Rota C2 carbono aro 700 · quadro 54 · 22 velocidades",
    nota: "4,9", avaliacoes: 38, vendidos: "Anunciado há 6 dias · 214 visualizações", estoque: 1, compra: false,
    caminho: ["Ciclismo", "Bikes speed"], tamanhos: [], esgotados: [],
    descricao: "Bike usada por 1 ano e meio em treinos de fim de semana, sempre guardada em casa. Fiz revisão completa em setembro e troquei os pneus. Estou vendendo porque mudei para uma bike de gravel. Acompanha nota fiscal original, pedais clip e suporte de parede.",
    destaques: ["Nota fiscal original e número de série conferido", "Revisão completa feita em setembro de 2026", "Acompanha pedais clip e suporte de parede", "Retirada em Porto Alegre ou envio com embalagem própria"],
    ficha: [["Quadro", "Carbono · tamanho 54"], ["Câmbio", "2 x 11 · 22 velocidades"], ["Rodas", "Aro 700 alumínio"], ["Freios", "Disco hidráulico"], ["Peso", "8,4 kg"], ["Uso", "2.400 km · 1 ano e meio"], ["Ano", "2024"]],
    comentarios: []
  },
  2: {
    titulo: "Bola de futsal Campo Liso Pro costurada à mão",
    nota: "4,7", avaliacoes: 89, vendidos: "+860 vendidos", estoque: 24, compra: false,
    caminho: ["Futebol", "Bolas"], tamanhos: [], esgotados: [],
    descricao: "Bola oficial para quadra, com gomos costurados à mão e superfície texturizada que melhora o controle no passe e no chute. A câmara de butil mantém a pressão por mais tempo, ideal para quem joga toda semana.",
    destaques: ["Gomos costurados à mão, mais resistentes", "Superfície texturizada para melhor controle", "Câmara de butil que segura a calibragem", "Peso e circunferência oficiais"],
    ficha: [["Modalidade", "Futsal (quadra)"], ["Categoria", "Adulto · Max 500"], ["Material", "PU texturizado"], ["Costura", "Manual"], ["Peso", "410 a 440 g"], ["Circunferência", "62 a 64 cm"], ["Garantia", "90 dias contra defeitos de fabricação"]],
    comentarios: []
  }
};
