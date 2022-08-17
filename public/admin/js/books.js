const loaderElements = document.getElementById("loaderElements");

const containerBooks = document.getElementById("containerBooks");

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
  img.setAttribute("alt", "Book");
  img.style.height = "300px";
  return img;
};

const createTitle = (title) => {
  let h5 = document.createElement("h5");
  h5.className = "card-title";

  let span = document.createElement("span");
  span.className = "bookCardHeader";
  span.innerHTML = title;

  h5.appendChild(span);
  return h5;
};

const createRow = () => {
  let div = document.createElement("div");
  div.className = "row row-cols-1 row-cols-lg-2 row-cols-xl-4";
  return div;
};

const createCard = (object, type) => {
  const col = createDiv("col-xl");
  const anchor = document.createElement("a");
  anchor.setAttribute("id", object.id);
  anchor.href = "updateBook.html";
  anchor.onclick = function () {
    window.localStorage.setItem("currentBook", object.id);
  };
  col.appendChild(anchor);
  const button = createButton(object.id);
  anchor.appendChild(button);
  if (object.cover) {
    const img = createImage(object.cover);
    button.appendChild(img);
  }
  const div = createDiv("card-img-overlay", object.id);
  const h5 = createTitle(object.title);
  div.appendChild(h5);
  button.appendChild(div);
  return col;
};

const createCards = (array, container, type) => {
  let count = 0;
  let row = createRow();

  for (elem of array) {
    let col = createCard(elem, type);
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

fetch("/admin/books")
  .then((res) => res.json())
  .then((books) => {

    createCards(books, containerBooks);

    loaderElements.className += " hidden";
  })
  .catch((error) => {
    console.log(`ERROR when fetching data: ${error}`);
  });

window.onclick = (event) => {
  if (event.target.id) {
    window.localStorage.setItem("currentBook", event.target.id);
  }
};

function compareNames(animal1, animal2) {
  if (animal1.name < animal2.name) {
    return -1;
  }
  if (animal1.name > animal2.name) {
    return 1;
  }
  return 0;
}
