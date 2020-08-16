const iframeElem = document.getElementById("iframe");
const animalPhotoElem = document.getElementById("animalPhoto");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");
const adoptElem = document.getElementById("adoptButton");
const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const popoverAdoptElem = document.getElementById("popoverAdopt");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

fetch(`http://bondzuweb-env.eba-rndn2r3v.us-east-1.elasticbeanstalk.com/singleAnimal/${animalID}`)
  .then((res) => res.json())
  .then((animal) => {
    const youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
    iframeElem.setAttribute("src", youtubeURL);

    let chars = "";
    for (let key in animal.characteristics) {
      let temp = `<b>${key}: </b>${animal.characteristics[key]}<br>`;
      chars = chars.concat(temp);
    }

    titleElem.innerText = `Bondzù: ${animal.species}`;
    animalPhotoElem.setAttribute("src", animal.profilePhoto);
    speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    characteristicsElem.innerHTML = chars;
    keeperElem.innerText = animal.keeper;
    popoverAdoptElem.setAttribute(
      "data-content",
      `Puedes verme en tus adopciones dentro de tu <a href="profile.html">perfil</a>.`
    );

    loaderElements.className += " hidden";
    body.style.overflow = "auto";

    if (animal.isAdopted) {
      adoptElem.innerText = "¡Ya me adoptaste!";
      adoptElem.disabled = true;
    }
  })
  .catch("Error in the request");

adoptElem.addEventListener("click", () => {
  const url = `http://bondzuweb-env.eba-rndn2r3v.us-east-1.elasticbeanstalk.com/adoptions/${animalID}`;
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res === "Worked") {
        adoptElem.innerText = "¡Ya me adoptaste!";
        setTimeout(() => {
          adoptElem.disabled = true;
        }, 1000);
      }
    })
    .catch("Error in the request");
});
