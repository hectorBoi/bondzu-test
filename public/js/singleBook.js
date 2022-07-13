const iframeDiv = document.getElementById("iframe-div");
const iframeElem = document.getElementById("iframe");
const bookCoverElem = document.getElementById("bookCover");
const titleElem = document.getElementById("title");
const illustratorElem = document.getElementById("illustrator");
const descriptionElem = document.getElementById("description");
const bookID = window.localStorage.getItem("currentBook");

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
/*function translateElement(element, englishTranslation, spanishTranslation)
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
}*/

/**
 * Translates a mutual HTML element between books and colleagues to English and Spanish
 * @param {string} distinguishingString String that indicates if the translation is targeted towards an book or a colleague
 * @param {HTMLElement} translatedElement The mutual HTML element between books and colleagues, whose innerText will be translated
 * @param {string} colleagueEnglishTranslation The element's English translation for colleagues
 * @param {string} colleagueSpanishTranslation The element's Spanish translation for colleagues
 * @param {string} bookEnglishTranslation The element's English translation for books
 * @param {string} bookSpanishTranslation The element's Spanish translation for books
 */
/*function translateBooksAndColleagues(distinguishingString,
                                       translatedElement,
                                       colleagueEnglishTranslation,
                                       colleagueSpanishTranslation,
                                       bookEnglishTranslation,
                                       bookSpanishTranslation)
{
  switch (distinguishingString)
  {
    case "Colega":
    case "Colleague":
      translateElement(translatedElement, colleagueEnglishTranslation, colleagueSpanishTranslation);
      break;

    default:
      translateElement(translatedElement, bookEnglishTranslation, bookSpanishTranslation);
      break;
  }
}*/

fetch(`/books/${bookID}`)
  .then((res) => res.json())
  .then((book) => {
    let youtubeURL = "";
    //console.log("This is the book id: ", book.youtubeID);
    // Checks if the camera is from youtube or another page

    if (book.youtubeID.includes("http")) {
      youtubeURL = book.youtubeID;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    } else {
      youtubeURL = `https://www.youtube.com/embed/${book.youtubeID}`;
      //console.log("youtubeURL");
      //console.log(youtubeURL);
    }
    iframeElem.setAttribute("src", youtubeURL);

    let chars = "";
    for (let key in book.characteristics) {
      let temp = `<b>${key}: </b>${book.characteristics[key]}<br>`;
      chars = chars.concat(temp);
    }

    titleElem.innerText = `Bondzù: ${book.title} | ${book.illustrator}`;
    bookCoverElem.setAttribute("src", book.cover);
    titleElem.innerText = book.title;
    illustratorElem.innerText = book.illustrator;
    descriptionElem.innerText = book.description;

    /* Books are under the custody of Keepers
     * Colleagues are members of an Organization
     */
    const cardTitlesNumber = document.getElementsByClassName("card-title").length;
    const keeperCardTitle = document.getElementsByClassName("card-title")[cardTitlesNumber - 1];

    //Member's cards
    const createCard = (title, imageSource, description, email) => {
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
      let titleText= document.createElement("h5");
      titleText.className="card-title";
      titleText.textContent=title;
      textBody.appendChild(titleText);
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
    if(descriptionElem.innerText == "[DATOS]"){
      descriptionElem.innerText = "Este es el equipo de tecnologías de Bondzú.";
      characteristicsElem.innerText = "";
      adoptElem.remove();
      descriptionElem.remove();
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
              const newCard = createCard( members[i].title,
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
              const newCard = createCard( members[i].title,
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

    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");
