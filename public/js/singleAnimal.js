const iframeDiv = document.getElementById("iframe-div");
const iframeElem = document.getElementById("iframe");
const animalPhotoElem = document.getElementById("animalPhoto");
const nameElem = document.getElementById("name");
const nameElemTriv = document.getElementById("nameT");
const nameElemTrivFin = document.getElementById("nameTF");
const firstQuestion = document.getElementById("firstQuestion");
const secondQuestion = document.getElementById("secondQuestion");
const thirdQuestion = document.getElementById("thirdQuestion");
const firstOption = document.getElementById("firstOption");
const secondOption = document.getElementById("secondOption");
const thirdOption = document.getElementById("thirdOption");
const fourthOption = document.getElementById("fourthOption");
const fifthOption = document.getElementById("fifthOption");
const sixthOption = document.getElementById("sixthOption");
const seventhOption = document.getElementById("seventhOption");
const eightOption = document.getElementById("eightOption");
const ninthOption = document.getElementById("ninthOption");
const triviaSuccess = document.getElementById("triviaSuccess");
const triviaRetry = document.getElementById("triviaRetry");
const triviaElem = document.getElementById("triviaElem");
const speciesElem = document.getElementById("species");
const aboutElem = document.getElementById("about");
const characteristicsElem = document.getElementById("characteristics");
const keeperElem = document.getElementById("keeper");
const adoptElem = document.getElementById("adoptButton");
const animalID = window.localStorage.getItem("currentAnimal");
const titleElem = document.getElementById("title");

const popoverAdoptElem = document.getElementById("popoverAdopt");
const showMoreElem = document.getElementById("moreinfo-btn");
const leftSideElem = document.getElementById("left-side");

const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

/**
 * Translates the given element to English and Spanish
 * @param {HTMLElement} element The HTML element whose innerText will be translated
 * @param {string} englishTranslation The element's English translation
 * @param {string} spanishTranslation The element's Spanish translation
 */

function translateElement(element, englishTranslation, spanishTranslation) {
	const language = window.localStorage.getItem("lang");
	switch (language) {
		case "en":
			element.innerText = englishTranslation;
			break;

		case "es":
		default:
			element.innerText = spanishTranslation;
			break;
	}
}

/**
 * Translates a mutual HTML element between animals and colleagues to English and Spanish
 * @param {string} distinguishingString String that indicates if the translation is targeted towards an animal or a colleague
 * @param {HTMLElement} translatedElement The mutual HTML element between animals and colleagues, whose innerText will be translated
 * @param {string} colleagueEnglishTranslation The element's English translation for colleagues
 * @param {string} colleagueSpanishTranslation The element's Spanish translation for colleagues
 * @param {string} animalEnglishTranslation The element's English translation for animals
 * @param {string} animalSpanishTranslation The element's Spanish translation for animals
 */
function translateAnimalsAndColleagues(
	distinguishingString,
	translatedElement,
	colleagueEnglishTranslation,
	colleagueSpanishTranslation,
	animalEnglishTranslation,
	animalSpanishTranslation
) {
	switch (distinguishingString) {
		case "Colega":
		case "Colleague":
			translateElement(
				translatedElement,
				colleagueEnglishTranslation,
				colleagueSpanishTranslation
			);
			break;

		default:
			translateElement(
				translatedElement,
				animalEnglishTranslation,
				animalSpanishTranslation
			);
			break;
	}
}

const adoptAnimalSpanishText = "¡Adóptame!";
const adoptAnimalEnglishText = "Adopt me!";
const followColleagueSpanishText = "¡Sígueme!";
const followColleagueEnglishText = "Follow me!";

const adoptedAnimalSpanishText = "¡Ya me adoptaste!";
const adoptedAnimalEnglishText = "You've already adopted me!";
const followedColleagueSpanishText = "¡Ya me seguiste!";
const followedColleagueEnglishText = "You've already followed me!";

