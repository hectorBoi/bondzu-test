const nameElem = document.getElementById("name");
const lastnameElem = document.getElementById("lastname");
const usertypeElem = document.getElementById("usertype");
const usernameElem = document.getElementById("username");

fetch("/profile")
  .then((res) => res.json())
  .then((userInfo) => {
    nameElem.innerText = userInfo.name;
    lastnameElem.innerText = userInfo.lastname;
    usertypeElem.innerText = "WIP";
    usernameElem.innerText = window.localStorage.getItem("username");
  })
  .catch("Error in the request");
