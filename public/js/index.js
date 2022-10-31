const guest = document.getElementById('guest');
const animals = document.getElementById('navAnimals');
const books = document.getElementById('navBooks');
const loggedIn = document.getElementById('loggedIn');
const cardLogin = document.getElementById('cardLogin');
const conocenos = document.getElementById('conocenos');

if (!document.cookie.includes('token')) {
  animals.style.display = 'none';
  books.style.display = 'none';
  loggedIn.style.display = 'none';
} else {
  guest.style.display = 'none';
  if (cardLogin) {
    cardLogin.style.display = 'none';
    conocenos.className = '';
  }
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  // Sets last login date
  fetch('/reports/lastLoginWeb/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: cookie.username,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

//Preloading page
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  loader.className += ' hidden';
  loader.style.display = 'none';
});
