// Lista todas as categorias com a quantidade de produtos de cada uma

const lista = document.getElementById("lista-categorias");
categorias.forEach((c) => {
  const quantidade = produtos.filter((p) => p.categoria === c).length;
  lista.innerHTML += `
    <a class="categoria-item" href="categoria.html?cat=${encodeURIComponent(c)}">
      ${c}<br><small style="font-family:'DM Sans',sans-serif;font-style:normal;font-weight:400;text-transform:none;color:#5c6360">${quantidade} produtos</small>
    </a>`;
});
