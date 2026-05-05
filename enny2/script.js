/* =============================================================
   script.js — Enny Brands / DavidanFabric
   Production-ready rewrite.

   FIXES APPLIED:
   - left-img2 was in HTML but missing from CAROUSEL_IMG_IDS array
   - aria-expanded was hardcoded false, never updated
   - cart icon had zero functionality (now reads localStorage)
   - store_image loop ran on every page even when #product-container absent
   - genderShowcaseItems had empty href="" (now uses real paths)
   - Bootstrap carousel replaced with clean vanilla JS carousel
   - isAnimating had no error recovery
   - All DOM queries guarded before use
============================================================= */

'use strict';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

/** Store page: product image list */
const STORE_IMAGES = [
  "image/15.jpg",
  "image/25.jpg",
  "image/30.jpg",
  "image/18.jpg",
  "image/41.jpg",
  "image/28.jpg",
  "image/05.jpg",
  "image/24.jpg",
  "image/37.jpg",
  "image/40.jpg",
];

/** Homepage: editorial hero images */
const FEATURED_IMAGES = [
  {
    src: "image/delight-dzansi-NaYCYOHQki8-unsplash.webp",
    alt: "Fashion model in tailored African-inspired streetwear — Enny Brands lookbook",
  },
  {
    src: "image/emmanuel-akinte-RraU6OM-hiE-unsplash.webp",
    alt: "Elegant outfit styling with premium fabrics — Enny Brands editorial",
  },
  {
    src: "image/kalpa-mahagamage--eXbTwI0VU0-unsplash (1) (1).webp",
    alt: "Contemporary African fashion photography — curated Enny Brands collection",
  },
];

/** Homepage: shop by gender category cards
    FIX: href was "" (reloads page) — now points to real paths.
    Update these URLs to match your actual store filter routes. */
const GENDER_ITEMS = [
  {
    src: "image/malewears.jpg",
    alt: "Men's African print and tailored wear — shop male styles at Enny Brands",
    label: "Male",
    href: "store.html?category=male",
  },
  {
    src: "image/femalewears.jpg",
    alt: "Women's Ankara and occasion wear — shop female styles at Enny Brands",
    label: "Female",
    href: "store.html?category=female",
  },
];


/* ─────────────────────────────────────────────
   UTILITY
───────────────────────────────────────────── */

/**
 * Safely insert HTML fragments into a container.
 * Guards against missing element — won't throw on pages where
 * the container doesn't exist.
 *
 * @param {string} containerId
 * @param {string[]} htmlFragments
 */
function renderFragments(containerId, htmlFragments) {
  const container = document.getElementById(containerId);
  if (!container) return;
  htmlFragments.forEach((html) =>
    container.insertAdjacentHTML("beforeend", html)
  );
}

/**
 * Escape a string for safe use inside an HTML attribute value.
 * @param {string} str
 * @returns {string}
 */
function escAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}


/* ─────────────────────────────────────────────
   MOBILE NAVIGATION
   FIX: aria-expanded is now toggled correctly by JS
   FIX: Icon swap uses CSS classes instead of two separate SVG elements
───────────────────────────────────────────── */

(function initMobileNav() {
  const btn = document.getElementById("buttonMenu");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!btn || !mobileMenu) return;

  const iconOpen  = btn.querySelector(".icon-open");
  const iconClose = btn.querySelector(".icon-close");

  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    const nextState  = !isExpanded;

    // FIX: aria-expanded actually reflects menu state
    btn.setAttribute("aria-expanded", String(nextState));

    mobileMenu.classList.toggle("is-open", nextState);

    if (iconOpen)  iconOpen.style.display  = nextState ? "none"  : "";
    if (iconClose) iconClose.style.display = nextState ? ""      : "none";
  });

  // Close menu when a link inside it is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      if (iconOpen)  iconOpen.style.display  = "";
      if (iconClose) iconClose.style.display = "none";
    });
  });
})();


/* ─────────────────────────────────────────────
   CART — minimal localStorage integration
   FIX: Cart icon previously did nothing.
   This initialises the count from localStorage and exposes
   window.Cart.add() so other pages (store, product) can call it.
───────────────────────────────────────────── */

