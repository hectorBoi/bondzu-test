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

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

/////TO DO: This is a temporal solution. Modify this to reload the iframe correctly////////
function reloadIFrame(){
  if(iframeElem.src.includes("https://vauth.command.verkada.com/embed/html/d9f30996-c827-4303-ac25-cc41b2c8cb78/")){
    iframeElem.src = `https://command.verkada.com/embed.html#%7B%22entityId%22%3A%20%2255054a74-f45b-40ec-b621-cf7efef51177%22%2C%20%22token%22%3A%20%22v2_98ae92791795903878f87da818fa386b%22%2C%20%22urlSD%22%3A%20%22https%3A//vstream.command.verkada.com/filter/transcode/v2_98ae92791795903878f87da818fa386b/55054a74-f45b-40ec-b621-cf7efef51177/low_res/livevideo.m3u8%22%2C%20%22urlHD%22%3A%20%22https%3A//vfilter.command.verkada.com/filter/transcode/v2_98ae92791795903878f87da818fa386b/55054a74-f45b-40ec-b621-cf7efef51177/high_res/livevideo.m3u8%22%7D`;
  }
}

fetch(`/animals/${animalID}`)
  .then((res) => res.json())
  .then((animal) => {
    let youtubeURL = "";
    //console.log("This is the animal id: ", animal.youtubeID);
    // Checks if the camera is from youtube or another page
    if (animal.youtubeID.includes("https")) {
      youtubeURL = animal.youtubeID;
      //Reload the iframe to show the video (There is an error if it is not reloaded)
        setTimeout(reloadIFrame, 1000);
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
