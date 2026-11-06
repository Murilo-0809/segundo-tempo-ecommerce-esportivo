// Mostra os produtos favoritados

function mostrarFavoritos() {
  const ids = lerFavoritos();
  const lista = produtos.filter((p) => ids.includes(p.id));
  document.getElementById("quantidade").textContent = lista.length + " itens salvos";
  const area = document.getElementById("lista-favoritos");
  if (lista.length === 0) {
    area.innerHTML = `<div class="vazio"><h2>Nenhum favorito ainda</h2><p>Toque no coração de um produto para salvá-lo aqui.</p><br><a href="index.html" class="botao">Explorar produtos</a></div>`;
    return;
  }
  area.innerHTML = lista.map(criarCard).join("");
  // ao desfavoritar, a lista é montada de novo
  ativarFavoritos(mostrarFavoritos);
}

mostrarFavoritos();
