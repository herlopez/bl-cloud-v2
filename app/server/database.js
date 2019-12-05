let db, PROJECTS;
let uniqid = require('uniqid');
let tools = require('./tools');


// -----> PROJECTS <----------------------------------------
function notifyClients(server, key, cmd, data){
    server.clients.forEach(function each(client) {
        let results = PROJECTS.find({owner: client.uid});
        for(let result in results){
            if(results.hasOwnProperty(result)){
                if(results[result]['key'] === key){
                    client.send(JSON.stringify({
                        cmd: cmd,
                        key: key,
                        data: data
                    }));
                }
            }
        }
    });
}

function getProject(msg){
    if(msg.hasOwnProperty('id')){
        let results = PROJECTS.find({id: msg.id});
        console.log("res:", results);
        return {
            results: results,
            cmd: "GET_PROJECT"
        }
    }
    return{error: 'Project Not Found.', cmd: 'GET_PROJECT'};

}
function getProjects(uid) {
    try {
        let results = PROJECTS.find({owner: uid});
        let response = [];

        for(let result in results){
            if(results.hasOwnProperty(result)){
                response.push({
                    name: results[result]['name'],
                    color: results[result]['color'],
                    description: results[result]['description'],
                    chartCount: results[result]['charts'].length,
                    variableCount: Object.keys(results[result]['variables']).length - 1,
                    id: results[result]['id'],
                    key: results[result]['key']
                })
            }
        }
        return {
            meta: results['meta'],
            results: response,
            cmd: "GET_PROJECTS"
        };
    } catch (e) {
        return {error: "User does not exist."};
    }
}

