// Mostra o andamento de um pedido (o pedido vem da URL: ?n=numero)

const numero = lerParametro("n");
const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
let pedido = pedidos.find((p) => p.numero === numero);
if (!pedido && pedidos.length > 0) {
  pedido = pedidos[0];
}

const area = document.getElementById("area-acompanhar");
if (!pedido) {
  area.innerHTML = `<div class="vazio" style="margin-top:30px"><h2>Pedido não encontrado</h2><p>Veja seus pedidos na área da conta.</p><br><a href="meus-pedidos.html" class="botao">Meus pedidos</a></div>`;
} else {
  const passos = ["Pedido confirmado", "Pagamento aprovado", "Em separação", "Enviado pelo vendedor", "Em trânsito", "Entregue"];
  let linhas = "";
  passos.forEach((nome, i) => {
    const feito = i < 2;
    linhas += `<li class="${feito ? "feito" : ""}">${nome}${feito ? "<small>Concluído</small>" : "<small>Aguardando</small>"}</li>`;
  });
  let itens = "";
  pedido.itens.forEach((i) => {
    const tamanho = i.tamanho !== "" ? " · tam. " + i.tamanho : "";
    itens += `<div class="linha"><span>${i.quantidade}x ${i.nome}${tamanho}</span><span>${formatarPreco(i.preco * i.quantidade)}</span></div>`;
  });
  area.innerHTML = `
    <div class="titulo-pagina"><h1>Pedido nº ${pedido.numero}</h1><p>Entrega em ${pedido.endereco}</p></div>
    <div class="caixa-verde"><h2>Em andamento</h2><p>Estamos preparando seu pedido. Você recebe atualizações por e-mail em ${pedido.email}.</p></div>
    <div class="bloco-linha">
      <div class="bloco" style="margin:0"><h2>Acompanhamento</h2><ul class="linha-tempo">${linhas}</ul></div>
      <div class="bloco" style="margin:0"><h2>Itens do pedido</h2>${itens}
        <div class="linha"><span>Frete</span><span>${pedido.frete === 0 ? "Grátis" : formatarPreco(pedido.frete)}</span></div>
        <div class="linha total"><span>Total</span><span>${formatarPreco(pedido.total)}</span></div>
      </div>
    </div>
    <p style="margin-top:20px"><a href="meus-pedidos.html" class="botao vazado">Voltar para meus pedidos</a></p>`;
}
