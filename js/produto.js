// Página de detalhe do produto

const id = Number(lerParametro("id"));
const produto = buscarProduto(id);
const info = detalhes[id];

if (!produto || !info) {
  window.location.href = "index.html";
}

let tamanhoEscolhido = "";
let quantidade = 1;

function desenharProduto() {
  const area = document.getElementById("area-produto");
  document.title = produto.nome + " | Segundo Tempo";

  let tamanhosHtml = "";
  if (info.tamanhos.length > 0) {
    const botoes = info.tamanhos.map((t) => {
      const esgotado = info.esgotados.includes(t);
      const classe = tamanhoEscolhido === String(t) ? "escolhido" : "";
      return `<button class="${classe}" data-tamanho="${t}" ${esgotado ? "disabled" : ""}>${t}</button>`;
    }).join("");
    tamanhosHtml = `
      <p class="opcao">Tamanho:</p>
      <div class="tamanhos" id="tamanhos">${botoes}</div>
      <small>Tamanho 38 esgotado</small>`;
  }

  const pix = produto.preco * 0.95;
  const selo = produto.condicao === "seminovo" ? "SEMINOVO · " + produto.grau : "NOVO";
  const frete = produto.freteGratis ? "Frete grátis" : "Frete R$ 14,90";

  let botoes = "";
  if (info.compra) {
    botoes = `
      <button class="botao cheio" id="comprar-agora">Comprar agora</button>
      <button class="botao vazado cheio" id="adicionar">Adicionar ao carrinho</button>`;
  } else {
    botoes = `<button class="botao cheio" disabled>Compra indisponível nesta versão</button>`;
  }

  let precoAntigo = "";
  if (produto.precoAntigo > 0) {
    precoAntigo = `<span class="preco-antigo">${formatarPreco(produto.precoAntigo)}</span>`;
  }

  const destaques = info.destaques.map((d) => `<li>${d}</li>`).join("");
  const ficha = info.ficha.map((l) => `<tr><td>${l[0]}</td><td>${l[1]}</td></tr>`).join("");

  let comentarios = "";
  if (info.comentarios.length > 0) {
    comentarios = info.comentarios.map((c) => `<div class="comentario"><strong>${c[0]}</strong><small>Compra verificada · ${c[1]}</small><p>${c[2]}</p></div>`).join("");
  }

  const caminho = info.caminho;
  const fotos = galerias[id] || [produto.imagem];
  const miniaturas = fotos.map((f, i) => `<button class="${i === 0 ? "ativa" : ""}" data-foto="${f}"><img src="${f}" alt=""></button>`).join("");
  const outros = produtos.filter((x) => x.id !== id).slice(0, 4);
  area.innerHTML = `
    <p class="migalhas"><a href="index.html">Início</a> / <a href="categoria.html?cat=${encodeURIComponent(caminho[0])}">${caminho[0]}</a> / ${caminho[1]}</p>
    <section class="produto-topo">
      <div class="galeria">
        <div class="miniaturas" id="miniaturas">${miniaturas}</div>
        <div class="produto-foto"><img id="foto-principal" src="${produto.imagem}" alt="${produto.nome}" onerror="this.style.display='none'"></div>
      </div>
      <div class="produto-info">
        <span class="selo ${produto.condicao === "seminovo" ? "seminovo" : ""}" style="position:static;display:inline-block">${selo}</span>
        <h1>${info.titulo}</h1>
        <p class="nota"><b>★ ${info.nota}</b> · ${info.avaliacoes} avaliações · ${info.vendidos}</p>
        <p class="nota">Vendido por ${produto.vendedor}</p>
        ${precoAntigo}
        <p class="preco-grande">${formatarPreco(produto.preco)}</p>
        <p>em até ${produto.parcelas}x de ${formatarPreco(produto.preco / produto.parcelas)} sem juros</p>
        <p class="info-pix">ou ${formatarPreco(pix)} no Pix (5% de desconto)</p>
        ${tamanhosHtml}
        <p class="opcao">Quantidade:</p>
        <div class="quantidade">
          <button id="menos">−</button><span id="qtd">${quantidade}</span><button id="mais">+</button>
        </div>
        <small> ${info.estoque} disponíveis</small>
        <p class="mensagem" id="mensagem"></p>
        <p class="info-pix">${frete}</p>
        <div class="produto-botoes">${botoes}</div>
        <div class="garantias"><span>✔ Compra garantida</span><span>✔ Devolução em 7 dias</span><span>✔ Embalagem original</span></div>
      </div>
    </section>
    <section class="bloco">
      <h2>Descrição</h2>
      <p>${info.descricao}</p>
      <ul>${destaques}</ul>
    </section>
    <section class="bloco">
      <h2>Ficha técnica</h2>
      <table class="ficha">${ficha}</table>
    </section>
    <section class="relacionados">
      <h2>Quem comprou este produto também levou</h2>
      <div class="grade">${outros.map(criarCard).join("")}</div>
    </section>
    <section class="bloco">
      <h2>Avaliações</h2>
      <p><b>★ ${info.nota}</b> · ${info.avaliacoes} avaliações</p>
      ${comentarios}
      <a href="avaliacoes.html?id=${id}" class="botao vazado">Ver todas as ${info.avaliacoes} avaliações</a>
    </section>`;

  ligarEventos();
}

function mensagem(texto, tipo) {
  const caixa = document.getElementById("mensagem");
  caixa.textContent = texto;
  caixa.className = "mensagem " + tipo;
}

// Valida e coloca no carrinho; devolve true se deu certo
function colocarNoCarrinho() {
  if (info.tamanhos.length > 0 && tamanhoEscolhido === "") {
    mensagem("Escolha um tamanho antes de continuar.", "erro");
    return false;
  }
  adicionarAoCarrinho(id, tamanhoEscolhido, quantidade);
  return true;
}

function ligarEventos() {
  document.querySelectorAll("#miniaturas button").forEach((b) => {
    b.addEventListener("click", () => {
      document.getElementById("foto-principal").src = b.dataset.foto;
      document.querySelectorAll("#miniaturas button").forEach((x) => x.classList.remove("ativa"));
      b.classList.add("ativa");
    });
  });
  ativarFavoritos();
  document.getElementById("mais").addEventListener("click", () => {
    if (quantidade < info.estoque) {
      quantidade++;
      document.getElementById("qtd").textContent = quantidade;
    }
  });
  document.getElementById("menos").addEventListener("click", () => {
    if (quantidade > 1) {
      quantidade--;
      document.getElementById("qtd").textContent = quantidade;
    }
  });

  const tamanhos = document.getElementById("tamanhos");
  if (tamanhos) {
    tamanhos.addEventListener("click", (e) => {
      if (e.target.dataset.tamanho) {
        tamanhoEscolhido = e.target.dataset.tamanho;
        desenharProduto();
      }
    });
  }

  if (info.compra) {
    document.getElementById("adicionar").addEventListener("click", () => {
      if (colocarNoCarrinho()) {
        mensagem("Produto adicionado ao carrinho!", "certo");
      }
    });
    document.getElementById("comprar-agora").addEventListener("click", () => {
      if (colocarNoCarrinho()) {
        window.location.href = "checkout.html";
      }
    });
  }
}

// Fotos extras de cada produto (miniaturas)
const galerias = {
  1: ["img/tenis-vento-pro-3.jpg", "img/tenis-vento-pro-3-costas.jpg", "img/tenis-vento-pro-3-sola.jpg"]
};

if (produto && info) {
  desenharProduto();
}
