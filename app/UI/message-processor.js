

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

            // Server sends back a the data for a users project.
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
                console.log("Message: ", message, currentView);
                if(currentView === 'dashboard'){
                    getProjects(currentUid);
                }
                else if(currentView === 'project'){
                    if(message.hasOwnProperty('error')){
                        windowError('new_variable', message['error']);
                        return;
                    }
                    getProject(currentUid, currentProject);
                    windowSwitcher('none');
                }

                break;
            case 'NEW_KEY':
                if(message.hasOwnProperty('error')){
                    windowError('window_content_block',message['error']);
                    return;
                }
                getProject(currentUid, currentId);
                windowSwitcher('none');
                break;
            case 'ADD_WIDGET':
                if(message.hasOwnProperty('error')){
                    windowError('window_content_block',message['error']);
                    return;
                }
                getProject(currentUid, currentId);
                windowSwitcher('none');
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
                    console.log(message['error']);
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