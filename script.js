
const products = [
  {
    name: "Smartphone",
    price: 15000,
    image: "images/smartphone.jpg"
  },
  {
    name: "Laptop",
    price: 55000,
    image: "images/laptop.jpg"
  },
  {
    name: "Headphones",
    price: 2000,
    image: "images/headphones.jpg"
  },
  {
    name: "Smartwatch",
    price: 3500,
    image: "images/smartwatch.jpg"
  }
];

let cart = [];

const productList = document.getElementById("productList");
const search = document.getElementById("search");

function displayProducts() {
  const keyword = search.value.toLowerCase();

  productList.innerHTML = "";

  products.forEach((product, index) => {
    if (!product.name.toLowerCase().includes(keyword)) {
      return;
    }

    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").addEventListener(
      "click",
      () => addToCart(index)
    );

    productList.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
  }

  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = `${product.name} - ₹${product.price}`;

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", () => removeFromCart(index));

    item.append(name, button);
    cartItems.appendChild(item);
  });

  const total = cart.reduce(
    (sum, product) => sum + product.price, 0
  );

  totalElement.textContent =
    `Total: ₹${total.toLocaleString("en-IN")}`;
}

document.getElementById("checkout").addEventListener(
  "click",
  () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Demo order placed successfully!");
    cart = [];
    updateCart();
  }
);

search.addEventListener("input", displayProducts);

displayProducts();
