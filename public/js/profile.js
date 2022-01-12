// Only allows access to users which have a session
if (!document.cookie.includes('token')) {
  location.replace('/');
}

const nameElem = document.getElementById('name');
const lastnameElem = document.getElementById('lastname');
const usertypeElem = document.getElementById('usertype');
const usernameElem = document.getElementById('username');
const profilePhotoElem = document.getElementById('profilePhoto');
const profilePhotoModElem = document.getElementById('profilePhotoMod');

const loaderElements = document.getElementById('loaderElements');

// To modify the user
const newProfilepicElem = document.getElementById('newProfilepic');
const newNameElem = document.getElementById('newName');
const newLastNameElem = document.getElementById('newLastName');
const newPasswordElem = document.getElementById('newPassword');
const newPasswordConfirmElem = document.getElementById('newPasswordConfirm');
const updateProfileElem = document.getElementById('updateProfile');
const noMatchPasswords = document.getElementById('noMatchPasswords');

fetch(`/profile`)
  .then((res) => {
    return res.json();
  })
  .then((userInfo) => {
    nameElem.innerText = userInfo.name;
    lastnameElem.innerText = userInfo.lastname;
    usertypeElem.innerText = userInfo.usertype;
    usernameElem.innerText = userInfo.username;
    if (userInfo.photo) {
      profilePhotoElem.setAttribute('src', userInfo.photo);
      profilePhotoModElem.setAttribute('src', userInfo.photo);
    }
    loaderElements.className += ' hidden';
  })
  .catch((err) => console.log(err));

updateProfileElem.addEventListener('click', () => {
  const newName = newNameElem.value;
  const newLastname = newLastNameElem.value;
  const newPassword = newPasswordElem.value;
  const newPasswordConfirm = newPasswordConfirmElem.value;

  let request = {
    lang: window.localStorage.getItem('lang'),
    Nname: newName,
    Nlastname: newLastname,
    Npassword: newPassword,
  };

  if (newPasswordConfirm === newPassword) {
    fetch('/profile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.token);
        // document.cookie =
        //   "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        // document.cookie = `token=${res.token}; path=/`;
        location.replace('profile.html');
      })
      .catch((err) => err);
  } else {
    newPasswordConfirmElem.className = 'form-control is-invalid';
    noMatchPasswords.removeAttribute('style');
  }
});

// To interact with the adoptions
const adoptionsContainerElem = document.getElementById('adoptionsContainer');
const showAdoptionsElem = document.getElementById('showAdoptions');
const container = document.getElementById('container');
const headerAdoptions = document.getElementById('alertAdoptions');

const backTopElem = document.getElementById('backTop');
backTopElem.style.display = 'none';

const createDiv = (className, id) => {
  let div = document.createElement('div');
  div.className = className;
  if (id) {
    div.setAttribute('id', id);
  }
  return div;
};

const createButton = (location) => {
  let div = createDiv('card bg-dark text-white');
  //div.setAttribute("type", "button");
  div.style.margin = '20px';
  //div.setAttribute("onclick", `window.location.href='singleAnimal.html'`);
  return div;
};

const createImage = (url) => {
  let img = document.createElement('img');
  img.setAttribute('src', url);
  img.className = 'card-img img-fluid';
  img.setAttribute('alt', 'animal');
  //img.style.width = "500px";
  img.style.height = '300px';
  return img;
};

const createTitle = (title) => {
  let h5 = document.createElement('h5');
  h5.className = 'card-title';

  let span = document.createElement('span');
  span.className = 'animalCardHeader';
  span.innerHTML = title;

  h5.appendChild(span);
  return h5;
};

const createRow = () => {
  let div = document.createElement('div');
  div.className = 'row row-cols-1 row-cols-lg-2 row-cols-xl-4';
  return div;
};

