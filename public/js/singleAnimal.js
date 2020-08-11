const iframeElem = document.getElementById("iframe");
const animalPhotoElem = document.getElementById("animalPhoto");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");
const adoptElem = document.getElementById("adoptButton")
const animalID = window.localStorage.getItem("currentAnimal");

fetch(`/singleAnimal/${animalID}`, {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    username: window.localStorage.getItem("username"),
  }
})
  .then((res) => res.json())
  .then((animal) => {
    const youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
    iframeElem.setAttribute("src", youtubeURL);

    animalPhotoElem.setAttribute("src", animal.profilePhoto);
    speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    characteristicsElem.innerText = animal.characteristics;
    keeperElem.innerText = animal.keeper;

    if (animal.isAdopted) {
      adoptElem.innerText = "¡Ya me adoptaste!";
      adoptElem.disabled = true;
    }
  })
  .catch("Error in the request");

adoptElem.addEventListener("click", () => {
  const url = `/adoptions/${animalID}`
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      username: window.localStorage.getItem("username"),
      token: window.localStorage.getItem("token"),
    }
  })
    .then((res) => res.json())
    .then(res => {
      if (res === "Worked") {
        alert("Adoptaste a un animal!");
        adoptElem.innerText = "¡Ya me adoptaste!";
        adoptElem.disabled = true;
      }
    })
    .catch("Error in the request");
})