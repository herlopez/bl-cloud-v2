let db, USERS, REGISTERED_USERS, PROJECTS;
let uniqid = require('uniqid');

function getProjects(uid){
    try{
        let results = USERS.find({owner: uid});
        console.log(results);
        return JSON.stringify({
            "meta": results['meta'],
            "results": results,
            "cmd": "PROJECTS"
        });
    }
   catch (e) {
       return (JSON.stringify({error: "User does not exist."}));
   }
}
function createProject(name, description, access, color, uid){
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
        "charts":{
            "default": 0
        }
    };
    console.log(project);
    USERS.insert(project);
    db.saveDatabase();
    return true;
}



// API
/**
 * Create a variable.
 * @function createVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to create.
 * @param {string} value of the new variable.
 * @returns {string} Returns response.
 */
function createVariable(key, name, value) {
    let userKey = USERS.findOne({key: key});
    if (name === "default") {
        return (JSON.stringify({error: "Variable name can't be default."}));
    }
    if (userKey['variables'].hasOwnProperty(name)) {
        return (JSON.stringify({error: "Variable name already taken"}));
    }
    userKey['variables'][name] = value;
    USERS.update(userKey);
    return JSON.stringify({
        "meta": userKey['meta'],
        "results": {[name]: value}
    });
}

/**
 * Get the value of a stored variable.s
 * @function getVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to get the value from.
 * @returns {string} Value of the variable.
 */
function getVariable(key, name) {
    if (name === "default") {
        return (JSON.stringify({error: "Variable name can't be default."}));
    }
    let results = USERS.findOne({key: key});
    if (results['variables'].hasOwnProperty(name)) {
        return JSON.stringify({
            "meta": results['meta'],
            "results": {[name]: results['variables'][name]}
        });
    }
    return (JSON.stringify({error: "Variable does not exist."}));
}

/**
 * Set the value of a variable.
 * @function setVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable set.
 * @param {string} value - Value to store in the variable.
 * @returns {object} Value of the variable.
 */
function setVariable(key, name, value) {
    if (name === "default") {
        return ({error: "Variable name can't be default."});
    }
    let userKey = USERS.findOne({key: key});
    if (userKey['variables'].hasOwnProperty(name)) {
        userKey['variables'][name] = value;
        return {
            "meta": userKey['meta'],
            "results": {[name]: userKey['variables'][name]}
        };
    }
    return ({error: "Variable not found, create it first."});
}

/**
 * Erase a variable.
 * @function deleteVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to erase.
 * @returns {string} Value of the variable erased.
 */
function deleteVariable(key, name) {
    if (name === "default") {
        return (JSON.stringify({error: "Variable name can't be default."}));
    }
    let userKey = USERS.findOne({key: key});
    if (userKey['variables'].hasOwnProperty(name)) {
        delete userKey['variables'][name];
        userKey[name] = userKey['variables'][name];
        return JSON.stringify({
            "meta": userKey['meta'],
            "results": true
        });
    }
    return (JSON.stringify({error: "Variable not found."}));
}

/**
 * Create a chart.
 * @function createChart
 * @param {string} key - API key of user.
 * @param {string} chart_name - Name of the chart to create.
 * @param {string} type - Type of chart to create.
 * @param {number} start - Start range of a histogram chart.
 * @param {number} end - End range of a histogram chart.
 * @returns {string} Value of the variable erased.
 */
function createChart(key, chart_name, type, start, end) {
    let userKey = USERS.findOne({key: key});
    if (chart_name === "default") {
        return (JSON.stringify({error: "Chart name can't be default."}));
    }
    if (userKey['charts'].some(e => e.name === chart_name)) {
        return (JSON.stringify({error: "Chart name already taken"}));
    } else {
        let chartEntry = {};
        let time = new Date().getTime();
        if (type === "PIE" || type === "LINE" || type === "SCATTER" || type === "BAR") {
            chartEntry = {
                "name": chart_name,
                "type": type,
                "entries": 0,
                "created": time,
                "id": uniqid(time)
            };
        } else if (type === "HISTOGRAM" || type === "HISTO") {
            chartEntry = {
                "name": chart_name,
                "type": type,
                "entries": 0,
                "created": time,
                "start": start,
                "end": end,
                "id": uniqid(time)
            };
        }
        userKey['charts'].push(chartEntry);
        return JSON.stringify({
            "meta": {
                "version": 0,
                "revision": 0,
                "created": time
            },
            "results": chartEntry
        });
    }


}

/**
 * Delete a chart.
 * @function deleteChart
 * @param {string} key - API key of user.
 * @param {string} chart_name - Name of the chart to erase.
 * @returns {string} Value of the chart erased.
 */
