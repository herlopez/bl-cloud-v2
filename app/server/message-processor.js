let databaseFunctions = require('./database.js');

function messageProcessor(message, callback, type) {

    try {
        message = JSON.parse(JSON.stringify(message));
        console.log(message);
    } catch (e) {
        console.log(e);
        if (type === "http") {
            callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
            return;
        }
        else if(type === "ws"){
            callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
            return;
        }
    }
    // Check if the API key exist.
    if (message.hasOwnProperty('key')) {
        if (message['key'] === 'gsqfr6DsDWfGhn4og5RHNQTA3hFE') {
            console.log("KeyGood");
        } else {
            console.log(`Invalid API key given.`);
            if (type === "http") {
                callback.send('{"error":"Invalid API key given."}');
                return;
            }
            else if(type === "ws"){
                callback.send('{"error":"Invalid API key given."}');
                return;
            }
        }
    } else {
        console.log(`No API key given.`);
        if (type === "http") {
            callback.send('{"error":"No API key given."}');
            return;
        }
        else if(type === "ws"){
            callback.send('{"error":"No API key given."}');
            return;
        }
    }

    // Filter the command.
    // Check if the command field exist.
    if (message.hasOwnProperty('cmd')) {

        console.log(`Received Command: ${message['cmd']}`);

        switch (message['cmd']) {

            // Variables
            case 'CREATE_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        if (message['name'].length < 200) {
                            if (message.hasOwnProperty('value')) {
                                let res = databaseFunctions.createVariable(message['key'], message['name'], message['value']);
                                if (type === "http") {
                                    callback.send(res);
                                    return;
                                }
                                else if(type === "ws"){
                                    callback.send(res);
                                    return;
                                }
                            } else {
                                let res = databaseFunctions.createVariable(message['key'], message['name'], null);
                                if (type === "http") {
                                    callback.send(res);
                                    return;
                                }
                                else if(type === "ws"){
                                    callback.send(res);
                                    return;
                                }
                            }

                        } else {

                            console.log(`Variable name too long.  < 200.`);
                            if (type === "http") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }
                            else if(type === "ws"){
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }

                        }
                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }

                break;
            case 'SET_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        if (message.hasOwnProperty('value')) {
                            let res = databaseFunctions.setVariable(message['key'], message['name'], message['value']);
                            if (type === "http") {
                                callback.send(res);
                                return;
                            }
                            else if(type === "ws"){
                                callback.send(res);
                                return;
                            }
                        } else {
                            console.log(`Please specify a value to set.`);
                            if (type === "http") {
                                callback.send('{"error":"Please specify a value to set."}');
                                return;
                            }
                            else if(type === "ws"){
                                callback.send('{"error":"Please specify a value to set."}');
                                return;
                            }
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'GET_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.getVariable(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        }
                        else if(type === "ws"){
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'DELETE_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.deleteVariable(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        }
                        else if(type === "ws"){
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;

            // Charts
            case 'CREATE_CHART':
                if (message.hasOwnProperty('name')) {
                    if (typeof message['name'] === 'string' || message['name'] instanceof String) {
                        if (message['name'].length < 200) {
                            if (message.hasOwnProperty('type')) {
                                if (typeof message['type'] === 'string' || message['type'] instanceof String) {
                                    if (message['type'] === 'PIE' || message['type'] === 'LINE' || message['type'] === 'BAR' || message['type'] === 'SCATTER') {
                                        let res = databaseFunctions.createChart(message['key'], message['name'], message['type'], 0, 0);
                                        if (type === "http") {
                                            callback.send(res);
                                            return;
                                        }
                                        else if(type === "ws"){
                                            callback.send(res);
                                            return;
                                        }
                                    } else if (message['type'] === 'HISTOGRAM' || message['type'] === 'HISTO') {
                                        if (message.hasOwnProperty('start') && message.hasOwnProperty('start')) {
                                            if (typeof message['start'] === 'number' || message['start'] instanceof Number) {
                                                if (typeof message['end'] === 'number' || message['end'] instanceof Number) {
                                                    if (message['end'] > message['start']) {
                                                        let res = databaseFunctions.createChart(message['key'], message['name'], message['type'], message['start'], message['end']);
                                                        if (type === "http") {
                                                            callback.send(res);
                                                            return;
                                                        }
                                                        else if(type === "ws"){
                                                            callback.send(res);
                                                            return;
                                                        }
                                                    } else {
                                                        console.log(`Start value must be inferior to end value.`);
                                                        if (type === "http") {
                                                            callback.send('{"error":"Start value must be inferior to end value."}');
                                                            return;
                                                        }
                                                        else if(type === "ws"){
                                                            callback.send('{"error":"Start value must be inferior to end value."}');
                                                            return;
                                                        }
                                                    }
                                                } else {
                                                    console.log(`End value must be a number.`);
                                                    if (type === "http") {
                                                        callback.send('{"error":"End value must be a number."}');
                                                        return;
                                                    }
                                                    else if(type === "ws"){
                                                        callback.send('{"error":"End value must be a number."}');
                                                        return;
                                                    }
                                                }
                                            } else {
                                                console.log(`Start value must be a number.`);
                                                if (type === "http") {
                                                    callback.send('{"error":"Start value must be a number."}');
                                                    return;
                                                }
                                                else if(type === "ws"){
                                                    callback.send('{"error":"Start value must be a number."}');
                                                    return;
                                                }
                                            }
                                        } else {
                                            console.log(`When creating histograms, please provide a start and end value.`);
                                            if (type === "http") {
                                                callback.send('{"error":"When creating histograms, please provide a start and end value."}');
                                                return;
                                            }
                                            else if(type === "ws"){
                                                callback.send('{"error":"When creating histograms, please provide a start and end value."}');
                                                return;
                                            }
                                        }
                                    } else {
                                        console.log(`Invalid chart type.`);
                                        if (type === "http") {
                                            callback.send('{"error":"Invalid chart type."}');
                                            return;
                                        }
                                        else if(type === "ws"){
                                            callback.send('{"error":"Invalid chart type."}');
                                            return;
                                        }
                                    }
                                } else {
                                    console.log(`Type can only be a string value.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Type can only be a string value."}');
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send('{"error":"Type can only be a string value."}');
                                        return;
                                    }
                                }
                            } else {
                                console.log(`Please specify the chart type.`);
                                if (type === "http") {
                                    callback.send('{"error":"Please specify the chart type."}');
                                    return;
                                }
                                else if(type === "ws"){
                                    callback.send('{"error":"Please specify the chart type."}');
                                    return;
                                }
                            }
                        } else {
                            console.log(`Variable name too long.  < 200.`);
                            if (type === "http") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }
                            else if(type === "ws"){
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }
                        }
                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'DELETE_CHART':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.deleteChart(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        }
                        else if(type === "ws"){
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Chart name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
                break;
            case 'ADD_CHART_POINT':
                if (message.hasOwnProperty('name')) {
                    if (typeof message['name'] === 'string' || message['name'] instanceof String) {
                        let chart_type = databaseFunctions.getChartType(message['key'], message['name']);
                        if (chart_type.includes('error')) {
                            if (type === "http") {
                                callback.send(chart_type);
                                return;
                            }
                            else if(type === "ws"){
                                callback.send(chart_type);
                                return;
                            }
                        } else {
                            if (['BAR', 'PIE', 'LINE'].includes(chart_type)) {

                                if (!message.hasOwnProperty('value')) {
                                    console.log(`Please specify a value to add to the chart.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please specify a value to add to the chart."}');
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send('{"error":"Please specify a value to add to the chart."}');
                                        return;
                                    }
                                }
                                if (['BAR', 'PIE'].includes(chart_type)) {
                                    if (message.hasOwnProperty('point')) {
                                        let res = databaseFunctions.addDataPoint(message['key'], message['name'], message['point'], message['value']);
                                        if (type === "http") {
                                            callback.send(res);
                                            return;
                                        }
                                        else if(type === "ws"){
                                            callback.send(res);
                                            return;
                                        }
                                    } else {
                                        console.log(`Please specify a value name for bar and pie charts.`);
                                        if (type === "http") {
                                            callback.send('{"error":"Please specify a value name for bar and pie charts."}');
                                            return;
                                        }
                                        else if(type === "ws"){
                                            callback.send('{"error":"Please specify a value name for bar and pie charts."}');
                                            return;
                                        }
                                    }
                                }
                                if (['LINE'].includes(chart_type)) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], "", message['value']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send(res);
                                        return;
                                    }
                                }
                            } else if (['SCATTER'].includes(chart_type)) {
                                if (message.hasOwnProperty('x') && message.hasOwnProperty('y')) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], message['x'], message['y']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send(res);
                                        return;
                                    }
                                } else {
                                    console.log(`Please add an X and Y value for scatter plots..`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please add an X and Y value for scatter plots."}');
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send('{"error":"Please add an X and Y value for scatter plots."}');
                                        return;
                                    }
                                }
                            }else if (['HISTO', 'HISTOGRAM'].includes(chart_type)) {
                                if (message.hasOwnProperty('value') ) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], "", message['value']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send(res);
                                        return;
                                    }
                                } else {
                                    console.log(`Please add  value for histograms.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please add a value for histograms."}');
                                        return;
                                    }
                                    else if(type === "ws"){
                                        callback.send('{"error":"Please add a value for histograms."}');
                                        return;
                                    }
                                }
                            }
                            else {
                                if (type === "http") {
                                    callback.send({"error": "Invalid chart type, server error."});
                                    return;
                                }
                                else if(type === "ws"){
                                    callback.send({"error": "Invalid chart type, server error."});
                                    return;
                                }
                            }
                        }
                    } else {
                        console.log(`Invalid chart name, must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Invalid chart name, must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Invalid chart name, must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
                break;
            case 'GET_CHART_DATA':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.getChartData(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        }
                        else if(type === "ws"){
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Chart name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                        else if(type === "ws"){
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                    else if(type === "ws"){
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
            break;

            default:
                console.log(`Unknown command sent.`);
                if (type === "http") {
                    callback.send('{"error":"Unknown command sent."}');
                    return;
                }
                else if(type === "ws"){
                    callback.send('{"error":"Unknown command sent."}');
                    return;
                }
                break;
        }
    } else {
        console.log(`No Command Specified.`);
        if (type === "http") {
            callback.send('{"error":"No Command Specified."}');
            return;
        }
        else if(type === "ws"){
            callback.send('{"error":"No Command Specified."}');
            return;
        }
    }

}

module.exports = {
    messageProcessor
};