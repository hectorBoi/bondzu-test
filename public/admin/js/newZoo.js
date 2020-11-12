const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

//Datos únicos
const zooNameElem = document.getElementById("zooName");
const photoLinkElem = document.getElementById("photoLink");
const pageElem = document.getElementById("page");
const locationElem = document.getElementById("location");

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //Información única
  const zooName = zooNameElem.value;
  const photoLink = photoLinkElem.value;
  const page = pageElem.value;
  const location = locationElem.value;

  if (
    zooName != "" &&
    photoLink != "" &&
    page != "" &&
    location != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    const request = {
      name: zooName,
      photoUrl: photoLink,
      description: page,
      location: location
    };

    //console.log(request);

    fetch("/admin/zoo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        window.location.replace("/admin/index.html")
      })
      .then((res) => {
        console.log("before replace")
        window.location.replace("/admin/index.html");
        console.log("after replace")
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});
