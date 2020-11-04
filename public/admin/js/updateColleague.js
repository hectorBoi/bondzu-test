const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

//Datos únicos
const iframeElem = document.getElementById("iframe");
const nombreElem = document.getElementById("nombre");
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");
const statusElem = document.getElementById("status");
const statusTextElem = document.getElementById("statusText");

//Datos en español
const acercaElem = document.getElementById("acerca");
const caracteristicasElem = document.getElementById("caracteristicas");

//English data
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");

//Keepers
const allKeepersElem = document.getElementById("allKeepers");

const createSelectKeepers = (array, form, currentKeeper) => {
  for (let i = 0; i < array.length; i++) {
    let keeper = array[i];

    const option = document.createElement("option");
    option.setAttribute("value", keeper.id);
    option.innerText = keeper.name;

    if (currentKeeper === keeper.name) {
      option.selected = true;
    }

    form.appendChild(option);
  }
};

fetch(`/admin/animals/${animalID}`)
  .then((res) => res.json())
  .then((animal_info) => {
    console.log(animal_info);

    titleElem.innerText = `Actualizar: ${animal_info.name}`;

    //Nombre
    nombreElem.setAttribute("value", animal_info.name);

    //Switch status (Animal status - Active/Inactive)
    if (animal_info.isActive) {
      statusElem.checked = true;
      statusTextElem.innerText = "Activo";
    } else {
      statusElem.checked = false;
      statusTextElem.innerText = "Inactivo";
    }

    //Video
    let youtubeURL = "";
    // Checks if the camera is from youtube or another page
    if (animal_info.youtubeID.includes("http")) {
      youtubeURL = animal_info.youtubeID;
    } else {
      youtubeURL = `https://www.youtube.com/embed/${animal_info.youtubeID}`;
    }
    iframeElem.setAttribute("src", youtubeURL);
    youtubeIdElem.setAttribute("value", animal_info.youtubeID);

    //Photo
    animalPhotoElem.setAttribute("src", animal_info.profilePhoto);

    //Keepers
    createSelectKeepers(
      animal_info.allKeepers,
      allKeepersElem,
      animal_info.keeper
    );

    //Datos en español
    acercaElem.innerHTML = animal_info.about;

    let chars = "";
    for (let key in animal_info.characteristics) {
      let temp = `${key}: ${animal_info.characteristics[key]}\n`;
      chars = chars.concat(temp);
    }

    caracteristicasElem.innerHTML = chars;

    //English data
    aboutElem.innerHTML = animal_info.about_en;

    chars = "";
    for (let key in animal_info.characteristics_en) {
      let temp = `${key}: ${animal_info.characteristics_en[key]}\n`;
      chars = chars.concat(temp);
    }

    characteristicsElem.innerHTML = chars;

    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const status = statusElem.checked;
  const nombre = nombreElem.value;
  const youtubeId = youtubeIdElem.value;
  const keeper = allKeepersElem.options[allKeepersElem.selectedIndex].value;

  //Información español
  const acerca = acercaElem.value;
  const caracteristicas = {
    "": caracteristicasElem.value,
  };

  //English information
  const about = aboutElem.value;
  const characteristics = {
    "": characteristicsElem.value,
  };

  if (
    youtubeId != "" &&
    nombre != "" &&
    acerca != "" &&
    caracteristicas != "" &&
    name != "" &&
    about != "" &&
    characteristics != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    const request = {
      name: nombre,
      name_en: nombre,
      about: acerca,
      about_en: about,
      characteristics: caracteristicas,
      characteristics_en: characteristics,
      species: "Colega",
      species_en: "Colleague",
      youtubeID: youtubeId,
      keeper: keeper,
      isActive: status,
      priority: "etDcoSci6K",
    };

    fetch(`/admin/animals/${animalID}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((res) => {
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});

const formTest = document.getElementById("formTest");
formTest.setAttribute("action", `/admin/animals/${animalID}`);

const submitPhoto = document.getElementById("newProfilepic");
const formPhoto = document.getElementById("submitPhoto");
submitPhoto.addEventListener("change", () => {
  formPhoto.className = "btn btn-success";
  formPhoto.disabled = false;
});
