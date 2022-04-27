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

/**
 * Translates the given element to English and Spanish
 * @param {HTMLElement} element The HTML element whose innerText will be translated
 * @param {string} englishTranslation The element's English translation
 * @param {string} spanishTranslation The element's Spanish translation
 */
function translateElement(element, englishTranslation, spanishTranslation)
{
  const language = window.localStorage.getItem("lang");
  switch (language)
  {
    case "en":
      element.innerText = englishTranslation;
      break;
    
    case "es":
    default:
      element.innerText = spanishTranslation;
      break;
  }
}

/**
 * Translates a mutual HTML element between animals and colleagues to English and Spanish
 * @param {string} distinguishingString String that indicates if the translation is targeted towards an animal or a colleague
 * @param {HTMLElement} translatedElement The mutual HTML element between animals and colleagues, whose innerText will be translated
 * @param {string} colleagueEnglishTranslation The element's English translation for colleagues
 * @param {string} colleagueSpanishTranslation The element's Spanish translation for colleagues
 * @param {string} animalEnglishTranslation The element's English translation for animals
 * @param {string} animalSpanishTranslation The element's Spanish translation for animals
 */
function translateAnimalsAndColleagues(distinguishingString, 
                                       translatedElement, 
                                       colleagueEnglishTranslation, 
                                       colleagueSpanishTranslation, 
                                       animalEnglishTranslation, 
                                       animalSpanishTranslation)
{
  switch (distinguishingString)
  {
    case "Colega":
    case "Colleague":
      translateElement(translatedElement, colleagueEnglishTranslation, colleagueSpanishTranslation);
      break;
    
    default:
      translateElement(translatedElement, animalEnglishTranslation, animalSpanishTranslation);
      break;
  }
}

const adoptAnimalSpanishText = "¡Adóptame!";
const adoptAnimalEnglishText = "Adopt me!";
const followColleagueSpanishText = "¡Sígueme!";
const followColleagueEnglishText = "Follow me!";

const adoptedAnimalSpanishText = "¡Ya me adoptaste!";
const adoptedAnimalEnglishText = "You've already adopted me!";
const followedColleagueSpanishText = "¡Ya me seguiste!";
const followedColleagueEnglishText = "You've already followed me!";

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
    
    /* Colleagues are not animals.
     * Therefore, the species card is not visible on their page.
     */
    switch (animal.species)
    {
      case "Colega":
      case "Colleague":
        const speciesCard = document.getElementsByClassName("list-group-item")[0];
        speciesCard.style.display = "none";
        break;
      
      default:
        speciesElem.innerText = animal.species;
        break;
    }
    
    aboutElem.innerText = animal.about;
    characteristicsElem.innerHTML = chars;

    /* Animals are under the custody of Keepers
     * Colleagues are members of an Organization
     */
    const cardTitlesNumber = document.getElementsByClassName("card-title").length;
    const keeperCardTitle = document.getElementsByClassName("card-title")[cardTitlesNumber - 1];
    translateAnimalsAndColleagues(animal.species,
                                  keeperCardTitle,
                                  "Organization",
                                  "Organización",
                                  "Keeper",
                                  "Cuidador");

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
        console.log(membersInfo);

        //Create each card (Based on the language)
        var i = 0;
        if (window.localStorage.getItem("lang") === "es") {
          for (member in members) {
            if(members[i].status == true){
              const newCard = createCard( members[i].name, 
                                          members[i].image, 
                                          members[i].description, 
                                          members[i].email
                                        );
              leftSideElem.appendChild(newCard);
            }
            i++;
          }
        } else if (window.localStorage.getItem("lang") === "en") {
          for (member in members) {
            if(members[i].status == true){
              const newCard = createCard( members[i].name, 
                                          members[i].image, 
                                          members[i].description_en, 
                                          members[i].email
                                        );
              leftSideElem.appendChild(newCard);
            }
            i++;
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

    if (animal.isAdopted)
    {
      translateAnimalsAndColleagues(animal.species, 
                                    adoptElem, 
                                    followedColleagueEnglishText, 
                                    followedColleagueSpanishText, 
                                    adoptedAnimalEnglishText, 
                                    adoptedAnimalSpanishText);

      adoptElem.disabled = true;
    }
    else
    {
      translateAnimalsAndColleagues(animal.species, 
                                    adoptElem, 
                                    followColleagueEnglishText, 
                                    followColleagueSpanishText, 
                                    adoptAnimalEnglishText, 
                                    adoptAnimalSpanishText);
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

        translateAnimalsAndColleagues(speciesElem.innerText, 
                                      adoptElem, 
                                      followedColleagueEnglishText, 
                                      followedColleagueSpanishText, 
                                      adoptedAnimalEnglishText, 
                                      adoptedAnimalSpanishText);
        
        setTimeout(() => {
          adoptElem.disabled = true;
        }, 3000);
      }
    })
    .catch("Error in the request");
});