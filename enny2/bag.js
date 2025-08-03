const likes = document.querySelectorAll("button.text-xl");

likes.forEach(button => {
  button.addEventListener("click", () => {
    const love = document.querySelector("i")
     love.classList.toggle("fa-regular");
    love.classList.toggle("fa-solid");
    love.classList.toggle("red-heart");
  })
});