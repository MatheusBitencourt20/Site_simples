const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoForm = document.querySelector("#botao-form");
const contador = document.querySelector("#contador");
const mensagemVazio = document.querySelector("#mensagem-vazio");
const erroQuantidade = document.querySelector("#erro-quantidade");

const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoQuantidade = document.querySelector("#quantidade");

let itemEmEdicao = null;


const produtosIniciais = [
  
];

function preencherItem(item, nome, preco, quantidade) {
  item.dataset.nome = nome;
  item.dataset.preco = preco;
  item.dataset.quantidade = quantidade;

  const span = item.querySelector(".texto-produto");
  span.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;
}

function criarItem(nome, preco, quantidade) {
  const item = document.createElement("li");

  const span = document.createElement("span");
  span.classList.add("texto-produto");
  item.appendChild(span);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.classList.add("editar");
  acoes.appendChild(botaoEditar);

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.classList.add("remover");
  acoes.appendChild(botaoRemover);

  item.appendChild(acoes);

  preencherItem(item, nome, preco, quantidade);
  return item;
}

// atualiza contador e mostra/esconde a mensagem de lista vazia
function atualizarResumo() {
  const total = listaProdutos.children.length;
  contador.textContent = `Produtos cadastrados: ${total}`;
  mensagemVazio.style.display = total === 0 ? "block" : "none";
}

// Cria os produtos iniciais já passando pela função criarItem
produtosIniciais.forEach(function (produto) {
  const item = criarItem(produto.nome, produto.preco, produto.quantidade);
  listaProdutos.appendChild(item);
});
atualizarResumo();

formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value;
  const preco = campoPreco.value;
  const quantidade = campoQuantidade.value;

  // impede quantidade zero (ou negativa)
  if (Number(quantidade) <= 0) {
    erroQuantidade.style.display = "block";
    return; // interrompe o cadastro/edição
  }
  erroQuantidade.style.display = "none";

  if (itemEmEdicao) {
    preencherItem(itemEmEdicao, nome, preco, quantidade);
    itemEmEdicao = null;
    botaoForm.textContent = "Adicionar produto";
  } else {
    const item = criarItem(nome, preco, quantidade);
    listaProdutos.appendChild(item);
  }

  formProduto.reset();
  atualizarResumo();
});

listaProdutos.addEventListener("click", function (evento) {
  const item = evento.target.closest("li");
  if (!item) return;

  if (evento.target.classList.contains("remover")) {
    item.remove();

    if (itemEmEdicao === item) {
      itemEmEdicao = null;
      botaoForm.textContent = "Adicionar produto";
      formProduto.reset();
    }

    atualizarResumo();
  }

  if (evento.target.classList.contains("editar")) {
    campoNome.value = item.dataset.nome;
    campoPreco.value = item.dataset.preco;
    campoQuantidade.value = item.dataset.quantidade;

    itemEmEdicao = item;
    botaoForm.textContent = "Salvar alterações";
  }
});