const likes = document.querySelectorAll("button.text-xl");
//const cart = document.getElementById('#cart')


// ...existing code...

// Select all cart SVGs (with id="cart")
const cartIcons = document.querySelectorAll('#cart');
// Select the navbar cart count span
const cartCountSpan = document.getElementById('cart-count');

// Initialize cart count from localStorage
let cartCount = parseInt(localStorage.getItem('cart-count')) || 0;
if (cartCount > 0 && cartCountSpan) {
  cartCountSpan.textContent = cartCount;
  cartCountSpan.classList.remove('hidden');
}

// Add event listeners to product cart icons (skip navbar)
cartIcons.forEach((icon, idx) => {
  // Assuming the first cart icon is the navbar, skip it
  if (idx === 0) return;
  icon.addEventListener('click', () => {
    cartCount++;
    localStorage.setItem('cart-count', cartCount);
    if (cartCountSpan) {
      cartCountSpan.textContent = cartCount;
      cartCountSpan.classList.remove('hidden');
    }
  });
});

// ...existing code...

// Initialize likes from localStorage
likes.forEach((button, index) => {
  const love = button.querySelector("i");
  const isLiked = localStorage.getItem(`liked-${index}`) === "true";

  if (isLiked) {
    love.classList.toggle("fa-regular");
    love.classList.toggle("fa-solid");
    love.classList.toggle("red-heart");
  }
});

// Handle click events
likes.forEach((button, index) => {
  button.addEventListener("click", () => {
    const love = button.querySelector("i");

    // Toggle classes
    love.classList.toggle("fa-regular");
    love.classList.toggle("fa-solid");
    love.classList.toggle("red-heart");

    // Save the current state to localStorage
    const isLiked = love.classList.contains("fa-solid");
    localStorage.setItem(`liked-${index}`, isLiked)
  })
})
