// Only allows access to users which have a session
if (!document.cookie.includes("token")) {
  location.replace("/");
}

const nameElem = document.getElementById("name");
const lastnameElem = document.getElementById("lastname");
const usertypeElem = document.getElementById("usertype");
const usernameElem = document.getElementById("username");
const profilePhotoElem = document.getElementById("profilePhoto");
const profilePhotoModElem = document.getElementById("profilePhotoMod");

const loaderElements = document.getElementById("loaderElements");

// To modify the user
const newProfilepicElem = document.getElementById("newProfilepic");
const newNameElem = document.getElementById("newName");
const newLastNameElem = document.getElementById("newLastName");
const newPasswordElem = document.getElementById("newPassword");
const newPasswordConfirmElem = document.getElementById("newPasswordConfirm");
const updateProfileElem = document.getElementById("updateProfile");
const noMatchPasswords = document.getElementById("noMatchPasswords");

fetch(`/profile/`)
  .then((res) => res.json())
  .then((userInfo) => {
    nameElem.innerText = userInfo.name;
    lastnameElem.innerText = userInfo.lastname;
    usertypeElem.innerText = `Tipo: ${userInfo.usertype}`;
    usernameElem.innerText = userInfo.username;
    if (userInfo.photo) {
      profilePhotoElem.setAttribute("src", userInfo.photo);
      profilePhotoModElem.setAttribute("src", userInfo.photo);
    }
    loaderElements.className += " hidden";
  })
  .catch("Error in the request");

updateProfileElem.addEventListener("click", () => {
  const newName = newNameElem.value;
  const newLastname = newLastNameElem.value;
  const newPassword = newPasswordElem.value;
  const newPasswordConfirm = newPasswordConfirmElem.value;

  let request = {
    Nname: newName,
    Nlastname: newLastname,
    Npassword: newPassword,
  };

  if (newPasswordConfirm === newPassword) {
    fetch("/profile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((newUser) => {
        location.replace("profile.html");
      })
      .catch((err) => err);
  } else {
    newPasswordConfirmElem.className = "form-control is-invalid";
    noMatchPasswords.removeAttribute("style");
  }
});

// To interact with the adoptions
const adoptionsContainerElem = document.getElementById("adoptionsContainer");
const showAdoptionsElem = document.getElementById("showAdoptions");
const container = document.getElementById("container");
const headerAdoptions = document.getElementById("alertAdoptions");

const backTopElem = document.getElementById("backTop");
backTopElem.style.display = "none";

const createDiv = (className, id) => {
  let div = document.createElement("div");
  div.className = className;
  if (id) {
    div.setAttribute("id", id);
  }
  return div;
};

const createButton = (location) => {
  let div = createDiv("card bg-dark text-white");
  div.setAttribute("type", "button");
  div.style.margin = "20px";
  div.setAttribute("onclick", `window.location.href='singleAnimal.html'`);
  return div;
};

const createImage = (url) => {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.className = "card-img img-fluid";
  img.setAttribute("alt", "animal");
  //img.style.width = "500px";
  img.style.height = "300px";
  return img;
};

const createTitle = (title) => {
  let h5 = document.createElement("h5");
  h5.className = "card-title";

  let span = document.createElement("span");
  span.className = "animalCardHeader";
  span.innerHTML = title;

  h5.appendChild(span);
  return h5;
};

const createRow = () => {
  let div = document.createElement("div");
  div.className = "row row-cols-1 row-cols-lg-2 row-cols-xl-4";
  return div;
};

const createCard = (object) => {
  const col = createDiv("col-xl");
  col.setAttribute("id", object.id);
  const button = createButton(object.id);
  col.appendChild(button);
  const img = createImage(object.profilePhoto);
  button.appendChild(img);
  const div = createDiv("card-img-overlay", object.id);
  const h5 = createTitle(object.species);
  div.appendChild(h5);
  button.appendChild(div);
  return col;
};

showAdoptionsElem.addEventListener("click", () => {
  adoptionsContainerElem.style.display = "";
  backTopElem.style.display = "";
  if (container.innerHTML === "") {
    fetch(`/adoptions/${username}`)
      .then((res) => res.json())
      .then((animals) => {
        if (animals.length !== 0) {
          let count = 0;
          let row = createRow();

          showAdoptionsElem.disable = true;
          headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">Tus adopciones</h4>`;
          headerAdoptions.className = "alert alert-success";

          for (animal of animals) {
            let col = createCard(animal);
            row.appendChild(col);
            count++;
            if (
              (count > 0 && count % 4 === 0) ||
              (count === animals.length && animals.length % 4 !== 0)
            ) {
              container.appendChild(row);
              row = createRow();
            }
          }
        } else {
          headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">Aún no tienes adopciones. <a href="animals.html">¡Ve a adoptar! <a/></h4>`;
          headerAdoptions.className = "alert alert-danger";
        }
      })
      .catch("Error in the request");
  }
  showClass = showAdoptionsElem.className;
  if (showAdoptionsElem.className.includes("hide")) {
    showAdoptionsElem.className = "btn btn-success";
    showAdoptionsElem.className = showAdoptionsElem.className.substr(
      0,
      showClass.length - 6
    );
    adoptionsContainerElem.style.display = "none";
    showAdoptionsElem.innerText = "Ver tus adopciones";
    backTopElem.style.display = "none";
  } else {
    showAdoptionsElem.className += "btn btn-info";
    showAdoptionsElem.className += "  hide";
    showAdoptionsElem.innerText = "Ocultar tus adopciones";
  }
});

window.onclick = (event) => {
  if (event.target.id) {
    window.localStorage.setItem("currentAnimal", event.target.id);
  }
};

const formTest = document.getElementById("formTest");
const submitPhoto = document.getElementById("newProfilepic");
const formPhoto = document.getElementById("submitPhoto");
submitPhoto.addEventListener("change", () => {
  formPhoto.className = "btn btn-success";
  formPhoto.value = "Actualizar foto";
  formPhoto.disabled = false;
});
