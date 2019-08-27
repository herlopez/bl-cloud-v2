(function (funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    let readyList = [];
    let readyFired = false;
    let readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (let i = 0; i < readyList.length; i++) {
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
            readyList.push({fn: callback, ctx: context});
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
    }
})("docReady", window);

docReady(function () {
    let serverStatus = false;
    let ws, wsHandler;
    let windowSw = document.getElementById('window');
    // windowSw.addEventListener('click', ()=>{
    //     if
    //     windowSw.classList.remove('cci');
    // });
    viewSwitcher('sign_in');

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('logged in');
            viewSwitcher('project');
            wsHandler = setInterval(() => {
                if (!serverStatus) {
                    try {
                        ws = new WebSocket('wss://cloud.brilliantlabs.ca/wsapi/');

                        ws.onopen = function open() {
                            serverStatus = true;
                            // ws.send('{"cmd":"WS_OPEN", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
                            console.log('connected');
                        };
                        ws.onclose = function close() {
                            serverStatus = false;
                            console.log('disconnected');
                            // ws.send('{"cmd":"WS_CLOSED", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
                        };
                        ws.onmessage = function incoming(data) {
                            console.log(data);
                            messageProcessor(data, ws);
                        };
                        ws.error = function incoming(data) {
                            console.log(data);
                        }
                    } catch (e) {
                        console.log(e);
                        serverStatus = false;
                    }
                }
            }, 1000)
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
        callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
        return;
    }
    if (message.hasOwnProperty('fn')) {
        let fn = message['fn'];
        try {
            let iFn = new Function(fn);
            iFn();
        } catch (e) {
            callback.send(`{"error":"Unable to execute function: ${e}"}`);
        }
    }
}

