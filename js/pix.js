// Tela do Pix: mostra o valor e o QR Code de demonstração

const pedido = JSON.parse(localStorage.getItem("ultimoPedido") || "null");
if (pedido === null) {
  window.location.href = "carrinho.html";
}

const codigoFicticio = "00020126580014br.gov.bcb.pix0136segundo-tempo-demo5204000053039865802BR";
document.getElementById("texto-pix").textContent = "Pague com Pix para confirmar o pedido nº " + pedido.numero + ".";
document.getElementById("area-pix").innerHTML = `
  <div>
    <img src="img/qrcode-pix.svg" alt="QR Code Pix de demonstração">
    <p style="text-align:center;color:var(--cinza)">QR Code fictício, apenas para demonstração.</p>
  </div>
  <div>
    <p style="color:var(--cinza)">Valor a pagar</p>
    <p class="preco-grande">${formatarPreco(pedido.total)}</p>
    <p class="info-pix">Você economizou ${formatarPreco(pedido.desconto)} pagando com Pix</p>
    <ol style="margin:16px 0 0 20px">
      <li>Abra o app do seu banco e escolha pagar com Pix</li>
      <li>Escaneie o QR Code ou cole o código abaixo</li>
      <li>Confirme o pagamento. A aprovação é imediata</li>
    </ol>
    <div class="codigo">
      <input type="text" id="codigo-pix" value="${codigoFicticio}" readonly>
      <button class="botao" id="copiar">Copiar código</button>
    </div>
    <div class="botoes-etapa">
      <button class="botao lima" id="ja-paguei">Já fiz o pagamento</button>
      <a href="checkout.html" class="botao vazado">Trocar forma de pagamento</a>
    </div>
  </div>`;

document.getElementById("copiar").addEventListener("click", () => {
  document.getElementById("codigo-pix").select();
  document.getElementById("copiar").textContent = "Copiado!";
});
document.getElementById("ja-paguei").addEventListener("click", () => {
  window.location.href = "confirmacao.html";
});
