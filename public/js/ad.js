const popAd = document.getElementById("popAd");

const createImage = (url, container) => {
  let img = document.createElement("img");
  console.log(url);
  img.setAttribute("src", url);
  img.className = "img-fluid";
  img.setAttribute("alt", "ad");
  //img.style.width = "500px";
  img.style.height = "800px";
  container.appendChild(img)
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
    console.log(ad);
    createImage(ad[0].Image, popAd);

  })
  .catch("Error in the request");
// end fetch
