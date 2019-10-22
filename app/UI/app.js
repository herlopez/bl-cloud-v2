
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
            viewSwitcher('dashboard');

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

function createProject(name, desc, access, color, uid){
    console.log('Creating Project: ', name, desc, access, uid);
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
function getProject(uid, id){
    let project = {
        "uid": uid,
        "id": id,
        "cmd": "GET_PROJECT"
    };
    ws.send(JSON.stringify(project));
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
            let data = projects[project];
            div.innerHTML = `<h3>${projects[project]['name']}</h3><p>${projects[project]['description']}</p><i class="fa fa-code"</i> ${projects[project]['variableCount']} <i class="fa fa-chart-bar"</i> ${projects[project]['chartCount']} `;
            div.addEventListener('click', () => {
                paintProject(data, div.id);
            });
            projectSection.appendChild(div);
        }
    }
}



function paintProject(project, id){
    // console.log('PROJECT ID:  ', id);
    //     // console.log('PROJECT:  ', project);
    viewSwitcher('projectSingle', id)

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