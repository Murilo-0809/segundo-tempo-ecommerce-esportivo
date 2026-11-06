// Lista todas as avaliações de um produto (?id=numero)

const id = Number(lerParametro("id"));
const produto = buscarProduto(id);
const info = detalhes[id];
const area = document.getElementById("area-avaliacoes");

if (!produto || !info) {
  window.location.href = "index.html";
} else {
  document.getElementById("voltar-produto").href = "produto.html?id=" + id;
  let comentarios = "";
  info.comentarios.forEach((c) => {
    comentarios += `<div class="avaliacao"><b>${c[0]}</b><small>Compra verificada · ${c[1]}</small><p style="margin-top:8px">${c[2]}</p></div>`;
  });
  if (info.comentarios.length === 0) {
    comentarios = `<div class="avaliacao"><p>Este produto ainda não tem avaliações de compradores.</p></div>`;
  }
  area.innerHTML = `
    <div class="titulo-pagina"><h1>Avaliações</h1><p>${produto.nome}</p></div>
    <div class="avaliacoes-layout">
      <div class="resumo-avaliacao">
        <p class="nota-grande">${info.nota}</p>
        <p>★★★★★</p>
        <p style="color:var(--cinza)">${info.avaliacoes} avaliações</p>
        <br>
        <a href="produto.html?id=${id}" class="botao vazado cheio">Voltar ao produto</a>
      </div>
      <div>${comentarios}</div>
    </div>`;
}
