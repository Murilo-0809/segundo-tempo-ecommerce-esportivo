// Mostra o pedido salvo no checkout

const texto = localStorage.getItem("ultimoPedido");
const area = document.getElementById("confirmacao");

if (texto === null) {
  area.innerHTML = `<h1>Nenhum pedido encontrado</h1><br><a href="index.html" class="botao">Voltar para a home</a>`;
} else {
  const pedido = JSON.parse(texto);
  const nomes = { credito: "Cartão de crédito", debito: "Cartão de débito", pix: "Pix" };
  let pagamento = nomes[pedido.pagamento];
  if (pedido.pagamento === "credito") {
    pagamento += " · " + pedido.parcelas + "x de " + formatarPreco(pedido.total / pedido.parcelas) + " sem juros";
  }

  let itens = "";
  pedido.itens.forEach((i) => {
    const tamanho = i.tamanho !== "" ? " (tam. " + i.tamanho + ")" : "";
    itens += `<div class="linha"><span>${i.quantidade}x ${i.nome}${tamanho}</span><span>${formatarPreco(i.preco * i.quantidade)}</span></div>`;
  });

  area.innerHTML = `
    <div class="check">✓</div>
    <h1>Pedido confirmado!</h1>
    <p>Obrigado, ${pedido.cliente.split(" ")[0]}! Enviamos os detalhes para ${pedido.email}.</p>
    <div class="bloco">
      <p><strong>Pedido nº ${pedido.numero}</strong></p>
      ${itens}
      <div class="linha"><span>Frete</span><span>${pedido.frete === 0 ? "Grátis" : formatarPreco(pedido.frete)}</span></div>
      <div class="linha total"><span>Total</span><span>${formatarPreco(pedido.total)}</span></div>
      <p>Pagamento: ${pagamento}</p>
      <p>Entrega: ${pedido.endereco}</p>
    </div>
    <br>
    <a href="index.html" class="botao">Continuar comprando</a>`;
}
