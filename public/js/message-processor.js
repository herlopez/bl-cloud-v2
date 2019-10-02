function messageProcessor(message, callback) {
  // Try to parse the JSON message.
  try {
    console.log("Message : PARSE:  ", message);
    message = JSON.parse(message.data);
  } catch (e) {
    console.log(e);
    callback.send("{\"error\":\"Unable to parse JSON: ".concat(e, "\"}"));
    return;
  } // If a command was sent.


  if (message.hasOwnProperty('cmd')) {
    {
      // Print command.
      console.log("Cmd Received: ", message.cmd);

      switch (message.cmd) {
        case 'GET_PROJECTS':
          try {
            var projects = message['results'];

            if (currentView === 'projectSingle' && !edit) {
              var findProject = function findProject(p) {
                return p.id === currentProject;
              };

              updateProject(projects.find(findProject), currentProject);
            } else {
              paintProjects(projects);
            }
          } catch (e) {
            console.log(e);
          }

          break;

        case 'CREATE_CHART_CB':
        case 'ERASE_VARIABLE_CB':
        case 'ERASE_CHART_CB':
        case 'NEW_VARIABLE_CB':
        case 'SET_VARIABLE_CB':
          console.log("Message: ", message);

          if (currentView === 'dashboard') {
            getProjects(currentUid);
          } else if (currentView === 'projectSingle') {
            if (message.hasOwnProperty('error')) {
              windowError('new_variable', message['error']);
              return;
            }

            getProject(currentUid, currentProject);
            windowSwitcher('none');
          }

          break;

        case 'SET_VARIABLE':
          if (message.hasOwnProperty('error')) {
            return;
          }

          console.log(message);

          if (currentView === 'projectSingle') {
            document.getElementById(message.id).classList.add('done');
          }

          break;

        case 'CREATE_PROJECT':
          console.log("Project msg: ", message);

          if (message.hasOwnProperty('error')) {
            console.log(message['error']);
            windowError('create_project', message['error']);
            return;
          }

          if (currentView === 'dashboard') {
            getProjects(currentUid);
            windowSwitcher('none');
          }

          break;

        case 'GET_PROJECT':
          message = message['results'][0];
          var project = document.getElementById('project_projectSection');
          currentProject = message.id;
          project.classList = 'w100 c ac jc';
          project.style = {
            height: "100%",
            overflow: "visible"
          };
          project.innerHTML = "\n                    <div style=\"\" class=\"w100 c ac\">\n                    <h1 style=\"\" class=\"m0\">".concat(message.name, "</h1>\n                    <h3 style=\"\">").concat(message.description, "</h3>\n                    <div class=\"r js ac\">\n                        <h4>Project Key: </h4>\n                         <input class=\"ml2\" id=\"project_key\" value=\"").concat(message.key, "\" disabled>\n                    </div>\n                   \n                    <div style=\"height: 100%; overflow: visible;\" class=\"w100 rxl ac jc\">\n                        <div id=\"variables\" class=\"m1 variables c jfs ac w100xl\"> \n                            <h3 class=\"mb0\">Variables <button class=\"fa fa-plus\" onclick=\"windowSwitcher('new_variable')\"></button><button onclick=\"editVariables()\" style=\"padding: 8px 30px;\" class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button\" onclick=\"\"></button></h3>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                        <div id=\"charts\" class=\"m1 charts c jfs ac w100xl\">\n                            <h3 class=\"mb0\">Charts</h3>\n                            <p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Charts \uD83D\uDE41</p>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                    </div>\n                </div>");
          document.getElementById('app_container').appendChild(project);
          var variables = document.getElementById('variables');
          var vars = message.variables;
          var count = 0;

          for (var variable in vars) {
            if (variable === 'default') {
              continue;
            }

            var newVar = document.createElement('div');
            newVar.id = "var_" + variable;
            newVar.innerHTML = "\n\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(message.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
            variables.appendChild(newVar);
            count++;
          }

          if (!count) {
            var noVars = document.createElement('div');
            noVars.innerHTML = "<p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Variables \uD83D\uDE41</p>";
            variables.appendChild(noVars);
            return;
          } // console.log('Project Options: ', message);


          break;

        default:
          break;
      }
    }
  }

  if (message.hasOwnProperty('fn')) {
    var fn = message['fn'];

    try {
      var iFn = new Function(fn);
      iFn();
    } catch (e) {
      callback.send("{\"error\":\"Unable to execute function: ".concat(e, "\"}"));
    }
  }
}