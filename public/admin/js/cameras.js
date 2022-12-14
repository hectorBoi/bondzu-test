const loaderElements = document.getElementById("loaderElements");
const containerCameras = document.getElementById("containerCameras");

const createDiv = (className, id) => {
  let div = document.createElement("div");
  div.className = className;
  if (id) {
    div.setAttribute("id", id);
  }
  return div;
};

const createButton = (location) => {
  let div = createDiv("card bg-dark text-white");
  div.style.margin = "20px";
  return div;
};

const createImage = (url) => {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.className = "card-img img-fluid";
  img.setAttribute("alt", "animal");
  img.style.height = "300px";
  return img;
};

const createTitle = (title) => {
  let h5 = document.createElement("h5");
  h5.className = "card-title";

  let span = document.createElement("span");
  span.className = "animalCardHeader";
  span.innerHTML = title;

  h5.appendChild(span);
  return h5;
};

const createRow = () => {
  let div = document.createElement("div");
  div.className = "row row-cols-1 row-cols-lg-2 row-cols-xl-4";
  return div;
};

const createCard = (object) => {
  const col = createDiv("col-xl");
  const camera = document.createElement("iframe");
  camera.classList = "embed-responsive-item";
  // camera.setAttribute("id", object.id);

  // Checks if the camera is from youtube or another page
  let youtubeURL = "";
  if (object.includes("http"))
    youtubeURL = object;
  else
    youtubeURL = `https://www.youtube.com/embed/${object}`;

  camera.setAttribute("src", youtubeURL);
  camera.setAttribute("allowfullscreen", '');

  col.appendChild(camera);
  /* const button = createButton(object.id);
  anchor.appendChild(button);
  if (object.profilePhoto) {
    const img = createImage(object.profilePhoto);
    button.appendChild(img);
  }
  const div = createDiv("card-img-overlay", object.id);
  button.appendChild(div); */

  // const div = createDiv("card-img-overlay", object.id);
  // const h5 = createTitle(object.name);
  // div.appendChild(h5);
  return col;
};

const createCards = (array, container) => {
  let count = 0;
  let row = createRow();

  for (elem of array) {
    let col = createCard(elem);
    row.appendChild(col);
    count++;
    if (
      (count > 0 && count % 4 === 0) ||
      (count === array.length && array.length % 4 !== 0)
    ) {
      container.appendChild(row);
      row = createRow();
    }
  }
};

if (!document.cookie.includes("token")) {
  location.replace("/");
}

fetch("/admin/cameras")
  .then((res) => res.json())
  .then((youtubeIDs) => {
    
    youtubeIDs.sort(compareNames);
    
    createCards(youtubeIDs, containerCameras);

    loaderElements.className += " hidden";
  })
  .catch((error) => {
    console.log(`ERROR when fetching data: ${error}`);
  });

function compareNames(animal1, animal2) {
  if (animal1.name < animal2.name) {
    return -1;
  }
  if (animal1.name > animal2.name) {
    return 1;
  }
  return 0;
}
