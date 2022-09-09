document.getElementById('modalsLoginSignup').innerHTML = `
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
                    <form>
                      <div class="form-group is-invalid">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="email@example.com"
                          aria-label="Email"
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
                          aria-label="Password"
                        />
                        <div
                          id="invalidPassword"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                        Incorrect username or password. Please try again.
                        </div>
                      </div>
                      <a class="form-text" href="passwordRecover.html"
                      >I forgot my password</a>
                    </form>
                  </div>
                  <div class="modal-footer" id="submit">
                    <a class="btn btn-success btn-lg btn-block"
                      >Login</a
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
                    <form>
                      <div class="form-group is-invalid">
                        <label for="email">Name</label>
                        <input
                          id="nameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Name"
                          aria-label="Name"
                          autofocus
                        />
                      <div class="invalid-feedback">
                      Please enter a valid name
                      </div>
                      <div class="valid-feedback">
                        Well done!
                      </div>
                    </div>
                      <div class="form-group is-invalid">
                        <label for="email">Lastname</label>
                        <input
                          id="lastnameReg"
                          type="text"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="Lastname"
                          aria-label="Lastname"
                        />
                        <div class="invalid-feedback">
                          Please enter a valid last name
                        </div>
                        <div class="valid-feedback">
                          Excellent!
                      </div>
                    </div>
                      <div class="form-group is-invalid">
                        <label for="email">Email</label>
                        <input
                          id="emailReg"
                          type="email"
                          class="form-control is-invalid"
                          aria-describedby="validatedInputGroupPrepend"
                          required
                          placeholder="email@example.com"
                          aria-label="Email"
                        />
                        <div class="invalid-feedback">
                            The Email must be a valid address, for example, me@mydomain.com.
                          </div>
                          <div class="valid-feedback">
                            Perfect!
                        </div>
                        <div
                          id="existingUser"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          That account already exists. Try another one.
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
                          aria-label="Password"
                        />
                        <div class="invalid-feedback">
                          The password must contain at least eight characters, at least one letter, one number and one special character
                        </div>
                        <div class="valid-feedback">
                          Good password!
                        </div>
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
                          aria-label="Password"
                        />
                      <div class="invalid-feedback">
                        Passwords must match
                      </div>
                      <div class="valid-feedback">
                        Done!
                      </div>
                        <div
                          id="noMatchPasswords"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          The password does not match. Please try again.
                        </div>
                        <div
                          id="missingInputs"
                          class="invalid-feedback"
                          style="display: none;"
                        >
                          Incomplete information. Please complete all fields.
                        </div>
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

const inputs = document.querySelectorAll('input');

const patterns = {
  nameReg: /^[a-z\d]{5,12}$/i,
  lastnameReg: /^[a-z\d]{5,12}$/i,
  emailReg: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  passwordReg: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  passwordRegConf:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

// Validation function

function validation(field, regex) {
  if (regex.test(field.value)) {
    field.className = 'form-control is-valid';
  } else {
    field.className = 'form-control is-invalid';
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validation(e.target, patterns[e.target.id]);
  });
});
