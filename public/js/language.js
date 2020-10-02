const currentLang = document.getElementById("currLang");
const langEsp = document.getElementById("esp");
const langEng = document.getElementById("eng");

var currentePage = window.location.href;
var splitPage = currentePage.split("/");

if (window.localStorage.getItem("lang") === "es") {
  currentLang.src = "../img/mxFlag.png";
} else if (window.localStorage.getItem("lang") === "en") {
  currentLang.src = "../img/ukFlag.png";
} else {
  window.localStorage.setItem("lang", "es");
  currentLang.src = "../img/mxFlag.png";
  document.cookie = "lang=es; path=/";
}

langEsp.addEventListener("click", () => {
  window.localStorage.setItem("lang", "es");
  document.cookie = "lang=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "lang=es; path=/";
  currentLang.src = "../img/mxFlag.png";
  location.href = "/es/" + splitPage[splitPage.length - 1];
});

langEng.addEventListener("click", () => {
  window.localStorage.setItem("lang", "en");
  document.cookie = "lang=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "lang=en; path=/";
  currentLang.src = "../img/ukFlag.png";
  location.href = "/en/" + splitPage[splitPage.length - 1];
});
