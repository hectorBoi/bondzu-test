const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const iframeElem = document.getElementById("iframe");
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");

const statusElem = document.getElementById("status");

//Datos en español
const especieElem = document.getElementById("especie");
const acercaElem = document.getElementById("acerca");
const caracteristicasElem = document.getElementById("caracteristicas");
const cuidadorElem = document.getElementById("cuidador");

//English data
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");

fetch(`/admin/animals/${animalID}`)
  .then((res) => res.json())
  .then((animal_info) => {
    titleElem.innerText = `Actualizar: ${animal_info.species}`;
    const youtubeURL = `https://www.youtube.com/embed/${animal_info.youtubeID}`;
    iframeElem.setAttribute("src", youtubeURL);
    youtubeIdElem.setAttribute("value", animal_info.youtubeID);
    animalPhotoElem.setAttribute("src", animal_info.profilePhoto);

    especieElem.setAttribute("value", animal_info.species);
    acercaElem.innerHTML = animal_info.about;

    let chars = "";
    for (let key in animal_info.characteristics) {
      let temp = `${key}: ${animal_info.characteristics[key]} \\n`;
      chars = chars.concat(temp);
    }
    caracteristicasElem.innerHTML = chars;

    cuidadorElem.setAttribute("value", animal_info.keeper);

    /*speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    characteristicsElem.innerHTML = chars;
    keeperElem.innerText = animal.keeper;*/

    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");