function removeWidget(msg, uid){
    if(!msg.hasOwnProperty('project')) return {error: "Error! No project id sent."};
    let project = PROJECTS.findOne({id: msg.project});
    if(project === null) return {error: "Error! No project was found for this id." };

    // Make sure the user owns the project.
    if(uid !== msg.uid) return{error: "Error! Conflicting user id's."};
    if(!project.hasOwnProperty('owner')) return {error: "Project ownership error."};
    if(project['owner'] !== uid) return{error: "Error! User does not have access to this project."};
    console.log('Done: ', project);
    let idCheck = tools.verifyString(msg, 'id', 200, 0);
    if (tools.hasError(idCheck)) return idCheck;

    let widgetIndex = project['widgets'].findIndex(w => w.id === msg['id']);
    if(widgetIndex === '-1'){
        return {error: 'Error! Invalid Widget Id'}
    }
    project['widgets'].splice(widgetIndex, 1);
    PROJECTS.update(project);
    return {cmd:"REMOVE_WIDGET", result:project};
}
function updateWidget(msg, uid){
    // Make sure that the project exist in the database for the user making the request.
    if(!msg.hasOwnProperty('project')) return {error: "Error! No project id sent."};
    let project = PROJECTS.findOne({id: msg.project});
    if(project === null) return {error: "Error! No project was found for this id." };

    // Make sure the user owns the project.
    if(uid !== msg.uid) return{error: "Error! Conflicting user id's."};
    if(!project.hasOwnProperty('owner')) return {error: "Project ownership error."};
    if(project['owner'] !== uid) return{error: "Error! User does not have access to this project."};
    console.log('Done: ', project);
    if(!msg.hasOwnProperty('options') ) return{error: "Error! No widget settings provided."};
    let nameCheck = tools.verifyString(msg['options'], 'title', 200, 0);
    if (tools.hasError(nameCheck)) return nameCheck;
    let typeCheck = tools.verifyString(msg['options'], 'type', 200, 0);
    if (tools.hasError(typeCheck)) return typeCheck;
    let idCheck = tools.verifyString(msg['options'], 'id', 200, 0);
    if (tools.hasError(idCheck)) return idCheck;
    let hideCheck = tools.verifyString(msg['options'], 'hide', 200, 0);
    if (tools.hasError(hideCheck)) return hideCheck;
    if(!msg['options'].hasOwnProperty('variable') ) return{error: "No variable was provided."};
    if(!project.hasOwnProperty('variables'))  return{error: "Error! Project has no variables."};
    if(msg['options']['variable'] === '') return{error: "Please Select a Variable."};
    if(!project['variables'].hasOwnProperty(msg['options']['variable'])) return{error: "Error! Project does not have this variable."};


    if(!msg['options'].hasOwnProperty('type')) return {error: 'Error! Widget Type not Defined.'};
    switch (msg['options']['type']) {
        case 'gauge':
            if(typeof project['variables'][msg['options']['variable']] !== 'number') return{error:"Please select a variable that is an integer."};
            if(!msg['options'].hasOwnProperty('min') || !msg['options'].hasOwnProperty('max')) return{error:"Error! No Min/Max options provided."};
            if(typeof msg['options']['min'] !== 'number'|| typeof msg['options']['max'] !== 'number') return{error:"Please provide a valid min and max value."};
            if(msg['options']['min'] >= msg['options']['max']) return{error:"Min value must be inferior to max value."};
            break;
        case 'data':
            break;
        default:
            return {error: 'Error! Invalid Widget Type'}
    }
    let widgetIndex = project['widgets'].findIndex(w => w.id === msg['options']['id']);
    if(widgetIndex === '-1'){
        return {error: 'Error! Invalid Widget Id'}
    }
    project['widgets'][widgetIndex] =  msg['options'];
    PROJECTS.update(project);
    return {cmd:"UPDATE_WIDGET", result:project};

}
function addWidget(msg, uid){

    // Make sure that the project exist in the database for the user making the request.
    if(!msg.hasOwnProperty('project')) return {error: "Error! No project id sent."};
    let project = PROJECTS.findOne({id: msg.project});
    if(project === null) return {error: "Error! No project was found for this id." };

    // Make sure the user owns the project.
    if(uid !== msg.uid) return{error: "Error! Conflicting user id's."};
    if(!project.hasOwnProperty('owner')) return {error: "Project ownership error."};
    if(project['owner'] !== uid) return{error: "Error! User does not have access to this project."};
    console.log('Done: ', project);
    if(!msg.hasOwnProperty('options') ) return{error: "Error! No widget settings provided."};
    let nameCheck = tools.verifyString(msg['options'], 'title', 200, 0);
    if (tools.hasError(nameCheck)) return nameCheck;
    let typeCheck = tools.verifyString(msg['options'], 'type', 200, 0);
    if (tools.hasError(typeCheck)) return nameCheck;
    let hideCheck = tools.verifyString(msg['options'], 'hide', 200, 0);
    if (tools.hasError(hideCheck)) return nameCheck;
    if(!msg['options'].hasOwnProperty('variable') ) return{error: "No variable was provided."};
    if(!project.hasOwnProperty('variables'))  return{error: "Error! Project has no variables."};
    if(msg['options']['variable'] === '') return{error: "Please Select a Variable."};
    if(!project['variables'].hasOwnProperty(msg['options']['variable'])) return{error: "Error! Project does not have this variable."};


    if(!msg['options'].hasOwnProperty('type')) return {error: 'Error! Widget Type not Defined.'};
    switch (msg['options']['type']) {
        case 'gauge':
            if(typeof project['variables'][msg['options']['variable']] !== 'number') return{error:"Please select a variable that is an integer."};
            if(!msg['options'].hasOwnProperty('min') || !msg['options'].hasOwnProperty('max')) return{error:"Error! No Min/Max options provided."};
            if(typeof msg['options']['min'] !== 'number'|| typeof msg['options']['max'] !== 'number') return{error:"Please provide a valid min and max value."};
            if(msg['options']['min'] >= msg['options']['max']) return{error:"Min value must be inferior to max value."};
            break;
        case 'data':
            break;
        default:
            return {error: 'Error! Invalid Widget Type'}
    }

    let time = new Date().getTime();
    msg['options']['id'] =  uniqid(time);
    // if(!project['options'].hasOwnProperty(msg[''])  return{error: "Error! Project has no variables."};
    project['widgets'].push(msg['options']);
        console.log(project);
    PROJECTS.update(project);
    return {cmd:"ADD_WIDGET", result:project};




    //
    // if (project['variables'].hasOwnProperty(msg.name)) return {error: "Variable name already taken"};
    //
    //
    // let nameCheck = tools.verifyString(msg, 'title', 200, 1);
    // if (tools.hasError(nameCheck)) return nameCheck;

}

