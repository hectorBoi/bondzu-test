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

    //Member's cards
    const createCard = (name, imageSource, description, email) => {
      //General div of the card
      let card= document.createElement("div");
      card.className="container"
      card.style="margin-top:18px;"
      //Div to establish the division between image and text
      let rows= document.createElement("div");
      rows.className="row";
      card.appendChild(rows);
      //Div to create the image section column
      let imageDiv= document.createElement("div");
      imageDiv.className="col-3";
      rows.appendChild(imageDiv);
      //Div to create the text section column
      let textDiv= document.createElement("div");
      textDiv.className="col-9";
      rows.appendChild(textDiv);
      //Div's to set the text organization
      let text= document.createElement("div");
      text.className="card";
      text.style="height: 100%;"
      textDiv.appendChild(text);
      let textBody= document.createElement("div");
      textBody.className="card-body";
      text.appendChild(textBody);

      //Name
      let nameText= document.createElement("h5");
      nameText.className="card-title";
      nameText.textContent=name;
      textBody.appendChild(nameText);
      //Description
      let descriptionText= document.createElement("p");
      descriptionText.className="card-text";
      descriptionText.textContent=description;
      textBody.appendChild(descriptionText);
      //Email
      let emailText= document.createElement("small");
      emailText.className="text-muted";
      emailText.textContent=email;
      textBody.appendChild(emailText);
      //Image
      let image= document.createElement("img");
      image.className="img-thumbnail";
      image.style=style="height: 100%;"
      image.src=imageSource;
      imageDiv.appendChild(image)

      return card
    }

    //Add the cards
    if(aboutElem.innerText == "[DATOS]"){
      aboutElem.innerText = "Este es el equipo de tecnologías de Bondzú.";
      characteristicsElem.innerText = "";
      adoptElem.remove();
      aboutElem.remove();
      showMoreElem.remove();
      iframeDiv.remove();

      fetch("/admin/members")
      .then((res) => res.json())
      .then((membersInfo) => {
        const members = [];
        membersInfo.forEach((elem) => {
            members.push(elem);
        });
        //console.log(membersInfo);

        //Create each card (Based on the language)
        var i = 0;
        if (window.localStorage.getItem("lang") === "es") {
          for (member in members) {
            const newCard = createCard(members[i].name, `../img/${members[i].animal}.jpg`, members[i].description, members[i].email);
            i++;
            leftSideElem.appendChild(newCard);
          }
        } else if (window.localStorage.getItem("lang") === "en") {
          for (member in members) {
            const newCard = createCard(members[i].name, `../img/${members[i].animal}.jpg`, members[i].description_en, members[i].email);
            i++;
            leftSideElem.appendChild(newCard);
          }
        }
      })
      .catch("Error in the request");
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