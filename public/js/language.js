const langBtn = document.getElementById("langBtn");

if (window.localStorage.getItem("lang") === "es") {
  langBtn.style.backgroundColor = "red";
  langBtn.textContent = "Current: es";
} else if (window.localStorage.getItem("lang") === "en") {
  langBtn.style.backgroundColor = "lightblue";
  langBtn.textContent = "Current: en";
} else {
  window.localStorage.setItem("lang", "es");
  document.cookie = "lang=es; path=/";
  langBtn.style.backgroundColor = "red";
  langBtn.textContent = "Current: es";
}


langBtn.addEventListener("click", () => {
  if (window.localStorage.getItem("lang") === "es") {
    window.localStorage.setItem("lang", "en");
    document.cookie = "lang=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "lang=en; path=/";
    langBtn.style.backgroundColor = "lightblue";
    langBtn.textContent = "Current: en";
    // window.location.href = "../../en/index.html";
  } else if (window.localStorage.getItem("lang") === "en") {
    window.localStorage.setItem("lang", "es");
    document.cookie = "lang=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "lang=es; path=/";
    langBtn.style.backgroundColor = "red";
    langBtn.textContent = "Current: es";
    // window.location.href = "../../es/index.html";
  }
})