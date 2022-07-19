
const createImage = (url) => {
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.className = "img-fluid";
  img.setAttribute("alt", "ad");
  //img.style.width = "500px";
  //img.style.height = "300px";
  return img;
};

if (!document.cookie.includes("token")) {
  location.replace("/");
}

fetch("/ad/image")
  .then((res) => res.json())
  .then((ad) => {
    /*const ad = [];
    adColleagues.forEach((elem) => {
      ad.push(elem);
    });*/

    createImage(ad.Image);

  })
  .catch("Error in the request");
