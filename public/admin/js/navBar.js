document.getElementById("navBar").innerHTML = `
<style>
      .dropdown-item.active,
      .dropdown-item:active {
        color: #fff;
        background-color: #55b118;
      }
</style>

<nav
class="navbar navbar-expand-xl navbar-dark"
style="background-color: #f28f1d; border-color: #ffffff;"
>
  <a class="navbar-brand mr-auto" href="index.html">
    <img
      class="navbarBtnMargins"
      src="../img/bondu_logo_white.png"
      height="50"
      alt="navBarIcon"
    />
  </a>

  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarToggler"
    aria-controls="navbarToggler"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarToggler">

    <ul class="navbar-nav ml-auto" id="loggedIn">
      <li class="nav-item active">
        <a href="index.html" style="text-decoration: none; color: #f28f1d;">
          <button
            type="button"
            class="btn btn-light navbarBtnMargins"
            style="color: #f28f1d;"
          >
            Inicio
          </button></a
        >
      </li>
      <li class="nav-item active">
        <a href="zoos.html" style="text-decoration: none; color: #f28f1d;">
          <button
            type="button"
            class="btn btn-primary navbarBtnMargins"
          >
            Ver zoos
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="newAnimal.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Nuevo animal
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="newColleague.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Nuevo colega
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="newMember.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Nuevo miembro
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="newZoo.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Nuevo zoo
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="reports.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Reportes
          </button></a
        >
      </li>

    </ul>
    <ul class="navbar-nav ml-auto justify-content-end" id="loggedIn2">

      <li class="nav-item">
        <a href="#" style="text-decoration: none; color: white;" id="logout">
          <button
            type="button"
            class="btn btn-success navbarBtnMargins"
          >
            Cerrar sesión
          </button>
        </a>
      </li>

    </ul>
  </div>
</nav>`;