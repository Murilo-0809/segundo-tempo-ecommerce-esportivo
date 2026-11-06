# Segundo Tempo · Loja virtual esportiva

Loja virtual de equipamentos esportivos novos e seminovos verificados, desenvolvida com HTML, CSS e JavaScript puro (sem frameworks).
Projeto das disciplinas de Design Gráfico (protótipo no Figma) e Criação de Sites (este código).

## Funcionalidades

- **Home:** banner, categorias, ofertas do dia com cronômetro, seminovos em destaque e explicação do programa seminovo verificado
- **Menu e busca:** menu de categorias suspenso e busca por texto (ignora acentos)
- **Categorias:** 8 categorias (Corrida, Ciclismo, Futebol, Academia, Natação, Raquetes, Lutas e Trilha e outdoor)
- **Filtros e ordenação:** condição (novo ou seminovo), grau A/B/C, faixa de preço, frete grátis e ordenação por preço e desconto
- **Produto:** galeria com miniaturas, seleção de tamanho, quantidade, descrição, ficha técnica e avaliações
- **Favoritos:** salvos no navegador
- **Carrinho:** alterar quantidade, remover itens e ver o total (frete grátis a partir de R$ 199)
- **Checkout em 3 etapas:** dados do cliente com validação e máscaras (CPF, telefone, CEP), pagamento por cartão de crédito (com parcelas), débito ou Pix, e revisão do pedido
- **Pix:** tela própria com valor, código e QR Code de demonstração
- **Confirmação do pedido** e acompanhamento do pedido
- **Conta:** entrar, criar conta, minha conta e meus pedidos (dados salvos no navegador)

Os dados ficam no navegador (localStorage), sem servidor. Só o tênis Vento Pro 3 e a garrafa Fôlego 750 ml podem ser comprados. A bike Rota C2 e a bola de futsal têm página de detalhe, mas a compra fica indisponível nesta versão.

## Estrutura

```
index.html            página inicial
categorias.html       todas as categorias
categoria.html        resultados de categoria, busca e ofertas (filtros)
produto.html          página do produto
avaliacoes.html       todas as avaliações de um produto
favoritos.html        produtos favoritados
carrinho.html         carrinho
checkout.html         finalização da compra
pix.html              pagamento via Pix
confirmacao.html      pedido confirmado
acompanhar-pedido.html  andamento do pedido
meus-pedidos.html     lista de pedidos
entrar.html           login
criar-conta.html      cadastro
minha-conta.html      área da conta
seminovo.html         programa seminovo verificado

css/style.css         estilos (responsivo para desktop e celular)
js/dados.js           produtos e detalhes (fonte única dos dados)
js/carrinho.js        funções do carrinho, favoritos e frete
js/principal.js       cabeçalho, rodapé, cards, máscaras
js/<página>.js        código de cada página
img/                  fotos dos produtos, logo e QR Code de demonstração
```

## Como rodar

Baixe o projeto e abra o arquivo `index.html` no navegador. Não é preciso instalar nada.

## Tecnologias

HTML5, CSS3 (layout responsivo com Grid e Flexbox), JavaScript (DOM, eventos, arrays, localStorage) e Git/GitHub.

## Autor

Murilo Muller
