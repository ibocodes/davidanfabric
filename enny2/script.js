const closeMenu = document.getElementById("closeMenu");
const openMenu = document.getElementById("openMenu");
const buttonMenu = document.getElementById("buttonMenu");
const mobileMenu = document.getElementById("mobile-menu");


const images = [
  document.getElementById("left-img1"),
  document.getElementById("left-img3"),
  document.getElementById("left-img4"),
  document.getElementById("middle-img"),
  document.getElementById("right-img1"),
  document.getElementById("right-img2"),
  document.getElementById("right-img3"),
  document.getElementById("right-img4")
];

// Define the classes for each position
const leftClasses = "carousel-img absolute w-32 h-40 object-cover rounded-lg opacity-80 z-10 left-[1%]";
const middleClasses = "carousel-img absolute w-46 h-52 object-cover rounded-xl shadow-lg z-20 border-4 border-white";
const rightClasses = "carousel-img absolute w-32 h-40 object-cover rounded-lg opacity-80 z-10 left-[69%]"; 


let isAnimating = false;

// toggle the header button
buttonMenu.addEventListener("click", () => {
  openMenu.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("hidden");
});

// Initialize positions
images[0].className = leftClasses;
images[1].className = leftClasses;
images[2].className = leftClasses;
images[3].className = middleClasses;
images[4].className = rightClasses;
images[5].className = rightClasses;
images[6].className = rightClasses;
images[7].className = rightClasses;

function rotateCarousel() {
  if (isAnimating) return;
  isAnimating = true;

// Animate current images out
images[3].classList.add('opacity-0', 'scale-90');

setTimeout(() => {
// Shift all images one position forward
const lastSrc = images[images.length - 1].src;
for (let i = images.length - 1; i > 0; i--) {
  images[i].src = images[i - 1].src;
}
images[0].src = lastSrc;

// Reset classes and remove animations
    images.forEach((img, index) => {
      img.className = index === 3 ? middleClasses :
                     index < 3 ? leftClasses : rightClasses;
      img.classList.remove('opacity-0', '-translate-x-10', 'translate-x-10', 'scale-90');
    });

    isAnimating = false;
  }, 700);
}

// Start the carousel
setInterval(rotateCarousel, 3000);

// Start the carousel
let carouselInterval = setInterval(rotateCarousel, 3000);

// Pause on hover, resume on mouse leave
images.forEach(img => {
  img.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  img.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(rotateCarousel, 3000);
  });
});