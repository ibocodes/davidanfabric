const clothProducts = [
  {
    name: "Classic Ankara Shirt",
    image: "image/01.jpg",
    alt: "Classic Ankara shirt with bold geometric African print",
  },
  {
    name: "Royal Blue Native Set",
    image: "image/02.jpg",
    alt: "Royal blue native outfit tailored for special occasions",
  },
  {
    name: "Modern Senator Wear",
    image: "image/03.jpg",
    alt: "Modern senator wear in premium textured fabric",
  },
  {
    name: "Casual Ankara Top",
    image: "image/04.jpg",
    alt: "Casual Ankara top for everyday smart style",
  },
  {
    name: "Elegant Couple Outfit",
    image: "image/05.jpg",
    alt: "Elegant matching African outfit for events and celebrations",
  },
  {
    name: "Patterned Camp Shirt",
    image: "image/06.jpg",
    alt: "Patterned camp shirt inspired by Ankara motifs",
  },
  {
    name: "Tailored Agbada Style",
    image: "image/07.jpg",
    alt: "Tailored agbada-inspired clothing set in rich fabric",
  },
  {
    name: "Weekend Casual Fit",
    image: "image/12.jpg",
    alt: "Weekend casual outfit with contemporary African design",
  },
];

function renderClothProducts() {
  const container = document.getElementById("cloth-product-container");
  const countEl = document.getElementById("cloth-product-count");
  if (!container) return;

  container.innerHTML = "";

  clothProducts.forEach((product, index) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <article class="product-card" role="listitem" data-product-index="${index}">
        <div class="product-card__img-wrap">
          <img src="${product.image}" alt="${product.alt}" loading="lazy" />
        </div>
        <div class="product-card__actions">
          <button class="btn-wishlist" type="button" aria-label="Add ${product.name} to wishlist">
            <i class="fa-regular fa-heart"></i>
          </button>
          <div class="product-card__cta">
            <a href="#" aria-label="Contact us on WhatsApp about ${product.name}">
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </a>
            <button class="btn-add-cart" type="button" aria-label="Add ${product.name} to cart">
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

  if (countEl) countEl.textContent = `${clothProducts.length} items`;
}

function initClothWishlist() {
  const wishlistButtons = document.querySelectorAll("#cloth-product-container .btn-wishlist");
  wishlistButtons.forEach((button, index) => {
    const icon = button.querySelector("i");
    const key = `cloth-liked-${index}`;
    const isLiked = localStorage.getItem(key) === "true";
    if (isLiked) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "red-heart");
    }

    button.addEventListener("click", () => {
      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("red-heart");
      localStorage.setItem(key, icon.classList.contains("fa-solid"));
    });
  });
}

function initClothCartButtons() {
  const cartCountSpan = document.getElementById("cart-count");
  let cartCount = parseInt(localStorage.getItem("cart-count"), 10) || 0;

  const updateBadge = () => {
    if (!cartCountSpan) return;
    cartCountSpan.textContent = String(cartCount);
    cartCountSpan.style.display = cartCount > 0 ? "inline-block" : "none";
  };

  updateBadge();

  const cartButtons = document.querySelectorAll("#cloth-product-container .btn-add-cart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      localStorage.setItem("cart-count", String(cartCount));
      updateBadge();
    });
  });
}

renderClothProducts();
initClothWishlist();
initClothCartButtons();
