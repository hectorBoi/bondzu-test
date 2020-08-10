const container = document.getElementById("container");

const createDiv = (className) => {
  let div = document.createElement("div");
  div.className = className;
  return div;
};

const createButton = (location) => {
  let div = createDiv("card bg-dark text-white");
  div.setAttribute("type", "button");
  div.style.margin = "20px";
  //div.style.color = "red";
  div.setAttribute(
    "onclick",
    `window.location.href='singleAnimal/${location}'`
  );
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
  h5.innerHTML = title;
  return h5;
};

const createRow = () => {
  let div = document.createElement("div");
  div.className = "row row-cols-1 row-cols-md-2";
  return div;
};

const createCard = (object) => {
  const col = createDiv("col-xl");
  col.setAttribute("id", object.id);
  const button = createButton(object.id);
  col.appendChild(button);
  const img = createImage(object.profilePhoto);
  button.appendChild(img);
  const div = createDiv("card-img-overlay");
  const h5 = createTitle(object.species);
  div.appendChild(h5);
  button.appendChild(div);
  return col;
};

// Only allows access to users which have a session
if (!window.localStorage.getItem("token")) {
  location.replace("/");
}

fetch("/animals", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    usertype: window.localStorage.getItem("usertype"),
    username: window.localStorage.getItem("username"),
    token: window.localStorage.getItem("token"),
  },
})
  .then((res) => res.json())
  .then((animals) => {
    let count = 0;
    let row = createRow();

    for (animal of animals) {
      let col = createCard(animal);
      row.appendChild(col);
      count++;
      if (
        (count > 0 && count % 2 === 0) ||
        (count === animals.length && animals.length % 2 !== 0)
      ) {
        container.appendChild(row);
        row = createRow();
      }
    }
    console.log(animals);
  })
  .catch("Error in the request");
