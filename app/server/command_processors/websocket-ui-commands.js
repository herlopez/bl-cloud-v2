let databaseFunctions = require('./../database.js');
let tools = require('./../tools');

function commandProcessor(message, callback){

    switch (message['cmd']) {

        case 'CREATE_PROJECT':
            if (tools.formError("create_project",tools.verifyString(message, 'name', 200, 8), callback)) return;
            if (tools.formError("create_project",tools.verifyString(message, 'description', 200, 1), callback)) return;
            if (tools.formError("create_project",tools.verifyString(message, 'access', 200, 1), callback)) return;
            if (message['access'] !== 'Private' &&  message['access'] !== 'Public'){
                tools.formError("create_project",{error: 'Invalid Access Type'}, callback);
                return;
            }
            databaseFunctions.createProject(message['name'], message['description'], message['access'], message['color'], callback.uid);
            callback.send(JSON.stringify({"fn": "windowSwitcher('none')"}));
            return;

        case 'GET_PROJECTS':
            databaseFunctions.createProject(message['name'], message['description'], message['access'], message['color'], callback.uid);
            callback.send(databaseFunctions.getProjects(callback.uid));
            return;

        case 'CREATE_VARIABLE':
            databaseFunctions.createVariable(message);
            callback.send(JSON.stringify({"fn": "getProjects(currentProject); windowSwitcher('none');"}));
            return;
    }
}

module.exports = {
    commandProcessor
};