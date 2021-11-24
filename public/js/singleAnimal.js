const iframeDiv = document.getElementById("iframe-div");
const iframeElem = document.getElementById("iframe");
const animalPhotoElem = document.getElementById("animalPhoto");
const nameElem = document.getElementById("name");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");
const adoptElem = document.getElementById("adoptButton");
const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const popoverAdoptElem = document.getElementById("popoverAdopt");
const showMoreElem = document.getElementById("moreinfo-btn");
const leftSideElem = document.getElementById("left-side");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

fetch(`/animals/${animalID}`)
  .then((res) => res.json())
  .then((animal) => {
    let youtubeURL = "";
    //console.log("This is the animal id: ", animal.youtubeID);
    // Checks if the camera is from youtube or another page
    if (animal.youtubeID.includes("youtube")) {
      youtubeURL = animal.youtubeID;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    } else {
      youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    }
    iframeElem.setAttribute("src", youtubeURL);

    let chars = "";
    for (let key in animal.characteristics) {
      let temp = `<b>${key}: </b>${animal.characteristics[key]}<br>`;
      chars = chars.concat(temp);
    }

    titleElem.innerText = `Bondzù: ${animal.name} | ${animal.species}`;
    animalPhotoElem.setAttribute("src", animal.profilePhoto);
    nameElem.innerText = animal.name;
    speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    characteristicsElem.innerHTML = chars;
    keeperElem.innerText = animal.keeper;

    //Colaboradores
    if(aboutElem.innerText == "[DATOS]"){
      aboutElem.innerText = "Este es el equipo de tecnologías de Bondzú.";
      characteristicsElem.innerText = "Trabajando por un mejor pundo para todos.";
      adoptElem.remove();
      aboutElem.remove();
      showMoreElem.remove();
      iframeDiv.remove();
      leftSideElem.innerHTML =  
       `<div class="container" style="margin-top:18px;">
          <div class="row">
            <div class="col-3">
              <img class="img-thumbnail" src="../img/pinguino.jpg" alt="Foto de Colega" style="height: 100%;">
            </div>
            <div class="col-9">
              <div class="card" style="height: 100%;">              
                <div class="card-body">
                  <h5 class="card-title">Jose Mariano Portilla Landa</h5>
                  <p class="card-text">Aqui iría tu información, si tan solo me la pasaras.</p>
                  <p class="card-text"><small class="text-muted">jose.portillala@udlap.mx</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-3">
              <img class="img-thumbnail" src="../img/aguilaPescadora.jpg" alt="Foto de Colega" style="height: 100%">
            </div>
            <div class="col-9">
              <div class="card" style="height: 100%;">              
                <div class="card-body">
                  <h5 class="card-title">Fernando López López</h5>
                  <p class="card-text">Aqui iría tu información, si tan solo me la pasaras.</p>
                  <p class="card-text"><small class="text-muted">fernando.lopezlz@udlap.mx</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-3">
              <img class="img-thumbnail" src="../img/panda.jpg" alt="Foto de Colega" style="height: 100%">
            </div>
            <div class="col-9">
              <div class="card" style="height: 100%;">              
                <div class="card-body">
                  <h5 class="card-title">Fernando Nieto Morales</h5>
                  <p class="card-text">Falta esta info.</p>
                  <p class="card-text"><small class="text-muted">fernando.nietoms@udlap.mx</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-3">
              <img class="img-thumbnail" src="../img/tigre.jpg" alt="Foto de Colega" style="height: 100%">
            </div>
            <div class="col-9">
              <div class="card" style="height: 100%;">              
                <div class="card-body">
                  <h5 class="card-title">Santiago González Ángeles</h5>
                  <p class="card-text">Aqui iría tu información, si tan solo me la pasaras.</p>
                  <p class="card-text"><small class="text-muted">santiago.gonzalezas@udlap.mx</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    }

    if (window.localStorage.getItem("lang") === "es") {
      popoverAdoptElem.setAttribute(
        "data-content",
        `Puedes verme en tus adopciones dentro de tu <a href="profile.html">perfil</a>.`
      );
    } else if (window.localStorage.getItem("lang") === "en") {
      popoverAdoptElem.setAttribute(
        "data-content",
        `You can find me in your adoptions in your <a href="profile.html">profile</a>.`
      );
    }

    loaderElements.className += " hidden";
    body.style.overflow = "auto";

    if (animal.isAdopted) {
      if (window.localStorage.getItem("lang") === "es") {
        adoptElem.innerText = "¡Ya me adoptaste!";
      } else if (window.localStorage.getItem("lang") === "en") {
        adoptElem.innerText = "You already adopted me!";
      }

      adoptElem.disabled = true;
    }
  })
  .catch("Error in the request");

adoptElem.addEventListener("click", () => {
  const url = `/adoptions/${animalID}`;
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res === "Worked") {
        if (window.localStorage.getItem("lang") === "es") {
          adoptElem.innerText = "¡Ya me adoptaste!";
        } else if (window.localStorage.getItem("lang") === "en") {
          adoptElem.innerText = "You already adopted me!";
        }
        setTimeout(() => {
          adoptElem.disabled = true;
        }, 3000);
      }
    })
    .catch("Error in the request");
});