function setProjectName(msg, uid){
    console.log('NAME.....', msg);
    let nameCheck = tools.verifyString(msg, 'name', 200, 4);
    if (tools.hasError(nameCheck)){
        nameCheck['cmd'] = 'SET_PROJECT_NAME';
        return nameCheck;
    }
    if(msg.hasOwnProperty('id')){
        let results = PROJECTS.findOne({id: msg.id});
        results.name = msg['name'];
        PROJECTS.update(results);
        return {
            results:  results.key,
            cmd: "SET_PROJECT_NAME"
        }
    }
    return{error: 'Project Not Found.', cmd: 'SET_PROJECT_NAME'};
}
function setProjectDescription(msg, uid){
    let descCheck = tools.verifyString(msg, 'description', 200, 1);
    if (tools.hasError(descCheck)){
        descCheck['cmd'] = 'SET_PROJECT_DESCRIPTION';
        return descCheck;
    }
    if(msg.hasOwnProperty('id')){
        let results = PROJECTS.findOne({id: msg.id});
        results.description = msg['description'];
        PROJECTS.update(results);
        return {
            results:  results.desc,
            cmd: "SET_PROJECT_DESCRIPTION"
        }
    }
    return{error: 'Project Not Found.', cmd: 'SET_PROJECT_DESCRIPTION'};
}

function newProjectKey(msg, uid){
    if(msg.hasOwnProperty('id')){
        let results = PROJECTS.findOne({id: msg.id});
        console.log("res:", results);
        results.key = uniqid();
        PROJECTS.update(results);
        console.log("RESUKLTSL ", results);
        return {
            results:  results.key,
            cmd: "NEW_KEY"
        }
    }
    return{error: 'Project Not Found.', cmd: 'NEW_KEY'};
}
function createProject(msg, uid) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 4);
    if (tools.hasError(nameCheck)){
        nameCheck['cmd'] = 'CREATE_PROJECT';
        return nameCheck;
    }

    // Make sure the description is in proper format.
    let descCheck = tools.verifyString(msg, 'description', 200, 1);
    if (tools.hasError(descCheck)){
        descCheck['cmd'] = 'CREATE_PROJECT';
        return descCheck;
    }
    // Make sure the description is in proper format.
    let accessCheck = tools.verifyString(msg, 'access', 200, 1);
    if (tools.hasError(accessCheck)){
        accessCheck['cmd'] = 'CREATE_PROJECT';
        return accessCheck;
    }


    if (msg['access'] !== 'Private' &&  msg['access'] !== 'Public'){
        return {error: 'Invalid Access Type', cmd: 'CREATE_PROJECT'};
    }

    let time = new Date().getTime();
    let project = {
        name: msg.name,
        owner: uid,
        shared: null,
        description: msg.description,
        access: msg.access,
        created: time,
        key: uniqid(),
        id: uniqid(time),
        color: msg.color,
        variables: {
            "default": 0
        },
        widgets: [],
        charts: []
    };

    PROJECTS.insert(project);
    db.saveDatabase();
    return {cmd:"CREATE_PROJECT", result:project};
}

function deleteProject(msg, uid){
    if(msg.hasOwnProperty('id')){
        let results = PROJECTS.findOne({id: msg.id});
        PROJECTS.remove(results);
        return {
            results:  results.id,
            cmd: "DELETE_PROJECT"
        }
    }
    return{error: 'Project Not Found.', cmd: 'DELETE_PROJECT'};

}




// -----> VARIABLES <----------------------------------------

/**
 * Create a variable.
 * @function createVariable
 * @param {object} msg - Message object received.
 * @returns {object} Returns response.
 */
function createVariable(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return nameCheck;

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    // Name can't be default.
    if (msg.name === "default") return {error: "Variable name can't be default."};

    // Make sure the variable name does not already exist.
    if (project['variables'].hasOwnProperty(msg.name)) return {error: "Variable name already taken"};

    // If there is a value set, set the variable to that value, leave null if not.
    let value = null;
    if (msg.hasOwnProperty('value')) {
        value = msg['value'];
    }
    project['variables'][msg.name] = value;

    // Update the database with the data.
    PROJECTS.update(project);

    // Send the response msg.
    return {
        "meta": project['meta'],
        "results": {[[msg.name]]: value}
    };

}

