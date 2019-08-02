const WebSocket = require('ws');
let processor = require('./message-processor.js');



function startWebsocketServer(port){
    const wss = new WebSocket.Server({ port: port });
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            processor.messageProcessor(JSON.parse(message), ws, 'ws');
        });
    });
    console.log(`Websocket server is up on port ${port}`);
}

module.exports = {
    startWebsocketServer
};
