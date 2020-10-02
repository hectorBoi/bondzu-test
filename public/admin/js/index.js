const loggedIn = document.getElementById("loggedIn");
const loggedIn2 = document.getElementById("loggedIn2");

if (!document.cookie.includes("token")) {
  loggedIn.style.display = "none";
  loggedIn2.style.display = "none";
} else {
  loggedIn.style.display = "";
  loggedIn2.style.display = "";
}

//Preloading page
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.className += " hidden";
  loader.style.display = "none";
});