/**
 * Get the value of a stored variable.s
 * @function getVariable
 * @param {object} msg - Message object received.
 * @returns {object} Value of the variable.
 */
function getVariable(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return nameCheck;

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    // Name can't be default.
    if (msg.name === "default") return {error: "Variable name can't be default."};

    // Look for the variable and send that value back.
    if (project['variables'].hasOwnProperty(msg.name)) {
        return {
            "meta": project['meta'],
            "results": {[msg.name]: project['variables'][msg.name]}
        };
    }
    return {error: "Variable does not exist."};
}

/**
 * Set the value of a variable.
 * @function setVariable
 * @param {object} msg - Message object received.
 * @returns {object} Value of the variable.
 */
function setVariable(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Make sure the value is present.
    let valueCheck = tools.verifyString(msg, 'value', 200, 1, 'any');
    if (tools.hasError(valueCheck)) return (valueCheck);

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return ({error: `Unknown Project Key`});

    // Name can't be default.
    if (msg.name === "default") return {error: "Variable name can't be default."};

    if (!project['variables'].hasOwnProperty(msg.name)) return {error: "Variable not found"};


    project['variables'][msg.name] = msg.value;

    PROJECTS.update(project);

    return {
        "meta": project['meta'],
        "results": {[msg.name]: project['variables'][msg.name]}
    };

}

/**
 * Erase a variable.
 * @function deleteVariable
 * @param {object} msg - Message object received.
 * @returns {object} Value of the variable erased.
 */
function deleteVariable(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return ({error: `Unknown Project Key`});

    // Name can't be default.
    if (msg.name === "default") return {error: "Variable name can't be default."};

    if (!project['variables'].hasOwnProperty(msg.name)) return {error: "Variable not found"};


    delete project['variables'][msg.name];

    project[msg.name] = project['variables'][msg.name];

    PROJECTS.update(project);

    return {
        "meta": project['meta'],
        "results": true
    };

}

/**
 * Get all variables.
 * @function getAllVariables
 * @param {object} msg - Message object received.
 * @returns {object} Value of the variable erased.
 */
function getAllVariables(msg) {

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    return {
        "meta": project['meta'],
        "results": project['variables']
    };
}


// -----> CHARTS <----------------------------------------

/**
 * Create a chart.
 * @function createChart
 * @param {object} msg - Message object received.
 * @returns {object} Value of the variable erased.
 */
function createChart(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Make sure the type is in proper format.
    let typeCheck = tools.verifyString(msg, 'type', 200, 1);
    if (tools.hasError(typeCheck)) return (typeCheck);

    // Name can't be default.
    if (msg.name === "default") return {error: "Chart name can't be default."};

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};


    if (project.charts.some(e => e.name === msg.name)) return {error: "Chart name already taken"};

    msg.type = msg.type.toUpperCase();

    let chartEntry = {};
    let time = new Date().getTime();
    if (msg.type === "PIE" || msg.type === "LINE" || msg.type === "SCATTER" || msg.type === "BAR") {

        chartEntry = {
            "name": msg.name,
            "type": msg.type,
            "entries": 0,
            "created": time,
            "id": uniqid(time)
        };

    } else if (msg.type === "HISTOGRAM" || msg.type === "HISTO") {

        // Make sure the variable name is in proper format.
        let startCheck = tools.verifyString(msg, 'start', 200, 1, 'number');
        if (tools.hasError(startCheck)) return (startCheck);

        // Make sure the type is in proper format.c
        let endCheck = tools.verifyString(msg, 'end', 200, 1, 'number');
        if (tools.hasError(endCheck)) return (endCheck);

        if (msg['end'] < msg['start']) return {error: "Start value must be inferior to end value."};

        chartEntry = {
            "name": msg.name,
            "type": msg.type,
            "entries": 0,
            "created": time,
            "start": msg.start,
            "end": msg.end,
            "id": uniqid(time)
        };
    } else {
        return {error: "Invalid chart type."}
    }

    project.charts.push(chartEntry);
    PROJECTS.update(project);

    return {
        "meta": {
            "version": 0,
            "revision": 0,
            "created": time
        },
        "results": chartEntry
    };


}

