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
    let editButton= document.createElement("a");
    editButton.className= "editButton";
    editButton.type= "button";
    editButton.style= "height: 30px; width: 30px;"
    editButton.ariaHidden= true;
    editButton.id=email;
    editButton.onclick = () => {
      window.localStorage.setItem("currentMember", editButton.id);
      window.location.href = "updateMember.html";
    }
    textBody.appendChild(editButton);

    editButton.innerHTML=
    `<svg onclick="javascript:this.id = this.parentNode.id;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48" ><path onclick="javascript:this.id = this.parentNode.id;" fill="#f28f1d" d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/><path fill="none" d="M0 0h48v48h-48z"/></svg>`;

    //Delete Button
    let deleteButton= document.createElement("a");
    deleteButton.className= "deleteButton";
    deleteButton.type= "button";
    deleteButton.style= "height: 30px; width: 30px;"
    deleteButton.ariaHidden= true;
    deleteButton.id=email;
    deleteButton.onclick = () => {
      window.localStorage.setItem("currentMember", deleteButton.id);
      console.log(deleteButton.id);
      var deleteBool = window.confirm(`Quieres eliminar a ${name} (${localStorage.currentMember})?`);
      if (deleteBool) {
        const request = {
          memberRefEmail: deleteButton.id,
          priority: "etDcoSci6K"
        };
        console.log(request);
    
        fetch("/admin/memberRemove", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        })
          .then((res) => {
            location.reload();
            successfulSaveElem.removeAttribute("style");
            buttonSpinnerElem.style.display = "none";
          })
          .catch((err) => err);
      }
    }
    textBody.appendChild(deleteButton);

    deleteButton.innerHTML=
    `<svg onclick="javascript:this.id = this.parentNode.id;" class="svg-icon" viewBox="0 0 20 20">
    <path onclick="javascript:this.id = this.parentNode.id;" fill="#ff0000" d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
  </svg>`;
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
    const newCard = createCard( members[i].name, 
                                members[i].image, 
                                members[i].description, 
                                members[i].email
                              );
    i++;
    container.appendChild(newCard);
  }

  loaderElements.className += " hidden";
  body.style.overflow = "auto";
})
.catch("Error in the request");
