let webSocketUI = require('./command_processors/websocket-ui-commands.js');
let webSocket = require('./command_processors/websocket-commands.js');
let http = require('./command_processors/http-commands.js');

function msgProcessor(message, callback, type, server) {
    // Try to parse the JSON string sent.
    try {
        message = JSON.parse(JSON.stringify(message));
    } catch (e) {
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
            webSocketUI.commandProcessor(message, callback, server);
            break;
        case 'ws':
            http.commandProcessor(message, callback, server);
            break;
        case 'http':
            http.commandProcessor(message, callback, server);
            break;
        default:
            callback.send({error:`Unsupported Type.`});
            break;
    }

}

module.exports = {
    msgProcessor,
};
