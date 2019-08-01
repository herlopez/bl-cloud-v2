
let databaseFunctions = require('./database.js');

function messageProcessor(message, callback, type){
    try{
        message = JSON.parse(JSON.stringify(message));
        console.log(message);
    }
    catch (e) {
        console.log(e);
        if(type ==="http"){
            callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
        }
    }


    // Check if the API key exist.
    if(message.hasOwnProperty('key')){
        if(message['key'] === 'gsqfr6DsDWfGhn4og5RHNQTA3hFE'){
            console.log("KeyGood");
        }
        else{
            console.log(`Invalid API key given.`);
            if(type ==="http"){
                callback.send('{"error":"Invalid API key given."}');
            }
        }
    }
    else{
        console.log(`No API key given.`);
        if(type ==="http"){
            callback.send('{"error":"No API key given."}');
        }
    }

    // Filter the command.
    // Check if the command field exist.
    if(message.hasOwnProperty('cmd')){

        console.log(`Received Command: ${message['cmd']}`);

        switch (message['cmd']) {

            // Creates a variable.
            case 'CREATE_VARIABLE':
                if(message.hasOwnProperty('name')){

                    if(typeof message['name']  === 'string' || value instanceof String){

                        if(message['name'].length < 200){
                            if(message.hasOwnProperty('value')) {
                                let res = databaseFunctions.createVariable(message['key'], message['name'], message['value']);
                                if(type ==="http"){
                                    callback.send(res);
                                }
                            }
                            else{
                                let res = databaseFunctions.createVariable(message['key'],message['name'], null);
                                if(type ==="http"){
                                    callback.send(res);
                                }
                            }

                        }
                        else{

                            console.log(`Variable name too long.  < 200.`);
                            if(type ==="http"){
                                callback.send('{"error":"Variable name too long.  < 200."}');
                            }

                        }
                    }
                    else{
                        console.log(`Variable name must be a string.`);
                        if(type ==="http"){
                            callback.send('{"error":"Variable name must be a string."}');
                        }
                    }
                }
                else{
                    console.log(`Variable name not provided.`);
                    if(type ==="http"){
                        callback.send('{"error":"Variable name not provided."}');
                    }
                }

            break;






            case 'SET_VARIABLE':

                if(message.hasOwnProperty('name')){

                    if(typeof message['name']  === 'string' || value instanceof String){

                        if(message.hasOwnProperty('value')) {
                            let res = databaseFunctions.setVariable(message['key'], message['name'], message['value']);
                            if(type ==="http"){
                                callback.send(res);
                            }
                        }else{
                            console.log(`Please specify a value to set.`);
                            if(type ==="http"){
                                callback.send('{"error":"Please specify a value to set."}');
                            }
                        }

                    }
                    else{
                        console.log(`Variable name must be a string.`);
                        if(type ==="http"){
                            callback.send('{"error":"Variable name must be a string."}');
                        }
                    }
                }
                else{
                    console.log(`Variable name not provided.`);
                    if(type ==="http"){
                        callback.send('{"error":"Variable name not provided."}');
                    }
                }
            break;
            case 'GET_VARIABLE':
                if(message.hasOwnProperty('name')){

                    if(typeof message['name']  === 'string' || value instanceof String){

                        let res = databaseFunctions.getVariable(message['key'],message['name']);
                        if(type ==="http"){
                            callback.send(res);
                        }

                    }
                    else{
                        console.log(`Variable name must be a string.`);
                        if(type ==="http"){
                            callback.send('{"error":"Variable name must be a string."}');
                        }
                    }
                }
                else{
                    console.log(`Variable name not provided.`);
                    if(type ==="http"){
                        callback.send('{"error":"Variable name not provided."}');
                    }
                }
            break;
            case 'ERASE_VARIABLE':
                if(message.hasOwnProperty('name')){

                    if(typeof message['name']  === 'string' || value instanceof String){

                        let res = databaseFunctions.eraseVariable('123',message['name']);
                        if(type ==="http"){
                            callback.send(res);
                        }

                    }
                    else{
                        console.log(`Variable name must be a string.`);
                        if(type ==="http"){
                            callback.send('{"error":"Variable name must be a string."}');
                        }
                    }
                }
                else{
                    console.log(`Variable name not provided.`);
                    if(type ==="http"){
                        callback.send('{"error":"Variable name not provided."}');
                    }
                }
            break;

            default:
                console.log(`Unknown command sent.`);
                if(type ==="http"){
                    callback.send('{"error":"Unknown command sent."}');
                }
            break;
        }
    }
    else{
        console.log(`No Command Specified.`);
        if(type ==="http"){
            callback.send('{"error":"No Command Specified."}');
        }
    }

}

module.exports = {
    messageProcessor
};