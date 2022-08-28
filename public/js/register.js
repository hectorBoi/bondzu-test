const nameElem = document.getElementById('nameReg');
const lastnameElem = document.getElementById('lastnameReg');
const usertypeElem = document.getElementById('usertypeReg');
const emailElem = document.getElementById('emailReg');
const passwordElem = document.getElementById('passwordReg');
const passwordConfElem = document.getElementById('passwordRegConf');
const submitElem = document.getElementById('submitReg');

const existingUser = document.getElementById('existingUser');
const noMatchPasswords = document.getElementById('noMatchPasswords');
const missingInputs = document.getElementById('missingInputs');

submitElem.addEventListener('click', () => {
  const name = dataCleaner(nameElem.value);
  const lastname = dataCleaner(lastnameElem.value);
  //const usertype = usertypeElem.options[usertypeElem.selectedIndex].value;
  const email = dataCleaner(emailElem.value);
  const password = dataCleaner(passwordElem.value);
  const passwordConf = dataCleaner(passwordConfElem.value);

  existingUser.style.display = 'none';
  noMatchPasswords.style.display = 'none';
  missingInputs.style.display = 'none';

  if (
    name != '' &&
    lastname != '' &&
    email != '' &&
    password != '' &&
    passwordConf != ''
  ) {
    if (passwordConf === password) {
      fetch('/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
          // userType: usertype,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            const { token, userType, username, userID } = res;
            document.cookie = `username=${username}; path=/;`;
            document.cookie = `token=${token}; path=/`;
            document.cookie = `usertype=${userType}; path=/`;
            document.cookie = `userid=${userID}; path=/`;
            location.replace('/');
          }
          if (res === 'Already registered') {
            existingUser.removeAttribute('style');
          }
        })
        .catch((err) => {
          if (err.code === 101) {
            alert(err.message);
          }
        });
    } else {
      noMatchPasswords.removeAttribute('style');
    }
  } else {
    missingInputs.removeAttribute('style');
  }
});
