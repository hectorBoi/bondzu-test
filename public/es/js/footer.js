const currentDate = new Date();
const currentYear = currentDate.getFullYear();

document.getElementById("footer").innerHTML = `
<footer>
      <div id="backTop">
        <a href="#navBar" style="text-decoration: none;">
          <button
            type="button"
            class="btn btn-lg btn-block"
            style="background-color: #a8a8a8;"
          >
            <h6 style="color: #ffffff;">Inicio de página</h6>
          </button>
        </a>
      </div>
      <div class="text-center" style="background-color: #f28f1d;">
        <div class="container">
          <div class="row">
            <div class="col-4">
              <h5 style="margin: 5px; color: white;">Conócenos</h5>
              <p>
                <a href="quienes.html" style="color: white;">
                  ¿Quiénes somos?
                </a>
                <br />
                <a href="app.html" style="color: white;">Nuestra App</a>
              </p>
            </div>
            <div class="col-4">
              <h5 style="margin: 5px; color: white;">
                Nuestras redes sociales
              </h5>
              <div class="row">
                <div class="col-sm">
                  <a
                    href="https://www.facebook.com/bondzu/"
                    style="text-decoration: none;"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../../img/fbIcon.png"
                      alt="fbIcon"
                      height="40"
                      width="40"
                    />
                  </a>
                </div>
                <div class="col-sm" style="margin-top: 2px">
                  <a
                    href="https://www.tiktok.com/@bondzutiktok"
                    style="text-decoration: none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <img
                    src="../img/tikTokIcon.png"
                    alt="fbIcon"
                    height="45"
                    width="45"
                  />
                  </a>
                </div>
                <div class="col-sm">
                  <a
                    href="https://twitter.com/BondzuCubs"
                    style="text-decoration: none;"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../../img/twIcon.png"
                      alt="twIcon"
                      height="40"
                      width="40"
                    />
                  </a>
                </div>
                <div class="col-sm">
                  <a
                    href="https://www.instagram.com/bondzucubs/"
                    style="text-decoration: none;"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../../img/instaIcon.png"
                      alt="igIcon"
                      height="40"
                      width="40"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-4">
              <h5 style="margin: 5px; color: white;">Contáctanos</h5>
              <p>
                <a href="contacto.html" style="color: white;">
                  Contacto
                </a>
              </p>
            </div>
          </div>
        </div>
        <hr style="clear: both; margin-bottom: 10px; margin-top: 10px;" />
        <img
          src="../../img/bondu_logo_white.png"
          alt="logoBondzuFooter"
          height="50"
          width="100"
          style="margin: 4px; font-size: 10px;"
        />
        <p style="color: #ffffff; display: inline;">
          &copy ${currentYear} Bondzù
        </p>
      </div>
      <div class="text-center" style="background-color: #ec7c26; padding: 10px">
        <a href="privacidad.html" style="color: white; font-size: 15px; ">
          Aviso de privacidad
        </a>
      </div>
    </footer>
`;
