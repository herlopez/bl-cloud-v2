let databaseFunctions = require('./../database.js');

function commandProcessor(message, callback, server){
    console.log('Command:',message['cmd']);
    switch (message['cmd']) {

        case 'NEW_KEY':
            callback.send(JSON.stringify(databaseFunctions.newProjectKey(message, callback.uid)));
        break;

        case 'SET_PROJECT_NAME':
            callback.send(JSON.stringify(databaseFunctions.setProjectName(message, callback.uid)));
        break;

        case 'DELETE_PROJECT':
            callback.send(JSON.stringify(databaseFunctions.deleteProject(message, callback.uid)));
            break;

        case 'SET_PROJECT_DESCRIPTION':
            callback.send(JSON.stringify(databaseFunctions.setProjectDescription(message, callback.uid)));
        break;

        case 'ADD_WIDGET':
            let addWidget = databaseFunctions.addWidget(message, callback.uid);
            addWidget['cmd'] = 'ADD_WIDGET';
            callback.send(JSON.stringify(addWidget));
            break;
        case 'REMOVE_WIDGET':
            let removeWidget = databaseFunctions.removeWidget(message, callback.uid);
            removeWidget['cmd'] = 'REMOVE_WIDGET';
            callback.send(JSON.stringify(removeWidget));
        break;
        case 'UPDATE_WIDGET':
            let updateWidget = databaseFunctions.updateWidget(message, callback.uid);
            updateWidget['cmd'] = 'UPDATE_WIDGET';
            callback.send(JSON.stringify(updateWidget));
            break;
        case 'CREATE_PROJECT':
            callback.send(JSON.stringify(databaseFunctions.createProject(message, callback.uid)));
            return;

        case 'GET_PROJECTS':
            callback.send(JSON.stringify(databaseFunctions.getProjects(callback.uid)));
            return;

        case 'GET_PROJECT':
            callback.send(JSON.stringify(databaseFunctions.getProject(message)));
            break;

        case 'CREATE_VARIABLE':
            let createVariableData = databaseFunctions.createVariable(message);
            createVariableData['cmd'] = 'NEW_VARIABLE_CB';
            callback.send(JSON.stringify(createVariableData));
            if(!createVariableData.hasOwnProperty('error')) databaseFunctions.notifyClients(server, message.key, 'NEW_VARIABLE_CB', createVariableData);
            break;

        case 'SET_VARIABLE':
            console.log(message);
            let setVariableData = databaseFunctions.setVariable(message);
            if(setVariableData.hasOwnProperty('error')){
                setVariableData['fn'] = message.onError;
            }
           else{
                setVariableData['fn'] = message.onSuccess;
            }
            callback.send(JSON.stringify(setVariableData));
            if(!setVariableData.hasOwnProperty('error')) databaseFunctions.notifyClients(server, message.key, 'SET_VARIABLE_CB', setVariableData);
            break;
        case 'DELETE_VARIABLE':
            console.log(message);
            let deleteVariable = databaseFunctions.deleteVariable(message);
            deleteVariable['cmd'] = 'DELETE_VARIABLE_CB';
            callback.send(JSON.stringify(deleteVariable));
            break;
    }
}

module.exports = {
    commandProcessor
};