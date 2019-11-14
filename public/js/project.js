var currentProjectData; // Populate the content of a project.

function paintProject(data) {
  currentProjectData = data;

  switch (projectTab) {
    case 'dashboard':
      paintDashboardTab(data);
      break;

    case 'variables':
      paintVariableTab(data);
      break;

    case 'charts':
      paintChartsTab(data);
      break;

    case 'settings':
      paintSettingsTab(data);
      break;

    default:
      paintDashboardTab(data);
      break;
  }
} // Dashboard Tab.


function paintDashboardTab(data) {
  var dashboard = document.getElementById('project_section_dashboard');
  currentProject = data.id;
  currentKey = data.key;
  dashboard.classList = 'w100 r ac jc';
  dashboard.style = {
    height: "100%",
    overflow: "visible",
    flexWrap: 'wrap'
  };
  dashboard.style.flexWrap = "wrap";
  dashboard.innerHTML = '';

  if (data.hasOwnProperty('widgets')) {
    var widgets = data['widgets'];

    for (var widget in widgets) {
      if (widgets.hasOwnProperty(widget)) {
        console.log(widgets[widget]);
        var div = document.createElement('button');
        div.style.height = "275px";
        div.style.minWidth = "300px";
        div.style.maxWidth = "300px"; // div.style.background = projects[project]['color'];

        div.style.background = "rgba(3, 4, 8, 0.46)"; // div.id = projects[project]['id'];

        div.borderRadius = "10px";
        var mod = 0.7;
        console.log('DATA        ', data);

        if (widgets[widget].type === 'gauge') {
          var display = "inherit";
          var mb = 'margin-bottom: 5px; margin-top: 8px;';
          console.log(widgets[widget]['hide']);

          if (widgets[widget]['hide'] === 'true') {
            display = "none";
            mb = '';
          }

          var range = Math.abs(widgets[widget].min) + Math.abs(widgets[widget].max);
          var tic = 270 / range;
          console.log(tic);
          var angle = Math.floor(tic * data['variables'][widgets[widget].variable]);
          console.log(angle);
          if (angle > 135) angle = 135;
          if (angle < -135) angle = -135;
          div.innerHTML = "<h2 style=\"".concat(mb, "\" id=\"h2Widget\">").concat(widgets[widget].title, "</h2>") + "<h3 style=\"font-size:14px; display:".concat(display, ";\" class=\"m0 mb3 p0\" id=\"widgetVariable\">").concat(widgets[widget].variable, "</h3>") + "<svg height=\"".concat(200 * mod, "\" width=\"").concat(200 * mod, "\">") + "<circle cx= \"".concat(100 * mod, "\" cy= \"").concat(100 * mod, "\" r=\"").concat(5 * mod, "\" fill=\"#ffffff\"/>") + "<path fill=\"".concat(widgets[widget].color1, "\" d=\"M").concat(29.29 * mod, ",").concat(170.71 * mod, "           A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(0 * mod, " ").concat(102.5 * mod, "                 L ").concat(20 * mod, " ").concat(102.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(43.432 * mod, " ").concat(156.568 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color2, "\" d=\"M").concat(0 * mod, ",").concat(97.5 * mod, "                 A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(27.592735 * mod, " ").concat(31.12827 * mod, "      L ").concat(41.6915 * mod, " ").concat(45.227 * mod, "         A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(20 * mod, " ").concat(97.5 * mod, " \"/>") + "<path fill=\"".concat(widgets[widget].color3, "\" d=\"M").concat(31.05709 * mod, ", ").concat(27.521555 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(97.5 * mod, " ").concat(0 * mod, "                  L ").concat(97.5 * mod, " ").concat(20 * mod, "                A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(45.226855 * mod, " ").concat(41.6915 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color4, "\" d=\"M").concat(102.5 * mod, ",").concat(0 * mod, "                A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(168.94291 * mod, " ").concat(27.521555 * mod, "     L ").concat(154.773145 * mod, " ").concat(41.6915 * mod, "     A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(102.5 * mod, " ").concat(20 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color5, "\" d=\"M").concat(172.407265 * mod, ",").concat(31.12827 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(200 * mod, " ").concat(97.5 * mod, "                L ").concat(180 * mod, " ").concat(97.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(158.3085 * mod, " ").concat(45.227 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color6, "\" d=\"M").concat(200 * mod, ",").concat(102.5 * mod, "              A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(170.71 * mod, " ").concat(170.71 * mod, "           L ").concat(156.568 * mod, " ").concat(156.568 * mod, "        A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(180 * mod, " ").concat(102.5 * mod, "\"/>") + "<path style=\"transform: rotate(".concat(angle, "deg); transform-origin: ").concat(100 * mod, "px ").concat(100 * mod, "px;\" fill=\"#707070\" d=\"M").concat(95 * mod, ",").concat(110 * mod, " L ").concat(105 * mod, " ").concat(110 * mod, " L ").concat(102 * mod, " ").concat(95 * mod, " L ").concat(100 * mod, " ").concat(3 * mod, " L ").concat(98 * mod, " ").concat(95 * mod, "\"/>") + '</svg>' + '<div style="transform: translateY(-25px);" class="r ac jc">' + "<h2 id=\"gauge_min_value\" style=\"width: 140px; font-size: 16px;\" class=\"m0 mr5 r ac jc\" >".concat(widgets[widget].min, "</h2>") + "<h2 id=\"gauge_max_value\" style=\"width: 140px; font-size: 16px;\" class=\"m0 ml5 r ac jc\" >".concat(widgets[widget].max, "</h2>") + '</div>' + '<div style="transform: translateY(-40px);" class="r ac jc">' + "<h1>".concat(data['variables'][widgets[widget].variable]).concat(widgets[widget].units, "</h1>") + '</div>';
        }

        dashboard.appendChild(div);
      }
    }
  }
} // Variables Tab.


function paintVariableTab(data) {
  var project = document.getElementById('project_section_variables');
  currentProject = data.id;
  currentKey = data.key;
  project.classList = 'w100 c ac jc';
  project.style = {
    height: "100%",
    overflow: "visible"
  };
  project.innerHTML = "\n        <div style=\"\" class=\"w100 c ac\">\n \n            <div style=\"height: 100%; overflow: visible;\" class=\"w100 rxl ac jc\">\n                        <div id=\"variables\" class=\"m1 variables c jfs ac w100xl\"> \n                            <h3 class=\"mb2 w100\" style=\"text-align: center;\">Variables </h3>\n                            <div class=\"r afe jfs\">\n                                <button class=\"fa fa-plus\" onclick=\"windowSwitcher('new_variable')\"></button>\n                                <button onclick=\"editVariables()\" style=\"padding: 8px 30px;\" class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button\" onclick=\"\"></button>\n                             </div>\n                            <!--<div class=\"r jc ac\">-->\n                                <!--<i class=\"mr1 fa fa-search\"></i>-->\n                                <!--<input type=\"search\" id=\"variable-search\">-->\n                            <!--</div>-->\n                        </div>\n                      \n                    </div>\n                </div>"; // project.innerHTML = `
  //                 <div style="" class="w100 c ac">
  //                 <h1 style="" class="m0">${data.name}</h1>
  //                 <h3 style="">${data.description}</h3>
  //                 <div class="r js ac">
  //                     <h4>Project Key: </h4>
  //                      <input class="ml2" id="project_key" value="${data.key}" disabled>
  //                 </div>
  //
  //                 <div style="height: 100%; overflow: visible;" class="w100 rxl ac jc">
  //                     <div id="variables" class="m1 variables c jfs ac w100xl">
  //                         <h3 class="mb0">Variables <button class="fa fa-plus" onclick="windowSwitcher('new_variable')"></button><button onclick="editVariables()" style="padding: 8px 30px;" class="m0 p0 fa fa-pencil-alt" id = "var_button" onclick=""></button></h3>
  //                         <!--<div class="r jc ac">-->
  //                             <!--<i class="mr1 fa fa-search"></i>-->
  //                             <!--<input type="search" id="variable-search">-->
  //                         <!--</div>-->
  //                     </div>
  //                     <div id="charts" class="m1 charts c jfs ac w100xl">
  //                         <h3 class="mb0">Charts</h3>
  //                         <p style="background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;">No Charts 🙁</p>
  //                         <!--<div class="r jc ac">-->
  //                             <!--<i class="mr1 fa fa-search"></i>-->
  //                             <!--<input type="search" id="variable-search">-->
  //                         <!--</div>-->
  //                     </div>
  //                 </div>
  //             </div>`;

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
  }
} // Charts Tab.


function paintChartsTab(data) {} // Settings Tab.


function paintSettingsTab(data) {}

function createVariable(name, uid) {
  console.log('Creating Var: ', name, uid);
  ws.send("{\"cmd\":\"CREATE_VARIABLE\", \"key\":\"".concat(currentKey, "\", \"name\":\"").concat(name, "\", \"onSuccess\":\"console.log('Success!'); windowSwitcher('none'); getProject(currentUid, currentId);\", \"onError\":\"\"}"));
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
  var value = input.value;
  console.log("here: ", value.substring(0, 2));

  function filterInt(value) {
    if (/^[-+]|(\d)|[.]$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }

  if (value.substring(0, 2) === "@@") {
    if (!isNaN(filterInt(value.substring(2, value.length)))) {
      value = "\"".concat(value.substring(2, value.length), "\"");
    } else {
      value = "\"".concat(input.value, "\"");
    }
  } else {
    if (isNaN(filterInt(value))) {
      value = "\"".concat(input.value, "\"");
    }
  }

  ws.send("{\"cmd\":\"SET_VARIABLE\", \"key\":\"".concat(key, "\", \"name\":\"").concat(name.value, "\", \"value\":").concat(value, ", \"onSuccess\":\"console.log('Success!'); var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', `variableEdit(id, '").concat(key, "')`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); \", \"onError\":\"var editButton = document.getElementById('").concat(id, "'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('").concat(errorElement, "'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;\"}"));
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