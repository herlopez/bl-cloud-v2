function forgotPasswordView() {
  var appContainer = document.getElementById('app_container');
  appContainer.innerHTML = '';
  appContainer.style.userSelect = 'none';
  appContainer.classList.remove('project-dash');
  appContainer.classList.remove('project-single');
  var forgotPasswordLogo = document.createElement('img');
  forgotPasswordLogo.src = "/images/logo.png";
  forgotPasswordLogo.width = '300';
  forgotPasswordLogo.style.marginBottom = "1rem";
  var message = document.createElement('h2');
  message.innerText = 'Enter your account email address.';
  appContainer.appendChild(forgotPasswordLogo);
  appContainer.appendChild(message);
  var forgotPasswordForm = document.createElement('form');
  forgotPasswordForm.id = "main_forgot_password";
  forgotPasswordForm.classList = 'c jc ac';
  var forgotPasswordEmail = document.createElement('input');
  forgotPasswordEmail.required = 'required';
  forgotPasswordEmail.type = 'email';
  forgotPasswordEmail.placeholder = 'Email Address';
  forgotPasswordEmail.id = "".concat(forgotPasswordForm.id, "_email");
  forgotPasswordForm.appendChild(forgotPasswordEmail);
  var forgotPasswordSubmitButton = document.createElement('button');
  forgotPasswordSubmitButton.innerHTML = "Send Recovery Email";
  forgotPasswordSubmitButton.id = "".concat(forgotPasswordForm.id, "_submit");
  forgotPasswordForm.appendChild(forgotPasswordSubmitButton);
  forgotPasswordForm.addEventListener("submit", function (e) {
    var email = document.getElementById("".concat(forgotPasswordForm.id, "_email"));
    firebase.auth().sendPasswordResetEmail(email.value).then(function () {
      // Password reset email sent.
      viewSwitcher('pw_reset_success');
    })["catch"](function (error) {
      formError(error);
    });
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(forgotPasswordForm);
  var forgotPasswordSignInButton = document.createElement('a');
  forgotPasswordSignInButton.innerText = "Din't forget your password? Click Here to Sign In!";
  forgotPasswordSignInButton.addEventListener("mouseenter", function () {
    forgotPasswordSignInButton.style.color = "rgb(155, 85, 163)";
    forgotPasswordSignInButton.style.cursor = "pointer";
  });
  forgotPasswordSignInButton.addEventListener("mouseleave", function () {
    forgotPasswordSignInButton.style.color = "#000000";
    forgotPasswordSignInButton.style.cursor = "default";
  });
  forgotPasswordSignInButton.addEventListener("click", function (e) {
    viewSwitcher('sign_in');
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(forgotPasswordSignInButton);
}