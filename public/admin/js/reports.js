fetch("/reports/users")
  .then((res) => res.json())
  .then((users) => {
    console.log(users);
  })
  .catch("Error in the request");

fetch("/reports/animals")
  .then((res) => res.json())
  .then((animals) => {
    console.log(animals);
  })
  .catch("Error in the request");
