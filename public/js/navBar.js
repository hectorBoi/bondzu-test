document.getElementById("navBar").innerHTML = `<nav
class="navbar navbar-expand-xl navbar-dark"
style="background-color: #f28f1d; border-color: #ffffff;"
>
<a class="navbar-brand mr-auto" href="index.html">
  <img
    class="navBarIcon"
    src="../img/bondu_logo_white.png"
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

    <li class="nav-item" id="navAnimals">
      <a
        href="animals.html"
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
    <li class="nav-item" id="guest">
      <a
        class="loginIcon form-inline my-2 my-lg-0 ml-auto"
        type="button"
        data-toggle="modal"
        data-target="#userModal"
        style="text-decoration: none;"
      >
        <button
          type="button"
          class="btn btn-success"
          style="
            margin-left: 18px;
            margin-right: 18px;
            margin-bottom: 8px;
          "
        >
          Iniciar sesión
        </button></a
      >

      <div
              class="modal fade"
              id="userModal"
              tabindex="-1"
              aria-labelledby="userModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title text-center container"
                      id="userModalLabel"
                    >
                      Ingresa a Bondzù
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <a
                      href="#loginModal"
                      data-toggle="modal"
                      class="btn btn-success btn-lg btn-block"
                      data-dismiss="modal"
                      >Inicia sesión</a
                    >
                    <hr style="clear: both;" />
                    <a
                      href="#signupModal"
                      data-toggle="modal"
                      class="btn btn-warning btn-lg btn-block"
                      data-dismiss="modal"
                      >Regístrate</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="loginModal"
              tabindex="-1"
              aria-labelledby="loginModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title text-center container"
                      id="loginModalLabel"
                    >
                      Inicia sesión
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form class="was-validated">
                      <div class="form-group is-invalid">
                        <label for="email">Correo electrónico</label>
                        <input
                          id="email"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="correo@ejemplo.com"
                          aria-label="Correo"
                          autofocus
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Contraseña</label>
                        <input
                          id="password"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Contraseña"
                          aria-label="Contraseña"
                        />
                        <div
                          id="invalidPassword"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          Usuario o contraseña incorrecta. Intente de nuevo.
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer" id="submit">
                    <a class="btn btn-success btn-lg btn-block"
                      >Iniciar sesión</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="signupModal"
              tabindex="-1"
              aria-labelledby="signupModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title text-center container"
                      id="signupModalLabel"
                    >
                      Únete a Bondzù
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form class="was-validated">
                      <div class="form-group is-invalid">
                        <label for="email">Nombre</label>
                        <input
                          id="nameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Nombre"
                          aria-label="Nombre"
                          autofocus
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Apellidos</label>
                        <input
                          id="lastnameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Apellidos"
                          aria-label="Apellidos"
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Correo electrónico</label>
                        <input
                          id="emailReg"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="correo@ejemplo.com"
                          aria-label="Correo"
                        />
                        <div
                          id="existingUser"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          Esa cuenta ya existe. Intenta con otra.
                        </div>
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Contraseña</label>
                        <input
                          id="passwordReg"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Contraseña"
                          aria-label="Contraseña"
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Confirmar contraseña</label>
                        <input
                          id="passwordRegConf"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Contraseña"
                          aria-label="Contraseña"
                        />
                        <div
                            id="noMatchPasswords"
                            class="invalid-feedback"
                            style="display: none;"
                          >
                            La contraseña no coincide. Intenta de nuevo.
                          </div>
                          <div
                            id="missingInputs"
                            class="invalid-feedback"
                            style="display: none;"
                          >
                          Información incompleta. Por favor completa
                          todos los campos.
                          </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer" id="submitReg">
                    <a class="btn btn-warning btn-lg btn-block">Regístrate</a>
                  </div>
                </div>
              </div>
            </div>
    </li>
    <li class="nav-item"></li>

    <li class="nav-item" id="loggedIn">
      <div class="dropdown">
        <button
          class="btn btn-success dropdown-toggle"
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
            src="../img/profileIcon.png"
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
    <a
      class="faqIcon"
      type="button"
      data-toggle="modal"
      data-target="#faqModal"
    >
      <img
        src="../img/faqIcon.png"
        alt="faqIcon"
        height="40"
        width="40"
        style="margin-left: 18px; margin-right: 18px; margin-bottom: 8px;"
      />
    </a>
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
