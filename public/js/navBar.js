document.getElementById("navBar").innerHTML = `<nav
id="navBarNoLog"
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
                  <select class="custom-select" required id="usertypeReg">
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
      href="faq.html"
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
    <div
      class="modal fade"
      id="faqModal"
      tabindex="-1"
      aria-labelledby="faqModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="faqModalLabel">
              Preguntas frecuentes / FAQ
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
          <div class="modal-body mx-auto">
            <div class="container-fluid">
              <div class="accordion" id="accordionFAQ">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        style="color: #f28f1d;"
                      >
                        <b>¿Qué es Bondzù?</b>
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    class="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      Bondzù es una iniciativa de educación y
                      concientización utilizando los nuevos medios de
                      comunicación que permite internet. Hace uso
                      intensivo de las redes sociales, aplicaciones para
                      teléfonos inteligentes y páginas web. Lo que
                      buscamos es darle vida digna a los animales en
                      cautiverio. Lo ideal es que los animales vivan en su
                      hábitat. Sin embargo existen muchos animales en
                      cautiverio que es imposible liberar porque no
                      podrían adaptarse a un medio salvaje. Nuestra
                      contribución es darle información a la gente y
                      encender su amor por la naturaleza. Existen muchas
                      instituciones que hacen su mejor esfuerzo para
                      mantener en la mejor forma posible a estos animales
                      que están en cautiverio. Pero estas instituciones
                      necesitan que se conozcan sus esfuerzos y
                      contribuciones para recibir el apoyo de la gente, se
                      solidaricen y estén dispuestos a apoyar
                      económicamente sus actividades en favor de la
                      preservación de las especies. Bondzù trabaja todos
                      los días para que la gente pueda disfrutar de
                      imágenes en vivo de los animales. El departamento de
                      investigación y desarrollo está trabajando en el
                      diseño de diversos dispositivos robóticos y juguetes
                      para que sirvan como enriquecimiento ambiental y
                      contribuyan a una mayor actividad física de los
                      animales en cautiverio. Bondzù promueve el amor a
                      los animales pero sobre todo, una actitud de respeto
                      hacia todo ser vivo.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        style="color: #f28f1d;"
                      >
                        <b
                          >¿Se puede descargar la App en cualquier
                          dispositivo?</b
                        >
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    class="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      Sí, se puede descargar la aplicación a través de un
                      teléfono inteligente o una tableta, también se puede
                      disfrutar de nuestro contenido en computadoras de
                      escritorio y portátiles a través de esta página web.
                      <br />
                      <br />

                      <b>En iOS: </b> Ve al App Store, busca Bondzù,
                      instala, y listo, disfruta de todo el contenido que
                      hemos preparado para ti.
                      <br />
                      <br />
                      <b>En Android:</b> Ve al Play Store, busca Bondzù,
                      instala, y listo, disfruta de todo el contenido que
                      hemos preparado para ti.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingThree">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        style="color: #f28f1d;"
                      >
                        <b>¿Por qué debería adoptar?</b>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    class="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      La función principal de los zoológicos es trabajar
                      para la preservación de las especies, así como su
                      protección; no buscan mantener a los animales fuera
                      de su entorno para vivir en condiciones inadecuadas,
                      como cuestión de hecho, estamos comprometidos con la
                      mejora de sus condiciones de vida. Para muchas
                      especies, los zoológicos se han convertido en los
                      centros que han impedido su extinción.
                    </div>
                  </div>
                </div>
                <div class="card">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ul>
</div>
</nav>`;
