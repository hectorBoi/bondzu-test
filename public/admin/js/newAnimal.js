const submitSaveElem = document.getElementById("save");
const missingInfoElem = document.getElementById("missingInfo");
const buttonSpinnerElem = document.getElementById("buttonSpinner");
const successfulSaveElem = document.getElementById("successfulSave");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

// Location dynamic
const addFieldsButton = document.getElementById("addFieldsButton");
const fieldsContainer = document.getElementById("fieldsContainer");

let fieldsCounter = 0;
addFieldsButton.addEventListener("click", function () {
  fieldsCounter++;

  const newFields = `
    <div class="form-group">
      <b><label>Latitud ${fieldsCounter}</label></b>
      <input
        id="latitude${fieldsCounter}"
        class="form-control is-invalid"
        aria-describedby="validatedInputGroupPrepend"
        required
      />
      <b><label>Longitud ${fieldsCounter}</label></b>
      <input
        id="longitude${fieldsCounter}"
        class="form-control is-invalid"
        aria-describedby="validatedInputGroupPrepend"
        required
      />
      <b><label>Tipo de lugar ${fieldsCounter}</label></b>
      <input
        id="type${fieldsCounter}"
        class="form-control is-invalid"
        aria-describedby="validatedInputGroupPrepend"
        required
      />
      
      ${fieldsContainer.childElementCount === fieldsCounter ? '<button type="button" class="btn btn-danger mt-1 deleteFieldsButton">Eliminar</button>' : ''}
    </div>
  `;

  const newFieldsWrapper = document.createElement("div");
  newFieldsWrapper.innerHTML = newFields.trim();
  //fieldsContainer.appendChild(newFieldsWrapper.firstChild);


   // Elimina los botones de eliminar de los bloques anteriores
  const deleteButtons = document.querySelectorAll(".deleteFieldsButton");
  deleteButtons.forEach(function (button) {
    button.remove();
  });

  fieldsContainer.appendChild(newFieldsWrapper.firstChild);

  const newDeleteButton = document.querySelector(".deleteFieldsButton");

  newDeleteButton && newDeleteButton.addEventListener("click", function () {
    fieldsCounter--;
    newDeleteButton.parentElement.remove();
  });
});








//Datos únicos
const youtubeIdElem = document.getElementById("youtubeId");
const animalPhotoElem = document.getElementById("animalPhoto");
const statusElem = document.getElementById("status");

//Datos en español
const apodoElem = document.getElementById("apodo");
const especieElem = document.getElementById("especie");
const acercaElem = document.getElementById("acerca");
const nombreCientElem = document.getElementById("nomCient");
const estadoConElem = document.getElementById("estadoCon");
const distGeoElem = document.getElementById("distGeo");
const habitatEspElem = document.getElementById("habitatEsp");
const dietaElem = document.getElementById("dieta");
const reproduccionElem = document.getElementById("reproduccion");
const fichaNombreCienElem = document.getElementById("fichaNomCient");
const fichaEstadoConElem = document.getElementById("fichaEstadoCon");
const fichaDistGeoElem = document.getElementById("fichaDistGeo");
const fichaHabitatEspElem = document.getElementById("fichaHabitatEsp");
const fichaDietaElem = document.getElementById("fichaDieta");
const fichaReproduccionElem = document.getElementById("fichaReproduccion");
const referenciasElem = document.getElementById("referencias");

//English data
const nicknameElem = document.getElementById("nickname");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const scieNameElem = document.getElementById("scieName");
const conStatusElem = document.getElementById("conStatus");
const geoDistElem = document.getElementById("geoDist");
const habitatEngElem = document.getElementById("habitatEng");
const dietElem = document.getElementById("diet");
const reproductionElem = document.getElementById("reproduction");
const technicalScieNameElem = document.getElementById("technicalScieName");
const technicalConStatusElem = document.getElementById("technicalConStatus");
const technicalGeoDistElem = document.getElementById("technicalGeoDist");
const technicalHabitatEngElem = document.getElementById("technicalHabitatEng");
const technicalDietElem = document.getElementById("technicalDiet");
const technicalReproductionElem = document.getElementById(
  "technicalReproduction"
);
const referencesElem = document.getElementById("references");

