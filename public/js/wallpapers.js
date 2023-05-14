// Only allows access to users which have a session

// if (!document.cookie.includes('token')) {
//     location.replace('/');
//   }
const wallpapersContainer = document.getElementById("wallpaper-container");

// Fetching wallpapers from Unsplash API
fetch("/wallpapers")
  .then((res) => res.json())
  .then((wallpapers) => {
    let allWallpapers = wallpapers.results;
    const rows = document.createElement("div");
    rows.setAttribute("class", "row row-cols");
    wallpapersContainer.appendChild(rows);

    // Creating the cards for each wallpaper
    allWallpapers.forEach(element => {
        const col = document.createElement("div");
        col.setAttribute("class", "col-xs-12 col-sm-12 col-md-6 col-lg-4");
        col.setAttribute("style", "margin-bottom: 20px");

        const card = document.createElement("div");
        card.setAttribute("class", "card");
       
        const img = document.createElement("img");
        img.setAttribute("src", element.urls.regular);
        img.setAttribute("class", "card-img-top");

        const body = document.createElement("div");
        body.setAttribute("class", "card-body");
        
        const reference = document.createElement("p");
        reference.setAttribute("class", "card-text");
        reference.innerHTML = `Photo by ${element.user.name} on Unsplash`;
        
        const link = document.createElement("a");
        link.setAttribute("href", element.links.html);
        link.setAttribute("target", "_blank");
        link.setAttribute("class", "btn btn-primary");
        link.innerHTML = "Click here to go to the original photo";

        body.appendChild(reference);
        body.appendChild(link);
        

        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        rows.appendChild(col);

        
    });
    loaderElements.className += " hidden";
  })
  .catch("Error in the request");

window.onclick = (event) => {
  if (event.target.id) {
    window.localStorage.setItem("currentAnimal", event.target.id);
  }
};

