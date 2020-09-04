document.getElementById("navBar").innerHTML = `<nav
class="navbar navbar-expand-xl navbar-dark"
style="background-color: #f28f1d; border-color: #ffffff;"
>
<a class="navbar-brand mr-auto" href="index.html">
  <img
    class="navbarBtnMargins"
    src="../../img/bondu_logo_white.png"
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
  <ul class="navbar-nav ml-auto">
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

    <li class="nav-item" id="navAnimals">
      <a href="animals.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light navbarBtnMargins"
        >
          ¡Animales!
        </button></a
      >
    </li>

    <li class="nav-item">
      <a href="quienes.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light navbarBtnMargins"
        >
          ¿Quiénes somos?
        </button></a
      >
    </li>
    <li class="nav-item">
      <a href="app.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light navbarBtnMargins"
        >
          Nuestra App
        </button></a
      >
    </li>
    <li class="nav-item">
      <a
        href="contacto.html"
        style="text-decoration: none; color: white;"
      >
        <button
          type="button"
          class="btn btn-outline-light navbarBtnMargins"
        >
          Contacto
        </button></a
      >
    </li>
  </ul>
  <ul class="navbar-nav ml-auto justify-content-end">
    <li class="nav-item" id="guest">
      <a
        data-toggle="modal"
        data-target="#loginModal"
        style="text-decoration: none;"
        href="#"
      >
        <button type="button" class="btn btn-success navbarBtnMargins">
          Iniciar sesión
        </button></a
      >
      <a
        data-toggle="modal"
        data-target="#signupModal"
        style="text-decoration: none;"
        href="#"
      >
        <button type="button" class="btn btn-primary navbarBtnMargins">
          Regístrate
        </button></a
      >
    </li>

    <li class="nav-item" id="loggedIn">
      <div class="dropdown">
        <button
          class="btn btn-success dropdown-toggle navbarBtnMargins"
          type="button"
          id="dropdownProfile"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src="../../img/profileIcon.png"
            alt="profileIcon"
            height="35"
            width="35"
          />
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownProfile">
          <a class="dropdown-item" href="profile.html">Perfil</a>
          <a class="dropdown-item" id="logout">Cerrar sesión</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a
        class="navbarBtnMargins"
        data-toggle="modal"
        data-target="#faqModal"
        href="#"
      >
        <img
          src="../../img/faqIcon.png"
          alt="faqIcon"
          height="40"
          width="40"
        />
      </a>
    </li>
  </ul>
</div>
</nav>`;

/* <div class="card">
  <div class="card-header" id="headingFour">
    <h2 class="mb-0">
      <button
        class="btn btn-block text-left collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#collapseFour"
        aria-expanded="false"
        aria-controls="collapseFour"
        style="color: #f28f1d;"
      >
        <b
        >¿Cuáles son los beneficios que el animal
                          obtiene cuando hago mi contribución?</b
        >
      </button>
    </h2>
  </div>
  <div
    id="collapseFour"
    class="collapse"
    aria-labelledby="headingFour"
    data-parent="#accordionFAQ"
  >
    <div class="card-body" style="text-align: justify;">
      Los fondos serán destinados a las diferentes
      necesidades de los animales, esto puede variar según
      la especie y sus condiciones de vida. Estos
      beneficios se pueden traducir en una mejor
      alimentación, atención médica, vacunas, y mejores
      recintos.
                    </div>
  </div>
</div>
  <div class="card">
    <div class="card-header" id="headingFive">
      <h2 class="mb-0">
        <button
          class="btn btn-block text-left collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#collapseFive"
          aria-expanded="false"
          aria-controls="collapseFive"
          style="color: #f28f1d;"
        >
          <b>¿Cómo puedo hacer mi contribución?</b>
        </button>
      </h2>
    </div>
    <div
      id="collapseFive"
      class="collapse"
      aria-labelledby="headingFive"
      data-parent="#accordionFAQ"
    >
      <div class="card-body" style="text-align: justify;">
        Ve a la tienda Bondzù, busca la categoría
        Contribuciones, allí se puede encontrar toda la
        información relacionada con las contribuciones y
        nuestra campaña vigente.
                    </div>
    </div> */
