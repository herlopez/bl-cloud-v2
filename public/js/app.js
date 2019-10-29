// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
(function (funcName, baseObj) {funcName = funcName || "docReady";baseObj = baseObj || window;let readyList = [];let readyFired = false;let readyEventHandlersInstalled = false;function ready() {if (!readyFired) {readyFired = true;for (let i = 0; i < readyList.length; i++) {readyList[i].fn.call(window, readyList[i].ctx);}readyList = [];}}function readyStateChange() {if (document.readyState === "complete") {ready();}}baseObj[funcName] = function (callback, context) {if (typeof callback !== "function") {throw new TypeError("callback for docReady(fn) must be a function");}if (readyFired) {setTimeout(function () {callback(context);}, 1);return;} else {readyList.push({fn: callback, ctx: context});}if (document.readyState === "complete") {setTimeout(ready, 1);} else if (!readyEventHandlersInstalled) {if (document.addEventListener) {document.addEventListener("DOMContentLoaded", ready, false);window.addEventListener("load", ready, false);} else {document.attachEvent("onreadystatechange", readyStateChange);window.attachEvent("onload", ready);}readyEventHandlersInstalled = true;}}})("docReady", window);
var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

function windowError(window, msg){
    let appContainer = document.getElementById(window);
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
    errorMessage.style.textAlign = 'center';
    appContainer.appendChild(errorMessage);
}
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


let ws, wsHandler;
let currentView, currentProject;
let currentUid = null;
let currentId = null;
let edit = false;


docReady(function () {

    // Set up some
    initializeProfile(); // --> profile.js

    let serverStatus = false;

    // Set the view to the login screen.
    viewSwitcher('sign_in');

    // When an authentication state has changed.
    firebase.auth().onAuthStateChanged(function (user) {

        // If the user is authenticated.
        if (user) {

            // Set the users profile image and information.
            setProfileInformation(user); // --> profile.js

            // Store a global value of the current user ID.
            currentUid = user.uid;

            // Show that users project view.
            viewSwitcher('projects');

            // Start the websocket connection interval with the server.
            wsHandler = setInterval(() => {

                // If not connected and the user it authenticated, try to connect to the server with a websocket.
                if (!serverStatus && user) {

                    // Try to connect.
                    try {

                        // Get the user id Token from firebase.
                        user.getIdToken(true).then(function(idToken) {

                            // If in development environment. Initialize websocket.
                            if(window.location.href.toUpperCase().includes('LOCALHOST')){
                                ws = new WebSocket(`ws://localhost:8080/?token=${idToken}&uid=${user.uid}`);
                            }
                            else{
                                ws = new WebSocket(`wss://cloud.brilliantlabs.ca/wsapi/?token=${idToken}&uid=${user.uid}`);
                            }

                            // Triggered when the ws is opened.
                            ws.onopen = function open() {
                                serverStatus = true;
                                getProjects(currentUid);
                            };

                            // Triggered when the ws is closed.
                            ws.onclose = function close() {
                                serverStatus = false;
                            };

                            ws.onmessage = function incoming(data) {
                                // Process incoming messages.
                                messageProcessor(data, ws); // --> message-processor.js
                            };

                            //  WebSocket Error
                            ws.error = function incoming(data) {
                                console.log("Error: ", data);
                            }

                        }).catch(function(e) {
                            //  WebSocket Error
                            console.log(e);
                            serverStatus = false;
                        });


                    } catch (e) {
                        //  WebSocket Error
                        console.log(e);
                        serverStatus = false;
                    }
                }
            }, 1000)

        }

        else {
            currentUid = null;
            viewSwitcher('sign_in');

            // Set profile to default settings.
            setDefaultProfile(); // --> profile.js
            clearInterval(wsHandler);
        }
    });

});








