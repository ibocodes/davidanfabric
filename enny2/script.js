// const closeMenu = document.getElementById('closeMenu');
// const openMenu = document.getElementById('openMenu');
// const buttonMenu = document.getElementById('buttonMenu');
// const mobileMenu = document.getElementById('mobile-menu');

// buttonMenu.addEventListener('click', () => {
//     openMenu.classList.toggle('hidden');
//     closeMenu.classList.toggle('hidden');
//     mobileMenu.classList.toggle('hidden');
// });


  const closeMenu = document.getElementById('closeMenu');
  const openMenu = document.getElementById('openMenu');
  const buttonMenu = document.getElementById('buttonMenu');
  const mobileMenu = document.getElementById('mobile-menu'); // Fixed typo

  buttonMenu.addEventListener('click', () => {
    openMenu.classList.toggle('hidden');
    closeMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('hidden');
  });