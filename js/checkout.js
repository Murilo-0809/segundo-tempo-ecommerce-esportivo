// Checkout: dados do cliente, forma de pagamento e finalização

if (lerCarrinho().length === 0) {
  window.location.href = "carrinho.html";
}

let formaPagamento = "credito";

// Preenche os campos com os dados já salvos na conta
const usuarioSalvo = JSON.parse(localStorage.getItem("usuario") || "null");
function preencherComConta() {
  if (usuarioSalvo === null) {
    return;
  }
  const dados = {
    nome: usuarioSalvo.nome,
    email: usuarioSalvo.email,
    cpf: usuarioSalvo.cpf,
    telefone: usuarioSalvo.celular
  };
  if (usuarioSalvo.endereco) {
    dados.cep = usuarioSalvo.endereco.cep;
    dados.numero = usuarioSalvo.endereco.numero;
    dados.endereco = usuarioSalvo.endereco.endereco;
    dados.cidade = usuarioSalvo.endereco.cidade;
    dados.estado = usuarioSalvo.endereco.estado;
  }
  for (const campo in dados) {
    const el = document.getElementById(campo);
    if (el && dados[campo] && el.value === "") {
      el.value = dados[campo];
    }
  }
}

ligarMascara("cpf", "000.000.000-00");
ligarMascara("telefone", "(00) 00000-0000");
ligarMascara("cep", "00000-000");
ligarMascara("numero-cartao", "0000 0000 0000 0000");
ligarMascara("validade", "00/00");
ligarMascara("cvv", "000");
preencherComConta();

// ---------- Resumo lateral ----------
function calcularTotais() {
  const subtotal = calcularSubtotal();
  const frete = calcularFrete(subtotal);
  let desconto = 0;
  if (formaPagamento === "pix") {
    desconto = subtotal * 0.05;
  }
  return { subtotal: subtotal, frete: frete, desconto: desconto, total: subtotal - desconto + frete };
}

function desenharResumo() {
  const t = calcularTotais();
  let itens = "";
  lerCarrinho().forEach((item) => {
    const p = buscarProduto(item.id);
    itens += `<div class="linha"><span>${item.quantidade}x ${p.nome.split(" ").slice(0, 4).join(" ")}</span><span>${formatarPreco(p.preco * item.quantidade)}</span></div>`;
  });
  let linhaDesconto = "";
  if (t.desconto > 0) {
    linhaDesconto = `<div class="linha"><span>Desconto Pix (5%)</span><span class="verde">- ${formatarPreco(t.desconto)}</span></div>`;
  }
  document.getElementById("resumo").innerHTML = `
    <h2>Resumo</h2>
    ${itens}
    <div class="linha"><span>Subtotal</span><span>${formatarPreco(t.subtotal)}</span></div>
    ${linhaDesconto}
    <div class="linha"><span>Frete</span><span class="${t.frete === 0 ? "verde" : ""}">${t.frete === 0 ? "Grátis" : formatarPreco(t.frete)}</span></div>
    <div class="linha total"><span>Total</span><span>${formatarPreco(t.total)}</span></div>`;
  desenharParcelas();
}

function desenharParcelas() {
  const select = document.getElementById("parcelas");
  const anterior = select.value;
  const total = calcularTotais().total;
  const maximo = calcularParcelas(total);
  select.innerHTML = "";
  for (let i = 1; i <= maximo; i++) {
    select.innerHTML += `<option value="${i}">${i}x de ${formatarPreco(total / i)} sem juros</option>`;
  }
  if (anterior !== "" && Number(anterior) <= maximo) {
    select.value = anterior;
  }
}

// ---------- Validações ----------
function soNumeros(texto) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= "0" && texto[i] <= "9") {
      resultado = resultado + texto[i];
    }
  }
  return resultado;
}

// Marca o campo com erro (ou limpa o erro) e devolve se está válido
function validar(idCampo, valido, mensagem) {
  const campo = document.getElementById(idCampo);
  const aviso = campo.parentElement.querySelector("small");
  if (valido) {
    campo.classList.remove("invalido");
    aviso.textContent = "";
  } else {
    campo.classList.add("invalido");
    aviso.textContent = mensagem;
  }
  return valido;
}

function valor(idCampo) {
  return document.getElementById(idCampo).value.trim();
}

function validarEntrega() {
  let ok = true;
  const nome = valor("nome");
  ok = validar("nome", nome.length >= 3 && nome.includes(" "), "Informe nome e sobrenome.") && ok;
  ok = validar("cpf", soNumeros(valor("cpf")).length === 11, "CPF deve ter 11 números.") && ok;
  const telefone = soNumeros(valor("telefone")).length;
  ok = validar("telefone", telefone === 10 || telefone === 11, "Telefone inválido.") && ok;
  const email = valor("email");
  ok = validar("email", email.includes("@") && email.includes(".") && email.length > 5, "E-mail inválido.") && ok;
  ok = validar("cep", soNumeros(valor("cep")).length === 8, "CEP deve ter 8 números.") && ok;
  ok = validar("numero", valor("numero") !== "", "Informe o número.") && ok;
  ok = validar("endereco", valor("endereco").length >= 3, "Informe o endereço.") && ok;
  ok = validar("cidade", valor("cidade").length >= 2, "Informe a cidade.") && ok;
  ok = validar("estado", valor("estado") !== "", "Selecione o estado.") && ok;
  return ok;
}

