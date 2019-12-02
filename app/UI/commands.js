/*
    Get Projects
    @Desc: Tell the server to send over the list of all the projects of a specific user.
    @param: uid - User ID
*/
function getProjects(uid){
    ws.send(JSON.stringify({
        cmd: "GET_PROJECTS",
        uid: uid,
    }));
}

/*
    Create Project
    @Desc: Tell the server create a new project for a given user.
    @param: name - Name 0f project.
    @param desc - Project description.
    @param access - Project access.
    @param color - Project color.
    @param uid - User id of the user.
*/
function createProject(name, desc, access, color, uid){
    ws.send(JSON.stringify({
        cmd: "CREATE_PROJECT",
        uid: uid,
        name : name,
        color: color,
        description : desc,
        access: access
    }));
}

/*
    Set Project Title
    @Desc: Change the title of the project.
    @param: uid - User ID
    @param id - Project ID
    @param title - New titlee.
*/
function setProjectName(name, uid, id){
    ws.send(JSON.stringify({
        cmd: "SET_PROJECT_NAME",
        uid: uid,
        id: id,
        name: name
    }));
}

function deleteProject(uid, id){
    ws.send(JSON.stringify({
        cmd: "DELETE_PROJECT",
        uid: uid,
        id: id,
    }));
}
/*
    Set Project Description
    @Desc: Change the description of the project.
    @param: uid - User ID
    @param id - Project ID
    @param title - New Description.
*/
function setProjectDescription(description, uid, id){
    ws.send(JSON.stringify({
        cmd: "SET_PROJECT_DESCRIPTION",
        uid: uid,
        id: id,
        description: description
    }));
}

/*
    New Project Key
    @Desc: Tell the server to send over a new project key.
    @param: uid - User ID
    @param id - Project ID
*/
function newProjectKey(uid, id){
    ws.send(JSON.stringify({
        cmd: "NEW_KEY",
        uid: uid,
        id: id
    }));
}

/*
    Get Project
    @Desc: Tell the server to send over the information for a specific project.
    @param: uid - User ID
    @param id - Project ID
*/
function getProject(uid, id){
    ws.send(JSON.stringify({
        cmd: "GET_PROJECT",
        uid: uid,
        id: id
    }));
}

/*
    Add Widget
    @Desc: Add a new widget to a project.
    @param: uid - User ID
    @param id - Project ID
    @param options - Widget Options
*/
function addWidget(uid, project, options){
    ws.send(JSON.stringify({
        cmd: "ADD_WIDGET",
        uid: uid,
        project: project,
        options : options
    }));
}


/*
    Save Widget
    @Desc: Update widget.
    @param: uid - User ID
    @param id - Project ID
    @param options - Widget Options
*/
function updateWidget(uid, project, options){
    ws.send(JSON.stringify({
        cmd: "UPDATE_WIDGET",
        uid: uid,
        project: project,
        options : options
    }));
}