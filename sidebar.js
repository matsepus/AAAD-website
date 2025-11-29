const hamburgerDiv = document.getElementById("hamburgerDiv");
const sideMenu = document.getElementById("sideMenu");


hamburgerDiv.addEventListener("click", () => {
  sideMenu.classList.toggle("expanded");
});

document.addEventListener('click', (event) => {
    if (!sideMenu.contains(event.target)) {
        sideMenu.classList.remove("expanded");
    }
});