// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
(function (funcName, baseObj) {funcName = funcName || "docReady";baseObj = baseObj || window;let readyList = [];let readyFired = false;let readyEventHandlersInstalled = false;function ready() {if (!readyFired) {readyFired = true;for (let i = 0; i < readyList.length; i++) {readyList[i].fn.call(window, readyList[i].ctx);}readyList = [];}}function readyStateChange() {if (document.readyState === "complete") {ready();}}baseObj[funcName] = function (callback, context) {if (typeof callback !== "function") {throw new TypeError("callback for docReady(fn) must be a function");}if (readyFired) {setTimeout(function () {callback(context);}, 1);return;} else {readyList.push({fn: callback, ctx: context});}if (document.readyState === "complete") {setTimeout(ready, 1);} else if (!readyEventHandlersInstalled) {if (document.addEventListener) {document.addEventListener("DOMContentLoaded", ready, false);window.addEventListener("load", ready, false);} else {document.attachEvent("onreadystatechange", readyStateChange);window.attachEvent("onload", ready);}readyEventHandlersInstalled = true;}}})("docReady", window);
let ws, wsHandler;
let currentView, currentProject;
let currentUid = null;
let edit = false;
// When the dom is loaded (Document Ready)
docReady(function () {

    let serverStatus = false;
    viewSwitcher('sign_in');
    var database = firebase.database();


    // When an authentication state has changed.
    firebase.auth().onAuthStateChanged(function (user) {

        // If the user is authenticated.
        if (user) {
            currentUid = user.uid;
            // Show that users project view.
            viewSwitcher('project');

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
                            }else{
                                ws = new WebSocket(`wss://cloud.brilliantlabs.ca/wsapi/?token=${idToken}&uid=${user.uid}`);
                            }

                            // Triggered when the ws is opened.
                            ws.onopen = function open() {
                                serverStatus = true;
                                // console.log('connected');
                                getProjects(currentUid);
                                setInterval(()=>{
                                    getProjects(currentUid);
                                }, 100);
                            };

                            // Triggered when the ws is closed.
                            ws.onclose = function close() {
                                serverStatus = false;
                                // console.log('disconnected');
                            };
                            ws.onmessage = function incoming(data) {
                                // console.log(data);
                                messageProcessor(data, ws);
                            };
                            ws.error = function incoming(data) {
                                // console.log(data);
                            }
                        }).catch(function(e) {
                            // console.log(e);
                            serverStatus = false;
                        });
                    } catch (e) {
                        // console.log(e);
                        serverStatus = false;
                    }
                }
            }, 1000)
        } else {
            currentUid = null;
            viewSwitcher('sign_in');
            clearInterval(wsHandler);
        }
    });

});


function messageProcessor(message, callback) {
    // console.log('Message Received: ', message);
    try {
        // console.log(message);
        message = JSON.parse(message.data);
        // console.log(message.results);
    } catch (e) {
        // console.log(e);
        callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
        return;
    }
    if(message.hasOwnProperty('cmd')){{
        switch (message.cmd) {
            case 'PROJECTS':
                // console.log("Project");
                try{
                    let projects =message['results'];

                    if(currentView === 'projectSingle' && !edit){
                        function findProject(p){
                            return p.id === currentProject;
                        }
                        updateProject(projects.find(findProject), currentProject);
                    }else{

                        paintProjects(projects);

                    }


                }catch (e) {
                    // console.log(e);
                }
                break;
            default:
                break;
        }
    }}

    if (message.hasOwnProperty('fn')) {
        console.log('Function!!!');
        let fn = message['fn'];
        try {
            let iFn = new Function(fn);
            iFn();
        } catch (e) {
            callback.send(`{"error":"Unable to execute function: ${e}"}`);
        }
    }
}

