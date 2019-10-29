function paintProject(data) {
  var project = document.getElementById('project_projectSection');
  currentProject = data.id;
  project.classList = 'w100 c ac jc';
  project.style = {
    height: "100%",
    overflow: "visible"
  };
  project.innerHTML = "\n                    <div style=\"\" class=\"w100 c ac\">\n                    <h1 style=\"\" class=\"m0\">".concat(data.name, "</h1>\n                    <h3 style=\"\">").concat(data.description, "</h3>\n                    <div class=\"r js ac\">\n                        <h4>Project Key: </h4>\n                         <input class=\"ml2\" id=\"project_key\" value=\"").concat(data.key, "\" disabled>\n                    </div>\n                   \n                    <div style=\"height: 100%; overflow: visible;\" class=\"w100 rxl ac jc\">\n                        <div id=\"variables\" class=\"m1 variables c jfs ac w100xl\"> \n                            <h3 class=\"mb0\">Variables <button class=\"fa fa-plus\" onclick=\"windowSwitcher('new_variable')\"></button><button onclick=\"editVariables()\" style=\"padding: 8px 30px;\" class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button\" onclick=\"\"></button></h3>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                        <div id=\"charts\" class=\"m1 charts c jfs ac w100xl\">\n                            <h3 class=\"mb0\">Charts</h3>\n                            <p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Charts \uD83D\uDE41</p>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                    </div>\n                </div>");
  document.getElementById('content_box').appendChild(project);
  var variables = document.getElementById('variables');
  var vars = data.variables;
  var count = 0;

  for (var variable in vars) {
    if (variable === 'default') {
      continue;
    }

    var newVar = document.createElement('div');
    newVar.id = "var_" + variable;
    newVar.innerHTML = "\n\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(data.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
    variables.appendChild(newVar);
    count++;
  }

  if (!count) {
    var noVars = document.createElement('div');
    noVars.innerHTML = "<p style=\"background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;\">No Variables \uD83D\uDE41</p>";
    variables.appendChild(noVars);
    return;
  } // console.log('Project Options: ', message);

}

function createVariable(name, uid) {
  console.log('Creating Var: ', name, uid);
  var ele = document.getElementById('project_key');
  ws.send("{\"cmd\":\"CREATE_VARIABLE\", \"key\":\"".concat(ele.value, "\", \"name\":\"").concat(name, "\", \"onSuccess\":\"console.log('Success!'); windowSwitcher('none'); getProjects(currentUid);\", \"onError\":\"\"}"));
}

function updateProject(project, id) {
  var variables = document.getElementById('variables');

  if (variables.classList.contains('hold')) {
    return;
  }

  var vars = project.variables;
  var count = 0;

  for (var variable in vars) {
    if (variable === 'default') {
      continue;
    } // console.log(variables.querySelector('variable'));


    var newVar = document.getElementById("var_" + variable);
    newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
    newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
    newVar.innerHTML = "\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(project.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
    variables.appendChild(newVar);
  }
}

function editVariables() {
  if (currentView === 'projectSingle') {
    var variables = document.getElementById('variables');
    console.log(document.getElementById('variables'));
  }
} // Handles the events of editing a variable value in the UI.


function variableEdit(id) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // console.log('key: ', id);
  edit = true;
  var error = document.getElementById("var_error_".concat(id.substring('var_button_'.length)));
  error.classList.add('dn'); // Get the input element.

  var inputString = "var_input_".concat(id.substring('var_button_'.length));
  var input = document.getElementById(inputString); // Make the input editable by removing the disabled attribute.

  input.removeAttribute('disabled'); // Store the current value, so that if someone decides to cancel instead of editing the variable, it will set the input back to the original value (oldValue).

  var oldValue = input.value; // Get the edit button and switch it to the check mark styling, also remove the onClick attribute.

  var button = document.getElementById(id);
  button.classList.remove('fa-pencil-alt');
  button.classList.add('fa-check');
  button.classList.add('double-button');
  button.style.color = 'green';
  button.removeAttribute('onClick'); // Add a click listener in the event that the save (check mark) button is clicked.

  button.setAttribute('onclick', "variableSave(id, \"".concat(oldValue, "\",\"").concat(key, "\")")); // Get the second close button element. "Currently Hidden".

  var button2 = document.getElementById("var_button_2_".concat(id.substring('var_button_'.length))); // Remove the dn class which is hiding it. So it is now visible.

  button2.classList.remove('dn'); // Add this class to translate it into position inside the input element.

  button2.classList.add('double-button2'); // Set the color to red.

  button2.style.color = 'red'; // When someone clicks the red cross to cancel the variable edit.

  button2.addEventListener('click', function () {
    edit = false; // Get the input ele.

    var input2 = document.getElementById(inputString); // Set it back to the original value.

    input2.value = oldValue; // Disabled it again.

    input2.setAttribute('disabled', true); // Remove the check mark and add the pencil and styling again to the edit button.

    button.classList.add('fa-pencil-alt');
    button.classList.remove('fa-check', 'loader-small');
    button.style.color = '#9b55a3';
    button.classList.remove('double-button'); // Translation to give room to the cross button.
    // Set the on click function back to this.

    button.setAttribute('onClick', "variableEdit(id, '".concat(key, "')")); // Hide the close button.

    button2.classList.add('dn');
  });
}

function variableSave(id, old, key) {
  var editButton = document.getElementById(id);
  editButton.classList.remove('fa-check');
  editButton.classList.remove('fa-pencil-alt');
  editButton.classList.add('loader-small', 'double-button-load');
  var button2 = document.getElementById("var_button_2_".concat(id.substring('var_button_'.length)));
  button2.classList.add('dn');
  var inputString = "var_input_".concat(id.substring('var_button_'.length));
  var input = document.getElementById(inputString);
  input.setAttribute('disabled', true);
  var name = document.getElementById("var_name_".concat(id.substring('var_button_'.length)));
  var errorElement = "var_error_".concat(id.substring('var_button_'.length));
  ws.send("{\"cmd\":\"SET_VARIABLE\", \"key\":\"".concat(key, "\", \"name\":\"").concat(name.value, "\", \"value\":\"").concat(input.value, "\", \"onSuccess\":\"console.log('Success!'); var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', `variableEdit(id, '").concat(key, "')`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); \", \"onError\":\"var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('").concat(errorElement, "'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;\"}"));
  setTimeout(function () {
    if (!editButton.classList.contains('done')) {
      editButton.classList.add('fa-pencil-alt');
      edit = false;
      editButton.classList.remove('fa-check', 'loader-small', 'double-button-load');
      editButton.style.color = '#9b55a3';
      editButton.classList.remove('double-button'); // Translation to give room to the cross button.

      var error = document.getElementById("var_error_".concat(id.substring('var_button_'.length)));
      error.classList.remove('dn');
      input.value = old; // Set the on click function back to this.

      editButton.setAttribute('onClick', "variableEdit(id, '".concat(key, "')"));
    }
  }, 3000);
}