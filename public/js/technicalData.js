const iframeElem = document.getElementById("iframe");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const keeperElem = document.getElementById("keeper");
const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");
const characteristicsElem = document.getElementById("technicalData");
const referencesElem = document.getElementById("references");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

fetch(`/animals/technicalData/${animalID}`)
  .then((res) => res.json())
  .then((animal) => {
    let youtubeURL = "";
    //console.log("This is the animal id: ", animal.youtubeID);
    // Checks if the camera is from youtube or another page
    if (animal.youtubeID.includes("http")) {
      youtubeURL = animal.youtubeID;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    } else {
      youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    }
    iframeElem.setAttribute("src", youtubeURL);
    let tech = "";
    let ref = "";
    for (let key in animal.technicalData) {
      if (key !== "Referencias" && key !== "References") {
        let temp = `<h4 style = "margin-bottom: 15px">${key}: <span class="lead"> ${animal.technicalData[key]} </span></h4>`;
        tech = tech.concat(temp);
      } else {
        animal.technicalData[key].forEach((element) => {
          let references = `${element}<br><br>`;
          ref = ref.concat(references);
        });
      }
    }
    titleElem.innerText = `Bondzù: ${animal.name} | ${animal.species}`;
    speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    keeperElem.innerText = animal.keeper;
    characteristicsElem.innerHTML = tech;
    referencesElem.innerHTML = ref;
    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");
