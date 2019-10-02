

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

            case 'GET_PROJECT':
                message = message['results'][0];
                let project = document.getElementById('project_projectSection');
                currentProject = message.id;
                project.classList = 'w100 c ac jc';
                project.style = {
                    height: "100%",
                    overflow: "visible"
                };
                project.innerHTML = `
                    <div style="" class="w100 c ac">
                    <h1 style="" class="m0">${message.name}</h1>
                    <h3 style="">${message.description}</h3>
                    <div class="r js ac">
                        <h4>Project Key: </h4>
                         <input class="ml2" id="project_key" value="${message.key}" disabled>
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

                document.getElementById('app_container').appendChild(project);
                let variables = document.getElementById('variables');
                let vars = message.variables;
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
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${message.key}')"></button>
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