function viewSwitcher(targetView, options) {
    currentView = targetView;
    switch (targetView) {
        case 'project':
        case 'projectSingle':
            projectView(options);
            break;

        case 'forgot_password':
            forgotPasswordView();
            break;

        case 'sign_up':
            signUpView();
            break;

        case 'projects':
        case 'dashboard':
            projectsView();
            break;

        case 'pw_reset_success':
            passwordResetSuccessView();
            break;

        case 'sign_in':
            signInView();
            break;

        default:
            viewSwitcher('sign_in');
            break;
    }
}
function signInView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.classList.remove('project-dash');
    appContainer.style.userSelect = 'none';
    let signInLogo = document.createElement('img');
    signInLogo.src = "/images/logo.png";
    signInLogo.width = '300';
    signInLogo.style.marginBottom = "1rem";
    appContainer.appendChild(signInLogo);
    let signInForm = document.createElement('form');
    signInForm.id = "main_sign_in";
    signInForm.classList = 'c jc ac';
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
                // console.log(error);
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

}
function passwordResetSuccessView(){
    let appContainer = document.getElementById('app_container');
    appContainer.classList.remove('project-dash');
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
}
function signUpView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.remove('project-single');
    let signUpLogo = document.createElement('img');
    signUpLogo.src = "/images/logo.png";
    signUpLogo.width = '300';
    signUpLogo.style.marginBottom = "1rem";
    appContainer.appendChild(signUpLogo);
    let signUpForm = document.createElement('form');
    signUpForm.id = "main_sign_up";
    signUpForm.classList = 'c jc ac';
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
                // console.log(error);
            }).then(function(){
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: firstName.value + " " + lastName.value,
            }).then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
            });
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
}

function projectView(id){

    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.add('project-single');

    // Top bar stuff.
    let singleHeader = document.createElement('header');
    singleHeader.style.padding = 0;
    let backButton = document.createElement('button');
    backButton.style.marginTop = 0;
    backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
    backButton.addEventListener('click', ()=>{
        currentProject = null;
        viewSwitcher('dashboard');
    });
    singleHeader.appendChild(backButton);
    let menu = document.createElement('div');
    menu.id = "menu_box";

    let dashboard = document.createElement('div');

    dashboard.classList = "dashboar-button";
    dashboard.inneinneeHTML = "<i class='fa fa-chart'></i>Dashboard"
    menu.appendChild(dashboard);




    appContainer.appendChild(menu);




    menu.appendChild(singleHeader);
    let content = document.createElement('div');
    content.id = "content_box";
    appContainer.appendChild(content);

    let projectSection = document.createElement('section');
    projectSection.id = "project_projectSection";
    projectSection.innerHTML = "<div class=\"loader\"></div>";
    projectSection.style.overflow = "scroll";
    projectSection.classList.add('r');
    projectSection.classList.add('jc');
    projectSection.classList.add('ac');
    content.appendChild(projectSection);
    getProject(currentUid, id);
}
/*
    Projects View
    Description: Shows all the users projects.
*/
function projectsView(){

    // Empty the app container
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.add('project-dash');
    appContainer.classList.remove('project-single');

    // Add a loader until the projects get populated.
    let section = document.createElement('section');
    section.id = "project_section";
    section.innerHTML = "<div  class=\"loader\"></div>";
    section.style.overflow = "scroll";
    section.classList = 'r jc ac acfs';


    // Add a search bar to search threw all a users projects.
    let search = document.createElement('div');
    search.classList = "rmd jfs w100 pl5";
    search.innerHTML = "<h2 class='w100'>Your Cloud Projects</h2><br><div style='' class='r jc prmd22 ac'><i class='m2 r jc ac fas fa-search'></i> <input id = 'project_search'  onkeyup=\"projectSearch()\" placeholder='Search'><button id='project_search_clear'class='m2 r jc ac fas fa-times-circle'></button></div>";

    // Add the elements to the app.
    appContainer.appendChild(search);
    appContainer.appendChild(section);

    // Send the request to the server to send the users projects.
    if(ws) getProjects(currentUid);
}


