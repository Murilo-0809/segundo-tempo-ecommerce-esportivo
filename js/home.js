// Monta as seções da página inicial

const gradeCategorias = document.getElementById("categorias-home");
categorias.forEach((c) => {
  gradeCategorias.innerHTML += `<a class="categoria-item" href="categoria.html?cat=${encodeURIComponent(c)}">${c}</a>`;
});

// Primeiros 5 produtos em oferta
const ofertas = produtos.filter((p) => p.oferta).slice(0, 4);
document.getElementById("ofertas-home").innerHTML = ofertas.map(criarCard).join("");

const seminovos = produtos.filter((p) => p.condicao === "seminovo").slice(0, 4);
document.getElementById("seminovos-home").innerHTML = seminovos.map(criarCard).join("");

ativarFavoritos();

// Cronômetro da faixa de ofertas (visual, começa em 05:42:18 e repete)
let segundos = 5 * 3600 + 42 * 60 + 18;
const cronometro = document.getElementById("cronometro");
function formatarTempo(total) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((v) => (v < 10 ? "0" + v : "" + v)).join(":");
}
setInterval(() => {
  segundos = segundos > 0 ? segundos - 1 : 5 * 3600 + 42 * 60 + 18;
  cronometro.textContent = formatarTempo(segundos);
}, 1000);
