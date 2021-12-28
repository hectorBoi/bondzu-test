const container = document.getElementById("containerMembers");

//Loading elements
const loaderElements = document.getElementById("loaderElements");
const body = document.getElementById("body");
body.style.overflow = "hidden";

//Member's cards
const createCard = (name, imageSource, description, email) => {
    //General div of the card
    let card= document.createElement("div");
    card.className="container"
    card.style="margin-top:18px;"
    //Div to establish the division between image and text
    let rows= document.createElement("div");
    rows.className="row";
    card.appendChild(rows);
    //Div to create the image section column
    let imageDiv= document.createElement("div");
    imageDiv.className="col-3";
    rows.appendChild(imageDiv);
    //Div to create the text section column
    let textDiv= document.createElement("div");
    textDiv.className="col-9";
    rows.appendChild(textDiv);
    //Div's to set the text organization
    let text= document.createElement("div");
    text.className="card";
    text.style="height: 100%;"
    textDiv.appendChild(text);
    let textBody= document.createElement("div");
    textBody.className="card-body";
    text.appendChild(textBody);

    //Name
    let nameText= document.createElement("h5");
    nameText.className="card-title";
    nameText.textContent=name;
    nameText.style="display: inline-block; margin-right: 10px;"
    textBody.appendChild(nameText);
    //Edit button
    let editButton= document.createElement("button");
    editButton.className= "btn btn-outline-warning waves-effect px-3";
    editButton.type= "button";
    editButton.style= "height: 30px; width: 30px;"
    editButton.ariaHidden= true;
    editButton.id=email;
    textBody.appendChild(editButton);
    let editIcon= document.createElement("i");
    editIcon.className= "bi bi-pencil-square";
    editIcon.ariaHidden= true;
    editButton.appendChild(editIcon);
    //Description
    let descriptionText= document.createElement("p");
    descriptionText.className="card-text";
    descriptionText.textContent=description;
    textBody.appendChild(descriptionText);
    //Email
    let emailText= document.createElement("small");
    emailText.className="text-muted";
    emailText.textContent=email;
    textBody.appendChild(emailText);
    //Image
    let image= document.createElement("img");
    image.className="img-thumbnail";
    image.style=style="height: 100%;"
    image.src=imageSource;
    imageDiv.appendChild(image)

    return card
}

//Add the cards
fetch("/admin/members")
.then((res) => res.json())
.then((membersInfo) => {
  const members = [];
  membersInfo.forEach((elem) => {
      members.push(elem);
  });
  //console.log(membersInfo);

  var i = 0;
  for (member in members) {
    const newCard = createCard(members[i].name, `../img/${members[i].animal}.jpg`, members[i].description, members[i].email);
    i++;
    container.appendChild(newCard);
  }

  loaderElements.className += " hidden";
  body.style.overflow = "auto";
})
.catch("Error in the request");

window.onclick = (event) => {
    if (event.target.id) {
      window.localStorage.setItem("currentMember", event.target.id);
      window.location.href = "updateMember.html";
    }
  };