function viewSwitcher(targetView) {
    let appContainer = document.getElementById('app_container');
    switch (targetView) {

        // Forgot Password View
        case 'forgot_password':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            let forgotPasswordLogo = document.createElement('img');
            forgotPasswordLogo.src = "/images/logo.png";
            forgotPasswordLogo.width = '300';
            forgotPasswordLogo.style.marginBottom = "1rem";
            let message = document.createElement('h2');
            message.innerText = 'Enter your account email address.';
            appContainer.appendChild(forgotPasswordLogo);
            appContainer.appendChild(message);
            let forgotPasswordForm = document.createElement('form');
            forgotPasswordForm.id = "main_forgot_password";
            forgotPasswordForm.classList = 'cc';
            let forgotPasswordEmail = document.createElement('input');
            forgotPasswordEmail.required = 'required';
            forgotPasswordEmail.type = 'email';
            forgotPasswordEmail.placeholder = 'Email Address';
            forgotPasswordEmail.id = `${forgotPasswordForm.id}_email`;
            forgotPasswordForm.appendChild(forgotPasswordEmail);
            let forgotPasswordSubmitButton = document.createElement('button');
            forgotPasswordSubmitButton.innerHTML = "Send Recovery Email";
            forgotPasswordSubmitButton.id = `${forgotPasswordForm.id}_submit`;
            forgotPasswordForm.appendChild(forgotPasswordSubmitButton);
            forgotPasswordForm.addEventListener("submit", function (e) {
                let email = document.getElementById(`${forgotPasswordForm.id}_email`);
                firebase.auth().sendPasswordResetEmail(email.value)
                    .then(function () {
                        // Password reset email sent.
                        viewSwitcher('pw_reset_success');
                    })
                    .catch(function (error) {
                        formError(error);
                    });
                e.preventDefault();    //stop form from submitting
            });
            appContainer.appendChild(forgotPasswordForm);
            let forgotPasswordSignInButton = document.createElement('a');
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
                e.preventDefault();    //stop form from submitting
            });

            appContainer.appendChild(forgotPasswordSignInButton);
            break;

        // Sign Up View
        case 'sign_up':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            let signUpLogo = document.createElement('img');
            signUpLogo.src = "/images/logo.png";
            signUpLogo.width = '300';
            signUpLogo.style.marginBottom = "1rem";
            appContainer.appendChild(signUpLogo);
            let signUpForm = document.createElement('form');
            signUpForm.id = "main_sign_up";
            signUpForm.classList = 'cc';
            let userFirstName = document.createElement('input');
            userFirstName.required = 'required';
            userFirstName.type = 'name';
            userFirstName.placeholder = 'First Name';
            userFirstName.id = `${signUpForm.id}_first_name`;
            let userLastName = document.createElement('input');
            userLastName.required = 'required';
            userLastName.type = 'name';
            userLastName.placeholder = 'Last Name';
            userLastName.id = `${signUpForm.id}_last_name`;
            let signUpEmail = document.createElement('input');
            signUpEmail.required = 'required';
            signUpEmail.type = 'email';
            signUpEmail.placeholder = 'Email Address';
            signUpEmail.id = `${signUpForm.id}_email`;
            let signUpPasswordInput = document.createElement('input');
            signUpPasswordInput.required = 'required';
            signUpPasswordInput.type = 'password';
            signUpPasswordInput.placeholder = 'Password';
            signUpPasswordInput.id = `${signUpForm.id}_password`;
            let signUpPasswordInput2 = document.createElement('input');
            signUpPasswordInput2.required = 'required';
            signUpPasswordInput2.type = 'password';
            signUpPasswordInput2.placeholder = 'Confirm Password';
            signUpPasswordInput2.id = `${signUpForm.id}_password2`;
            let signUpSubmitButton = document.createElement('button');
            signUpSubmitButton.innerHTML = "Sign Up!";
            signUpSubmitButton.id = `${signUpForm.id}_submit`;
            signUpForm.appendChild(userFirstName);
            signUpForm.appendChild(userLastName);
            signUpForm.appendChild(signUpEmail);
            signUpForm.appendChild(signUpPasswordInput);
            signUpForm.appendChild(signUpPasswordInput2);
            signUpForm.appendChild(signUpSubmitButton);
            signUpForm.addEventListener("submit", function (e) {
                let firstName = document.getElementById(`${signUpForm.id}_first_name`);
                let lastName = document.getElementById(`${signUpForm.id}_last_name`);
                let email = document.getElementById(`${signUpForm.id}_email`);
                let password = document.getElementById(`${signUpForm.id}_password`);
                let password2 = document.getElementById(`${signUpForm.id}_password2`);
                // ws.send(`{"cmd":"CREATE_USER", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq", "first_name":"${firstName.value}", "last_name":"${lastName.value}", "email":"${email.value}","password":"${password.value}", "password_2":"${password2.value}"}`);
                firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                    .catch(function (error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        if (errorCode === 'auth/weak-password') {
                            alert('The password is too weak.');
                            formError('The password is too weak.');
                        } else {
                            formError(errorMessage);
                        }
                        console.log(error);
                    });
                e.preventDefault();    //stop form from submitting
            });
            appContainer.appendChild(signUpForm);
            let signInButton = document.createElement('a');
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
                e.preventDefault();    //stop form from submitting
            });
            appContainer.appendChild(signInButton);
            break;

        // Project View
        case 'project':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            appContainer.classList.add('project-dash');
            let header = document.createElement('header');
            let newButton = document.createElement('button');
            newButton.innerText = "+";
            newButton.addEventListener('click', ()=>{
                windowSwitcher('new_project');
            });
            header.appendChild(newButton);
            let logout = document.createElement('button');
            logout.id = 'logout';
            logout.innerText = 'Sign Out';
            logout.addEventListener('click', () => {
                firebase.auth().signOut();
            });
            header.appendChild(logout);
            let section = document.createElement('section');
            // each project here
            let myPrj = document.createElement('h2');
            myPrj.innerHTML = "My Projects<br><hr>";
            section.appendChild(myPrj);

            let footer = document.createElement('footer');
            appContainer.appendChild(header);
            appContainer.appendChild(section);
            appContainer.appendChild(footer);

            break;

        // Password Reset View
        case 'pw_reset_success':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            let pwResetLogo = document.createElement('img');
            pwResetLogo.src = "/images/logo.png";
            pwResetLogo.width = '300';
            pwResetLogo.style.marginBottom = "1rem";
            appContainer.appendChild(pwResetLogo);
            let pwResetMsg = document.createElement('h2');
            pwResetMsg.innerText = "An email has been sent with a password reset link.";
            appContainer.appendChild(pwResetMsg);
            let pwResetLogoSignIn = document.createElement('button');
            pwResetLogoSignIn.id = 'logout';
            pwResetLogoSignIn.innerText = 'Sign In';
            pwResetLogoSignIn.addEventListener('click', () => {
                viewSwitcher('sign_in');
            });
            appContainer.appendChild(pwResetLogoSignIn);
            break;

        // Login View
        case 'sign_in':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            let signInLogo = document.createElement('img');
            signInLogo.src = "/images/logo.png";
            signInLogo.width = '300';
            signInLogo.style.marginBottom = "1rem";
            appContainer.appendChild(signInLogo);
            let signInForm = document.createElement('form');
            signInForm.id = "main_sign_in";
            signInForm.classList = 'cc';
            let emailInput = document.createElement('input');
            emailInput.required = 'required';
            emailInput.type = 'email';
            emailInput.placeholder = 'Email';
            emailInput.id = `${signInForm.id}_email`;
            let passwordInput = document.createElement('input');
            passwordInput.required = 'required';
            passwordInput.type = 'password';
            passwordInput.placeholder = 'Password';
            passwordInput.id = `${signInForm.id}_password`;
            let submitButton = document.createElement('button');
            submitButton.innerHTML = "Submit";
            submitButton.id = `${signInForm.id}_submit`;
            signInForm.appendChild(emailInput);
            signInForm.appendChild(passwordInput);
            signInForm.appendChild(submitButton);
            signInForm.addEventListener("submit", function (e) {
                let email = document.getElementById(`${signInForm.id}_email`);
                let password = document.getElementById(`${signInForm.id}_password`);
                firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                    .catch(function (error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            formError('Wrong password.');

                        } else {
                            formError(errorMessage);
                        }
                        console.log(error);
                    });
                e.preventDefault();    //stop form from submitting
            });
            appContainer.appendChild(signInForm);
            let signUp = document.createElement('a');
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
                e.preventDefault();    //stop form from submitting
            });
            let forgot = document.createElement('a');
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
                e.preventDefault();    //stop form from submitting
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


function windowSwitcher(targetWindow){
    let window = document.getElementById('window');

    switch (targetWindow) {
        case 'new_project':
            window.classList.add('cci');
            window.innerHTML = '';
            let contentBlock = document.createElement('div');
            contentBlock.id = 'window_content_block';
            contentBlock.innerHTML =
                '<h2>Create a New Project</h2>' +
                '<p>Project Name:</p>' +
                '<input type="text" placeholder="My Project Name...">' +
                '<p>Make Project Private or Public Project</p>' +
                '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' +
                '<label for="private">Private</label>' +
                '<input class="input-radio" type="radio" name="access" id="public" value="Public">'+
                '<label for="public">Public</label><br>' +
                '<button>Create</button>' ;

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
    let appContainer = document.getElementById('app_container');
    // Try to remove the previous error message.
    try {
        document.getElementById('error_message').remove();
    } catch (e) {
    }
    let errorMessage = document.createElement('div');
    errorMessage['innerText'] = msg;
    errorMessage.style.color = 'red';
    errorMessage.style.margin = '1rem';
    errorMessage.id = 'error_message';
    appContainer.appendChild(errorMessage);
}