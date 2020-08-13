const guest = document.getElementById("guest");
const animals = document.getElementById("navAnimals");
const loggedIn = document.getElementById("loggedIn");
const cardLogin = document.getElementById("cardLogin");
const conocenos = document.getElementById("conocenos");
const token = window.localStorage.getItem("token");

if (!token) {
  animals.style.display = "none";
  loggedIn.style.display = "none";
} else {
  guest.style.display = "none";
  if (cardLogin) {
    cardLogin.style.display = "none";
    conocenos.className = "";
  }
}

