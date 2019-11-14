let processor = require('./message-processor.js');
let WebSocket = require("ws");
let admin = require('./firebase.js').admin;


function startWebsocketServer(port){

    let wss = new WebSocket.Server({
        port: port,
        clientTracking: true,
        verifyClient: function (info, cb) {
           let token = new URL(`http://www.k.com${info.req.url.substring(1)}`).searchParams.get('token');
           let uid_sent = new URL(`http://www.k.com${info.req.url.substring(1)}`).searchParams.get('uid');
            admin.auth().verifyIdToken(token, )
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    if(uid_sent === uid){
                        wss.getUid = () =>{
                            return uid;
                        };
                        cb(true);
                    }else{
                        console.log("Rejected: ",uid_sent, uid);
                        cb(false);
                    }
                }).catch(function(e) {
                    console.log(e);
                    cb(false);
            });

        }
    });

    wss.on('connection', function connection(ws) {
        console.log('Connected: ', wss.getUid());
        ws['uid']= wss.getUid();
        ws.on('message', function incoming(message) {
            let msg;
            console.log(message)
            try{
                msg = JSON.parse(message);
                processor.msgProcessor(msg, ws, 'ws-ui', wss);
            }catch (e) {
                console.log({error:`Unable to parse JSON2: ${e}`});
                ws.send(`{"error":"Unable to parse JSON2: ${e}"}`);
            }
        });
    });
    console.log(`Websocket server is up on port ${port}`);
    return wss;
}

module.exports = {
    startWebsocketServer
};
