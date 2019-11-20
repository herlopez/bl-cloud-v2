function signInView() {
  var appContainer = document.getElementById('app_container');
  appContainer.innerHTML = '';
  appContainer.classList.remove('project-dash');
  appContainer.style.userSelect = 'none';
  var signInLogo = document.createElement('img');
  signInLogo.src = "/images/BL_Logo_white.png";
  signInLogo.width = '300';
  signInLogo.style.marginBottom = "1rem";
  appContainer.appendChild(signInLogo);
  var signInForm = document.createElement('form');
  signInForm.id = "main_sign_in";
  signInForm.classList = 'c jc ac';
  var emailInput = document.createElement('input');
  emailInput.required = 'required';
  emailInput.type = 'email';
  emailInput.placeholder = 'Email';
  emailInput.id = "".concat(signInForm.id, "_email");
  var passwordInput = document.createElement('input');
  passwordInput.required = 'required';
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.id = "".concat(signInForm.id, "_password");
  var submitButton = document.createElement('button');
  submitButton.innerHTML = "Submit";
  submitButton.id = "".concat(signInForm.id, "_submit");
  signInForm.appendChild(emailInput);
  signInForm.appendChild(passwordInput);
  signInForm.appendChild(submitButton);
  signInForm.addEventListener("submit", function (e) {
    var email = document.getElementById("".concat(signInForm.id, "_email"));
    var password = document.getElementById("".concat(signInForm.id, "_password"));
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)["catch"](function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        formError('Wrong password.');
      } else {
        formError(errorMessage);
      } // console.log(error);

    });
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(signInForm);
  var signUp = document.createElement('a');
  signUp.style.color = "#fff";
  signUp.innerText = "Dont Have an Account? Click Here to Sign Up!";
  signUp.addEventListener("mouseenter", function () {
    signUp.style.color = "rgb(155, 85, 163)";
    signUp.style.cursor = "pointer";
  });
  signUp.addEventListener("mouseleave", function () {
    signUp.style.color = "#fff";
    signUp.style.cursor = "default";
  });
  signUp.addEventListener("click", function (e) {
    viewSwitcher('sign_up');
    e.preventDefault(); //stop form from submitting
  });
  var forgot = document.createElement('a');
  forgot.innerText = "Forgot password?";
  forgot.style.fontSize = "12px";
  forgot.style.margin = "8px";
  forgot.style.color = "rgb(79, 156, 121)";
  forgot.addEventListener("mouseenter", function () {
    forgot.style.cursor = "pointer";
  });
  forgot.addEventListener("mouseleave", function () {
    forgot.style.cursor = "default";
  });
  forgot.addEventListener("click", function (e) {
    viewSwitcher('forgot_password');
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(signUp);
  appContainer.appendChild(forgot);
}