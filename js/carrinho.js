// Funções do carrinho e dos favoritos (usam o localStorage)

function lerCarrinho() {
  const texto = localStorage.getItem("carrinho");
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
}

function buscarProduto(id) {
  return produtos.find((p) => p.id === Number(id));
}

function adicionarAoCarrinho(id, tamanho, quantidade) {
  const carrinho = lerCarrinho();
  // se o mesmo produto (e tamanho) já está no carrinho, só soma a quantidade
  const item = carrinho.find((i) => i.id === id && i.tamanho === tamanho);
  if (item) {
    item.quantidade = item.quantidade + quantidade;
  } else {
    carrinho.push({ id: id, tamanho: tamanho, quantidade: quantidade });
  }
  salvarCarrinho(carrinho);
}

function removerDoCarrinho(posicao) {
  const carrinho = lerCarrinho();
  carrinho.splice(posicao, 1);
  salvarCarrinho(carrinho);
}

function calcularSubtotal() {
  const carrinho = lerCarrinho();
  let total = 0;
  carrinho.forEach((item) => {
    total = total + buscarProduto(item.id).preco * item.quantidade;
  });
  return total;
}

// Frete grátis a partir de R$ 199
function calcularFrete(subtotal) {
  if (subtotal === 0 || subtotal >= 199) {
    return 0;
  }
  return 14.90;
}

// Quantas parcelas sem juros: parcela mínima de R$ 39, máximo 10x
function calcularParcelas(valor) {
  let parcelas = 1;
  while (parcelas < 10 && valor / (parcelas + 1) >= 39) {
    parcelas++;
  }
  return parcelas;
}

function formatarPreco(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function atualizarContador() {
  const contador = document.getElementById("contador-carrinho");
  if (!contador) {
    return;
  }
  let quantidade = 0;
  lerCarrinho().forEach((item) => {
    quantidade = quantidade + item.quantidade;
  });
  contador.textContent = quantidade;
}

// ----- Favoritos -----
function lerFavoritos() {
  const texto = localStorage.getItem("favoritos");
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function alternarFavorito(id) {
  let favoritos = lerFavoritos();
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((f) => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}
