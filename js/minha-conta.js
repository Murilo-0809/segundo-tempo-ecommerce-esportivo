// Área da conta: dados do usuário, pedido em andamento e favoritos

const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
const area = document.getElementById("area-conta");

if (usuario === null) {
  area.innerHTML = `<div class="vazio" style="margin-top:30px"><h2>Você ainda não entrou</h2><p>Entre ou crie uma conta para ver seus pedidos e dados.</p><br><a href="entrar.html" class="botao">Entrar</a> <a href="criar-conta.html" class="botao vazado">Criar conta</a></div>`;
} else {
  const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  const iniciais = usuario.nome.substring(0, 2).toUpperCase();
  const favoritos = produtos.filter((p) => lerFavoritos().includes(p.id)).slice(0, 4);

  let pedidoAtual = `<p>Nenhum pedido em andamento.</p>`;
  if (pedidos.length > 0) {
    pedidoAtual = `<p><b>Pedido nº ${pedidos[0].numero}</b></p><p>${pedidos[0].itens[0].nome}</p><br><a href="acompanhar-pedido.html?n=${pedidos[0].numero}" class="botao cheio">Acompanhar pedido</a>`;
  }

  let cards = favoritos.map(criarCard).join("");
  if (favoritos.length === 0) {
    cards = `<p>Você ainda não favoritou produtos.</p>`;
  }

  area.innerHTML = `
    <div class="conta">
      <aside class="menu-conta">
        <div class="perfil"><span class="iniciais">${iniciais}</span><div><b>${usuario.nome}</b><br><small>${usuario.email}</small></div></div>
        <a href="minha-conta.html" class="ativo">Resumo da conta</a>
        <a href="meus-pedidos.html">Meus pedidos</a>
        <a href="favoritos.html">Favoritos</a>
        <a href="#" onclick="localStorage.removeItem('usuario')" class="sair">Sair da conta</a>
      </aside>
      <section>
        <h1 style="font-size:2.4rem;margin-bottom:6px">Olá, ${usuario.nome}!</h1>
        <p style="color:var(--cinza);margin-bottom:20px">Aqui está o resumo da sua atividade.</p>
        <div class="bloco-linha" style="margin-bottom:20px">
          <div class="bloco" style="margin:0">${pedidoAtual}</div>
          <div class="caixa-verde" style="margin:0"><h2>Crédito Segundo Tempo</h2><p>R$ 20,00</p><p>Ganhe R$ 20 ao anunciar seu primeiro produto.</p></div>
        </div>
        <div class="bloco">
          <h2>Seus favoritos</h2>
          <div class="grade" style="margin-top:12px">${cards}</div>
        </div>
        <div class="bloco-linha">
          <div class="bloco" style="margin:0"><h2>Dados pessoais</h2><p>${usuario.nome}</p><p>${usuario.email}</p></div>
          <div class="bloco" style="margin:0"><h2>Endereço principal</h2><p>Porto Alegre, RS</p></div>
        </div>
      </section>
    </div>`;
  ativarFavoritos(() => location.reload());
}
