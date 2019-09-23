let db, REGISTERED_USERS, PROJECTS;
let uniqid = require('uniqid');
let tools = require('./tools');


// -----> PROJECTS <----------------------------------------

function getProjects(uid) {
    try {
        let results = PROJECTS.find({owner: uid});
        return JSON.stringify({
            "meta": results['meta'],
            "results": results,
            "cmd": "PROJECTS"
        });
    } catch (e) {
        return (JSON.stringify({error: "User does not exist."}));
    }
}

function createProject(name, description, access, color, uid) {
    let time = new Date().getTime();
    let project = {
        "name": name,
        "owner": uid,
        "shared": null,
        "description": description,
        "access": access,
        "created": time,
        "key": uniqid(),
        "id": uniqid(time),
        "color": color,
        "variables": {
            "default": 0
        },
        "charts": []
    };
    console.log(project);
    PROJECTS.insert(project);
    db.saveDatabase();
    return true;
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

    return JSON.stringify({
        "meta": project['meta'],
        "results": true
    });

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
        REGISTERED_USERS = db.getCollection('registered_users');
        return (JSON.stringify({error: "REGISTERED_USERS"}));

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
    addDataPoint,
    getAllVariables,
    deleteChart,
    getChartData,
    createVariable,
    getChartType,
};