/**
 * Delete a chart.
 * @function deleteChart
 * @param {object} msg - Message object received.
 * @returns {object} Value of the chart erased.
 */
function deleteChart(msg) {

    // Make sure the variable name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Name can't be default.
    if (msg.name === "default") return {error: "Chart name can't be default."};

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    // Delete using name.
    if (project.charts.some(e => e.name === msg.name)) {
        project.charts = project.charts.filter(({name}) => !name.includes(msg.name));
        PROJECTS.update(project);
        return {
            "meta": {
                "version": 0,
                "revision": 0,
                "created": new Date().getTime()
            },
            "results": true
        };
    }

    // Delete using ID.
    else if (project.charts.some(e => e.id === msg.name)) {
        project.charts = project.charts.filter(({id}) => !(id === msg.name));
        PROJECTS.update(project);
        return {
            "meta": {
                "version": 0,
                "revision": 0,
                "created": new Date().getTime()
            },
            "results": true
        };
    }
    return {error: "Chart not found."};
}

/**
 * Add data point.
 * @function addDataPoint
 * @param {object} msg - Message object received.
 * @returns {object} Value of the chart df.
 */
function addDataPoint(msg) {

    // Make sure the chart name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Name can't be default.
    if (msg.name === "default") return {error: "Chart name can't be default."};

    // Get the chart type of the target chart.
    let chart_type = getChartType(msg.key, msg.name);
    if (chart_type.includes('error')) return chart_type;


    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};


    let index = null;

    // Find the chart index by its name.
    if (project.charts.some(e => e.name === msg.name)) index = project.charts.findIndex(e => e.name === msg.name);

    // Find the chart index by its id.
    else if (project.charts.some(e => e.id === msg.name)) index = project.charts.findIndex(e => e.name === msg.name);

    // No chart found.
    else return {error: "Chart not found."};


    // If the index is somehow not defined, return an error.
    if (index === null || index === undefined) return {error: "Chart indexing error."};

    if (project.charts[index].hasOwnProperty('type')) {
        let chart_type = project.charts[index].type;
        let time = new Date().getTime();
        let id = uniqid(time);

        // Line, bar and pie charts.
        if (['LINE', 'BAR', 'PIE', 'SCATTER', 'HISTOGRAM', 'HISTO'].includes(chart_type)) {

            // Make sure the chart name is in proper format.
            if (!['SCATTER'].includes(chart_type)) {
                let valueCheck = tools.verifyString(msg, 'value', 200, 1, 'number');
                if (tools.hasError(valueCheck)) return (valueCheck);
            }

            // For bar and pie charts, make sure there is a point value.
            if (['BAR', 'PIE'].includes(chart_type)) {
                let pointCheck = tools.verifyString(msg, 'point', 200, 1, 'string');
                if (tools.hasError(pointCheck)) return (pointCheck);
            }
            if (['HISTOGRAM', 'HISTO'].includes(chart_type)) {
                let valueCheck = tools.verifyString(msg, 'value', 200, 1, 'number');
                if (tools.hasError(valueCheck)) return (valueCheck);
                if(msg.value < project.charts[index]['start'] || msg.value > project.charts[index]['end']) return {error: `Value is out of range, [${project.charts[index]['start']}, ${project.charts[index]['end']}]`};
            }

            // For scatter charts x, make sure there is a x and y value.
            if (['SCATTER'].includes(chart_type)) {
                let xCheck = tools.verifyString(msg, 'x', 200, 1, 'number');
                if (tools.hasError(xCheck)) return (xCheck);
                let yCheck = tools.verifyString(msg, 'y', 200, 1, 'number');
                if (tools.hasError(yCheck)) return (yCheck);
            }

            // Line chart data.
            let entry = {
                entry: (project['charts'][index]['entries'] + 1),
                timestamp: time,
                id: id
            };

            // Line, bar and pie charts.
            if (['LINE', 'PIE', 'BAR', 'HISTO', 'HISTOGRAM'].includes(chart_type)) entry['value'] = msg.value;

            // Bar, Pie chart.
            if (['PIE', 'BAR'].includes(chart_type)) entry['point'] = msg.point;

            // Scatter plots.
            if (['SCATTER'].includes(chart_type)){
                entry['x'] = msg.x;
                entry['y'] = msg.y;
            }

            // If the chart does not already have data.
            if (project['charts'][index]['data'] === undefined) {
                project['charts'][index]['data'] = [entry];
            }

            // Does have data.
            else{
                project['charts'][index]['data'] .push(entry);
            }

            project['charts'][index]['entries'] = project['charts'][index]['entries'] + 1;

            PROJECTS.update(project);

            let response = {
                "result": {
                    "id": id,
                    "created": time,
                    "entries": project['charts'][index]['entries'],
                    "name": msg.name,
                    "type": chart_type
                },
                "meta": {
                    "revision": 0,
                    "created": time,
                    "version": 0
                }
            };
            if (['LINE', 'PIE', 'BAR', 'HISTO', 'HISTOGRAM'].includes(chart_type)) response.result['value'] = msg.value;
            if (['PIE', 'BAR'].includes(chart_type)) response.result['point'] = msg.point;
            if (['SCATTER'].includes(chart_type)){
                response.result['x'] = msg.x;
                response.result['y'] = msg.y;
            }
            PROJECTS.update(project);
            return response;
        }else{

        }
    }

    else {
        return {error: "Chart type property error."};
    }
}

