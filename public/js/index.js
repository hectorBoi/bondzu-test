const login = document.getElementById("login");
const animals = document.getElementById("animals");
const token = window.localStorage.getItem("token");

if (!token) {
  login.style.display = "visible"
  animals.style.display = "none"
} else {
  login.style.display = "none"
  animals.style.display = "visible"
}

