// let cartCount = 0;
// const cartCountElement = document.getElementById("cart-count");
// const addToCartButtons = document.querySelectorAll(".add-to-cart");

// const { response } = require("express");

// addToCartButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     cartCount++;
//     cartCountElement.textContent = cartCount;
//   });
// });
// document.querySelector('.close').addEventListener('click', () => {
//   document.body.classList.remove('showCart');
// });

document.addEventListener("DOMContentLoaded", ()=> {
  const slideshowImg = document.querySelector(".main-img");
  const imageList = [
    "image/10.jpg",
    "image/20.jpg",
    "image/15.jpg",
    "image/40.jpg",
    "image/35.jpg",
  ];
  const originalImage = "image/05.jpg";

  let currentIndex = 0;
  let interval;

  slideshowImg.addEventListener("mouseenter", function () {
    interval = setInterval(() => {
      slideshowImg.src = imageList[currentIndex];
      currentIndex = (currentIndex + 1) % imageList.length;
    }, 1000); // change every 3 seconds
  });

  slideshowImg.addEventListener("mouseleave", function () {
    clearInterval(interval);
    slideshowImg.src = originalImage;
    currentIndex = 0;
  });
});