function viewSwitcher(targetView, options) {
    let appContainer = document.getElementById('app_container');
    currentView= targetView;
    switch (targetView) {

        case 'projectSingle':
            appContainer.innerHTML = '';
            appContainer.style.userSelect = 'none';
            appContainer.classList.remove('project-dash');
            appContainer.classList.add('project-single');
            let singleHeader = document.createElement('header');
            let backButton = document.createElement('button');
            backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
            backButton.addEventListener('click', ()=>{
                currentProject = null;
                viewSwitcher('project');
            });
            singleHeader.appendChild(backButton);
            let singleLogout = document.createElement('button');
            singleLogout.id = 'logout';
            singleLogout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
            singleLogout.addEventListener('click', () => {
                ws.close();
                firebase.auth().signOut();
            });
            singleHeader.appendChild(singleLogout);
            appContainer.appendChild(singleHeader);
            let project = document.createElement('div');
            currentProject = options.id;
            project.classList = 'w100 c ac jc';
            project.innerHTML = `
                <div style="" class="w100 c ac">
                    <h1 style="" class="m0">${options.name}</h1>
                    <h3 style="">${options.description}</h3>
                    <div class="r js ac">
                        <h4>Project Key: </h4>
                         <input class="ml2" id="project_key" value="${options.key}" disabled>
                    </div>
                   
                    <div class="w100 rxl ac jc">
                        <div id="variables" class="m1 variables c jfs ac w100xl"> 
                            <h3 class="mb0">Variables <button class="fa fa-plus" onclick="windowSwitcher('new_variable')"></button><button class="m0 p0 fa fa-pencil-alt" id = "var_button" onclick=""></button></h3>
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

            appContainer.appendChild(project);
            let variables = document.getElementById('variables');
            let vars = options.variables;
            let count = 0;
            for(var variable in vars){
                if(variable === 'default'){
                    continue;
                }
                let newVar = document.createElement('div');
                newVar.id = "var_" + variable;
                newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
                newVar.innerHTML = `

                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${options.key}')"></button>
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
            // console.log('Project Options: ', options);

        break;

        // Forgot Password View
        case 'forgot_password':
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
            break;

        // Sign Up View
        case 'sign_up':
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
                        // console.log(error);
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
            appContainer.classList.remove('project-single');
            let header = document.createElement('header');
            let newButton = document.createElement('button');
            newButton.innerHTML = "<i class=\"fas fa-plus\"></i>";
            newButton.addEventListener('click', ()=>{
                windowSwitcher('new_project');
            });
            header.appendChild(newButton);
            let logout = document.createElement('button');
            logout.id = 'logout';
            logout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
            logout.addEventListener('click', () => {
                ws.close();
                firebase.auth().signOut();
            });
            header.appendChild(logout);
            let section = document.createElement('section');
            section.id = "project_section";
            section.innerHTML = "<div class=\"loader\"></div>";
            section.style.overflow = "scroll";
            section.classList.add('r');
            section.classList.add('jc');
            section.classList.add('ac');




            // each project here
            let myPrj = document.createElement('h2');
            myPrj.innerHTML = "My Projects<br><hr>";

            let footer = document.createElement('footer');
            appContainer.appendChild(header);
            appContainer.appendChild(myPrj);
            appContainer.appendChild(section);
            appContainer.appendChild(footer);
            if(ws) getProjects(currentUid);
            break;

        // Password Reset View
        case 'pw_reset_success':
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
            break;

        // Login View
        case 'sign_in':
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

            break;

        // Default
        default:
            viewSwitcher('sign_in');
        break;
    }
}


function windowSwitcher(targetWindow, options){
    let window = document.getElementById('window');

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
                    '<div class="r ac"> <p>Project Color: </p>'+
                    '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color"></div> '+
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
        case 'new_variable':
            window.classList.add('cr');
            window.classList.add('ac');
            window.classList.add('jc');
            window.classList.remove('dn');
            window.innerHTML = '';
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
                console.log(currentProject.key)
                createVariable(document.getElementById('project').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
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
function createProject(name, desc, access, color, uid){
    // console.log('Creating Project: ', name, desc, access, uid);
    let project = {
        "uid": uid,
        "cmd" : 'CREATE_PROJECT',
        "name" : name,
        "color": color,
        "description" : desc,
        "access": access
    };
    ws.send(JSON.stringify(project));
}
function createVariable(name, uid){
    console.log('Creating Var: ', name, uid);
    let ele = document.getElementById('project_key');
    ws.send(`{"cmd":"CREATE_VARIABLE", "key":"${ele.value}", "name":"${name}", "onSuccess":"console.log('Success!'); windowSwitcher('none'); getProjects(currentUid);", "onError":""}`);
}


function getProjects(uid){
    let project = {
        "uid": uid,
        "cmd" : 'GET_PROJECTS',
    };
    ws.send(JSON.stringify(project));
}
function paintProjects(projects){
    let projectSection = document.getElementById('project_section');
    if(projectSection.classList.contains('hold')){
        return;
    }
    projectSection.classList.remove('jc');
    projectSection.classList.remove('ac');

    projectSection.innerHTML = "";

    for(var project in projects){
        let div = document.createElement('button');
        div.setAttribute('onmouseleave', "document.getElementById('project_section').classList.remove('hold');");
        div.setAttribute('onmouseover', "document.getElementById('project_section').classList.add('hold');");

        div.style.height = "200px";
        div.style.minWidth = "300px";
        div.style.maxWidth = "300px";
        div.style.background = projects[project]['color'];
        div.id = projects[project]['id'];
        div.borderRadius = "20px";
        let data = projects[project];
        div.innerHTML = `<h3>${projects[project]['name']}</h3><p>${projects[project]['description']}</p><i class="fa fa-code"</i> ${Object.keys(projects[project]['variables']).length -1} <i class="fa fa-chart-bar"</i> ${Object.keys(projects[project]['charts']).length-1} `;
        div.addEventListener('click', (e) => {
            paintProject(data, div.id);
        });
        projectSection.appendChild(div);
    }
}
function paintProject(project, id){
    // console.log('PROJECT ID:  ', id);
    // console.log('PROJECT:  ', project);
    viewSwitcher('projectSingle', project)

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

