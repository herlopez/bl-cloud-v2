/*
    Get Projects
    @Desc: Tell the server to send over the list of all the projects of a specific user.
    @param: uid - User ID
*/
function getProjects(uid) {
  var project = {
    "uid": uid,
    "cmd": 'GET_PROJECTS'
  };
  ws.send(JSON.stringify(project));
}
/*
    Get Project
    @Desc: Tell the server to send over the information for a specific project.
    @param: uid - User ID
    @param id - Project ID
*/


function getProject(uid, id) {
  var project = {
    "uid": uid,
    "id": id,
    "cmd": "GET_PROJECT"
  };
  ws.send(JSON.stringify(project));
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


function createProject(name, desc, access, color, uid) {
  var project = {
    uid: uid,
    cmd: "CREATE_PROJECT",
    name: name,
    color: color,
    description: desc,
    access: access
  };
  ws.send(JSON.stringify(project));
}

function addWidget(uid, project, options) {
  var widget = {
    uid: uid,
    project: project,
    cmd: "ADD_WIDGET",
    options: options
  };
  ws.send(JSON.stringify(widget));
}