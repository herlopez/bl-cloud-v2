(function (funcName, baseObj) {
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;

      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }

      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  }

  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }

    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      readyList.push({
        fn: callback,
        ctx: context
      });
    }

    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }

      readyEventHandlersInstalled = true;
    }
  };
})("docReady", window);

docReady(function () {
  var serverStatus = false;
  var ws, wsHandler;
  var windowSw = document.getElementById('window'); // windowSw.addEventListener('click', ()=>{
  //     if
  //     windowSw.classList.remove('cci');
  // });

  viewSwitcher('sign_in');
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('logged in');
      viewSwitcher('project');
      wsHandler = setInterval(function () {
        if (!serverStatus) {
          try {
            ws = new WebSocket('wss://cloud.brilliantlabs.ca/wsapi/');

            ws.onopen = function open() {
              serverStatus = true; // ws.send('{"cmd":"WS_OPEN", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');

              console.log('connected');
            };

            ws.onclose = function close() {
              serverStatus = false;
              console.log('disconnected'); // ws.send('{"cmd":"WS_CLOSED", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
            };

            ws.onmessage = function incoming(data) {
              console.log(data);
              messageProcessor(data, ws);
            };

            ws.error = function incoming(data) {
              console.log(data);
            };
          } catch (e) {
            console.log(e);
            serverStatus = false;
          }
        }
      }, 1000);
    } else {
      viewSwitcher('sign_in');
      clearInterval(wsHandler);
    }
  });
});

function messageProcessor(message, callback) {
  console.log('Message Received: ', message);

  try {
    console.log(message);
    message = JSON.parse(message.data);
    console.log(message.results);
  } catch (e) {
    console.log(e);
    callback.send("{\"error\":\"Unable to parse JSON: ".concat(e, "\"}"));
    return;
  }

  if (message.hasOwnProperty('fn')) {
    var fn = message['fn'];

    try {
      var iFn = new Function(fn);
      iFn();
    } catch (e) {
      callback.send("{\"error\":\"Unable to execute function: ".concat(e, "\"}"));
    }
  }
}

