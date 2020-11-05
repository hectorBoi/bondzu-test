const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

const zooID = window.localStorage.getItem("currentZoo");
const titleElem = document.getElementById("title");

const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const imageElem = document.getElementById("zooPhoto");

//Datos zoo
const nameElem = document.getElementById("zooName");
const photoUrlElem = document.getElementById("photoLink");
const pageElem = document.getElementById("pageLink");
const locationElem = document.getElementById("location");

fetch(`/admin/zoos/${zooID}`)
  .then((res) => res.json())
  .then((zoo_info) => {
    console.log(zoo_info);

    titleElem.innerText = `Actualizar: ${zoo_info.name}`;
    imageElem.setAttribute("src", zoo_info.photoUrl);

    //Nombre
    nameElem.setAttribute("value", zoo_info.name);
    photoUrlElem.setAttribute("value", zoo_info.photoUrl);
    pageElem.setAttribute("value", zoo_info.description);
    locationElem.setAttribute("value", zoo_info.location);


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
    keeper != "" &&
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