const createCard = (object) => {
  //console.log(object);
  const col = createDiv('col-xl');
  const anchor = document.createElement('a');
  anchor.setAttribute('id', object.id);
  anchor.href = 'singleAnimal.html';
  anchor.onclick = function () {
    window.localStorage.setItem('currentAnimal', object.objectId);
  };
  col.appendChild(anchor);
  const button = createButton(object.id);
  anchor.appendChild(button);
  console.log(object);
  const photoUrl = object.profilePhoto.url.replace(
    'http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com:80/',
    'https://d36skj58da74xm.cloudfront.net/'
  );
  const img = createImage(photoUrl);
  button.appendChild(img);
  const div = createDiv('card-img-overlay', object.id);
  const h5 = createTitle(object.name);
  div.appendChild(h5);
  button.appendChild(div);
  return col;
};

showAdoptionsElem.addEventListener('click', () => {
  adoptionsContainerElem.style.display = '';
  backTopElem.style.display = '';
  if (container.innerHTML === '') {
    //console.log(username.innerHTML);
    fetch(`/adoptions/${username.innerHTML}`)
      .then((res) => res.json())
      .then((animals) => {
        if (animals.length !== 0) {
          let count = 0;
          let row = createRow();

          showAdoptionsElem.disable = true;

          if (window.localStorage.getItem('lang') === 'es') {
            headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">Tus adopciones</h4>`;
          } else if (window.localStorage.getItem('lang') === 'en') {
            headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">Your adoptions</h4>`;
          }

          headerAdoptions.className = 'alert alert-success';
          animals.sort(compareNames);

          for (animal of animals) {
            let col = createCard(animal.adopted);
            row.appendChild(col);
            count++;
            if (
              (count > 0 && count % 4 === 0) ||
              (count === animals.length && animals.length % 4 !== 0)
            ) {
              container.appendChild(row);
              row = createRow();
            }
          }
        } else {
          if (window.localStorage.getItem('lang') === 'es') {
            headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">Aún no tienes adopciones. <a href="animals.html">¡Ve a adoptar! <a/></h4>`;
          } else if (window.localStorage.getItem('lang') === 'en') {
            headerAdoptions.innerHTML = `<h4 class="alert-heading text-center">You do not have adoptions yet. <a href="animals.html"> Go and adopt!<a/></h4>`;
          }

          headerAdoptions.className = 'alert alert-danger';
        }
      })
      .catch('Error in the request');
  }
  showClass = showAdoptionsElem.className;
  if (showAdoptionsElem.className.includes('hide')) {
    showAdoptionsElem.className = 'btn btn-success';
    showAdoptionsElem.className = showAdoptionsElem.className.substr(
      0,
      showClass.length - 6
    );
    adoptionsContainerElem.style.display = 'none';
    backTopElem.style.display = 'none';

    if (window.localStorage.getItem('lang') === 'es') {
      showAdoptionsElem.innerText = 'Tus adopciones';
    } else if (window.localStorage.getItem('lang') === 'en') {
      showAdoptionsElem.innerText = 'Your adoptions';
    }
  } else {
    showAdoptionsElem.className += 'btn btn-info';
    showAdoptionsElem.className += '  hide';

    if (window.localStorage.getItem('lang') === 'es') {
      showAdoptionsElem.innerText = 'Ocultar tus adopciones';
    } else if (window.localStorage.getItem('lang') === 'en') {
      showAdoptionsElem.innerText = 'Hide your adoptions';
    }
  }
});

window.onclick = (event) => {
  if (event.target.id) {
    window.localStorage.setItem('currentAnimal', event.target.id);
  }
};

const formTest = document.getElementById('formTest');
const submitPhoto = document.getElementById('newProfilepic');
const formPhoto = document.getElementById('submitPhoto');
submitPhoto.addEventListener('change', () => {
  formPhoto.className = 'btn btn-success';
  formPhoto.disabled = false;

  if (window.localStorage.getItem('lang') === 'es') {
    formPhoto.value = 'Actualizar foto';
  } else if (window.localStorage.getItem('lang') === 'en') {
    formPhoto.value = 'Update photo';
  }
});

function compareNames(animal1, animal2) {
  if (animal1.name < animal2.name) {
    return -1;
  }
  if (animal1.name > animal2.name) {
    return 1;
  }
  return 0;
}
