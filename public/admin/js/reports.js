const userNumber = document.getElementById("users-number");
// const animalTable = document
//   .getElementById("animals-table")
//   .getElementsByTagName("tbody")[0];

// TODO: Corregir orderin the fecha de registro

let userList;
var userTable = $("#users-table").DataTable({
  responsive: true,
  ordering: false,
  columnDefs: [
    { width: "10%", targets: 0 },
    { width: "11%", targets: 3 },
  ],
});

var animalTable = $("#animals-table").DataTable({
  responsive: true,
  order: [[1, "desc"]],
  columnDefs: [{ width: "30%", targets: 1 }],
});

function getLastWeek() {
  var today = new Date();
  var lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek;
}

function getLastMonth() {
  var today = new Date();
  var lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return lastMonth;
}

function getLastYear() {
  var today = new Date();
  var lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return lastYear;
}

function filterUsersWeek() {
  let newUserList = userList.filter(
    (user) => new Date(user.createdAt) >= getLastWeek()
  );

  userTable.clear().draw();

  newUserList.forEach(function callback(user, index) {
    let date = new Date(user.createdAt);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    userTable.row
      .add([
        index + 1,
        `${user.name} ${user.lastname}`,
        user.email,
        `${day}/${month}/${year}`,
      ])
      .draw();
  });
}

function filterUsersMonth() {
  let newUserList = userList.filter(
    (user) => new Date(user.createdAt) >= getLastMonth()
  );

  userTable.clear().draw();

  newUserList.forEach(function callback(user, index) {
    let date = new Date(user.createdAt);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    userTable.row
      .add([
        index + 1,
        `${user.name} ${user.lastname}`,
        user.email,
        `${day}/${month}/${year}`,
      ])
      .draw();
  });
}

function filterUsersYear() {
  let newUserList = userList.filter(
    (user) => new Date(user.createdAt) >= getLastYear()
  );

  userTable.clear().draw();

  newUserList.forEach(function callback(user, index) {
    let date = new Date(user.createdAt);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    userTable.row
      .add([
        index + 1,
        `${user.name} ${user.lastname}`,
        user.email,
        `${day}/${month}/${year}`,
      ])
      .draw();
  });
}

function showAllUsers() {
  userTable.clear().draw();
  userList.forEach(function callback(user, index) {
    let date = new Date(user.createdAt);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    userTable.row
      .add([
        index + 1,
        `${user.name} ${user.lastname}`,
        user.email,
        `${day}/${month}/${year}`,
      ])
      .draw();
  });
}

fetch("/reports/users")
  .then((res) => res.json())
  .then((users) => {
    userList = users;

    userNumber.innerHTML += users.length;

    users.forEach(function callback(user, index) {
      let date = new Date(user.createdAt);
      let day = date.getDate();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      userTable.row
        .add([
          users.length - index,
          `${user.name} ${user.lastname}`,
          user.email,
          `${day}/${month}/${year}`,
        ])
        .draw();
    });
  })
  .catch("Error in the request");

fetch("/reports/animals")
  .then((res) => res.json())
  .then((animals) => {
    animals.forEach((animal) => {
      animalTable.row.add([animal.name, animal.adopters]).draw();
    });
  })
  .catch("Error in the request");
