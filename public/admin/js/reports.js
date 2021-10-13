// While loading, displays all users by default
window.onload = showAllUsers;
const userNumber = document.getElementById("users-number");

let userCount;
let currentFilter = "";

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

function toggleActiveFilter() {
  $("#week").addClass("btn-outline-primary").removeClass("btn-primary");
  $("#month").addClass("btn-outline-primary").removeClass("btn-primary");
  $("#year").addClass("btn-outline-primary").removeClass("btn-primary");
  $("#all").addClass("btn-outline-primary").removeClass("btn-primary");
  $(`#${currentFilter}`)
    .addClass("btn-primary")
    .removeClass("btn-outline-primary");
}

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
  if (currentFilter === "week") return;

  currentFilter = "week";
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastWeek()}`)
    .then((res) => res.json())
    .then((users) => {
      users.forEach(function callback(user, index) {
        let date = new Date(user.createdAt);
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        userTable.row
          .add([
            userCount - index,
            `${user.name} ${user.lastname}`,
            user.email,
            `${day}/${month}/${year}`,
          ])
          .draw();
      });
    })
    .catch("Error in the request");
}

function filterUsersMonth() {
  if (currentFilter === "month") return;

  currentFilter = "month";
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastMonth()}`)
    .then((res) => res.json())
    .then((users) => {
      users.forEach(function callback(user, index) {
        let date = new Date(user.createdAt);
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        userTable.row
          .add([
            userCount - index,
            `${user.name} ${user.lastname}`,
            user.email,
            `${day}/${month}/${year}`,
          ])
          .draw();
      });
    })
    .catch("Error in the request");
}

function filterUsersYear() {
  if (currentFilter === "year") return;

  currentFilter = "year";
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastYear()}`)
    .then((res) => res.json())
    .then((users) => {
      users.forEach(function callback(user, index) {
        let date = new Date(user.createdAt);
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;

        userTable.row
          .add([
            userCount - index,
            `${user.name} ${user.lastname}`,
            user.email,
            `${day}/${month}/${year}`,
          ])
          .draw();
      });
    })
    .catch("Error in the request");
}

function showAllUsers() {
  if (currentFilter === "all") return;
  currentFilter = "all";
  toggleActiveFilter();

  userTable.clear().draw();
  fetch("/reports/users")
    .then((res) => res.json())
    .then((users) => {
      userCount = users.length;
      // Updates numbers of users each time the function is called
      userNumber.innerHTML = "<strong>Número total de usuarios: </strong>";
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
}

fetch("/reports/animals")
  .then((res) => res.json())
  .then((animals) => {
    animals.forEach((animal) => {
      animalTable.row.add([animal.name, animal.adopters]).draw();
    });
  })
  .catch("Error in the request");
