
let mosca = require('mosca');
let processor = require('./message-processor.js');


function startMQTTBroker(port, wss) {
    let settings = {
        port: port,
    };

    let server = new mosca.Server(settings);

    server.on('clientConnected', function(client) {
        console.log('client connected', client.id);
    });

    server.on('published', function(packet, client) {
        let topic = packet.topic;
        function Broker(){
            this.send = (message)=>{
                let msg = {
                    topic: topic +'-rsp',
                    payload: JSON.stringify(message), // or a Buffer
                    qos: 0, // 0, 1, or 2
                    retain: false // or true
                };
                server.publish(msg, function() {
                });
            }
        }
        let broker = new Broker();
        console.log('Payload:',  packet.payload);

        let msg;
        try{
            if(typeof packet.payload === 'object'){
                msg = JSON.parse(packet.payload);
                processor.msgProcessor(msg, broker, 'mqtt', wss);
            }

        }catch (e) {

            let topicVar =  packet.topic;
            if (!topicVar.endsWith('-rsp')){
                topicVar = topicVar + '-rsp';
            }
            let message = {
                topic: topicVar,
                payload: `{"error":"Unable to parse JSON: ${e}"}`, // or a Buffer
                qos: 0, // 0, 1, or 2
                retain: false // or true
            };
            console.log(`Topic: ${message.topic}, ${message.payload} `, e );
            server.publish(message, function() {
            });
        }
    });


    // fired when a message is received
    server.on('ready', setup);

    // fired when the mqtt server is ready
    function setup() {
        console.log(`MQTT Broker is up and running on port ${port}.`);
    }

}
module.exports = {
    startMQTTBroker
};



