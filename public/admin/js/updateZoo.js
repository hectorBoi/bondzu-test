const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

const zooID = window.localStorage.getItem("currentZoo");
const titleElem = document.getElementById("title");

const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const imageElem = document.getElementById("zooPhoto");

//Datos zoo
const nameElem = document.getElementById("zooName");
const photoUrlElem = document.getElementById("photoLink");
const pageElem = document.getElementById("pageLink");
const locationElem = document.getElementById("location");

console.log(zooID)

fetch(`/admin/zoos/${zooID}`)
  .then((res) => res.json())
  .then((zoo_info) => {
    console.log(zoo_info)
    titleElem.innerText = `Actualizar: ${zoo_info.name}`;
    imageElem.setAttribute("src", zoo_info.photoUrl);

    //Nombre
    nameElem.setAttribute("value", zoo_info.name);
    photoUrlElem.setAttribute("value", zoo_info.photoUrl);
    pageElem.setAttribute("value", zoo_info.description);
    locationElem.setAttribute("value", zoo_info.location);


    // loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch("Error in the request");

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const name = nameElem.value;
  const photoUrl = photoUrlElem.value;
  const page = pageElem.value;
  const location = locationElem.value;

  if (
    name != "" &&
    photoUrl != "" &&
    page != "" &&
    location != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    const request = {
      name: name,
      photoUrl: photoUrl,
      description: page,
      location: location,
    };

    fetch(`/admin/zoo/${zooID}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((res) => {
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});

