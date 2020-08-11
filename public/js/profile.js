const nameElem = document.getElementById("name");
const lastnameElem = document.getElementById("lastname");
const usertypeElem = document.getElementById("usertype");
const usernameElem = document.getElementById("username");
const profilePhotoElem = document.getElementById("profilePhoto");
const profilePhotoModElem = document.getElementById("profilePhotoMod");
const username = window.localStorage.getItem("username")

// To modify the user
const newNameElem = document.getElementById("newName");
const newLastNameElem = document.getElementById("newLastName");
const newPasswordElem = document.getElementById("newPassword");
const updateProfileElem = document.getElementById("updateProfile");

fetch(`/profile/${username}`)
  .then((res) => res.json())
  .then((userInfo) => {
    nameElem.innerText = userInfo.name;
    lastnameElem.innerText = userInfo.lastname;
    usertypeElem.innerText = "USERTYPE WIP";
    usernameElem.innerText = window.localStorage.getItem("username");
    if (userInfo.photo) {
      profilePhotoElem.setAttribute("src", userInfo.photo)
      profilePhotoModElem.setAttribute("src", userInfo.photo)
    }
  })
  .catch("Error in the request");

updateProfileElem.addEventListener("click", () => {
  const newName = newNameElem.value;
  const newLastname = newLastNameElem.value;
  const newPassword = newPasswordElem.value;
  let request = {
    Nname: newName,
    Nlastname: newLastname,
    Npassword: newPassword,
    username: window.localStorage.getItem("username"),
    token: window.localStorage.getItem("token"),
  }
  console.log(request)
  fetch("/profile", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      usertype: window.localStorage.getItem("usertype"),
      username: window.localStorage.getItem("username"),
      token: window.localStorage.getItem("token"),
    },
    body: JSON.stringify(request)
  })
    .then((res) => res.json())
    .then((newUser) => {
      console.log(newUser);
      location.reload();
      return false;
    })
    .catch("Error in the request");
})