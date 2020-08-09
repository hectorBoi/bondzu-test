document.getElementById("navBarNoLog").innerHTML = `<nav
id="navBarNoLog"
class="navbar navbar-light"
style="background-color: #f28f1d;"
>
<a href="index.html">
  <img
    class="navBarIcon"
    src="img/bondu_logo_white.png"
    height="50"
    alt="navBarIcon"
  />
</a>
<ul class="nav justify-content-center bar">
  <li class="nav-item">
    <a href="index.html" style="text-decoration: none; color: #f28f1d;">
      <button
        type="button"
        class="btn btn-light"
        style="color: #f28f1d; margin-left: 18px; margin-right: 18px;"
      >
        Inicio
      </button></a
    >
  </li>
  <li class="nav-item">
    <a href="quienes.html" style="text-decoration: none; color: white;">
      <button
        type="button"
        class="btn btn-outline-light"
        style="margin-left: 18px; margin-right: 18px;"
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
        style="margin-left: 18px; margin-right: 18px;"
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
        style="margin-left: 18px; margin-right: 18px;"
      >
        Blog
      </button></a
    >
  </li>
  <li class="nav-item">
    <a href="contacto.html" style="text-decoration: none; color: white;">
      <button
        type="button"
        class="btn btn-outline-light"
        style="margin-left: 18px; margin-right: 18px;"
      >
        Contacto
      </button></a
    >
  </li>

  <a
    class="loginIcon"
    type="button"
    data-toggle="modal"
    data-target="#userModal"
    ><img
      src="img/loginIcon.png"
      alt="loginIcon"
      height="40"
      width="40"
    />
  </a>
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
          <br />
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
        <div class="modal-footer">
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
                type="text"
                class="form-control is-invalid"
                aria-describedby="validatedInputGroupPrepend"
                required
                placeholder="Nombre"
                aria-label="Nombre"
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
                  >Correo</span
                >
              </div>
              <input
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
        <div class="modal-footer">
          <a href="#" class="btn btn-warning btn-lg btn-block"
            >Regístrate</a
          >
        </div>
      </div>
    </div>
  </div>
  <a class="faqIcon" href="faq.html">
    <img src="img/faqIcon.png" alt="faqIcon" height="40" width="40" />
  </a>
</ul>
</nav>`;
