// Página de categoria / busca / ofertas: filtros e ordenação

const cat = lerParametro("cat");
const busca = lerParametro("busca");
const cond = lerParametro("cond");
const ver = lerParametro("ver");

// Define o título conforme o tipo de acesso
let titulo = "Todos os produtos";
if (cat !== "") {
  titulo = cat;
} else if (busca !== "") {
  titulo = 'Resultados para "' + busca + '"';
} else if (ver === "ofertas") {
  titulo = "Ofertas";
} else if (cond === "seminovo") {
  titulo = "Seminovos verificados";
}
document.getElementById("titulo").textContent = titulo;
document.getElementById("migalha").textContent = titulo;
document.title = titulo + " | Segundo Tempo";

if (cond === "seminovo") {
  document.querySelector('input[name="condicao"][value="seminovo"]').checked = true;
}
if (busca !== "") {
  document.getElementById("campo-busca").value = busca;
}

// Troca letras com acento por letras simples, para "tenis" achar "Tênis"
function semAcento(texto) {
  return texto
    .split("á").join("a").split("à").join("a").split("ã").join("a").split("â").join("a")
    .split("é").join("e").split("ê").join("e")
    .split("í").join("i")
    .split("ó").join("o").split("ô").join("o").split("õ").join("o")
    .split("ú").join("u")
    .split("ç").join("c");
}

function listarProdutos() {
  // 1) base: categoria, busca ou ofertas
  let lista = produtos;
  if (cat !== "") {
    lista = lista.filter((p) => p.categoria === cat);
  }
  if (busca !== "") {
    const termo = semAcento(busca.toLowerCase());
    lista = lista.filter((p) => semAcento(p.nome.toLowerCase()).includes(termo) || semAcento(p.categoria.toLowerCase()).includes(termo));
  }
  if (ver === "ofertas") {
    lista = lista.filter((p) => p.oferta);
  }

  // 2) filtros da lateral
  const condicao = document.querySelector('input[name="condicao"]:checked').value;
  if (condicao !== "todos") {
    lista = lista.filter((p) => p.condicao === condicao);
  }

  const graus = [];
  document.querySelectorAll('input[name="grau"]:checked').forEach((g) => graus.push(g.value));
  if (graus.length > 0) {
    lista = lista.filter((p) => graus.includes(p.grau));
  }

  const min = Number(document.getElementById("preco-min").value);
  const max = Number(document.getElementById("preco-max").value);
  if (min > 0) {
    lista = lista.filter((p) => p.preco >= min);
  }
  if (max > 0) {
    lista = lista.filter((p) => p.preco <= max);
  }
  if (document.getElementById("so-frete").checked) {
    lista = lista.filter((p) => p.freteGratis);
  }

  // 3) ordenação
  const ordem = document.getElementById("ordem").value;
  lista = lista.slice();
  if (ordem === "menor") {
    lista.sort((a, b) => a.preco - b.preco);
  } else if (ordem === "maior") {
    lista.sort((a, b) => b.preco - a.preco);
  } else if (ordem === "desconto") {
    lista.sort((a, b) => descontoDe(b) - descontoDe(a));
  }
  return lista;
}

function descontoDe(p) {
  if (p.precoAntigo === 0) {
    return 0;
  }
  return 1 - p.preco / p.precoAntigo;
}

function mostrar() {
  const lista = listarProdutos();
  document.getElementById("resultados").textContent = lista.length + " resultados";
  const area = document.getElementById("produtos");
  if (lista.length === 0) {
    area.innerHTML = `<div class="vazio"><h2>Não encontramos resultados${busca !== "" ? ' para "' + busca + '"' : ""}</h2><p>Use termos mais genéricos, como "bike" ou "tênis", ou confira as categorias.</p><br><a href="categorias.html" class="botao">Ver todas as categorias</a></div>
      <div class="sugestoes" style="grid-column:1/-1"><h2>Talvez você goste</h2><div class="grade">${produtos.slice(0, 4).map(criarCard).join("")}</div></div>`;
    ativarFavoritos();
    return;
  }
  area.innerHTML = lista.map(criarCard).join("");
  ativarFavoritos();
}

// Qualquer mudança nos filtros atualiza a lista
document.querySelectorAll(".filtros input").forEach((campo) => {
  campo.addEventListener("input", mostrar);
});
document.getElementById("ordem").addEventListener("change", mostrar);

document.getElementById("limpar").addEventListener("click", () => {
  document.querySelector('input[name="condicao"][value="todos"]').checked = true;
  document.querySelectorAll('input[name="grau"]').forEach((g) => (g.checked = false));
  document.getElementById("preco-min").value = "";
  document.getElementById("preco-max").value = "";
  document.getElementById("so-frete").checked = false;
  mostrar();
});

// No celular os filtros ficam escondidos até clicar no botão
document.getElementById("abrir-filtros").addEventListener("click", () => {
  document.getElementById("filtros").classList.toggle("aberto");
});

mostrar();
