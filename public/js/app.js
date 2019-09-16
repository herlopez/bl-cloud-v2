// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
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

var ws, wsHandler;
var currentView, currentProject;
var currentUid = null;
var edit = false; // When the dom is loaded (Document Ready)

docReady(function () {
  var serverStatus = false;
  viewSwitcher('sign_in');
  var database = firebase.database(); // When an authentication state has changed.

  firebase.auth().onAuthStateChanged(function (user) {
    // If the user is authenticated.
    if (user) {
      currentUid = user.uid; // Show that users project view.

      viewSwitcher('project'); // Start the websocket connection interval with the server.

      wsHandler = setInterval(function () {
        // If not connected and the user it authenticated, try to connect to the server with a websocket.
        if (!serverStatus && user) {
          // Try to connect.
          try {
            // Get the user id Token from firebase.
            user.getIdToken(true).then(function (idToken) {
              // If in development environment. Initialize websocket.
              if (window.location.href.toUpperCase().includes('LOCALHOST')) {
                ws = new WebSocket("ws://localhost:8080/?token=".concat(idToken, "&uid=").concat(user.uid));
              } else {
                ws = new WebSocket("wss://cloud.brilliantlabs.ca/wsapi/?token=".concat(idToken, "&uid=").concat(user.uid));
              } // Triggered when the ws is opened.


              ws.onopen = function open() {
                serverStatus = true;
                console.log('connected');
                getProjects(currentUid);
                setInterval(function () {
                  getProjects(currentUid);
                }, 100);
              }; // Triggered when the ws is closed.


              ws.onclose = function close() {
                serverStatus = false;
                console.log('disconnected');
              };

              ws.onmessage = function incoming(data) {
                console.log(data);
                messageProcessor(data, ws);
              };

              ws.error = function incoming(data) {
                console.log(data);
              };
            })["catch"](function (e) {
              console.log(e);
              serverStatus = false;
            });
          } catch (e) {
            console.log(e);
            serverStatus = false;
          }
        }
      }, 1000);
    } else {
      currentUid = null;
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

  if (message.hasOwnProperty('cmd')) {
    {
      switch (message.cmd) {
        case 'PROJECTS':
          console.log("Project");

          try {
            var projects = message['results'];

            if (currentView === 'projectSingle' && !edit) {
              var findProject = function findProject(p) {
                return p.id === currentProject;
              };

              updateProject(projects.find(findProject), currentProject);
            } else {
              paintProjects(projects);
            }
          } catch (e) {
            console.log(e);
          }

          break;

        default:
          break;
      }
    }
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

function viewSwitcher(targetView, options) {
  var appContainer = document.getElementById('app_container');
  currentView = targetView;

  switch (targetView) {
    case 'projectSingle':
      appContainer.innerHTML = '';
      appContainer.style.userSelect = 'none';
      appContainer.classList.remove('project-dash');
      appContainer.classList.add('project-single');
      var singleHeader = document.createElement('header');
      var backButton = document.createElement('button');
      backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
      backButton.addEventListener('click', function () {
        currentProject = null;
        viewSwitcher('project');
      });
      singleHeader.appendChild(backButton);
      var singleLogout = document.createElement('button');
      singleLogout.id = 'logout';
      singleLogout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
      singleLogout.addEventListener('click', function () {
        ws.close();
        firebase.auth().signOut();
      });
      singleHeader.appendChild(singleLogout);
      appContainer.appendChild(singleHeader);
      var project = document.createElement('div');
      currentProject = options.id;
      project.classList = 'w100 c ac jc';
      project.innerHTML = "\n                <div style=\"\" class=\"w100 c ac\">\n                    <h1 style=\"\" class=\"m0\">".concat(options.name, "</h1>\n                    <h3 style=\"\">").concat(options.description, "</h3>\n                    <div class=\"r js ac\">\n                        <h4>Project Key: </h4>\n                         <input class=\"ml2\" value=\"").concat(options.key, "\" disabled>\n                    </div>\n                   \n                    <div class=\"w100 rxl ac jc\">\n                        <div id=\"variables\" class=\"m1 variables c jfs ac w100xl\"> \n                            <h3 class=\"mb0\">Variables</h3>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                        <div id=\"charts\" class=\"m1 charts c jfs ac w100xl\">\n                            <h3 class=\"mb0\">Charts</h3>\n                            <p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Charts \uD83D\uDE41</p>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                    </div>\n                </div>");
      appContainer.appendChild(project);
      var variables = document.getElementById('variables');
      var vars = options.variables;
      var count = 0;

      for (var variable in vars) {
        if (variable === 'default') {
          continue;
        }

        var newVar = document.createElement('div');
        newVar.id = "var_" + variable;
        newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
        newVar.innerHTML = "\n\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(options.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
        variables.appendChild(newVar);
        count++;
      }

      if (!count) {
        var noVars = document.createElement('div');
        noVars.innerHTML = "<p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Variables \uD83D\uDE41</p>";
        variables.appendChild(noVars);
        return;
      }

      console.log('Project Options: ', options);
      break;
    // Forgot Password View

    case 'forgot_password':
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
      break;
    // Sign Up View

    case 'sign_up':
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
      appContainer.classList.remove('project-single');
      var header = document.createElement('header');
      var newButton = document.createElement('button');
      newButton.innerHTML = "<i class=\"fas fa-plus\"></i>";
      newButton.addEventListener('click', function () {
        windowSwitcher('new_project');
      });
      header.appendChild(newButton);
      var logout = document.createElement('button');
      logout.id = 'logout';
      logout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
      logout.addEventListener('click', function () {
        ws.close();
        firebase.auth().signOut();
      });
      header.appendChild(logout);
      var section = document.createElement('section');
      section.id = "project_section";
      section.innerHTML = "<div class=\"loader\"></div>";
      section.style.overflow = "scroll";
      section.classList.add('r');
      section.classList.add('jc');
      section.classList.add('ac'); // each project here

      var myPrj = document.createElement('h2');
      myPrj.innerHTML = "My Projects<br><hr>";
      var footer = document.createElement('footer');
      appContainer.appendChild(header);
      appContainer.appendChild(myPrj);
      appContainer.appendChild(section);
      appContainer.appendChild(footer);
      if (ws) getProjects(currentUid);
      break;
    // Password Reset View

    case 'pw_reset_success':
      appContainer.classList.remove('project-dash');
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
      appContainer.classList.remove('project-dash');
      appContainer.style.userSelect = 'none';
      var signInLogo = document.createElement('img');
      signInLogo.src = "/images/logo.png";
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
    case 'none':
      window.classList.remove('cr');
      window.classList.remove('ac');
      window.classList.remove('jc');
      window.classList.add('dn');
      window.innerHTML = '';
      break;

    case 'new_project':
      window.classList.add('cr');
      window.classList.add('ac');
      window.classList.add('jc');
      window.classList.remove('dn');
      window.innerHTML = '';
      var contentBlock = document.createElement('div');
      contentBlock.id = 'window_content_block';
      contentBlock.innerHTML = '<form id="create_project"> ' + '<h2>Create a New Project</h2>' + '<p>Project Name:</p>' + '<input required type="text" id="project" placeholder="My Project Name...">' + '<p>Project Description:</p>' + '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' + '<p>Make this project Private or Public:</p>' + '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' + '<label for="private">Private</label><br>' + '<input class="input-radio" type="radio" name="access" id="public" value="Public">' + '<label for="public">Public</label><br>' + '<div class="r ac"> <p>Project Color: </p>' + '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color"></div> ' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(contentBlock);
      document.getElementById('create_project').addEventListener('submit', function (e) {
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
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

function createProject(name, desc, access, color, uid) {
  console.log('Creating Project: ', name, desc, access, uid);
  var project = {
    "uid": uid,
    "cmd": 'CREATE_PROJECT',
    "name": name,
    "color": color,
    "description": desc,
    "access": access
  };
  ws.send(JSON.stringify(project));
}

function getProjects(uid) {
  var project = {
    "uid": uid,
    "cmd": 'GET_PROJECTS'
  };
  ws.send(JSON.stringify(project));
}

function paintProjects(projects) {
  var projectSection = document.getElementById('project_section');

  if (projectSection.classList.contains('hold')) {
    return;
  }

  projectSection.classList.remove('jc');
  projectSection.classList.remove('ac');
  projectSection.innerHTML = "";

  var _loop = function _loop() {
    var div = document.createElement('button');
    div.setAttribute('onmouseleave', "document.getElementById('project_section').classList.remove('hold');");
    div.setAttribute('onmouseover', "document.getElementById('project_section').classList.add('hold');");
    div.style.height = "200px";
    div.style.minWidth = "300px";
    div.style.maxWidth = "300px";
    div.style.background = projects[project]['color'];
    div.id = projects[project]['id'];
    div.borderRadius = "20px";
    var data = projects[project];
    div.innerHTML = "<h3>".concat(projects[project]['name'], "</h3><p>").concat(projects[project]['description'], "</p><i class=\"fa fa-code\"</i> ").concat(Object.keys(projects[project]['variables']).length - 1, " <i class=\"fa fa-chart-bar\"</i> ").concat(Object.keys(projects[project]['charts']).length - 1, " ");
    div.addEventListener('click', function (e) {
      paintProject(data, div.id);
    });
    projectSection.appendChild(div);
  };

  for (var project in projects) {
    _loop();
  }
}

function paintProject(project, id) {
  console.log('PROJECT ID:  ', id);
  console.log('PROJECT:  ', project);
  viewSwitcher('projectSingle', project);
}

function updateProject(project, id) {
  var variables = document.getElementById('variables');

  if (variables.classList.contains('hold')) {
    return;
  }

  var vars = project.variables;
  var count = 0;

  for (var variable in vars) {
    if (variable === 'default') {
      continue;
    }

    console.log(variables.querySelector('variable'));
    var newVar = document.getElementById("var_" + variable);
    newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
    newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
    newVar.innerHTML = "\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(project.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
    variables.appendChild(newVar);
  }
} // Handles the events of editing a variable value in the UI.


function variableEdit(id) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  console.log('key: ', id);
  edit = true;
  var error = document.getElementById("var_error_".concat(id.substring('var_button_'.length)));
  error.classList.add('dn'); // Get the input element.

  var inputString = "var_input_".concat(id.substring('var_button_'.length));
  var input = document.getElementById(inputString); // Make the input editable by removing the disabled attribute.

  input.removeAttribute('disabled'); // Store the current value, so that if someone decides to cancel instead of editing the variable, it will set the input back to the original value (oldValue).

  var oldValue = input.value; // Get the edit button and switch it to the check mark styling, also remove the onClick attribute.

  var button = document.getElementById(id);
  button.classList.remove('fa-pencil-alt');
  button.classList.add('fa-check');
  button.classList.add('double-button');
  button.style.color = 'green';
  button.removeAttribute('onClick'); // Add a click listener in the event that the save (check mark) button is clicked.

  button.setAttribute('onclick', "variableSave(id, \"".concat(oldValue, "\",\"").concat(key, "\")")); // Get the second close button element. "Currently Hidden".

  var button2 = document.getElementById("var_button_2_".concat(id.substring('var_button_'.length))); // Remove the dn class which is hiding it. So it is now visible.

  button2.classList.remove('dn'); // Add this class to translate it into position inside the input element.

  button2.classList.add('double-button2'); // Set the color to red.

  button2.style.color = 'red'; // When someone clicks the red cross to cancel the variable edit.

  button2.addEventListener('click', function () {
    edit = false; // Get the input ele.

    var input2 = document.getElementById(inputString); // Set it back to the original value.

    input2.value = oldValue; // Disabled it again.

    input2.setAttribute('disabled', true); // Remove the check mark and add the pencil and styling again to the edit button.

    button.classList.add('fa-pencil-alt');
    button.classList.remove('fa-check', 'loader-small');
    button.style.color = '#9b55a3';
    button.classList.remove('double-button'); // Translation to give room to the cross button.
    // Set the on click function back to this.

    button.setAttribute('onClick', "variableEdit(id, '".concat(key, "')")); // Hide the close button.

    button2.classList.add('dn');
  });
}

function variableSave(id, old, key) {
  var editButton = document.getElementById(id);
  editButton.classList.remove('fa-check');
  editButton.classList.remove('fa-pencil-alt');
  editButton.classList.add('loader-small', 'double-button-load');
  var button2 = document.getElementById("var_button_2_".concat(id.substring('var_button_'.length)));
  button2.classList.add('dn');
  var inputString = "var_input_".concat(id.substring('var_button_'.length));
  var input = document.getElementById(inputString);
  input.setAttribute('disabled', true);
  var name = document.getElementById("var_name_".concat(id.substring('var_button_'.length)));
  var errorElement = "var_error_".concat(id.substring('var_button_'.length));
  ws.send("{\"cmd\":\"SET_VARIABLE\", \"key\":\"".concat(key, "\", \"name\":\"").concat(name.value, "\", \"value\":\"").concat(input.value, "\", \"onSuccess\":\"console.log('Success!'); var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', `variableEdit(id, '").concat(key, "')`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); \", \"onError\":\"var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('").concat(errorElement, "'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;\"}"));
  setTimeout(function () {
    if (!editButton.classList.contains('done')) {
      editButton.classList.add('fa-pencil-alt');
      edit = false;
      editButton.classList.remove('fa-check', 'loader-small', 'double-button-load');
      editButton.style.color = '#9b55a3';
      editButton.classList.remove('double-button'); // Translation to give room to the cross button.

      var error = document.getElementById("var_error_".concat(id.substring('var_button_'.length)));
      error.classList.remove('dn');
      input.value = old; // Set the on click function back to this.

      editButton.setAttribute('onClick', "variableEdit(id, '".concat(key, "')"));
    }
  }, 3000);
}