function forgotPasswordView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.remove('project-single');
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
    forgotPasswordForm.classList = 'c jc ac';
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
}
function h1(parentElement, options) {
    let h1 = document.createElement('h1');
    if(options.hasOwnProperty('innerText')) h1.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    h1.classList = options.classList;
    h1.id = options.id;
    parentElement.appendChild(h1);
}
function h2(parentElement, options) {
    let h2 = document.createElement('h2');
    if(options.hasOwnProperty('innerText')) h2.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    h2.classList = options.classList;
    h2.id = options.id;
    parentElement.appendChild(h2);
}
function p(parentElement, options) {
    let p = document.createElement('p');
    if(options.hasOwnProperty('innerText')) p.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    p.classList = options.classList;
    p.id = options.id;
    parentElement.appendChild(p);
}
function input(parentElement, options = {}){
    if(!options.hasOwnProperty('type')) options.type = 'text';
    if(!options.hasOwnProperty('placeholder')) options.placeholder = '';
    if(!options.hasOwnProperty('edit')) options.edit = false;
    if(!options.hasOwnProperty('value')) options.value = "";
    if(!options.hasOwnProperty('name')) options.name = "";
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('class')) options.class = "";
    if(!options.hasOwnProperty('autofocus')) options.autofocus = false;
    if(!options.hasOwnProperty('onSaveMessage')) options.onSaveMessage = "";
    if(!options.hasOwnProperty('disabled')) options.disabled = false;
    if(!options.hasOwnProperty('required')) options.required = false;
    if(!options.hasOwnProperty('onCancel')) options.onCancel = {};
    if(!options.hasOwnProperty('onSave')) options.onSave = {};


    let disabled = "";
    let required = "";
    let autofocus = "off";

    if(options.disabled === true || options.edit === true) disabled = "disabled";
    if(options.required === true) required = "required";
    if(options.autofocus  === true || options.autofocus === "on")autofocus = "on";

    let inputContainer = document.createElement('div');
    inputContainer.classList.add('component-input');
    inputContainer.innerHTML = `<input max="30" ${required} ${disabled} autofocus = "${autofocus}"  class = "${options.class}" id = "${options.id}" name = "${options.name}" value = "${options.value}" type = "${options.type}" placeholder= "${options.placeholder}" >`;
    let inputTag = inputContainer.querySelector('input');

    if(options.edit === true){

        let editButton = document.createElement('i');
        let closeButton = document.createElement('i');

        closeButton.classList = 'fa fa-times dn';
        editButton.classList = 'fa fa-pencil-alt';
        let errorPopup = document.createElement('div');
        errorPopup.classList = "r ac jc dn error-popup px3 py1";
        errorPopup.innerHTML = '<i class="pr3 fa fa-exclamation"></i> <p></p><i class="fa fa-times-circle">';
        inputContainer.appendChild(errorPopup);


        inputTag.disabled = true;
        let oldInputValue = inputTag.value;
        function loaderMode(){
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.add('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }
        function editMode(){
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.add('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.remove('dn');
            inputTag.disabled = false;
            errorPopup.classList.add('dn');
        }
        function pencilMode(){
            editButton.classList.add('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }



        editButton.addEventListener('click', async () => {
            if (editButton.classList.contains('fa-pencil-alt')) {
                oldInputValue = inputTag.value;
                editMode();
            } else {

                if (options.hasOwnProperty('onSave')) {
                    let timeout = setTimeout(() => {
                        inputTag.value = oldInputValue;
                        pencilMode();
                    }, 4000);
                    try {
                        loaderMode();
                        console.log('on save: ', await options.onSave());
                        let popupError = inputContainer.querySelector('.error-popup');
                        popupError.innerHTML = '<i class="pr3 fa fa-check"></i> <p></p>';
                        popupError.classList.remove('dn');
                        setTimeout(()=>{
                            popupError.classList.add('dn');

                        }, 3000);
                        popupError.classList.add('error-popup-success');
                        inputContainer.querySelector('p').innerText = 'Success. ' + options.onSaveMessage;
                        pencilMode();
                        clearInterval(timeout);

                    } catch (e) {
                        inputTag.value = oldInputValue;
                        pencilMode();
                        if(e.message !== 'none'){
                        inputContainer.querySelector('p').innerText = e.message;
                        let popupError = inputContainer.querySelector('.error-popup');
                        popupError.classList.remove('dn');
                        popupError.querySelector('.fa-times-circle').addEventListener('click', ()=>{
                            popupError.classList.add('dn');
                        });
                        }
                        clearInterval(timeout);
                    }


                } else {
                    pencilMode();
                }
            }
        });

        closeButton.addEventListener('click', ()=>{
            pencilMode();
            inputTag.value = oldInputValue;
            if(options.hasOwnProperty('onCancel')) {
                options.onCancel();
            }
        });

        inputContainer.appendChild(editButton);
        inputContainer.appendChild(closeButton);

    }
    parentElement.appendChild(inputContainer);
    return inputTag;
}

function initializeProfile(){
    document.getElementById('profile_image').addEventListener('click', ()=>{
        document.getElementById('profile_window').classList.toggle('dn');
        let profileWindow = document.getElementById('window');
        profileWindow.classList.add('cr');
        profileWindow.classList.add('ac');
        profileWindow.classList.add('jc');
        profileWindow.classList.remove('dn');
        profileWindow.innerHTML = '';
        profileWindow.addEventListener('click', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')){
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }


        });
        window.addEventListener('resize', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')) {
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }
        });
    });
}

