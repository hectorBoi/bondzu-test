/* Envolver el código completo en una función anónima permite mayor
   privacidad (i.e., no poder referenciar el código desde la consola
   del navegador)
 */
(function()
 {
    /**
     * Añade un item a la navbar de admin
     * @param {String} HTMLFile El nombre de la página HTML (excluyendo la extensión .html) a la cual se redirige el usuario tras oprimir el item (e.g., index)
     * @param {String} text El texto del item
     * @param {Boolean} activeClass Si se le debería añadir la clase "active" al elemento \<li> del item
     * @param {String} color Color del elemento \<a> del item
     * @param {String} additionalClass Clase, además de "btn" y "navbarBtnMargins", que se desee agregar al elemento \<button> del item
     * @param {String} additionalStyle Estilo que se le desee agregar al elemento \<button> del item
     * @returns {String} HTML del item a agregar a la navbar de admin
     */
    function navbarItem(HTMLFile, text, activeClass = false, color = "white", additionalClass = "btn-outline-light", additionalStyle = "")
    {
      /* Los siguientes dos placeholders no necesariamente necesitan estos valores
       * Solamente se tiene que asegurar que sean valores únicos (i.e, que no se encuentren
         en el resto de la template)
       */
      const HTML_PLACEHOLDER = "HTML_PLACEHOLDER";
      const NAVBAR_ITEM_TEXT_PLACEHOLDER = "NAVBAR_ITEM_TEXT_PLACEHOLDER";
      
      const NAVBAR_ITEM_TEMPLATE = `<li class="nav-item"` + ( (activeClass) ? " active" : "") + `>
                                      <a href="${HTML_PLACEHOLDER}.html" style="text-decoration: none; color: ${color};">
                                        <button
                                          type="button"
                                          class="btn ${additionalClass} navbarBtnMargins"
                                          style="${additionalStyle}"
                                        >
                                          ${NAVBAR_ITEM_TEXT_PLACEHOLDER}
                                        </button>
                                      </a>
                                    </li>`;
      
      const newNavbarItem = NAVBAR_ITEM_TEMPLATE.replace(`${HTML_PLACEHOLDER}`, HTMLFile);
      return newNavbarItem.replace(`${NAVBAR_ITEM_TEXT_PLACEHOLDER}`, text);
    }

let navbarContents = `
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
        <a href="member.html" style="text-decoration: none; color: white;">
          <button
            type="button"
            class="btn btn-outline-light navbarBtnMargins"
          >
            Miembros Bondzú
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

  document.getElementById("navBar").innerHTML = navbarContents;
 })();