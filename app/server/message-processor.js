let webSocketUI = require('./command_processors/websocket-ui-commands.js');
let webSocket = require('./command_processors/websocket-commands.js');
let http = require('./command_processors/http-commands.js');

function messageProcessor(message, callback, type, other) {

    // Try to parse the JSON string sent.
    try {
        message = JSON.parse(JSON.stringify(message));
    } catch (e) {
        console.log(e);
        callback.send({error:`Unable to parse JSON: ${e}`});
        return;
    }

    // Make sure there was a command provided.
    if (!message.hasOwnProperty('cmd')) {
        console.log(`No Command Specified.`);
        callback.send({error:`No Command Specified.`});
        return;
    }

    switch (type) {
        case 'ws-ui':
            webSocketUI.commandProcessor(message, callback);
            break;
        case 'ws':
            http.commandProcessor(message, callback);
            break;
        case 'http':
            http.commandProcessor(message, callback);
            break;
        default:
            callback.send({error:`Unsupported Type.`});
            break;
    }
}

module.exports = {
    messageProcessor
};
