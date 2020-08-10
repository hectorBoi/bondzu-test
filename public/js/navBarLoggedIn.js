document.getElementById("navBarLog").innerHTML = ` 
<nav
id="navBarNoLog"
class="navbar navbar-expand-xl navbar-dark"
style="background-color: #f28f1d; border-color: #ffffff;"
>
<a class="navbar-brand mr-auto" href="index.html">
  <img
    class="navBarIcon"
    src="img/bondu_logo_white.png"
    height="50"
    alt="navBarIcon"
    style="
      margin-left: 18px;
      margin-right: 18px;
      margin-bottom: 8px;
      right: 30rem;
    "
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
          class="btn btn-light"
          style="
            color: #f28f1d;
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          Inicio
        </button></a
      >
    </li>
    <li class="nav-item">
      <a
        href="animalsNew.html"
        style="text-decoration: none; color: white;"
      >
        <button
          type="button"
          class="btn btn-outline-light"
          style="
            margin-left: 
            18px; margin-right: 
            18px; margin-bottom: 8px;
          "
        >
          ¡Animales!
        </button></a
      >
    </li>
    <li class="nav-item">
      <a href="quienes.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          ¿Quiénes somos?
        </button></a
      >
    </li>
    <li class="nav-item">
      <a href="app.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          Nuestra App
        </button></a
      >
    </li>
    <li class="nav-item">
      <a href="blog.html" style="text-decoration: none; color: white;">
        <button
          type="button"
          class="btn btn-outline-light"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          Blog
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
          class="btn btn-outline-light"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          Contacto
        </button></a
      >
    </li>
  </ul>
  <ul class="navbar-nav ml-auto justify-content-end">
    <li class="nav-item">
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownProfile"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          <img
            src="img/profileIcon.png"
            alt="profileIcon"
            height="35"
            width="35"
          />
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownProfile">
          <a class="dropdown-item" href="profile.html">Perfil</a>
          <a class="dropdown-item" href="index.html" id="logout"
            >Cerrar sesión</a
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a class="faqIcon" href="faq.html">
        <img
          src="img/faqIcon.png"
          alt="faqIcon"
          height="40"
          width="40"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        />
      </a>
    </li>
  </ul>
</div>
</nav>

<script src="./js/logout.js"></script>`;