//Quiz Español
const preguntaUnoElem = document.getElementById("preguntaUno");
const preguntaUnoRespuestaUnoElem = document.getElementById("preguntaUnoRespuestaUno");
const preguntaUnoRespuestaDosElem = document.getElementById("preguntaUnoRespuestaDos");
const preguntaUnoRespuestaTresElem = document.getElementById("preguntaUnoRespuestaTres");
const preguntaDosElem = document.getElementById("preguntaDos");
const preguntaDosRespuestaUnoElem = document.getElementById("preguntaDosRespuestaUno");
const preguntaDosRespuestaDosElem = document.getElementById("preguntaDosRespuestaDos");
const preguntaDosRespuestaTresElem = document.getElementById("preguntaDosRespuestaTres");
const preguntaTresElem = document.getElementById("preguntaTres");
const preguntaTresRespuestaUnoElem = document.getElementById("preguntaTresRespuestaUno");
const preguntaTresRespuestaDosElem = document.getElementById("preguntaTresRespuestaDos");
const preguntaTresRespuestaTresElem = document.getElementById("preguntaTresRespuestaTres");

//English Quiz
const questionOneElem = document.getElementById("questionOne");
const questionOneAnswerOneElem = document.getElementById("questionOneAnswerOne");
const questionOneAnswerTwoElem = document.getElementById("questionOneAnswerTwo");
const questionOneAnswerThreeElem = document.getElementById("questionOneAnswerThree");
const questionTwoElem = document.getElementById("questionTwo");
const questionTwoAnswerOneElem = document.getElementById("questionTwoAnswerOne");
const questionTwoAnswerTwoElem = document.getElementById("questionTwoAnswerTwo");
const questionTwoAnswerThreeElem = document.getElementById("questionTwoAnswerThree");
const questionThreeElem = document.getElementById("questionThree");
const questionThreeAnswerOneElem = document.getElementById("questionThreeAnswerOne");
const questionThreeAnswerTwoElem = document.getElementById("questionThreeAnswerTwo");
const questionThreeAnswerThreeElem = document.getElementById("questionThreeAnswerThree");

//Keepers
const allKeepersElem = document.getElementById("allKeepers");

const createSelectKeepers = (array, form) => {
  for (let i = 0; i < array.length; i++) {
    let keeper = array[i];
    //console.log(keeper);

    const option = document.createElement("option");
    option.setAttribute("value", keeper.id);
    option.innerText = keeper.name;

    form.appendChild(option);
  }
};

function obtenerValores() {
  const data = [];

  for (let i = 0; i <= fieldsCounter; i++) {
    const preLatitude = document.getElementById(`latitude${i}`).value;
    const preLongitude = document.getElementById(`longitude${i}`).value;
    const type = document.getElementById(`type${i}`).value;
    const latitude = parseFloat(preLatitude);
    const longitude = parseFloat(preLongitude);

    data.push({ latitude, longitude, type });
  }

  const jsonData = JSON.stringify(data);
  return jsonData;
  //console.log(jsonData);
}


// Get all the keepers for selection
console.log("making the request");
fetch("/admin/animals/keepers")
  .then((res) => res.json())
  .then((info) => {
    createSelectKeepers(info.allKeepers, allKeepersElem);
    loaderElements.className += " hidden";
    body.style.overflow = "auto";
  })
  .catch((err) => console.log(err));

