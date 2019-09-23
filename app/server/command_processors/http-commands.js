let databaseFunctions = require('./../database.js');
let tools = require('./../tools');

function commandProcessor(message, callback) {

    // Make sure there is a key and command.
    if (tools.error(tools.verifyString(message, 'key', 200, 10), callback)) return;
    if (tools.error(tools.verifyString(message, 'cmd', 200, 3), callback)) return;

    switch (message['cmd'].toUpperCase()) {

        // Variables
        case 'CREATE_VARIABLE':
        case 'NEW_VARIABLE':
        case 'NEW_VAR':
        case 'CREATE_VAR':
            callback.send(databaseFunctions.createVariable(message));
            break;

        case 'WRITE_VARIABLE':
        case 'WRITE_VAR':
        case 'SET_VAR':
        case 'SET_VARIABLE':
            callback.send(databaseFunctions.setVariable(message));
            break;

        case 'READ_VARIABLE':
        case 'GET_VARIABLE':
        case 'READ_VAR':
        case 'GET_VAR':
            callback.send(databaseFunctions.getVariable(message));
            break;

        case 'ERASE_VARIABLE':
        case 'DELETE_VARIABLE':
        case 'REMOVE_VARIABLE':
        case 'ERASE_VAR':
        case 'DELETE_VAR':
        case 'REMOVE_VAR':
            callback.send(databaseFunctions.deleteVariable(message));
            break;

        case 'GET_ALL_VARIABLES':
        case 'GET_ALL_VARS':
            callback.send(databaseFunctions.getAllVariables(message));
            break;

        case 'CREATE_CHART':
        case 'NEW_CHART':
            callback.send(databaseFunctions.createChart(message));
            break;

        case 'GET_CHART_DATA':
        case 'READ_CHART_DATA':
            callback.send(databaseFunctions.getChartData(message));
            break;

        case 'ERASE_CHART':
        case 'DELETE_CHART':
        case 'REMOVE_CHART':
            callback.send(databaseFunctions.deleteChart(message));
            break;

        case 'ADD_CHART_POINT':
        case 'ADD_DATA_POINT':
            callback.send(databaseFunctions.addDataPoint(message));
            break;

        case 'GET_ALL_CHARTS':
        case 'READ_ALL_CHARTS':
            callback.send(databaseFunctions.getAllCharts(message));
            break;

        case 'READ_CHART':
        case 'GET_CHART':
            callback.send(databaseFunctions.getChartData(message));
            break;

        default:
            tools.error({error: "Unknown command."}, callback);
            break;
    }
}

module.exports = {
    commandProcessor
};