function setProfileInformation(user) {
    document.getElementById('profile_image').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('profile_image').classList.remove('dn');
    document.getElementById('profile_image_sidebar').classList.remove('dn');
    document.getElementById('profile_image_sidebar').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('user_email').innerText = user.email;
    document.getElementById('user_name').innerText = user.displayName;
}
function setDefaultProfile(){
    document.getElementById('profile_image').classList.add('dn');
    document.getElementById('profile_image').src = `/images/empty-avatar.png`;
    document.getElementById('profile_image_sidebar').classList.add('dn');
    document.getElementById('profile_image_sidebar').src = `/images/empty-avatar.png`;
}


// Function that opens a pop up window.
function windowSwitcher(targetWindow, options){
    console.log('targetWindow: ', targetWindow);
    let window = document.getElementById('window');

    function windowHide(){
        window.classList.remove('cr');
        window.classList.remove('ac');
        window.classList.remove('jc');
        window.classList.add('dn');
        window.innerHTML = '';
    }
    function windowShow(){
        window.classList.add('cr');
        window.classList.add('ac');
        window.classList.add('jc');
        window.classList.remove('dn');
        window.innerHTML = '';
    }

    switch (targetWindow) {

        // No window Shown.
        case 'none':
            windowHide();
        break;

        case 'profile_settings':
            document.getElementById('profile_window').classList.add('dn');
            windowHide();
            windowShow();
            let profileSettings = document.createElement('div');
            profileSettings.id = 'window_content_block';
            profileSettings.classList.add('update-profile');
            let user = firebase.auth().currentUser;
            let profileSettingsForm = document.createElement('form');
            profileSettingsForm.id = 'update_profile';
            h2(profileSettings, {
                innerText: "Profile Settings"
            });

            p(profileSettings, {
                innerText: "Display Name"
            });

            let displayNameInput = input(profileSettings, {
                type: 'test',
                edit: true,
                onSaveMessage: "Display name has been changed.",
                value: user.displayName,
                required: true,
                disabled: true,
                onSave : async () =>{
                    console.log("Save");
                    if( user.displayName === displayNameInput.value){
                        throw new Error('none');
                    }
                    user.updateProfile({
                        displayName: displayNameInput.value
                    }).then(function() {
                        displayNameInput.value = user.displayName;
                        setProfileInformation(user);
                    }).catch(function(error) {
                        throw error;
                    });
                }
            });

            p(profileSettings, {
                innerText: "Email Address"
            });
            let emailInput = input(profileSettings, {
                    type: 'test',
                    edit: true,
                    onSaveMessage: "A verification email was sent to your new email address.",
                    value: user.email,
                    required: true,
                    onSave : async function () {
                        console.log("Save: ", emailInput.value);
                        if( user.email === emailInput.value){
                            throw new Error('none');
                        }
                        await user.updateEmail(emailInput.value).then(async function () {
                            await user.sendEmailVerification().then(function () {
                            }).catch(function (error) {
                                throw error;
                            });
                        }).catch(function (error) {
                            throw error;
                        }).then(()=>{
                            setProfileInformation(user);
                        });

                    },
                disabled: true
            });

            p(profileSettings, {
                innerText: "Password"
            });
            let passwordInput = input(profileSettings, {
                type: 'password',
                edit: true,
                onSaveMessage: "Your password has been changed.",
                value: "******",
                required: true,
                onSave : async function () {

                    if(passwordInput.value !== "******"){
                        await user.updatePassword(passwordInput.value).then(function() {
                            // Update successful.
                        }).catch(function(error) {
                            throw error;
                        });
                    }else {
                        throw new Error('none');
                    }

                },
                disabled: true
            });

            let closeContent = document.createElement('div');
            closeContent.classList = "c ac jc w100";
            closeContent.innerHTML ='    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
                `    <button onclick="windowSwitcher('none')">Close</button></div>`;
            profileSettings.appendChild(closeContent);
            window.appendChild(profileSettings);
        break;

        // Creating a new project window.
        case 'new_project':
            windowShow();
            let contentBlock = document.createElement('div');
            contentBlock.id = 'window_content_block';
            contentBlock.innerHTML =
                '<form id="create_project"> ' +
                '<h2>Create a New Project</h2>' +
                '<p>Project Name:</p>' +
                '<input required type="text" id="project" placeholder="My Project Name...">' +
                '<p>Project Description:</p>' +
                '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' +
                '<p>Make this project Private or Public:</p>' +
                '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' +
                '<label for="private">Private</label><br>' +
                '<input class="input-radio" type="radio" name="access" id="public" value="Public">'+
                '<label for="public">Public</label><br>' +
                // '<div class="r ac"> <p>Project Color: </p>'+
                '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> '+
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(contentBlock);
            document.getElementById('create_project').addEventListener('submit',(e) => {
                createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value,document.getElementById('color').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
            });
            break;

        // Create a new variable window.
        case 'new_variable':
            windowShow();
            let newVariableContentBlock = document.createElement('div');
            newVariableContentBlock.id = 'window_content_block';
            newVariableContentBlock.innerHTML =
                '<form id="new_variable"> ' +
                '<h2>Create a New Variable</h2>' +
                '<p>Variable Name:</p>' +
                '<input class="" required type="text" id="project" placeholder="My Variable Name...">' +
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(newVariableContentBlock);
            document.getElementById('new_variable').addEventListener('submit',(e) => {
                createVariable(document.getElementById('project').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
            });
        break;
    }
}

/*
    Get Projects
    @Desc: Tell the server to send over the list of all the projects of a specific user.
    @param: uid - User ID
*/
function getProjects(uid){
    let project = {
        "uid": uid,
        "cmd" : 'GET_PROJECTS',
    };
    ws.send(JSON.stringify(project));
}

/*
    Get Project
    @Desc: Tell the server to send over the information for a specific project.
    @param: uid - User ID
    @param id - Project ID
*/
function getProject(uid, id){
    let project = {
        "uid": uid,
        "id": id,
        "cmd": "GET_PROJECT"
    };
    ws.send(JSON.stringify(project));
}

/*
    Create Project
    @Desc: Tell the server create a new project for a given user.
    @param: name - Name 0f project.
    @param desc - Project description.
    @param access - Project access.
    @param color - Project color.
    @param uid - User id of the user.
*/
function createProject(name, desc, access, color, uid){
    let project = {
        uid: uid,
        cmd : "CREATE_PROJECT",
        name : name,
        color: color,
        description : desc,
        access: access
    };
    ws.send(JSON.stringify(project));
}


function messageProcessor(message, callback) {

    // Try to parse the JSON message.
    try {
        console.log("Message : PARSE:  ", message);
        message = JSON.parse(message.data);
    } catch (e) {
        console.log(e);
        callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
        return;
    }

    // If a command was sent.
    if(message.hasOwnProperty('cmd')){{

        // Print command.
        console.log("Cmd Received: ", message.cmd);


        switch (message.cmd) {

            // Server sends back a list of all a users projects.
            case 'GET_PROJECTS':
                try{
                    let projects = message['results'];

                    if(currentView === 'projectSingle' && !edit){
                        function findProject(p){
                            return p.id === currentProject;
                        }
                        updateProject(projects.find(findProject), currentProject);
                    }else{
                        paintProjects(projects);
                    }

                }catch (e) {
                    console.log(e);
                }
            break;

            // Server sends back a the data foa a users project.
            case 'GET_PROJECT':
                try{
                    message = message['results'][0];
                    paintProject(message);
                }catch (e) {
                    console.log(e);
                }
                break;

            case 'CREATE_CHART_CB':
            case 'ERASE_VARIABLE_CB':
            case 'ERASE_CHART_CB':
            case 'NEW_VARIABLE_CB':
            case 'SET_VARIABLE_CB':
                console.log("Message: ", message);
                if(currentView === 'dashboard'){
                    getProjects(currentUid);
                }
                else if(currentView === 'projectSingle'){
                    if(message.hasOwnProperty('error')){
                        windowError('new_variable', message['error']);
                        return;
                    }
                    getProject(currentUid, currentProject);
                    windowSwitcher('none');
                }

                break;
            
            case 'SET_VARIABLE':
                if(message.hasOwnProperty('error')){
                    return;
                }
                console.log(message)
                if(currentView === 'projectSingle'){
                    document.getElementById(message.id).classList.add('done');
                }
                break;
            case 'CREATE_PROJECT':
                console.log("Project msg: ", message);
                if(message.hasOwnProperty('error')){
                    console.log(message['error'])
                    windowError('create_project',message['error']);
                    return;
                }
                if(currentView === 'dashboard'){
                    getProjects(currentUid);
                    windowSwitcher('none');
                }

                break;



            default:
                break;
        }
    }}

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

function paintProjects(projects){
    let projectSection = document.getElementById('project_section');
    if(projectSection.classList.contains('hold')){
        return;
    }
    projectSection.classList.add('jc');
    projectSection.classList.remove('ac');
    projectSection.style.flexWrap = 'wrap';
    projectSection.style.overflow = 'visible';
    projectSection.style.maxWidth ="1500px";
    projectSection.style.minHeight = "100vh";
    projectSection.style.height = "100%";
    projectSection.innerHTML = "";
    let newButton = document.createElement('button');
    newButton.innerHTML = "<i class=\"fas fa-plus\"></br></br>Add Project</i>";
    newButton.style.height = "200px";
    newButton.style.minWidth = "300px";
    newButton.style.maxWidth = "300px";
    newButton.style.color = "#9b55a3";
    newButton.style.background = "rgba(3, 4, 8, 0.46)";
    newButton.addEventListener('click', ()=>{
        windowSwitcher('new_project');
    });
    projectSection.appendChild(newButton);
    for(let project in projects){
        if(projects.hasOwnProperty(project)) {
            let div = document.createElement('button');
            div.style.height = "200px";
            div.style.minWidth = "300px";
            div.style.maxWidth = "300px";
            // div.style.background = projects[project]['color'];
            div.style.background = "rgba(3, 4, 8, 0.46)";
            div.id = projects[project]['id'];
            div.borderRadius = "10px";
            div.innerHTML = `<h3>${projects[project]['name']}</h3><p>${projects[project]['description']}</p><i class="fa fa-code"</i> ${projects[project]['variableCount']} <i class="fa fa-chart-bar"</i> ${projects[project]['chartCount']} `;
            div.addEventListener('click', () => {
                viewSwitcher('project', div.id)

            });
            projectSection.appendChild(div);
        }
    }
}

function projectSearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("project_search");
    filter = input.value.toUpperCase();
    var clearButton = document.getElementById("project_search_clear");
    clearButton.addEventListener('click', ()=>{
        input.value = '';
        document.getElementById("project_search_clear").style.color = 'transparent';
        ul = document.getElementById("project_section");
        li = ul.getElementsByTagName("button");
        for (i = 1; i < li.length; i++) {
            a = li[i].getElementsByTagName("h3")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf("") > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
    if(filter.length > 0){
        clearButton.style.color = '#9b55a3';
    }else{
        clearButton.style.color = 'transparent';
    }
    ul = document.getElementById("project_section");
    li = ul.getElementsByTagName("button");
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function paintProject(data){

    let project = document.getElementById('project_projectSection');
    currentProject = data.id;
    project.classList = 'w100 c ac jc';
    project.style = {
        height: "100%",
        overflow: "visible"
    };
    project.innerHTML = `
                    <div style="" class="w100 c ac">
                    <h1 style="" class="m0">${data.name}</h1>
                    <h3 style="">${data.description}</h3>
                    <div class="r js ac">
                        <h4>Project Key: </h4>
                         <input class="ml2" id="project_key" value="${data.key}" disabled>
                    </div>
                   
                    <div style="height: 100%; overflow: visible;" class="w100 rxl ac jc">
                        <div id="variables" class="m1 variables c jfs ac w100xl"> 
                            <h3 class="mb0">Variables <button class="fa fa-plus" onclick="windowSwitcher('new_variable')"></button><button onclick="editVariables()" style="padding: 8px 30px;" class="m0 p0 fa fa-pencil-alt" id = "var_button" onclick=""></button></h3>
                            <!--<div class="r jc ac">-->
                                <!--<i class="mr1 fa fa-search"></i>-->
                                <!--<input type="search" id="variable-search">-->
                            <!--</div>-->
                        </div>
                        <div id="charts" class="m1 charts c jfs ac w100xl">
                            <h3 class="mb0">Charts</h3>
                            <p style="background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;">No Charts 🙁</p>
                            <!--<div class="r jc ac">-->
                                <!--<i class="mr1 fa fa-search"></i>-->
                                <!--<input type="search" id="variable-search">-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>`;

    document.getElementById('content_box').appendChild(project);
    let variables = document.getElementById('variables');
    let vars = data.variables;
    let count = 0;
    for(var variable in vars){
        if(variable === 'default'){
            continue;
        }
        let newVar = document.createElement('div');
        newVar.id = "var_" + variable;
        newVar.innerHTML = `

                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${data.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                </div>`;
        variables.appendChild(newVar);
        count ++;
    }
    if(!count){
        let noVars = document.createElement('div');
        noVars.innerHTML = `<p style="background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;">No Variables 🙁</p>`;
        variables.appendChild(noVars);
        return;
    }
    // console.log('Project Options: ', message);
}

function createVariable(name, uid){
    console.log('Creating Var: ', name, uid);
    let ele = document.getElementById('project_key');
    ws.send(`{"cmd":"CREATE_VARIABLE", "key":"${ele.value}", "name":"${name}", "onSuccess":"console.log('Success!'); windowSwitcher('none'); getProjects(currentUid);", "onError":""}`);
}




function updateProject(project, id){
    let variables = document.getElementById('variables');
    if(variables.classList.contains('hold')){
        return;
    }
    let vars = project.variables;
    let count = 0;
    for(var variable in vars){
        if(variable === 'default'){
            continue;
        }
        // console.log(variables.querySelector('variable'));
        let newVar = document.getElementById( "var_" + variable);
        newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
        newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
        newVar.innerHTML = `
                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${project.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                </div>`;
        variables.appendChild(newVar);


    }

}










function editVariables(){
    if(currentView === 'projectSingle'){
        let variables = document.getElementById('variables');
        console.log(document.getElementById('variables'));

    }
}
// Handles the events of editing a variable value in the UI.
function variableEdit(id, key = null){
    // console.log('key: ', id);
    edit = true;
    let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
    error.classList.add('dn');
    // Get the input element.
    let inputString =`var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);

    // Make the input editable by removing the disabled attribute.
    input.removeAttribute('disabled');

    // Store the current value, so that if someone decides to cancel instead of editing the variable, it will set the input back to the original value (oldValue).
    let oldValue = input.value;

    // Get the edit button and switch it to the check mark styling, also remove the onClick attribute.
    let button = document.getElementById(id);
    button.classList.remove('fa-pencil-alt');
    button.classList.add('fa-check');
    button.classList.add('double-button');
    button.style.color = 'green';
    button.removeAttribute('onClick');

    // Add a click listener in the event that the save (check mark) button is clicked.
    button.setAttribute('onclick', `variableSave(id, "${oldValue}","${key}")`);
    // Get the second close button element. "Currently Hidden".
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);

    // Remove the dn class which is hiding it. So it is now visible.
    button2.classList.remove('dn');

    // Add this class to translate it into position inside the input element.
    button2.classList.add('double-button2');

    // Set the color to red.
    button2.style.color = 'red';

    // When someone clicks the red cross to cancel the variable edit.
    button2.addEventListener('click', ()=>{
        edit = false;

        // Get the input ele.
        let input2 = document.getElementById(inputString);

        // Set it back to the original value.
        input2.value = oldValue;

        // Disabled it again.
        input2.setAttribute('disabled', true);

        // Remove the check mark and add the pencil and styling again to the edit button.
        button.classList.add('fa-pencil-alt');
        button.classList.remove('fa-check', 'loader-small');
        button.style.color = '#9b55a3';
        button.classList.remove('double-button'); // Translation to give room to the cross button.

        // Set the on click function back to this.
        button.setAttribute('onClick', `variableEdit(id, '${key}')`);

        // Hide the close button.
        button2.classList.add('dn');
    });


}
function variableSave(id, old, key){
    let editButton = document.getElementById(id);
    editButton.classList.remove('fa-check');
    editButton.classList.remove('fa-pencil-alt');
    editButton.classList.add('loader-small', 'double-button-load');
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);
    button2.classList.add('dn');
    let inputString =`var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);
    input.setAttribute('disabled', true);
    let name = document.getElementById(`var_name_${id.substring('var_button_'.length)}`);
    let errorElement = `var_error_${id.substring('var_button_'.length)}`;
    ws.send(`{"cmd":"SET_VARIABLE", "key":"${key}", "name":"${name.value}", "value":"${input.value}", "onSuccess":"console.log('Success!'); var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', \`variableEdit(id, '${key}')\`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); ", "onError":"var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('${errorElement}'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;"}`);
    setTimeout(()=>{
        if(!editButton.classList.contains('done')) {
            editButton.classList.add('fa-pencil-alt');
            edit = false;
            editButton.classList.remove('fa-check', 'loader-small', 'double-button-load');
            editButton.style.color = '#9b55a3';
            editButton.classList.remove('double-button'); // Translation to give room to the cross button.
            let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
            error.classList.remove('dn');
            input.value = old;
            // Set the on click function back to this.
            editButton.setAttribute('onClick', `variableEdit(id, '${key}')`);
        }
    }, 3000);
}

