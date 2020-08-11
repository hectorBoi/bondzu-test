const nameElem = document.getElementById("name");
const lastnameElem = document.getElementById("lastname");
const usertypeElem = document.getElementById("usertype");
const usernameElem = document.getElementById("username");
const profilePhoto = document.getElementById("profilePhoto");
const username = window.localStorage.getItem("username")

fetch(`/profile/${username}`)
  .then((res) => res.json())
  .then((userInfo) => {
    nameElem.innerText = userInfo.name;
    lastnameElem.innerText = userInfo.lastname;
    usertypeElem.innerText = "USERTYPE WIP";
    usernameElem.innerText = window.localStorage.getItem("username");
    if (userInfo.photo) {
      profilePhoto.setAttribute("src", userInfo.photo)
    }
  })
  .catch("Error in the request");
