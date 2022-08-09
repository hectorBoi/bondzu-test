const popAd = document.getElementById("popAd");


window.addEventListener("load", function() {
  setTimeout(
    function open(event) {
      document.querySelector(".popup button").style.display = "none";
      document.querySelector(".popup").style.display = "block";
    },
    0000
  )
  setTimeout(
    function open(event) {
      document.querySelector(".popup button").style.display = "block";
    },
    3000
  )
});

document.querySelector("#close").addEventListener("click", function() {
  document.querySelector(".popup").style.display = "none";
});

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
