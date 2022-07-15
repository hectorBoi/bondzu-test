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
                      Log in
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
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="name@example.com"
                          aria-label="Correo"
                          autofocus
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Password</label>
                        <input
                          id="password"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Password"
                          aria-label="Contraseña"
                        />
                        <div
                          id="invalidPassword"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                        Incorrect username or password. Try again.
                        </div>
                      </div>
                      <a class="form-text" href="passwordRecover.html"
                      >I forgot my password</a>
                    </form>
                  </div>
                  <div class="modal-footer" id="submit">
                    <a class="btn btn-success btn-lg btn-block"
                      >Log in</a
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
                    Join Bondzù
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
                        <label for="email">First name</label>
                        <input
                          id="nameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="First name"
                          aria-label="Nombre"
                          autofocus
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Last name</label>
                        <input
                          id="lastnameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Last name"
                          aria-label="Apellidos"
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Email</label>
                        <input
                          id="emailReg"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="name@example.com"
                          aria-label="Correo"
                        />
                        <div
                          id="existingUser"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          The username already exists. Try another one.
                        </div>
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Password</label>
                        <input
                          id="passwordReg"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Password"
                          aria-label="Contraseña"
                        />
                      </div>
                      <div class="form-group is-invalid">
                        <label for="email">Confirm password</label>
                        <input
                          id="passwordRegConf"
                          type="password"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Password"
                          aria-label="Contraseña"
                        />
                        <div
                          id="noMatchPasswords"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          The password does not match. Try again.
                        </div>
                        <div
                          id="missingInputs"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          Incomplete information. Please complete all fields.
                        </div>
                      </div>
                      <div class="form-check">
                        <input
                          id="emailSubscriptionReg"
                          type="checkbox"
                          class="form-check-input"
                        />
                        <label for="emailSubscriptionReg">Would you like to subscribe to the Bondzù newsletter to receive news and promotions?</label>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer" id="submitReg">
                    <a class="btn btn-primary btn-lg btn-block">Sign up</a>
                  </div>
                </div>
              </div>
            </div>
`;
