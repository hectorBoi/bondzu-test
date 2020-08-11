const guest = document.getElementById("guest");
const animals = document.getElementById("navAnimals");
const loggedIn = document.getElementById("loggedIn");
const token = window.localStorage.getItem("token");

if (!token) {
  animals.style.display = "none";
  loggedIn.style.display = "none";
} else {
  guest.style.display = "none";
}

