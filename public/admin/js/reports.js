const userNumber = document.getElementById("users-number");
const userTable = document
  .getElementById("users-table")
  .getElementsByTagName("tbody")[0];
const animalTable = document
  .getElementById("animals-table")
  .getElementsByTagName("tbody")[0];

fetch("/reports/users")
  .then((res) => res.json())
  .then((users) => {
    userNumber.innerHTML += users.length;

    users.forEach(function callback(user, index) {
      // Variables for adding rows to users table
      let newRow = userTable.insertRow();
      // User id
      let newCell = newRow.insertCell(0);
      newCell.innerHTML = `${index + 1}`;
      // User name
      newCell = newRow.insertCell(1);
      newCell.innerHTML = `${user.name} ${user.lastname}`;
      // User email
      newCell = newRow.insertCell(2);
      newCell.innerHTML = `${user.email}`;
      // User creation date
      newCell = newRow.insertCell(3);
      let date = new Date(user.createdAt);
      let day = date.getDate();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      newCell.innerHTML = `${day}/${month}/${year}`;
    });
  })
  .catch("Error in the request");

fetch("/reports/animals")
  .then((res) => res.json())
  .then((animals) => {
    animals.forEach((animal) => {
      // Variables for adding rows to animals table
      let newRow = animalTable.insertRow();
      // Animal name
      let newCell = newRow.insertCell(0);
      newCell.innerHTML = `${animal.name}`;
      // Number of adoptions
      newCell = newRow.insertCell(1);
      newCell.innerHTML = `${animal.adopters}`;
    });
  })
  .catch("Error in the request");
