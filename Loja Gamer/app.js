"use strict";

/* Estado do carrinho: lista de itens e total acumulado */
const carrinho = [];
let total = 0;

/* Seletores dos elementos HTML usados pelo JavaScript */
const cart = document.querySelector("#cart");
const cartToggle = document.querySelector("#cart-toggle");
const cartClose = document.querySelector("#cart-close");
const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#total");

/* Converte um valor numérico em string de preço no formato brasileiro */
function formatPrice(valor) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* Atualiza o contador de itens exibido no botão do carrinho */
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = carrinho.length;
  }
}

/* Renderiza os itens do carrinho na lista dentro do painel */
function renderCart() {
  if (!cartItems || !cartTotal) {
    return;
  }

  cartItems.innerHTML = "";

  if (carrinho.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Carrinho vazio";
    cartItems.appendChild(vazio);
    cartTotal.textContent = formatPrice(0);
    updateCartCount();
    return;
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    const produtoText = document.createElement("span");
    produtoText.textContent = `${item.nome} - R$ ${formatPrice(item.preco)}`;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "❌";
    button.addEventListener("click", () => removeItem(index));

    li.appendChild(produtoText);
    li.appendChild(button);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = formatPrice(total);
  updateCartCount();
}

/* Adiciona um novo item ao carrinho */
function addToCart(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  renderCart();
}

/* Remove item do carrinho pelo índice recebido */
function removeItem(index) {
  if (index < 0 || index >= carrinho.length) {
    return;
  }

  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  renderCart();
}

/* Alterna a visibilidade do painel do carrinho */
function toggleCart() {
  if (!cart) {
    return;
  }

  cart.classList.toggle("open");
}

/* Fecha o painel do carrinho removendo a classe de abertura */
function closeCart() {
  if (!cart) {
    return;
  }

  cart.classList.remove("open");
}

/* Eventos de clique para abrir e fechar o carrinho */
if (cartToggle) {
  cartToggle.addEventListener("click", toggleCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

/* Fecha o carrinho ao pressionar a tecla Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

/* Renderização inicial para exibir estado vazio do carrinho */
renderCart();
