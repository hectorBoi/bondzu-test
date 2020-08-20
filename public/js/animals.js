const loaderElements = document.getElementById("loaderElements");

const containerAnimals = document.getElementById("containerAnimals");
const containerColleagues = document.getElementById("containerColleagues");

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
  //div.setAttribute("type", "button");
  div.style.margin = "20px";
  //div.setAttribute("onclick", `window.location.href='singleAnimal.html'`);
  return div;
};

const createImage = (url) => {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.className = "card-img img-fluid";
  img.setAttribute("alt", "animal");
  //img.style.width = "500px";
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
  col.setAttribute("id", object.id);
  const anchor = document.createElement("a");
  anchor.href = "singleAnimal.html";
  col.appendChild(anchor);
  const button = createButton(object.id);
  anchor.appendChild(button);
  const img = createImage(object.profilePhoto);
  button.appendChild(img);
  const div = createDiv("card-img-overlay", object.id);
  const h5 = createTitle(object.species);
  div.appendChild(h5);
  button.appendChild(div);
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

fetch("/animals", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((animalsColleagues) => {
    const animals = [];
    const colleagues = [];
    animalsColleagues.forEach((elem) => {
      if (elem.species !== "Colega") {
        animals.push(elem);
      } else {
        colleagues.push(elem);
      }
    });

    createCards(animals, containerAnimals);
    createCards(colleagues, containerColleagues);

    loaderElements.className += " hidden";
  })
  .catch("Error in the request");

window.onclick = (event) => {
  if (event.target.id) {
    window.localStorage.setItem("currentAnimal", event.target.id);
  }
};