fetch(`/animals/${animalID}`)
	.then((res) => res.json())
	.then((animal) => {
		let youtubeURL = "";
		//console.log("This is the animal id: ", animal.youtubeID);
		// Checks if the camera is from youtube or another page

		if (animal.youtubeID.includes("http")) {
			youtubeURL = animal.youtubeID;
			//console.log("youtubeURL");
			//console.log(youtubeURL);
		} else {
			youtubeURL = `https://www.youtube.com/embed/${animal.youtubeID}`;
			//console.log("youtubeURL");
			//console.log(youtubeURL);
		}
		iframeElem.setAttribute("src", youtubeURL);

		let chars = "";
		for (let key in animal.characteristics) {
			let temp = `<b>${key}: </b>${animal.characteristics[key]}<br>`;
			chars = chars.concat(temp);
		}

		const createButtonCertificate = (id) => {
			const buttonCertificate = document.getElementById(id);
			buttonCertificate.attributes.removeNamedItem("hidden");
			fetch(`/profile`)
				.then((res) => {
					return res.json();
				})
				.then((userInfo) => {
					const userName = userInfo.name;
					const userLastName = userInfo.lastname;

					buttonCertificate.addEventListener("click", () => {
						fetch("/certificate", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								animal: animal.name,
								userName: userName + " " + userLastName,
							}),
						})
							.then((res) => res.json())
							.then((pdfBytes) => {
								const bytesArray = new Uint8Array(
									Object.values(pdfBytes.data)
								);
								const blob = new Blob([bytesArray], {
									type: "application/pdf",
								});

								// Create a download link for the Blob
								const link = document.createElement("a");
								link.href = URL.createObjectURL(blob);
								link.download = "document.pdf"; // Specify the desired filename for the downloaded file

								// Trigger a click event on the link to start the download
								link.click();

								// Clean up the URL object
								URL.revokeObjectURL(link.href);
							})
							.catch((err) => console.log(err));
					});
				})
				.catch((err) => console.log(err));
		};

		if (animal.species == "Humanos" || animal.species == "Colega") {
			titleElem.innerText = `Bondzù: ${animal.name} | ${animal.species}`;
			animalPhotoElem.setAttribute("src", animal.profilePhoto);
			nameElem.innerText = animal.name;
			adoptElem.remove();
		} else {
			const allQ = [];
			const oneQ = [];
			for (let key in animal.questions) {
				allQ[key] = animal.questions[key];
				//console.log(allQ[key]);
				for (let elem in allQ[key]) {
					oneQ[elem] = allQ[key][elem];
					//jjconsole.log(oneQ[elem]);
				}
			}

			// Questions for the trivia
			var questions = oneQ.map((item) => item.question);
			var options = oneQ.map((item) => item.options);
			var answers = oneQ.map((item) => item.answer);
			//console.log(answers);

			titleElem.innerText = `Bondzù: ${animal.name} | ${animal.species}`;
			animalPhotoElem.setAttribute("src", animal.profilePhoto);
			nameElem.innerText = animal.name;
			nameElemTriv.innerHTML =
				"<p> Antes de que puedas adoptar al animal " +
				animal.name +
				" pondremos a prueba tu conocimiento sobre el.</p>";
			nameElemTrivFin.innerHTML =
				"<p class='mb-3'>Tras haber contestado correctamente, has adoptado a " +
				animal.name +
				"</p>";
			const buttonCertificado = document.createElement("a");
			const buttonTriviaSuccess =
				document.getElementById("trivia-success");

			buttonCertificado.setAttribute(
				"class",
				"btn btn-primary btn-lg btn-block"
			);
			buttonCertificado.setAttribute("id", "certificado-trivia");
			buttonCertificado.setAttribute("hidden", "");
			buttonCertificado.setAttribute("role", "button");
			buttonCertificado.setAttribute("data-trigger", "focus");
			buttonCertificado.setAttribute("data-placement", "top");
			buttonCertificado.setAttribute("data-html", "true");
			buttonCertificado.innerText = "Descargar certificado";
			buttonTriviaSuccess.appendChild(buttonCertificado);
			createButtonCertificate("certificado-trivia");

			firstQuestion.innerHTML = "<p>" + questions[0] + "</p>";
			firstOption.innerHTML = "<a>" + options[0][0] + "</a>";
			secondOption.innerHTML = "<a>" + options[0][1] + "</a>";
			thirdOption.innerHTML = "<a>" + options[0][2] + "</a>";

			secondQuestion.innerHTML = "<p>" + questions[1] + "</p>";
			fourthOption.innerHTML = "<a>" + options[1][0] + "</a>";
			fifthOption.innerHTML = "<a>" + options[1][1] + "</a>";
			sixthOption.innerHTML = "<a>" + options[1][2] + "</a>";

			thirdQuestion.innerHTML = "<p>" + questions[2] + "</p>";
			seventhOption.innerHTML = "<a>" + options[2][0] + "</a>";
			eightOption.innerHTML = "<a>" + options[2][1] + "</a>";
			ninthOption.innerHTML = "<a>" + options[2][2] + "</a>";

			// Valdite answers
			const submittedAnswers = [];

			firstOption.addEventListener("click", function () {
				submittedAnswers[0] = firstOption.textContent;
			});
			secondOption.addEventListener("click", function () {
				submittedAnswers[0] = secondOption.textContent;
			});
			thirdOption.addEventListener("click", function () {
				submittedAnswers[0] = thirdOption.textContent;
			});
			fourthOption.addEventListener("click", function () {
				submittedAnswers[1] = fourthOption.textContent;
			});
			fifthOption.addEventListener("click", function () {
				submittedAnswers[1] = fifthOption.textContent;
			});
			sixthOption.addEventListener("click", function () {
				submittedAnswers[1] = sixthOption.textContent;
			});
			seventhOption.addEventListener("click", function () {
				submittedAnswers[2] = seventhOption.textContent;
				const result = checkAnswers();
				if (result >= 2) {
					translateAnimalsAndColleagues(
						speciesElem.innerText,
						adoptElem,
						followedColleagueEnglishText,
						followedColleagueSpanishText,
						adoptedAnimalEnglishText,
						adoptedAnimalSpanishText
					);
					seventhOption.href = "#triviaSuccess";
					setTimeout(() => {
						adoptElem.disabled = true;
					}, 1000);
				} else {
					seventhOption.href = "#triviaRetry";
				}
			});
			eightOption.addEventListener("click", function () {
				submittedAnswers[2] = eightOption.textContent;
				const result = checkAnswers();
				if (result >= 2) {
					translateAnimalsAndColleagues(
						speciesElem.innerText,
						adoptElem,
						followedColleagueEnglishText,
						followedColleagueSpanishText,
						adoptedAnimalEnglishText,
						adoptedAnimalSpanishText
					);
					eightOption.href = "#triviaSuccess";
					setTimeout(() => {
						adoptElem.disabled = true;
					}, 1000);
				} else {
					eighthOption.href = "#triviaRetry";
				}
			});
			ninthOption.addEventListener("click", function () {
				submittedAnswers[2] = ninthOption.textContent;
				const result = checkAnswers();
				if (result >= 2) {
					translateAnimalsAndColleagues(
						speciesElem.innerText,
						adoptElem,
						followedColleagueEnglishText,
						followedColleagueSpanishText,
						adoptedAnimalEnglishText,
						adoptedAnimalSpanishText
					);
					ninthOption.href = "#triviaSuccess";
					setTimeout(() => {
						adoptElem.disabled = true;
					}, 1000);
				} else {
					ninthOption.href = "#triviaRetry";
				}
			});

			function checkAnswers() {
				const validateAnswers = (submittedAnswers) => {
					let score = 0;
					for (let i = 0; i < answers.length; i++) {
						if (answers[i] === submittedAnswers[i]) {
							score++;
						}
					}
					return score;
				};
				const result = validateAnswers(submittedAnswers);
				console.log(result);
				return result;
			}

			// Map locations
			const allLoc = [];
			for (let key in animal.location) {
				allLoc[key] = animal.location[key];
				//console.log(allLoc[key]);
			}

			var latitude = allLoc.map((item) => item.latitude);
			var longitude = allLoc.map((item) => item.longitude);
			//console.log(latitude);

			// The location of the animal
			const zoo = {
				lat: latitude[0],
				lng: longitude[0],
			};

			// Create the map, centered at gfg_office
			const map = new google.maps.Map(document.getElementById("map"), {
				// Set the zoom of the map
				zoom: 17.56,
				center: zoo,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			});

			var infowindow = new google.maps.InfoWindow();

			var marker, i;

			for (i = 0; i < latitude.length; i++) {
				var markerColor = i === 0 ? "#2690ff" : "red";
				var label = i === 0 ? 'Zoo' : 'Habitat';
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(latitude[i], longitude[i]),
					map: map,
					icon: {
						path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
						fillColor: markerColor,
						fillOpacity: 1,
						strokeWeight: 0,
						scale: 8,
					},
					label: {
						text: label,
						color: 'white', // Puedes ajustar el color del texto según tus preferencias
					  },
				});

				google.maps.event.addListener(
					marker,
					"click",
					(function (marker, i) {
						return function () {
							infowindow.setContent(latitude[i]);
							infowindow.open(map, marker);
						};
					})(marker, i)
				);
			}
		}

		/* Colleagues are not animals.
		 * Therefore, the species card is not visible on their page.
		 */
		switch (animal.species) {
			case "Colega":
			case "Colleague":
				const speciesCard =
					document.getElementsByClassName("list-group-item")[0];
				speciesCard.style.display = "none";
				break;

			default:
				speciesElem.innerText = animal.species;
				break;
		}

		aboutElem.innerText = animal.about;
		characteristicsElem.innerHTML = chars;

		/* Animals are under the custody of Keepers
		 * Colleagues are members of an Organization
		 */
		const cardTitlesNumber =
			document.getElementsByClassName("card-title").length;
		const keeperCardTitle =
			document.getElementsByClassName("card-title")[cardTitlesNumber - 1];
		translateAnimalsAndColleagues(
			animal.species,
			keeperCardTitle,
			"Organization",
			"Organización",
			"Keeper",
			"Cuidador"
		);

		keeperElem.innerText = animal.keeper;

		//Member's cards
		const createCard = (name, imageSource, description, email) => {
			//General div of the card
			let card = document.createElement("div");
			card.className = "container";
			card.style = "margin-top:18px;";
			//Div to establish the division between image and text
			let rows = document.createElement("div");
			rows.className = "row";
			card.appendChild(rows);
			//Div to create the image section column
			let imageDiv = document.createElement("div");
			imageDiv.className = "col-3";
			rows.appendChild(imageDiv);
			//Div to create the text section column
			let textDiv = document.createElement("div");
			textDiv.className = "col-9";
			rows.appendChild(textDiv);
			//Div's to set the text organization
			let text = document.createElement("div");
			text.className = "card";
			text.style = "height: 100%;";
			textDiv.appendChild(text);
			let textBody = document.createElement("div");
			textBody.className = "card-body";
			text.appendChild(textBody);

			//Name
			let nameText = document.createElement("h5");
			nameText.className = "card-title";
			nameText.textContent = name;
			textBody.appendChild(nameText);
			//Description
			let descriptionText = document.createElement("p");
			descriptionText.className = "card-text";
			descriptionText.textContent = description;
			textBody.appendChild(descriptionText);
			//Email
			let emailText = document.createElement("small");
			emailText.className = "text-muted";
			emailText.textContent = email;
			textBody.appendChild(emailText);
			//Image
			let image = document.createElement("img");
			image.className = "img-thumbnail";
			image.style = style = "height: 100%;";
			image.src = imageSource;
			imageDiv.appendChild(image);

			return card;
		};

		//Add the cards
		if (aboutElem.innerText == "[DATOS]") {
			aboutElem.innerText = "Este es el equipo de tecnologías de Bondzú.";
			characteristicsElem.innerText = "";
			adoptElem.remove();
			aboutElem.remove();
			showMoreElem.remove();
			iframeDiv.remove();

			fetch("/admin/members")
				.then((res) => res.json())
				.then((membersInfo) => {
					const members = [];
					membersInfo.forEach((elem) => {
						members.push(elem);
					});
					console.log(membersInfo);

					//Create each card (Based on the language)
					var i = 0;
					if (window.localStorage.getItem("lang") === "es") {
						for (member in members) {
							if (members[i].status == true) {
								const newCard = createCard(
									members[i].name,
									members[i].image,
									members[i].description,
									members[i].email
								);
								leftSideElem.appendChild(newCard);
							}
							i++;
						}
					} else if (window.localStorage.getItem("lang") === "en") {
						for (member in members) {
							if (members[i].status == true) {
								const newCard = createCard(
									members[i].name,
									members[i].image,
									members[i].description_en,
									members[i].email
								);
								leftSideElem.appendChild(newCard);
							}
							i++;
						}
					}
				})
				.catch("Error in the request");
		}

		if (window.localStorage.getItem("lang") === "es") {
			popoverAdoptElem.setAttribute(
				"data-content",
				`Puedes verme en tus adopciones dentro de tu <a href="profile.html">perfil</a>.`
			);
		} else if (window.localStorage.getItem("lang") === "en") {
			popoverAdoptElem.setAttribute(
				"data-content",
				`You can find me in your adoptions in your <a href="profile.html">profile</a>.`
			);
		}

		loaderElements.className += " hidden";
		body.style.overflow = "auto";

		if (animal.isAdopted) {
			translateAnimalsAndColleagues(
				animal.species,
				adoptElem,
				followedColleagueEnglishText,
				followedColleagueSpanishText,
				adoptedAnimalEnglishText,
				adoptedAnimalSpanishText
			);
			createButtonCertificate("certificado");
			adoptElem.disabled = true;
		} else {
			translateAnimalsAndColleagues(
				animal.species,
				adoptElem,
				followColleagueEnglishText,
				followColleagueSpanishText,
				adoptAnimalEnglishText,
				adoptAnimalSpanishText
			);
		}
	})
	.catch("Error in the request");

adoptElem.addEventListener("click", () => {
	const url = `/adoptions/${animalID}`;
	fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res === "Worked") {
				/*if (result >= 2){
          translateAnimalsAndColleagues(speciesElem.innerText,
            adoptElem,
            followedColleagueEnglishText,
            followedColleagueSpanishText,
            adoptedAnimalEnglishText,
            adoptedAnimalSpanishText);

          setTimeout(() => {
            adoptElem.disabled = true;
          }, 3000);
        }*/
			}
		})
		.catch("Error in the request");
});
