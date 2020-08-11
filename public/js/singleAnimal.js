const iframeElem = document.getElementById("iframe");
const animalPhotoElem = document.getElementById("animalPhoto");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");

const animalID = window.localStorage.getItem("currentAnimal")

fetch(`/singleAnimal/${animalID}`)
  .then((res) => res.json())
  .then((animal) => {
    const youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
    iframeElem.setAttribute("src", youtubeURL);

    animalPhotoElem.setAttribute("src", animal.profilePhoto);
    speciesElem.innerText = animal.species;
    aboutElem.innerText = animal.about;
    characteristicsElem.innerText = animal.characteristics;
    keeperElem.innerText = animal.keeper;
  })
  .catch("Error in the request");



const createDiv = (className) => {
  let div = document.createElement("div");
  div.className = className;

  return div;
};

const createRow = () => {
  let div = createDiv("row");

  return div;
};

const createIframe = (youtubeID) => {
  const col = createDiv("col-xl-8");
  const div = createDiv("embed-responsive embed-responsive-16by9");
  div.style.marginTop = "15px";
  col.appendChild(div);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://www.youtube.com/embed/" + youtubeID);
  img.className = "embed-responsive-item";
  iframe.allowFullscreen = true;
  div.appendChild(iframe);

  return col;
};

const createCard = (object) => {
  const col = createDiv("col-xl-4");

  const card = createDiv("card");
  card.style.marginTop = "15px";
  col.appendChild(card);

  const img = document.createElement("img");
  img.setAttribute("src", object.profilePhoto);
  img.className = "card-img img-fluid";
  img.setAttribute("alt", "animal");
  img.setAttribute("height", "300px");
  card.appendChild(img);

  const button = document.createElement("button");
  button.className = "btn btn-success btn-lg btn-block";
  button.setAttribute("type", "button");
  button.innerHTML = "¡Adóptame!";
  card.appendChild(button);

  const cardBody = createDiv("card-body");
  card.appendChild(cardBody);

  const header4 = document.createElement("h4");
  header4.className = "card-title text-center";
  header4.innerHTML = object.name;
  cardBody.appendChild(header4);

  const list = document.createElement("ul");
  list.className = "list-group list-group-flush";
  cardBody.appendChild(list);

  const aboutItem = createListItem("Acerca de", object.about);
  list.appendChild(aboutItem);

  const characteristcsItem = createListItem(
    "Características",
    object.characteristcs
  );
  list.appendChild(characteristcsItem);

  const speciesItem = createListItem("Especie", object.species);
  list.appendChild(speciesItem);

  const keeperItem = createListItem("Cuidador", object.keeper);
  list.appendChild(keeperItem);

  return col;
};

const createListItem = (title, info) => {
  const listIteam = document.createElement("li");
  listIteam.className = "list-group-item";

  const header5 = document.createElement("h5");
  header5.className = "card-title";
  header5.innerHTML = title;
  listIteam.appendChild(header5);
  listIteam.innerHTML = info;

  return listIteam;
};
