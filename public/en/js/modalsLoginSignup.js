document.getElementById("modalsLoginSignup").innerHTML = `
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
                    <h5 class="modal-title" id="loginModalLabel">
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
                          Usuario o contraseña incorrectos. Intenta de nuevo.
                        </div>
                      </div>
                      <a class="form-text" href="passwordRecover.html"
                      >Olvidé mi contraseña</a>
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
                    <h5 class="modal-title" id="signupModalLabel">
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
                          Información incompleta. Por favor completa todos los
                          campos.
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer" id="submitReg">
                    <a class="btn btn-primary btn-lg btn-block">Regístrate</a>
                  </div>
                </div>
              </div>
            </div>
`;