/**
 * Get chart data.
 * @function getChartData
 * @param {object} msg - Message object received.
 * @returns {object} Chart Data.
 */
function getChartData(msg) {
    // Make sure the chart name is in proper format.
    let nameCheck = tools.verifyString(msg, 'name', 200, 1);
    if (tools.hasError(nameCheck)) return (nameCheck);

    // Name can't be default.
    if (msg.name === "default") return {error: "Chart name can't be default."};

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    if (project.charts.some(e => e.name === msg.name)) {
        let data = project['charts'][project['charts'].findIndex(e => e.name === msg.name)].data;
        return {
            "meta": {
                "version": 0,
                "revision": 0,
                "created": new Date().getTime()
            },
            "results": data
        };
    }
    else{
        return {error: "Chart not found."};
    }

}

/**
 * Get all charts.
 * @function getAllCharts
 * @param {object} msg - Message object received.
 * @returns {object} Chart Data.
 */
function getAllCharts(msg){

    // Find the project matching the Project Key.
    let project = PROJECTS.findOne({key: msg.key});
    if (project === null) return {error: `Unknown Project Key`};

    let data = [];
    let charts = project['charts'];
    for(let chart in charts){
        if(charts.hasOwnProperty(chart)){
        data.push({
            name: charts[chart].name,
            type: charts[chart].type,
            entries: charts[chart].entries,
        });
        }
    }
    return {
        "meta": project['meta'],
        "results": data
    };
}
function getChartType(key, chart_name) {
    let userKey = PROJECTS.findOne({key: key});
    if (userKey['charts'].some(e => e.name === chart_name)) {
        return (userKey['charts'][userKey['charts'].findIndex(e => e.name === chart_name)].type);
    } else if (userKey['charts'].some(e => e.id === chart_name)) {
        return (userKey['charts'][userKey['charts'].findIndex(e => e.name === chart_name)].type);
    }
    return {error: "Chart not found."};
}

function setDatabase(database) {
    db = database;
    db.loadDatabase({}, function () {
        PROJECTS = db.getCollection('users');
    });
    setInterval(() => {
        db.saveDatabase();
    }, 240000);
}

module.exports = {
    getProjects,
    createProject,
    setDatabase,
    deleteVariable,
    setVariable,
    getVariable,
    createChart,
    getProject,
    addDataPoint,
    getAllVariables,
    deleteChart,
    getAllCharts,
    getChartData,
    notifyClients,
    addWidget,
    updateWidget,
    newProjectKey,
    deleteProject,
    createVariable,
    setProjectName,
    setProjectDescription,
    removeWidget,
    getChartType,
};