function validarPagamento() {
  if (formaPagamento === "pix") {
    return true;
  }
  let ok = true;
  ok = validar("numero-cartao", soNumeros(valor("numero-cartao")).length === 16, "O cartão deve ter 16 números.") && ok;
  ok = validar("nome-cartao", valor("nome-cartao").length >= 3, "Informe o nome do cartão.") && ok;
  const validade = valor("validade");
  const mes = Number(validade.substring(0, 2));
  const validadeOk = validade.length === 5 && validade[2] === "/" && !isNaN(mes) && mes >= 1 && mes <= 12;
  ok = validar("validade", validadeOk, "Use o formato MM/AA.") && ok;
  ok = validar("cvv", soNumeros(valor("cvv")).length === 3, "CVV com 3 números.") && ok;
  return ok;
}

// ---------- Etapas ----------
function irParaEtapa(numero) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById("etapa" + i).classList.toggle("ativa", i === numero);
  }
  const marcadores = document.querySelectorAll("#etapas span");
  marcadores.forEach((m, posicao) => {
    m.classList.toggle("atual", posicao + 1 === numero);
  });
  window.scrollTo(0, 0);
}

function desenharRevisao() {
  const t = calcularTotais();
  const nomesPagamento = { credito: "Cartão de crédito", debito: "Cartão de débito", pix: "Pix" };
  let pagamento = nomesPagamento[formaPagamento];
  if (formaPagamento === "credito") {
    const parcelas = Number(valor("parcelas"));
    pagamento += " em " + parcelas + "x de " + formatarPreco(t.total / parcelas) + " sem juros";
  }
  document.getElementById("revisao").innerHTML = `
    <h3>Entrega</h3>
    <p>${valor("nome")} · CPF ${valor("cpf")}</p>
    <p>${valor("endereco")}, ${valor("numero")} · ${valor("cidade")}/${valor("estado")} · CEP ${valor("cep")}</p>
    <p>${valor("email")} · ${valor("telefone")}</p>
    <h3>Pagamento</h3>
    <p>${pagamento}</p>
    <h3>Total a pagar</h3>
    <p><strong>${formatarPreco(t.total)}</strong></p>`;
  document.getElementById("painel-qr").classList.toggle("ativo", formaPagamento === "pix");
}

document.getElementById("ir-pagamento").addEventListener("click", () => {
  if (validarEntrega()) {
    irParaEtapa(2);
  }
});

document.getElementById("voltar-entrega").addEventListener("click", () => irParaEtapa(1));

document.getElementById("ir-revisao").addEventListener("click", () => {
  if (validarPagamento()) {
    desenharRevisao();
    irParaEtapa(3);
  }
});

document.getElementById("voltar-pagamento").addEventListener("click", () => irParaEtapa(2));

// Troca da forma de pagamento
document.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    formaPagamento = radio.value;
    document.querySelectorAll(".pagamento").forEach((p) => p.classList.remove("escolhido"));
    radio.closest(".pagamento").classList.add("escolhido");

    document.getElementById("painel-cartao").classList.toggle("ativo", formaPagamento !== "pix");
    document.getElementById("painel-pix").classList.toggle("ativo", formaPagamento === "pix");
    // parcelas só existem no crédito
    document.getElementById("campo-parcelas").style.display = formaPagamento === "credito" ? "flex" : "none";
    desenharResumo();
  });
});

// ---------- Finalizar ----------
document.getElementById("finalizar").addEventListener("click", () => {
  const t = calcularTotais();
  const numero = "ST" + Date.now().toString().slice(-8);
  const itens = lerCarrinho().map((item) => {
    const p = buscarProduto(item.id);
    return { nome: p.nome, tamanho: item.tamanho, quantidade: item.quantidade, preco: p.preco };
  });
  const pedido = {
    numero: numero,
    cliente: valor("nome"),
    email: valor("email"),
    endereco: valor("endereco") + ", " + valor("numero") + " · " + valor("cidade") + "/" + valor("estado"),
    pagamento: formaPagamento,
    parcelas: formaPagamento === "credito" ? Number(valor("parcelas")) : 1,
    itens: itens,
    frete: t.frete,
    desconto: t.desconto,
    total: t.total
  };
  localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
  if (usuarioSalvo !== null) {
    usuarioSalvo.nome = valor("nome");
    usuarioSalvo.email = valor("email");
    usuarioSalvo.cpf = valor("cpf");
    usuarioSalvo.celular = valor("telefone");
    usuarioSalvo.endereco = { cep: valor("cep"), numero: valor("numero"), endereco: valor("endereco"), cidade: valor("cidade"), estado: valor("estado") };
    localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));
  }
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  pedidos.unshift(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem("carrinho");
  if (formaPagamento === "pix") {
    window.location.href = "pix.html";
  } else {
    window.location.href = "confirmacao.html";
  }
});

desenharResumo();
