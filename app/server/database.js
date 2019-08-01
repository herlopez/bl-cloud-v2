let db, USERS;

/**
 * Create a variable.
 * @function createVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to create.
 * @param {string} value of the new variable.
 * @returns {string} Returns response.
 */
function createVariable(key, name, value) {
    let results = USERS.findOne({key: key});
    if (name === "default") {
        return (JSON.stringify({error: "Variable name can't be default."}));
    }
    if (results['Variables'].hasOwnProperty(name)) {
        return (JSON.stringify({error: "Variable name already taken"}));
    }
    results['Variables'][name] = value;
    console.log(USERS);
    USERS.data[1].insert([{
        Variables: results['Variables']
    }]);
    db.saveDatabase();
    return JSON.stringify({
        "meta": results['meta'],
        "results":{[name]: value}
    });
}
/**
 * Get the value of a stored variable.s
 * @function getVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to get the value from.
 * @returns {string} Value of the variable.
 */
function getVariable(key, name){
    if(name === "default"){
        return(JSON.stringify({error:"Variable name can't be default."}));
    }
    let results = USERS.findOne({ key: key });
    if(results['Variables'].hasOwnProperty(name)){
        return JSON.stringify({
            "meta": results['meta'],
            "results":{[name]: results['Variables'][name]}
        });
    }
    return(JSON.stringify({error:"Variable does not exist."}));
}
/**
 * Set the value of a variable.
 * @function setVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable set.
 * @param {string} value - Value to store in the variable.
 * @returns {string} Value of the variable.
 */
function setVariable(key, name, value){
    if(name === "default"){
        return(JSON.stringify({error:"Variable name can't be default."}));
    }
    let results = USERS.findOne({ key: key });
    if(results['Variables'].hasOwnProperty(name)){
        results['Variables'][name] = value;
        USERS.insert([{
            key: key,
            Variables:  results['Variables']
        }]);
        db.saveDatabase();
        results[name] = results['Variables'][name];
        delete results['key'];
        delete results['$loki'];
        return JSON.stringify(results);
    }
    return(JSON.stringify({error:"Variable not found, create it first."}));
}
/**
 * Erase a variable.
 * @function eraseVariable
 * @param {string} key - API key of user.
 * @param {string} name - Name of the variable to erase.
 * @returns {string} Value of the variable erased.
 */
function eraseVariable(key, name){
    if(name === "default"){
        return(JSON.stringify({error:"Variable name can't be default."}));
    }
    console.log('eraseVariable');
    let results = USERS.findOne({ key: key });
    if(results['Variables'].hasOwnProperty(name)){
        delete results['Variables'][name];
        USERS.insert([{
            key: key,
            Variables:  results['Variables']
        }]);
        db.saveDatabase();
        results[name] = results['Variables'][name];
        delete results['key'];
        delete results['$loki'];
        return JSON.stringify(results);
    }
    return(JSON.stringify({error:"Variable not found."}));
}



function setDatabase(database){
    db = database;
    db.loadDatabase({}, function () {
        USERS = db.getCollection('users');
    });
}

module.exports = {
    setDatabase,
    eraseVariable,
    setVariable,
    getVariable,
    createVariable
};