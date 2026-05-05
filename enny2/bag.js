function escAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const bagProducts = [
  {
    name: "Ankara Everyday Tote",
    image: "image/40.jpg",
    alt: "African print everyday tote bag — Enny Brands",
  },
  {
    name: "Statement Shoulder Bag",
    image: "image/42.jpg",
    alt: "Bold patterned shoulder bag with Ankara details",
  },
  {
    name: "Compact Crossbody",
    image: "image/43.jpg",
    alt: "Compact crossbody bag in vibrant African print",
  },
  {
    name: "Structured Handbag",
    image: "image/44.jpg",
    alt: "Structured handbag with premium fabric finish",
  },
  {
    name: "Market Shopper Bag",
    image: "image/45.jpg",
    alt: "Roomy market shopper bag in African textile",
  },
  {
    name: "Mini Clutch Set",
    image: "image/46.jpg",
    alt: "Mini clutch-style bag for outings and events",
  },
  {
    name: "Weekend Travel Bag",
    image: "image/47.jpg",
    alt: "Weekend travel bag with coordinated print accents",
  },
];

function renderBagProducts() {
  const container = document.getElementById("bag-product-container");
  const countEl = document.getElementById("bag-product-count");
  if (!container) return;

  container.innerHTML = "";

  bagProducts.forEach((product, index) => {
    const altSafe = escAttr(product.alt);
    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="product-card" role="listitem" data-bag-index="${index}">
        <div class="product-card__img-wrap">
          <img src="${escAttr(product.image)}" alt="${altSafe}" loading="lazy" />
        </div>
        <div class="product-card__actions">
          <button class="btn-wishlist" type="button" aria-label="Add ${escAttr(product.name)} to wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
          <div class="product-card__cta">
            <a href="#" aria-label="Contact us on WhatsApp about ${escAttr(product.name)}">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </a>
            <button
              class="btn-add-cart"
              type="button"
              aria-label="Add ${escAttr(product.name)} to cart"
              data-src="${escAttr(product.image)}"
              data-index="${index}"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>
      `
    );
  });

  if (countEl) countEl.textContent = `${bagProducts.length} items`;
}

function initBagWishlist() {
  const buttons = document.querySelectorAll(
    "#bag-product-container .btn-wishlist"
  );
  buttons.forEach((button, index) => {
    const icon = button.querySelector("i");
    if (!icon) return;
    const key = `bag-liked-${index}`;
    if (localStorage.getItem(key) === "true") {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "red-heart");
    }
    button.addEventListener("click", () => {
      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("red-heart");
      localStorage.setItem(key, String(icon.classList.contains("fa-solid")));
    });
  });
}

function initBagCartButtons() {
  const cartButtons = document.querySelectorAll(
    "#bag-product-container .btn-add-cart"
  );
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.Cart && typeof window.Cart.add === "function") {
        window.Cart.add({
          src: btn.getAttribute("data-src") || "",
          index: btn.getAttribute("data-index") || "",
        });
      }
    });
  });
}

renderBagProducts();
initBagWishlist();
initBagCartButtons();