function viewSwitcher(targetView) {
  var appContainer = document.getElementById('app_container');

  switch (targetView) {
    // Forgot Password View
    case 'forgot_password':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
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
      forgotPasswordForm.classList = 'cc';
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
      break;
    // Sign Up View

    case 'sign_up':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
      var signUpLogo = document.createElement('img');
      signUpLogo.src = "/images/logo.png";
      signUpLogo.width = '300';
      signUpLogo.style.marginBottom = "1rem";
      appContainer.appendChild(signUpLogo);
      var signUpForm = document.createElement('form');
      signUpForm.id = "main_sign_up";
      signUpForm.classList = 'cc';
      var userFirstName = document.createElement('input');
      userFirstName.required = 'required';
      userFirstName.type = 'name';
      userFirstName.placeholder = 'First Name';
      userFirstName.id = "".concat(signUpForm.id, "_first_name");
      var userLastName = document.createElement('input');
      userLastName.required = 'required';
      userLastName.type = 'name';
      userLastName.placeholder = 'Last Name';
      userLastName.id = "".concat(signUpForm.id, "_last_name");
      var signUpEmail = document.createElement('input');
      signUpEmail.required = 'required';
      signUpEmail.type = 'email';
      signUpEmail.placeholder = 'Email Address';
      signUpEmail.id = "".concat(signUpForm.id, "_email");
      var signUpPasswordInput = document.createElement('input');
      signUpPasswordInput.required = 'required';
      signUpPasswordInput.type = 'password';
      signUpPasswordInput.placeholder = 'Password';
      signUpPasswordInput.id = "".concat(signUpForm.id, "_password");
      var signUpPasswordInput2 = document.createElement('input');
      signUpPasswordInput2.required = 'required';
      signUpPasswordInput2.type = 'password';
      signUpPasswordInput2.placeholder = 'Confirm Password';
      signUpPasswordInput2.id = "".concat(signUpForm.id, "_password2");
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
        var password2 = document.getElementById("".concat(signUpForm.id, "_password2")); // ws.send(`{"cmd":"CREATE_USER", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq", "first_name":"${firstName.value}", "last_name":"${lastName.value}", "email":"${email.value}","password":"${password.value}", "password_2":"${password2.value}"}`);

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)["catch"](function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
            formError('The password is too weak.');
          } else {
            formError(errorMessage);
          }

          console.log(error);
        });
        e.preventDefault(); //stop form from submitting
      });
      appContainer.appendChild(signUpForm);
      var signInButton = document.createElement('a');
      signInButton.innerText = "Already have an Account? Click Here to Sign In!";
      signInButton.addEventListener("mouseenter", function () {
        signInButton.style.color = "rgb(155, 85, 163)";
        signInButton.style.cursor = "pointer";
      });
      signInButton.addEventListener("mouseleave", function () {
        signInButton.style.color = "#000000";
        signInButton.style.cursor = "default";
      });
      signInButton.addEventListener("click", function (e) {
        viewSwitcher('sign_in');
        e.preventDefault(); //stop form from submitting
      });
      appContainer.appendChild(signInButton);
      break;
    // Project View

    case 'project':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
      appContainer.classList.add('project-dash');
      var header = document.createElement('header');
      var newButton = document.createElement('button');
      newButton.innerText = "+";
      newButton.addEventListener('click', function () {
        windowSwitcher('new_project');
      });
      header.appendChild(newButton);
      var logout = document.createElement('button');
      logout.id = 'logout';
      logout.innerText = 'Sign Out';
      logout.addEventListener('click', function () {
        firebase.auth().signOut();
      });
      header.appendChild(logout);
      var section = document.createElement('section'); // each project here

      var myPrj = document.createElement('h2');
      myPrj.innerHTML = "My Projects<br><hr>";
      section.appendChild(myPrj);
      var footer = document.createElement('footer');
      appContainer.appendChild(header);
      appContainer.appendChild(section);
      appContainer.appendChild(footer);
      break;
    // Password Reset View

    case 'pw_reset_success':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
      var pwResetLogo = document.createElement('img');
      pwResetLogo.src = "/images/logo.png";
      pwResetLogo.width = '300';
      pwResetLogo.style.marginBottom = "1rem";
      appContainer.appendChild(pwResetLogo);
      var pwResetMsg = document.createElement('h2');
      pwResetMsg.innerText = "An email has been sent with a password reset link.";
      appContainer.appendChild(pwResetMsg);
      var pwResetLogoSignIn = document.createElement('button');
      pwResetLogoSignIn.id = 'logout';
      pwResetLogoSignIn.innerText = 'Sign In';
      pwResetLogoSignIn.addEventListener('click', function () {
        viewSwitcher('sign_in');
      });
      appContainer.appendChild(pwResetLogoSignIn);
      break;
    // Login View

    case 'sign_in':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
      var signInLogo = document.createElement('img');
      signInLogo.src = "/images/logo.png";
      signInLogo.width = '300';
      signInLogo.style.marginBottom = "1rem";
      appContainer.appendChild(signInLogo);
      var signInForm = document.createElement('form');
      signInForm.id = "main_sign_in";
      signInForm.classList = 'cc';
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
          }

          console.log(error);
        });
        e.preventDefault(); //stop form from submitting
      });
      appContainer.appendChild(signInForm);
      var signUp = document.createElement('a');
      signUp.innerText = "Dont Have an Account? Click Here to Sign Up!";
      signUp.addEventListener("mouseenter", function () {
        signUp.style.color = "rgb(155, 85, 163)";
        signUp.style.cursor = "pointer";
      });
      signUp.addEventListener("mouseleave", function () {
        signUp.style.color = "#000000";
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
      forgot.style.color = "#1a478e";
      forgot.addEventListener("mouseenter", function () {
        forgot.style.color = "rgb(155, 85, 163)";
        forgot.style.cursor = "pointer";
      });
      forgot.addEventListener("mouseleave", function () {
        forgot.style.color = "#000000";
        forgot.style.cursor = "default";
      });
      forgot.addEventListener("click", function (e) {
        viewSwitcher('forgot_password');
        e.preventDefault(); //stop form from submitting
      });
      appContainer.appendChild(signUp);
      appContainer.appendChild(forgot);
      break;
    // Default

    default:
      viewSwitcher('sign_in');
      break;
  }
}

function windowSwitcher(targetWindow) {
  var window = document.getElementById('window');

  switch (targetWindow) {
    case 'new_project':
      window.classList.add('cci');
      window.innerHTML = '';
      var contentBlock = document.createElement('div');
      contentBlock.id = 'window_content_block';
      contentBlock.innerHTML = '<h2>Create a New Project</h2>' + '<p>Project Name:</p>' + '<input type="text" placeholder="My Project Name...">' + '<p>Make Project Private or Public Project</p>' + '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' + '<label for="private">Private</label>' + '<input class="input-radio" type="radio" name="access" id="public" value="Public">' + '<label for="public">Public</label><br>' + '<button>Create</button>';
      window.appendChild(contentBlock);
      break;
  }
}
/**
 * Form Error
 * @function formError
 * @description Adds a error message to the app container.
 * @param {string} msg Message.response
 */


function formError(msg) {
  var appContainer = document.getElementById('app_container'); // Try to remove the previous error message.

  try {
    document.getElementById('error_message').remove();
  } catch (e) {}

  var errorMessage = document.createElement('div');
  errorMessage['innerText'] = msg;
  errorMessage.style.color = 'red';
  errorMessage.style.margin = '1rem';
  errorMessage.id = 'error_message';
  appContainer.appendChild(errorMessage);
}