function signUpView() {
  var appContainer = document.getElementById('app_container');
  appContainer.innerHTML = '';
  appContainer.style.userSelect = 'none';
  appContainer.classList.remove('project-dash');
  appContainer.classList.remove('project-single');
  var signUpLogo = document.createElement('img');
  signUpLogo.src = "/images/logo.png";
  signUpLogo.width = '300';
  signUpLogo.style.marginBottom = "1rem";
  appContainer.appendChild(signUpLogo);
  var signUpForm = document.createElement('form');
  signUpForm.id = "main_sign_up";
  signUpForm.classList = 'c jc ac';
  var userFirstName = document.createElement('input');
  userFirstName.required = 'required';
  userFirstName.type = 'name';
  userFirstName.placeholder = 'First Name';
  userFirstName.id = "".concat(signUpForm.id, "_first_name");
  userFirstName.style.width = "100% !important";
  var userLastName = document.createElement('input');
  userLastName.required = 'required';
  userLastName.type = 'name';
  userLastName.placeholder = 'Last Name';
  userLastName.id = "".concat(signUpForm.id, "_last_name");
  userLastName.style.width = "100% !important";
  var signUpEmail = document.createElement('input');
  signUpEmail.required = 'required';
  signUpEmail.type = 'email';
  signUpEmail.placeholder = 'Email Address';
  signUpEmail.style.width = "100% !important";
  signUpEmail.id = "".concat(signUpForm.id, "_email");
  var signUpPasswordInput = document.createElement('input');
  signUpPasswordInput.required = 'required';
  signUpPasswordInput.type = 'password';
  signUpPasswordInput.placeholder = 'Password';
  signUpPasswordInput.id = "".concat(signUpForm.id, "_password");
  signUpPasswordInput.style.width = "100% !important";
  var signUpPasswordInput2 = document.createElement('input');
  signUpPasswordInput2.required = 'required';
  signUpPasswordInput2.type = 'password';
  signUpPasswordInput2.placeholder = 'Confirm Password';
  signUpPasswordInput2.id = "".concat(signUpForm.id, "_password2");
  signUpPasswordInput2.style.width = "100% !important";
  var signUpSubmitButton = document.createElement('button');
  signUpSubmitButton.innerHTML = "Sign Up!";
  signUpSubmitButton.id = "".concat(signUpForm.id, "_submit");
  signUpForm.appendChild(userFirstName);
  signUpForm.appendChild(userLastName);
  signUpForm.appendChild(signUpEmail);
  signUpForm.appendChild(signUpPasswordInput);
  signUpForm.appendChild(signUpPasswordInput2);
  signUpForm.appendChild(signUpSubmitButton);
  signUpForm.addEventListener("submit", function (e) {
    var firstName = document.getElementById("".concat(signUpForm.id, "_first_name"));
    var lastName = document.getElementById("".concat(signUpForm.id, "_last_name"));
    var email = document.getElementById("".concat(signUpForm.id, "_email"));
    var password = document.getElementById("".concat(signUpForm.id, "_password"));
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)["catch"](function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
        formError('The password is too weak.');
      } else {
        formError(errorMessage);
      } // console.log(error);

    }).then(function () {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: firstName.value + " " + lastName.value
      }).then(function () {// Update successful.
      })["catch"](function (error) {// An error happened.
      });
    });
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(signUpForm);
  var signInButton = document.createElement('a');
  signInButton.innerText = "Already have an Account? Click Here to Sign In!";
  signInButton.style.color = "#ffffff";
  signInButton.addEventListener("mouseenter", function () {
    signInButton.style.color = "rgb(155, 85, 163)";
    signInButton.style.cursor = "pointer";
  });
  signInButton.addEventListener("mouseleave", function () {
    signInButton.style.color = "#ffffff";
    signInButton.style.cursor = "default";
  });
  signInButton.addEventListener("click", function (e) {
    viewSwitcher('sign_in');
    e.preventDefault(); //stop form from submitting
  });
  appContainer.appendChild(signInButton);
}