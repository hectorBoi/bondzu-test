document.getElementById("navBar").innerHTML = `<nav
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


    <li class="nav-item" id="navAnimals">
      <a
        href="animalsNew.html"
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
          class="btn btn-primary"
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
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Correo</span
                    >
                  </div>
                  <input
                    id="email"
                    type="text"
                    class="form-control is-invalid"
                    aria-describedby="validatedInputGroupPrepend"
                    required
                    placeholder="correo@ejemplo.com"
                    aria-label="Correo"
                    autofocus
                  />
                </div>

                <br />
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Contraseña</span
                    >
                  </div>
                  <input
                    id="password"
                    type="password"
                    class="form-control is-invalid"
                    aria-describedby="validatedInputGroupPrepend"
                    required
                    placeholder="Contraseña"
                    aria-label="Contraseña"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer" id="submit">
              <a href="#" class="btn btn-success btn-lg btn-block"
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
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Nombre</span
                    >
                  </div>
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

                <br />
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Apellidos</span
                    >
                  </div>
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
                <br />
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Tipo de usuario</span
                    >
                  </div>
                  <select class="custom-select" 
                  required 
                  id="usertypeReg">
                    <option value="">Seleccione una opción...</option>
                    <option value="etDcoSci6K">Basic</option>
                    <option value="jHbSEutegP">Bondzù Fan</option>
                    <option value="nRXYUkuJJq">Bondzù Lover</option>
                    <option value="mWm6R6DLFX">Bondzù Hero</option>
                  </select>
                </div>
                <br />
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Correo</span
                    >
                  </div>
                  <input
                    id="emailReg"
                    type="text"
                    class="form-control is-invalid"
                    aria-describedby="validatedInputGroupPrepend"
                    required
                    placeholder="correo@ejemplo.com"
                    aria-label="Correo"
                  />
                </div>

                <br />
                <div class="input-group is-invalid">
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text"
                      id="validatedInputGroupPrepend"
                      >Contraseña</span
                    >
                  </div>
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
              </form>
            </div>
            <div class="modal-footer" id="submitReg">
              <a href="#" class="btn btn-warning btn-lg btn-block"
                >Regístrate</a
              >
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="nav-item">



    <li class="nav-item" id="loggedIn">
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
          <a class="dropdown-item" id="logout">Cerrar sesión</a>
        </div>
      </div>
    </li>


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
</nav>`;
