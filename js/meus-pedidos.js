// Lista os pedidos feitos neste navegador

const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
const area = document.getElementById("area-pedidos");

let lista = `<div class="vazio"><h2>Você ainda não fez pedidos</h2><p>Quando comprar, seus pedidos aparecem aqui.</p><br><a href="index.html" class="botao">Explorar produtos</a></div>`;
if (pedidos.length > 0) {
  lista = "";
  pedidos.forEach((p) => {
    const primeiro = p.itens[0];
    const extra = p.itens.length > 1 ? " + " + (p.itens.length - 1) + " item(ns)" : "";
    lista += `
      <div class="pedido">
        <div>
          <div class="pedido-dados">
            <div>Pedido<b>${p.numero}</b></div>
            <div>Total<b>${formatarPreco(p.total)}</b></div>
            <div>Pagamento<b>${p.pagamento === "pix" ? "Pix" : p.pagamento === "debito" ? "Débito" : "Crédito"}</b></div>
          </div>
          <b>${primeiro.nome}${extra}</b>
        </div>
        <div>
          <span class="status">Pedido confirmado</span><br><br>
          <a href="acompanhar-pedido.html?n=${p.numero}" class="botao vazado">Acompanhar</a>
        </div>
      </div>`;
  });
}

area.innerHTML = `
  <div class="titulo-pagina"><h1>Meus pedidos</h1><p>${pedidos.length} pedido(s)</p></div>
  ${lista}`;
