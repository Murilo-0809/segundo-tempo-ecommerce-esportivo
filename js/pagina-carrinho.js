// Página do carrinho: alterar quantidade, remover e ver o total

function desenharCarrinho() {
  const carrinho = lerCarrinho();
  const area = document.getElementById("area-carrinho");

  if (carrinho.length === 0) {
    area.innerHTML = `
      <div class="bloco carrinho-vazio">
        <h2>Seu carrinho está vazio</h2>
        <p>Que tal explorar as ofertas do dia?</p>
        <a href="categoria.html?ver=ofertas" class="botao">Ver ofertas</a>
      </div>`;
    return;
  }

  let itens = "";
  carrinho.forEach((item, posicao) => {
    const p = buscarProduto(item.id);
    const estoque = detalhes[item.id].estoque;
    let tamanho = "";
    if (item.tamanho !== "") {
      tamanho = `<small>Tamanho: ${item.tamanho}</small>`;
    }
    itens += `
      <div class="item-carrinho">
        <div class="mini"><img src="${p.imagem}" alt="${p.nome}" onerror="this.style.display='none'"></div>
        <div>
          <h3>${p.nome}</h3>
          ${tamanho}<br>
          <small>${formatarPreco(p.preco)} cada · por ${p.vendedor}</small>
        </div>
        <div class="item-direita">
          <div class="quantidade">
            <button data-acao="menos" data-pos="${posicao}">−</button>
            <span>${item.quantidade}</span>
            <button data-acao="mais" data-pos="${posicao}" ${item.quantidade >= estoque ? "disabled" : ""}>+</button>
          </div>
          <p><strong>${formatarPreco(p.preco * item.quantidade)}</strong></p>
          <button class="remover" data-acao="remover" data-pos="${posicao}">Remover</button>
        </div>
      </div>`;
  });

  const subtotal = calcularSubtotal();
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;
  let textoFrete = formatarPreco(frete);
  if (frete === 0) {
    textoFrete = "Grátis";
  }

  area.innerHTML = `
    <div class="duas-colunas">
      <section class="bloco" style="margin:0">${itens}</section>
      <aside class="resumo">
        <h2>Resumo</h2>
        <div class="linha"><span>Subtotal</span><span>${formatarPreco(subtotal)}</span></div>
        <div class="linha"><span>Frete</span><span class="${frete === 0 ? "verde" : ""}">${textoFrete}</span></div>
        <div class="linha total"><span>Total</span><span>${formatarPreco(total)}</span></div>
        <p style="color:#5c6360;font-size:.9rem">ou até ${calcularParcelas(total)}x de ${formatarPreco(total / calcularParcelas(total))} sem juros</p>
        <a href="checkout.html" class="botao cheio">Finalizar compra</a>
        <a href="index.html" class="botao vazado cheio">Continuar comprando</a>
      </aside>
    </div>`;

  ligarBotoes();
}

function ligarBotoes() {
  document.querySelectorAll("[data-acao]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const posicao = Number(botao.dataset.pos);
      const carrinho = lerCarrinho();
      const acao = botao.dataset.acao;

      if (acao === "mais") {
        carrinho[posicao].quantidade++;
      } else if (acao === "menos") {
        carrinho[posicao].quantidade--;
      }

      if (acao === "remover" || carrinho[posicao].quantidade < 1) {
        carrinho.splice(posicao, 1);
      }
      salvarCarrinho(carrinho);
      desenharCarrinho();
    });
  });
}

desenharCarrinho();
