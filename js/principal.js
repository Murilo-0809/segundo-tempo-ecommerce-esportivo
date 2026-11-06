// Código comum a todas as páginas: cabeçalho, rodapé, cards e busca

function montarCabecalho() {
  const links = categorias.map((c) => `<a href="categoria.html?cat=${encodeURIComponent(c)}">${c}</a>`).join("");
  document.getElementById("cabecalho").innerHTML = `
    <div class="topo">
      <div class="container topo-linha">
        <button class="botao-menu" id="botao-menu" aria-label="Abrir menu">☰</button>
        <a href="index.html" class="logo">SEGUNDO <span>TEMPO</span></a>
        <form class="busca" id="form-busca">
          <input type="text" id="campo-busca" placeholder="Buscar tênis, bikes, bolas e muito mais...">
          <button type="submit">Buscar</button>
        </form>
        <nav class="acoes">
          <a href="minha-conta.html" class="acao">👤 <span>Minha conta</span></a>
          <a href="favoritos.html" class="acao">♡ <span>Favoritos</span></a>
          <a href="carrinho.html" class="acao">🛒 <span>Carrinho</span> <b id="contador-carrinho">0</b></a>
        </nav>
      </div>
    </div>
    <nav class="menu" id="menu">
      <div class="container menu-linha">
        <button class="menu-todas" id="botao-todas">Todas as categorias ▾</button>
        <div class="painel-categorias" id="painel-categorias">${links}</div>
        ${links}
        <a href="categoria.html?cond=seminovo" class="destaque">Seminovos verificados</a>
        <a href="categoria.html?ver=ofertas" class="destaque">Ofertas</a>
      </div>
    </nav>`;

  document.getElementById("botao-todas").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("painel-categorias").classList.toggle("aberto");
  });
  document.addEventListener("click", () => {
    document.getElementById("painel-categorias").classList.remove("aberto");
  });
  document.getElementById("botao-menu").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("aberto");
  });

  document.getElementById("form-busca").addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = document.getElementById("campo-busca").value.trim();
    if (termo !== "") {
      window.location.href = "categoria.html?busca=" + encodeURIComponent(termo);
    }
  });
  atualizarContador();
}

function montarRodape() {
  document.getElementById("rodape").innerHTML = `
    <div class="container rodape-grid">
      <div>
        <a href="index.html" class="logo">SEGUNDO <span>TEMPO</span></a>
        <p>A loja esportiva de produtos novos e seminovos verificados. Compre, venda e volte pro jogo.</p>
      </div>
      <div>
        <h4>Comprar</h4>
        <a href="categorias.html">Todas as categorias</a>
        <a href="categoria.html?ver=ofertas">Ofertas do dia</a>
        <a href="categoria.html?cond=seminovo">Seminovos verificados</a>
      </div>
      <div>
        <h4>Minha conta</h4>
        <a href="favoritos.html">Favoritos</a>
        <a href="carrinho.html">Carrinho</a>
      </div>
      <div>
        <h4>Formas de pagamento</h4>
        <p>Pix · Cartão de crédito · Cartão de débito</p>
      </div>
    </div>
    <div class="rodape-fim">© 2026 Segundo Tempo · Projeto acadêmico</div>`;
}

