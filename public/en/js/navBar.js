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
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a href="index.html" style="text-decoration: none; color: #f28f1d;">
          <button
            type="button"
            class="btn btn-light navbarBtnMargins"
            style="color: #f28f1d;"
          >
            Home
          </button></a
        >
      </li>

      <li class="nav-item" id="navAnimals">
        <a href="animals.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Animals!
          </button></a
        >
      </li>

      <li class="nav-item" id="navAnimals">
        <a href="books.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Books
          </button></a
        >
      </li>

      <li class="nav-item">
        <a href="quienes.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            About us
          </button></a
        >
      </li>
      <li class="nav-item">
        <a href="app.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
          Our App
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
            Contact
          </button></a
        >
      </li>
      <li class="nav-item">
        <a
          href="#"
          style="text-decoration: none; color: white;"
        >
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Store
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
          <button type="button" class="btn btn-success navbarBtnLoginSignup">
          Log in
          </button></a
        >
        <a
          data-toggle="modal"
          data-target="#signupModal"
          style="text-decoration: none;"
          href="#"
        >
          <button type="button" class="btn btn-primary navbarBtnLoginSignup">
          Sign up
          </button></a
        >
      </li>

      <li class="nav-item" id="loggedIn">
        <div class="btn-group">
          <button type="button"
          id="dropdownProfile"
          class="btn btn-success dropdown-toggle navbarBtnProfile"
          data-toggle="dropdown"
          data-display="static"
          aria-haspopup="true"
          aria-expanded="false">
            <img
            src="../img/profileIcon.png"
            alt="profileIcon"
            height="30"
            width="30"
            />
          </button>
          <div class="dropdown-menu dropdown-menu-lg-right">
            <a class="dropdown-item" href="profile.html">Profile</a>
            <a class="dropdown-item" id="logout">Log out</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <div class="btn-group">
          <button
          type="button"
          class="btn dropdown-toggle navbarBtnFlags"
          data-toggle="dropdown"
          data-display="static"
          aria-haspopup="true"
          aria-expanded="false">
            <img
            id="currLang"
            alt="Idioma"
            height="50"
            width="50"
            />
          </button>
          <div class="dropdown-menu dropdown-menu-lg-right">
            <a class="dropdown-item" id="esp"><img src="../img/mxFlag.png" alt="Bandera México" height="35" width="35"/> Español</a>
            <a class="dropdown-item" id="eng"><img src="../img/ukFlag.png" alt="UK flag" height="35" width="35"/> English</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <button
        type="button"
        class="btn navbarBtnMargins"
        data-toggle="modal"
        data-target="#faqModal"
        href="#"
        >
          <img
            src="../img/faqIcon.png"
            alt="faqIcon"
            height="50"
            width="50"
          />
        </button>
      </li>

    </ul>
  </div>
</nav>`;
