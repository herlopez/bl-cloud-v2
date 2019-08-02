const WebSocket = require('ws');
let processor = require('./message-processor.js');



function startWebsocketServer(port){
    const wss = new WebSocket.Server({ port: port });
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            let msg;
            try{
                msg = JSON.parse(message);
                processor.messageProcessor(msg, ws, 'ws');
            }catch (e) {
                ws.send(`{"error":"Unable to parse JSON: ${e}"}`);
            }
        });
    });
    console.log(`Websocket server is up on port ${port}`);
}

module.exports = {
    startWebsocketServer
};