submitSaveElem.addEventListener("click", () => {
  missingInfoElem.style.display = "none";
  successfulSaveElem.style.display = "none";

  //locations
  const locationSelected = obtenerValores();
  //Información única
  const status = statusElem.checked;
  const youtubeId = youtubeIdElem.value;
  const keeper = allKeepersElem.options[allKeepersElem.selectedIndex].value;

  //Información español
  const apodo = apodoElem.value;
  const especie = especieElem.value;
  const acerca = acercaElem.value;
  const nombreCient = nombreCientElem.value;
  const estadoCon = estadoConElem.value;
  const distGeo = distGeoElem.value;
  const habitatEsp = habitatEspElem.value;
  const dieta = dietaElem.value;
  const reproduccion = reproduccionElem.value;
  const fichaNombreCient = fichaNombreCienElem.value;
  const fichaEstadoCon = fichaEstadoConElem.value;
  const fichaDistGeo = fichaDistGeoElem.value;
  const fichaHabitatEsp = fichaHabitatEspElem.value;
  const fichaDieta = fichaDietaElem.value;
  const fichaReproduccion = fichaReproduccionElem.value;
  const referencias = referenciasElem.value;

  //English information
  const nickname = nicknameElem.value;
  const species = speciesElem.value;
  const about = aboutElem.value;
  const scieName = scieNameElem.value;
  const conStatus = conStatusElem.value;
  const geoDist = geoDistElem.value;
  const habitatEng = habitatEngElem.value;
  const diet = dietElem.value;
  const reproduction = reproductionElem.value;
  const technicalScieName = technicalScieNameElem.value;
  const technicalConStatus = technicalConStatusElem.value;
  const technicalGeoDist = technicalGeoDistElem.value;
  const technicalHabitatEng = technicalHabitatEngElem.value;
  const technicalDiet = technicalDietElem.value;
  const technicalReproduction = technicalReproductionElem.value;
  const references = referencesElem.value;

  //References
  const referencesArray = references.split("\n");
  const referencesArreglo = referencias.split("\n");

  //Quiz Español
  const preguntaUno = preguntaUnoElem.value;
  const preguntaUnoRespuestaUno = preguntaUnoRespuestaUnoElem.value;
  const preguntaUnoRespuestaDos = preguntaUnoRespuestaDosElem.value;
  const preguntaUnoRespuestaTres = preguntaUnoRespuestaTresElem.value;
  const preguntaDos = preguntaDosElem.value;
  const preguntaDosRespuestaUno = preguntaDosRespuestaUnoElem.value;
  const preguntaDosRespuestaDos = preguntaDosRespuestaDosElem.value;
  const preguntaDosRespuestaTres = preguntaDosRespuestaTresElem.value;
  const preguntaTres = preguntaTresElem.value;
  const preguntaTresRespuestaUno = preguntaTresRespuestaUnoElem.value;
  const preguntaTresRespuestaDos = preguntaTresRespuestaDosElem.value;
  const preguntaTresRespuestaTres = preguntaTresRespuestaTresElem.value;

  //English Quiz
  const questionOne = questionOneElem.value;
  const questionOneAnswerOne = questionOneAnswerOneElem.value;
  const questionOneAnswerTwo = questionOneAnswerTwoElem.value;
  const questionOneAnswerThree = questionOneAnswerThreeElem.value;
  const questionTwo = questionTwoElem.value;
  const questionTwoAnswerOne = questionTwoAnswerOneElem.value;
  const questionTwoAnswerTwo = questionTwoAnswerTwoElem.value;
  const questionTwoAnswerThree = questionTwoAnswerThreeElem.value;
  const questionThree = questionThreeElem.value;
  const questionThreeAnswerOne = questionThreeAnswerOneElem.value;
  const questionThreeAnswerTwo = questionThreeAnswerTwoElem.value;
  const questionThreeAnswerThree = questionThreeAnswerThreeElem.value;

  if (
    youtubeId != "" &&
    apodo != "" &&
    especie != "" &&
    acerca != "" &&
    nombreCient != "" &&
    estadoCon != "" &&
    distGeo != "" &&
    habitatEsp != "" &&
    dieta != "" &&
    reproduccion != "" &&
    fichaNombreCient != "" &&
    fichaEstadoCon != "" &&
    fichaDistGeo != "" &&
    fichaHabitatEsp != "" &&
    fichaDieta != "" &&
    fichaReproduccion != "" &&
    referencesArreglo != "" &&
    nickname != "" &&
    species != "" &&
    about != "" &&
    scieName != "" &&
    conStatus != "" &&
    geoDist != "" &&
    habitatEng != "" &&
    diet != "" &&
    reproduction != "" &&
    technicalScieName != "" &&
    technicalConStatus != "" &&
    technicalGeoDist != "" &&
    technicalHabitatEng != "" &&
    technicalDiet != "" &&
    technicalReproduction != "" &&
    referencesArray != "" &&
    keeper != "" &&
    preguntaUno != "" &&
    preguntaUnoRespuestaUno != "" &&
    preguntaUnoRespuestaDos != "" &&
    preguntaUnoRespuestaTres != "" &&
    preguntaDos != "" &&
    preguntaDosRespuestaUno != "" &&
    preguntaDosRespuestaDos != "" &&
    preguntaDosRespuestaTres != "" &&
    preguntaTres != "" &&
    preguntaTresRespuestaUno != "" &&
    preguntaTresRespuestaDos != "" &&
    preguntaTresRespuestaTres != "" &&
    questionOne != "" &&
    questionOneAnswerOne != "" &&
    questionOneAnswerTwo != "" &&
    questionOneAnswerThree != "" &&
    questionTwo != "" &&
    questionTwoAnswerOne != "" &&
    questionTwoAnswerTwo != "" &&
    questionTwoAnswerThree != "" &&
    questionThree != "" &&
    questionThreeAnswerOne != "" &&
    questionThreeAnswerTwo != "" &&
    questionThreeAnswerThree != "" &&
    location != ""
  ) {
    buttonSpinnerElem.removeAttribute("style");

    

    //Características español
    const caracteristicas = {
      "Nombre científico": nombreCient,
      "Estado de conservación": estadoCon,
      "Distribución geográfica": distGeo,
      Hábitat: habitatEsp,
      Dieta: dieta,
      Reproducción: reproduccion,
    };

    //English characteristics
    const characteristics = {
      "Scientific name": scieName,
      "Conservation status": conStatus,
      "Geographical distribution": geoDist,
      Habitat: habitatEng,
      Diet: diet,
      Reproduction: reproduction,
    };

    //Ficha tecnica
    const fichaTecnica = {
      "Nombre científico": fichaNombreCient,
      "Estado de conservación": fichaEstadoCon,
      "Distribución geográfica": fichaDistGeo,
      Hábitat: fichaHabitatEsp,
      Dieta: fichaDieta,
      Reproducción: fichaReproduccion,
      Referencias: referencesArreglo,
    };

    const fichaTecnica_en = {
      "Scientific name": technicalScieName,
      "Estado de conservación": fichaEstadoCon,
      "Geographical distribution": technicalGeoDist,
      Habitat: technicalHabitatEng,
      Diet: technicalDiet,
      Reproduction: technicalReproduction,
      References: referencesArray,
    };

    const quizEsp = {
      PreguntaUno: preguntaUno,
      PreguntaUnoRespuestaUno: preguntaUnoRespuestaUno,
      PreguntaUnoRespuestaDos: preguntaUnoRespuestaDos,
      PreguntaUnoRespuestaTres: preguntaUnoRespuestaTres,
      PreguntaDos: preguntaDos,
      PreguntaDosRespuestaUno: preguntaDosRespuestaUno,
      PreguntaDosRespuestaDos: preguntaDosRespuestaDos,
      PreguntaDosRespuestaTres: preguntaDosRespuestaTres,
      PreguntaTres: preguntaTres,
      PreguntaTresRespuestaUno: preguntaTresRespuestaUno,
      PreguntaTresRespuestaDos: preguntaTresRespuestaDos,
      PreguntaTresRespuestaTres: preguntaTresRespuestaTres,
    };

    const quizEng = {
      QuestionOne: questionOne,
      QuestionOneAnswerOne: questionOneAnswerOne,
      QuestionOneAnswerTwo: questionOneAnswerTwo,
      QuestionOneAnswerThree: questionOneAnswerThree,
      QuestionTwo: questionTwo,
      QuestionTwoAnswerOne: questionTwoAnswerOne,
      QuestionTwoAnswerTwo: questionTwoAnswerTwo,
      QuestionTwoAnswerThree: questionTwoAnswerThree,
      QuestionThree: questionThree,
      QuestionThreeAnswerOne: questionThreeAnswerOne,
      QuestionThreeAnswerTwo: questionThreeAnswerTwo,
      QuestionThreeAnswerThree: questionThreeAnswerThree,
    };

    const request = {
      name: apodo,
      name_en: nickname,
      about: acerca,
      about_en: about,
      characteristics: caracteristicas,
      characteristics_en: characteristics,
      technicalData: fichaTecnica,
      technicalData_en: fichaTecnica_en,
      species: especie,
      species_en: species,
      quiz: quizEsp,
      quiz_en: quizEng,
      locations: locationSelected,
      youtubeID: youtubeId,
      keeper: keeper,
      isActive: status,
      priority: "etDcoSci6K",
    };

    //console.log(request);

    fetch("/admin/animals", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => location.replace("/admin/index.html"))
      .then((res) => {
        location.replace("/admin/index.html");
        successfulSaveElem.removeAttribute("style");
        buttonSpinnerElem.style.display = "none";
      })
      .catch((err) => err);
  } else {
    missingInfoElem.removeAttribute("style");
  }
});
