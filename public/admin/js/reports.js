// While loading, displays all users by default
window.onload = showAllUsers;
const userNumber = document.getElementById('users-number');
const loaderElements = document.getElementById("loaderElements");

let userCount;
let currentFilter = '';

var numberUserTable = $('#number-users-table').DataTable({
  responsive: true,
  searching: false,
  ordering: false,
  columnDefs: [{ width: '33%', targets: 1 }],
});

var userTable = $('#users-table').DataTable({
  responsive: true,
  ordering: false,
  columnDefs: [
    { width: '10%', targets: 0 },
    { visible: false, targets: 1 },
    { width: '11%', targets: 4 },
  ],
});

var animalTable = $('#animals-table').DataTable({
  responsive: true,
  order: [[1, 'desc']],
  columnDefs: [{ width: '30%', targets: 1 }],
});

var userMessagesTable = $('#user-messages-table').DataTable({
  responsive: true,
  order: [[2, 'desc']],
  columnDefs: [{ width: '30%', targets: 1 }],
});

var animalMessagesTable = $('#animal-messages-table').DataTable({
  responsive: true,
  order: [[1, 'desc']],
  columnDefs: [{ width: '30%', targets: 1 }],
});

var adoptionTable = $('#adoption-table').DataTable({
  responsive: true,
  ordering: false,
  columnDefs: [{ width: '25%', targets: 1 }],
});

var lastLoginsTable = $('#last-logins-table').DataTable({
  responsive: true,
  ordering: false,
  columnDefs: [{ width: '16.666%', targets: 1 }],
});

function toggleActiveFilter() {
  $('#week').addClass('btn-outline-primary').removeClass('btn-primary');
  $('#month').addClass('btn-outline-primary').removeClass('btn-primary');
  $('#year').addClass('btn-outline-primary').removeClass('btn-primary');
  $('#all').addClass('btn-outline-primary').removeClass('btn-primary');
  $(`#${currentFilter}`)
    .addClass('btn-primary')
    .removeClass('btn-outline-primary');
}

function addUsers(users) {
  users.forEach(function callback(user, index) {
    let date = new Date(user.createdAt);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    userTable.row
      .add([
        userCount - index,
        user.objectId,
        `${user.name} ${user.lastname}`,
        user.email,
        `${day}/${month}/${year}`,
      ])
      .draw();
  });
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
  if (currentFilter === 'week') return;

  currentFilter = 'week';
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastWeek()}`)
    .then((res) => res.json())
    .then((users) => {
      addUsers(users);
    })
    .catch('Error in the request');
}

function filterUsersMonth() {
  if (currentFilter === 'month') return;

  currentFilter = 'month';
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastMonth()}`)
    .then((res) => res.json())
    .then((users) => {
      addUsers(users);
    })
    .catch('Error in the request');
}

function filterUsersYear() {
  if (currentFilter === 'year') return;

  currentFilter = 'year';
  toggleActiveFilter();

  userTable.clear().draw();
  fetch(`/reports/users/${getLastYear()}`)
    .then((res) => res.json())
    .then((users) => {
      addUsers(users);
    })
    .catch('Error in the request');
}

function showAllUsers() {
  if (currentFilter === 'all') return;
  currentFilter = 'all';
  toggleActiveFilter();

  userTable.clear().draw();
  fetch('/reports/users')
    .then((res) => res.json())
    .then((users) => {
      userCount = users.length;
      const androidCount = users.reduce(
        (counter, user) => (user.platform === 'Android' ? ++counter : counter),
        0
      );
      const iosCount = users.reduce(
        (counter, user) => (user.platform === 'iOS' ? ++counter : counter),
        0
      );
      const webCount = users.reduce(
        (counter, user) =>
          user.platform === 'Pagina Web' ? ++counter : counter,
        0
      );
      const androidPorcentage = (androidCount / userCount) * 100;
      const iosPorcentage = (iosCount / userCount) * 100;
      const webPorcentage = (webCount / userCount) * 100;

      // Updates numbers of users each time the function is called
      let rowNode = numberUserTable.row
        .add(['Web', webCount, `${webPorcentage.toFixed(2)}`])
        .draw()
        .node();
      rowNode = numberUserTable.row
        .add(['iOS', iosCount, `${iosPorcentage.toFixed(2)}`])
        .draw()
        .node();
      rowNode = numberUserTable.row
        .add(['Android', androidCount, `${androidPorcentage.toFixed(2)}`])
        .draw()
        .node();
      addUsers(users);
    })
    .catch('Error in the request');
}