function deleteChart(key, chart_name) {
    let userKey = USERS.findOne({key: key});
    if (userKey['charts'].some(e => e.name === chart_name)) {
        userKey['charts'] = userKey['charts'].filter(({name}) => !name.includes(chart_name));
        return (JSON.stringify({
            "meta": {
                "version": 0,
                "revision": 0,
                "created": new Date().getTime()
            },
            "results": true
        }));
    }
    // Delete using ID.
    else if (userKey['charts'].some(e => e.id === chart_name)) {
        userKey['charts'] = userKey['charts'].filter(({id}) => !(id === chart_name));
        return (JSON.stringify({
            "meta": {
                "version": 0,
                "revision": 0,
                "created": new Date().getTime()
            },
            "results": true
        }));
    }
    return (JSON.stringify({error: "Chart not found."}));
}

/**
 * Add data point.
 * @function addDataPoint
 * @param {string} key - API key of user.
 * @param {string} chart_name - Name of the chart to add a data point too.
 * @param {string} point - Point name to add.
 * @param {string} value - Point value to add.
 * @returns {string} Value of the chart df.
 */
function addDataPoint(key, chart_name, point, value) {
    let userKey = USERS.findOne({key: key});
    let index = null;
    if (userKey['charts'].some(e => e.name === chart_name)) {
        index = userKey['charts'].findIndex(e => e.name === chart_name);
    } else if (userKey['charts'].some(e => e.id === chart_name)) {
        index = userKey['charts'].findIndex(e => e.name === chart_name);
    } else {
        return (JSON.stringify({error: "Chart not found."}));
    }
    if (index === null) {
        return (JSON.stringify({error: "Chart indexing error."}));
    } else {
        if (userKey['charts'][index] !== undefined) {
            if (userKey['charts'][index].hasOwnProperty('type')) {
                let chart_type = userKey['charts'][index].type;
                let time = new Date().getTime();
                let id = uniqid(time);
                if (['LINE'].includes(chart_type)) {
                    if (typeof value === 'number' || value instanceof Number) {
                        if (userKey['charts'][index]['data'] === undefined) {
                            userKey['charts'][index]['data'] = [{
                                entry: (userKey['charts'][index]['entries'] + 1),
                                value: value,
                                timestamp: time,
                                id: id
                            }];
                            userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                            return (JSON.stringify({
                                "result": {
                                    "id": id,
                                    "created": time,
                                    "value": value,
                                    "entries": userKey['charts'][index]['entries'],
                                    "name": chart_name,
                                    "type": chart_type
                                },
                                "meta": {
                                    "revision": 0,
                                    "created": time,
                                    "version": 0
                                }
                            }));
                        } else {
                            userKey['charts'][index]['data'].push({
                                entry: (userKey['charts'][index]['entries'] + 1),
                                value: value,
                                timestamp: time,
                                id: id,
                            });
                            userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                            return (JSON.stringify({
                                "result": {
                                    "id": id,
                                    "created": time,
                                    "value": value,
                                    "entries": userKey['charts'][index]['entries'],
                                    "name": chart_name,
                                    "type": chart_type
                                },
                                "meta": {
                                    "revision": 0,
                                    "created": time,
                                    "version": 0
                                }
                            }));
                        }
                    } else {
                        return (JSON.stringify({error: "Value must be a number."}));
                    }
                } else if (['BAR', 'PIE'].includes(chart_type)) {
                    if (typeof value === 'number' || value instanceof Number) {
                        if (typeof point === 'string' || point instanceof String) {
                            if (point.length < 200) {
                                if (userKey['charts'][index]['data'] === undefined) {
                                    userKey['charts'][index]['data'] = [{
                                        entry: (userKey['charts'][index]['entries'] + 1),
                                        value: value,
                                        point: point,
                                        timestamp: time,
                                        id: id
                                    }];
                                    userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                                    return (JSON.stringify({
                                        "result": {
                                            "id": id,
                                            "created": time,
                                            "value": value,
                                            "point": point,
                                            "entries": userKey['charts'][index]['entries'],
                                            "name": chart_name,
                                            "type": chart_type
                                        },
                                        "meta": {
                                            "revision": 0,
                                            "created": time,
                                            "version": 0
                                        }
                                    }));
                                } else {
                                    userKey['charts'][index]['data'].push({
                                        entry: (userKey['charts'][index]['entries'] + 1),
                                        value: value,
                                        point: point,
                                        timestamp: time,
                                        id: id,
                                    });
                                    userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                                    return (JSON.stringify({
                                        "result": {
                                            "id": id,
                                            "created": time,
                                            "value": value,
                                            "point": point,
                                            "entries": userKey['charts'][index]['entries'],
                                            "name": chart_name,
                                            "type": chart_type
                                        },
                                        "meta": {
                                            "revision": 0,
                                            "created": time,
                                            "version": 0
                                        }
                                    }));
                                }
                            } else {
                                return (JSON.stringify({error: "Name must less than 200 characters."}));
                            }
                        } else {
                            return (JSON.stringify({error: "Name must be a string."}));
                        }
                    } else {
                        return (JSON.stringify({error: "Value must be a number."}));
                    }
                } else if (['SCATTER'].includes(chart_type)) {
                    if (typeof value === 'number' || value instanceof Number) {
                        if (typeof point === 'number' || point instanceof Number) {
                            if (userKey['charts'][index]['data'] === undefined) {
                                userKey['charts'][index]['data'] = [{
                                    entry: (userKey['charts'][index]['entries'] + 1),
                                    y: value,
                                    x: point,
                                    timestamp: time,
                                    id: id
                                }];
                                userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                                return (JSON.stringify({
                                    "result": {
                                        "id": id,
                                        "created": time,
                                        "y": value,
                                        "x": point,
                                        "entries": userKey['charts'][index]['entries'],
                                        "name": chart_name,
                                        "type": chart_type
                                    },
                                    "meta": {
                                        "revision": 0,
                                        "created": time,
                                        "version": 0
                                    }
                                }));
                            } else {
                                userKey['charts'][index]['data'].push({
                                    entry: (userKey['charts'][index]['entries'] + 1),
                                    y: value,
                                    x: point,
                                    timestamp: time,
                                    id: id,
                                });
                                userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                                return (JSON.stringify({
                                    "result": {
                                        "id": id,
                                        "created": time,
                                        "y": value,
                                        "x": point,
                                        "entries": userKey['charts'][index]['entries'],
                                        "name": chart_name,
                                        "type": chart_type
                                    },
                                    "meta": {
                                        "revision": 0,
                                        "created": time,
                                        "version": 0
                                    }
                                }));
                            }

                        } else {
                            return (JSON.stringify({error: "X must be a number."}));
                        }
                    } else {
                        return (JSON.stringify({error: "Y must be a number."}));
                    }
                } else if (['HISTO', 'HISTOGRAM'].includes(chart_type)) {
                    if (typeof value === 'number' || value instanceof Number) {
                        if(value < userKey['charts'][index]['start'] || value > userKey['charts'][index]['end']){
                            return (JSON.stringify({error: `Value is out of range, [${userKey['charts'][index]['start']}, ${userKey['charts'][index]['end']}]`}));
                        }
                        if (userKey['charts'][index]['data'] === undefined) {
                            userKey['charts'][index]['data'] = [{
                                entry: (userKey['charts'][index]['entries'] + 1),
                                value: value,
                                timestamp: time,
                                id: id
                            }];
                            userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                            return (JSON.stringify({
                                "result": {
                                    "id": id,
                                    "created": time,
                                    "value": value,
                                    "entries": userKey['charts'][index]['entries'],
                                    "name": chart_name,
                                    "type": chart_type
                                },
                                "meta": {
                                    "revision": 0,
                                    "created": time,
                                    "version": 0
                                }
                            }));
                        } else {
                            userKey['charts'][index]['data'].push({
                                entry: (userKey['charts'][index]['entries'] + 1),
                                value: value,
                                timestamp: time,
                                id: id,
                            });
                            userKey['charts'][index]['entries'] = userKey['charts'][index]['entries'] + 1;
                            return (JSON.stringify({
                                "result": {
                                    "id": id,
                                    "created": time,
                                    "value": value,
                                    "entries": userKey['charts'][index]['entries'],
                                    "name": chart_name,
                                    "type": chart_type
                                },
                                "meta": {
                                    "revision": 0,
                                    "created": time,
                                    "version": 0
                                }
                            }));
                        }

                    } else {
                        return (JSON.stringify({error: "Value must be a number."}));
                    }
                } else {
                    return (JSON.stringify({error: "Invalid type property error."}));
                }
            } else {
                return (JSON.stringify({error: "Chart type property error."}));
            }
        } else {
            return (JSON.stringify({error: "Chart indexing error."}));
        }
    }
}

function getChartData(key, name, range_start, range_end){

}

function getChartType(key, chart_name) {
    let userKey = USERS.findOne({key: key});
    if (userKey['charts'].some(e => e.name === chart_name)) {
        return (userKey['charts'][userKey['charts'].findIndex(e => e.name === chart_name)].type);
    } else if (userKey['charts'].some(e => e.id === chart_name)) {
        return (userKey['charts'][userKey['charts'].findIndex(e => e.name === chart_name)].type);
    }
    return (JSON.stringify({error: "Chart not found."}));
}
function setDatabase(database) {
    db = database;
    db.loadDatabase({}, function () {
        USERS = db.getCollection('users');
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
    deleteChart,
    createVariable,
    getChartType,
};