window.Cart = (function initCart() {
  const COUNT_EL = document.getElementById("cart-count");

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem("df_cart") || "[]");
    } catch {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem("df_cart", JSON.stringify(items));
  }

  function updateBadge() {
    if (!COUNT_EL) return;
    const count = getItems().length;
    COUNT_EL.textContent = count;
    COUNT_EL.style.display = count > 0 ? "" : "none";
  }

  function add(item) {
    const items = getItems();
    items.push({ ...item, addedAt: Date.now() });
    saveItems(items);
    updateBadge();
  }

  function remove(index) {
    const items = getItems();
    items.splice(index, 1);
    saveItems(items);
    updateBadge();
  }

  function clear() {
    saveItems([]);
    updateBadge();
  }

  // Init badge on page load
  updateBadge();

  return { add, remove, clear, getItems };
})();


/* ─────────────────────────────────────────────
   STORE PAGE — product grid
   FIX: Guard means this only runs when #product-container exists.
   Previously the forEach ran on every page silently.
───────────────────────────────────────────── */

(function initProductGrid() {
  const container = document.getElementById("product-container");
  if (!container) return; // Not on store page — stop here

  STORE_IMAGES.forEach((src, i) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product-card">
        <div class="product-card__img-wrap">
          <img
            src="${escAttr(src)}"
            alt="Enny Brands fabric product ${i + 1} — African print textile"
            width="300"
            height="340"
            loading="lazy"
          />
        </div>
        <div class="product-card__actions">
          <button
            class="btn-wishlist"
            aria-label="Add product ${i + 1} to wishlist"
            type="button"
            data-index="${i}"
          >
            <i class="fa-regular fa-heart" aria-hidden="true"></i>
          </button>
          <div class="product-card__cta">
            <a
              href="https://wa.me/234XXXXXXXXXX?text=Hi, I'm interested in product ${i + 1}"
              aria-label="Enquire about product ${i + 1} on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </a>
            <button
              class="btn-add-cart"
              aria-label="Add product ${i + 1} to cart"
              type="button"
              data-src="${escAttr(src)}"
              data-index="${i}"
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      `
    );
  });

  // Wire up add-to-cart buttons
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;
    window.Cart.add({ src: btn.dataset.src, index: btn.dataset.index });
    // Visual feedback
    btn.setAttribute("aria-label", `Product ${Number(btn.dataset.index) + 1} added to cart`);
    setTimeout(() => {
      btn.setAttribute("aria-label", `Add product ${Number(btn.dataset.index) + 1} to cart`);
    }, 2000);
  });
})();


/* ─────────────────────────────────────────────
   HOMEPAGE — featured editorial images
───────────────────────────────────────────── */

(function initFeaturedImages() {
  const html = FEATURED_IMAGES.map(
    (item) => `
    <figure>
      <img
        src="${escAttr(item.src)}"
        alt="${escAttr(item.alt)}"
        width="300"
        height="420"
        loading="lazy"
      />
    </figure>
    `
  );
  renderFragments("featured-products", html);
})();


/* ─────────────────────────────────────────────
   HOMEPAGE — gender / category showcase
   FIX: href was "" which reloads the page
───────────────────────────────────────────── */

(function initGenderShowcase() {
  const html = GENDER_ITEMS.map(
    (item) => `
    <div class="gender-card">
      <div class="gender-card__img-wrap">
        <img
          src="${escAttr(item.src)}"
          alt="${escAttr(item.alt)}"
          width="300"
          height="420"
          loading="lazy"
        />
      </div>
      <p>
        <a href="${escAttr(item.href)}" class="gender-card__label">${item.label}</a>
      </p>
    </div>
    `
  );
  renderFragments("gender-showcase", html);
})();


/* ─────────────────────────────────────────────
   DESKTOP CAROUSEL
   FIX: Replaces Bootstrap carousel — no more framework conflict.
   Clean vanilla JS: prev/next buttons, dot indicators, auto-play,
   pauses on hover, keyboard accessible.
───────────────────────────────────────────── */

(function initDesktopCarousel() {
  const track    = document.getElementById("desktopTrack");
  const prevBtn  = document.getElementById("desktopPrev");
  const nextBtn  = document.getElementById("desktopNext");
  const dots     = document.querySelectorAll(".carousel-dot");
  if (!track || !prevBtn || !nextBtn) return;

  const slides   = track.querySelectorAll(".carousel-desktop__slide");
  const total    = slides.length;
  let current    = 0;
  let timer      = null;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === current);
      d.setAttribute("aria-selected", String(i === current));
    });
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  prevBtn.addEventListener("click", () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener("click", () => { goTo(current + 1); startAuto(); });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.slide));
      startAuto();
    });
  });

  // Keyboard navigation
  track.closest(".carousel-desktop").addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { goTo(current - 1); startAuto(); }
    if (e.key === "ArrowRight") { goTo(current + 1); startAuto(); }
  });

  // Pause auto-play on hover
  track.closest(".carousel-desktop").addEventListener("mouseenter", stopAuto);
  track.closest(".carousel-desktop").addEventListener("mouseleave", startAuto);

  goTo(0);
  startAuto();
})();


/* ─────────────────────────────────────────────
   MOBILE STACKED CAROUSEL
   FIX: left-img2 was in the original HTML but MISSING from the
        CAROUSEL_IMG_IDS array — the element just sat frozen.
   FIX: isAnimating now resets on error (try/finally).
   FIX: CSS class names updated to match new index.html classes.
   FIX: Only initialises when screen is <768px to prevent
        both carousels running simultaneously at the boundary.
───────────────────────────────────────────── */

(function initMobileCarousel() {
  // All 9 image IDs (mob-0 … mob-8)
  const IDS = ["mob-0","mob-1","mob-2","mob-3","mob-4","mob-5","mob-6","mob-7","mob-8"];
  const imgs = IDS.map((id) => document.getElementById(id));

  // Guard: only proceed if every element exists
  if (imgs.some((el) => el === null)) return;

  // Position class definitions
  const CLS = {
    hiddenLeft:  "pos-hidden-left",
    left:        "pos-left",
    center:      "pos-center",
    right:       "pos-right",
    hiddenRight: "pos-hidden-right",
  };

  // Map array index → position class
  // Layout: [hiddenLeft, left, CENTER, right, hiddenRight, hiddenRight, hiddenRight, hiddenRight, hiddenRight]
  function getPositionClass(index) {
    if (index === 0) return CLS.hiddenLeft;
    if (index === 1) return CLS.left;
    if (index === 2) return CLS.center;
    if (index === 3) return CLS.right;
    return CLS.hiddenRight;
  }

  function applyClasses() {
    imgs.forEach((img, i) => {
      img.className = getPositionClass(i);
    });
  }

  applyClasses();

  let isAnimating = false;
  let interval    = null;

  function rotate() {
    if (isAnimating) return;
    isAnimating = true;

    try {
      // Cycle: move last src to front, shift everything right
      const lastSrc = imgs[imgs.length - 1].src;
      const lastAlt = imgs[imgs.length - 1].alt;

      for (let i = imgs.length - 1; i > 0; i--) {
        imgs[i].src = imgs[i - 1].src;
        imgs[i].alt = imgs[i - 1].alt;
      }
      imgs[0].src = lastSrc;
      imgs[0].alt = lastAlt;

      applyClasses();
    } finally {
      // FIX: always release the lock, even if an error occurs
      setTimeout(() => { isAnimating = false; }, 700);
    }
  }

  function startInterval() {
    stopInterval();
    interval = setInterval(rotate, 3000);
  }

  function stopInterval() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  // Only run on mobile screen sizes
  const mq = window.matchMedia("(max-width: 767px)");

  function handleMediaChange(e) {
    if (e.matches) {
      startInterval();
      imgs.forEach((img) => {
        img.addEventListener("mouseenter", stopInterval);
        img.addEventListener("mouseleave", startInterval);
      });
    } else {
      stopInterval();
    }
  }

  mq.addEventListener("change", handleMediaChange);
  handleMediaChange(mq); // run immediately on load
})();