// Cria o HTML de um card de produto
function criarCard(p) {
  const favoritos = lerFavoritos();
  const ehFavorito = favoritos.includes(p.id);
  const clicavel = detalhes[p.id] !== undefined;

  let selo = "NOVO";
  if (p.condicao === "seminovo") {
    selo = "SEMINOVO · " + p.grau;
  }

  let precoAntigo = "";
  let desconto = "";
  if (p.precoAntigo > 0) {
    const pct = Math.round((1 - p.preco / p.precoAntigo) * 100);
    precoAntigo = `<s>${formatarPreco(p.precoAntigo)}</s>`;
    desconto = `<span class="desconto">${pct}% OFF</span>`;
  }

  const valorParcela = formatarPreco(p.preco / p.parcelas);
  const frete = p.freteGratis ? "Frete grátis" : "Frete R$ 14,90";
  const classeSelo = p.condicao === "seminovo" ? "selo seminovo" : "selo";

  const imagem = `
    <div class="card-img">
      <img src="${p.imagem}" alt="${p.nome}" onerror="this.style.display='none'">
      <span class="${classeSelo}">${selo}</span>
    </div>`;
  const texto = `
    <p class="vendedor">por ${p.vendedor}</p>
    <h3>${p.nome}</h3>
    <p class="resumo-card">${p.resumo}</p>
    <div class="precos">${precoAntigo}</div>
    <div class="preco-linha"><strong>${formatarPreco(p.preco)}</strong>${desconto}</div>
    <p class="parcela">${p.parcelas}x ${valorParcela} sem juros</p>
    <p class="frete">${frete}</p>`;

  let corpo = "";
  if (clicavel) {
    corpo = `<a href="produto.html?id=${p.id}" class="card-link">${imagem}${texto}</a>`;
  } else {
    corpo = `<div class="card-link">${imagem}${texto}</div>`;
  }

  return `
    <article class="card">
      <button class="coracao ${ehFavorito ? "ativo" : ""}" data-id="${p.id}" aria-label="Favoritar">${ehFavorito ? "♥" : "♡"}</button>
      ${corpo}
    </article>`;
}

// Faz os corações dos cards funcionarem
function ativarFavoritos(aoMudar) {
  const botoes = document.querySelectorAll(".coracao");
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      alternarFavorito(Number(botao.dataset.id));
      if (aoMudar) {
        aoMudar();
      } else {
        botao.classList.toggle("ativo");
        botao.textContent = botao.classList.contains("ativo") ? "♥" : "♡";
      }
    });
  });
}

// Lê um parâmetro da URL, ex.: ?cat=Corrida
function lerParametro(nome) {
  const partes = window.location.search.substring(1).split("&");
  for (let i = 0; i < partes.length; i++) {
    const par = partes[i].split("=");
    if (par[0] === nome) {
      return decodeURIComponent(par[1].split("+").join(" "));
    }
  }
  return "";
}

montarCabecalho();
montarRodape();

// Máscara de campos: o "0" marca onde entra um número; os outros caracteres são colocados sozinhos
function aplicarMascara(campo, padrao) {
  const texto = campo.value;
  let digitos = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= "0" && texto[i] <= "9") {
      digitos = digitos + texto[i];
    }
  }
  let resultado = "";
  let d = 0;
  for (let i = 0; i < padrao.length && d < digitos.length; i++) {
    if (padrao[i] === "0") {
      resultado = resultado + digitos[d];
      d++;
    } else {
      resultado = resultado + padrao[i];
    }
  }
  campo.value = resultado;
}

function ligarMascara(id, padrao) {
  const campo = document.getElementById(id);
  if (!campo) {
    return;
  }
  campo.setAttribute("maxlength", padrao.length);
  campo.addEventListener("input", () => aplicarMascara(campo, padrao));
}

// Ícones simples das categorias (desenhados em SVG)
const iconesCategorias = {
  "Corrida": '<path d="M3 16c2.5 0 3.5-3 6-3s3 2 5 2h7v3H3z"/><path d="M5 13l3-4 3 2"/>',
  "Ciclismo": '<circle cx="6" cy="16" r="4"/><circle cx="18" cy="16" r="4"/><path d="M6 16l4-7h5l3 7M10 9l4 7H6"/>',
  "Futebol": '<circle cx="12" cy="12" r="9"/><path d="M12 8l3 2.3-1.1 3.4h-3.8L9 10.3z"/>',
  "Academia": '<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
  "Natação": '<circle cx="7" cy="14" r="3"/><circle cx="17" cy="14" r="3"/><path d="M10 14h4M4 14L3 10M20 14l1-4"/>',
  "Raquetes": '<circle cx="14" cy="9" r="5.5"/><path d="M10 13l-6 7"/>',
  "Lutas": '<path d="M8 11V6a2 2 0 014 0v4M12 10V5a2 2 0 014 0v7c0 3-2 5-5 5h-1c-2 0-3-1.5-3-3.5V13a2 2 0 014 0"/>',
  "Trilha e outdoor": '<path d="M2 19l6-10 4 6 2-3 8 7z"/>',
  "Yoga & Pilates": '<circle cx="12" cy="6" r="2"/><path d="M6 11h12M12 8v5M9 20l3-7 3 7"/>'
};