fetch('/reports/messages')
  .then((res) => res.json())
  .then((messages) => {
    messages.forEach((message) => {
      // Look for the current user's row
      let userRowData = userMessagesTable
        .row(`#${message.id_user.objectId}`)
        .data();
      // Look for the current animal's row
      let animalRowData = animalMessagesTable
        .row(`#${message.animal_Id.objectId}`)
        .data();

      // Handle user messages table
      if (userRowData) {
        // If the row already exists, update its comments counter
        let newData = [
          `${message.id_user.name} ${message.id_user.lastname}`,
          message.id_user.username,
          userRowData[2] + 1,
        ];
        userMessagesTable
          .row(`#${message.id_user.objectId}`)
          .data(newData)
          .draw();
      } else {
        // Add new users to the table with their comments counter set to 1
        let rowNode = userMessagesTable.row
          .add([
            `${message.id_user.name} ${message.id_user.lastname}`,
            message.id_user.username,
            1,
          ])
          .draw()
          .node();

        // Set the row ID to the user ID
        $(rowNode).attr('id', message.id_user.objectId);
      }

      // Handle animal messages table
      if (animalRowData) {
        // If the row already exists, update its comments counter
        let newData = [message.animal_Id.name, animalRowData[1] + 1];
        animalMessagesTable
          .row(`#${message.animal_Id.objectId}`)
          .data(newData)
          .draw();
      } else {
        // Add new animals to the table with their comments counter set to 1
        let rowNode = animalMessagesTable.row
          .add([message.animal_Id.name, 1])
          .draw()
          .node();

        // Set the row ID to the animal ID
        $(rowNode).attr('id', message.animal_Id.objectId);
      }
    });
  })
  .catch('Error in the request');

// Animals table
fetch('/reports/animals')
  .then((res) => res.json())
  .then((animals) => {
    animals.forEach((animal) => {
      animalTable.row.add([animal.name, animal.adopters]).draw();
    });
  })
  .catch('Error in the request');

// Adoptions table
fetch('/reports/adoptions')
  .then((res) => res.json())
  .then((adoptions) => {
    adoptions.forEach((adoption) => {
      let date = new Date(adoption.createdAt);
      let day = date.getDate();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;

      /* Some adopters have no data to display, which is why this condition
         only takes existing adopters into consideration when populating the
         adoption table.
       */
      if (adoption.adopter)
      {
        adoptionTable.row
          .add([
            `${adoption.adopter.name} ${adoption.adopter.lastname}`,
            adoption.adopter.username,
            adoption.adopted.name,
            `${day}/${month}/${year}`,
          ])
          .draw();
      }
    });

    loaderElements.classList.add("hidden");
  })
  .catch((error) => {
    console.error(`Error in the request: ${error}`);
  });

// Last logins table
fetch('/reports/users')
  .then((res) => res.json())
  .then((users) => {
    users.forEach((user) => {
      let date, dateiOS, dateAndroid, dateWeb;
      if (user.lastLogin !== undefined) {
        date = new Date(user.lastLogin.iso);
      }
      if (user.lastLoginiOS !== undefined) {
        dateiOS = new Date(user.lastLoginiOS.iso);
      }
      if (user.lastLoginAndroid !== undefined) {
        dateAndroid = new Date(user.lastLoginAndroid.iso);
      }
      if (user.lastLoginWeb !== undefined) {
        dateWeb = new Date(user.lastLoginWeb.iso);
      }

      lastLoginsTable.row
        .add([
          `${user.name} ${user.lastname}`,
          user.email,
          user.lastLogin === undefined
            ? 'N/a'
            : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          user.lastLoginiOS === undefined
            ? 'N/a'
            : `${dateiOS.getDate()}/${
                dateiOS.getMonth() + 1
              }/${dateiOS.getFullYear()}`,
          user.lastLoginAndroid === undefined
            ? 'N/a'
            : `${dateAndroid.getDate()}/${
                dateAndroid.getMonth() + 1
              }/${dateAndroid.getFullYear()}`,
          user.lastLoginWeb === undefined
            ? 'N/a'
            : `${dateWeb.getDate()}/${
                dateWeb.getMonth() + 1
              }/${dateWeb.getFullYear()}`,
        ])
        .draw();
    });
  })
  .catch('Error in the request');
