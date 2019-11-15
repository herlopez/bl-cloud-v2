let databaseFunctions = require('./../database.js');

function commandProcessor(message, callback, server){
    console.log('Command: ',message['cmd']);
    switch (message['cmd']) {

        case 'NEW_KEY':
            callback.send(JSON.stringify(databaseFunctions.newProjectKey(message, callback.uid)));
        break;

        case 'ADD_WIDGET':
            let addWidget = databaseFunctions.addWidget(message, callback.uid);
            addWidget['cmd'] = 'ADD_WIDGET';
            console.log('heree', addWidget);
            callback.send(JSON.stringify(addWidget));
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
    }
}

module.exports = {
    commandProcessor
};