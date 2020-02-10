function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function paintProject(data) {
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
  dashboard.classList = 'w100 r ac jc';
  dashboard.style = {
    height: "100%",
    overflow: "visible",
    flexWrap: 'wrap'
  };
  dashboard.style.flexWrap = "wrap";
  dashboard.innerHTML = '';

  if (data.hasOwnProperty('widgets')) {
    (function () {
      var widgets = data['widgets'];

      var _loop = function _loop(widget) {
        if (widgets.hasOwnProperty(widget)) {
          console.log(widgets[widget]); // Widget box.

          var div = document.createElement('button');
          div.style.height = "275px";
          div.style.minWidth = "300px";
          div.style.maxWidth = "300px";
          div.id = widgets[widget].id;
          div.style.background = "rgba(3, 4, 8, 0.46)";
          div.borderRadius = "10px";
          var mod = 0.7;
          var display = "inherit";
          var mb = 'margin-bottom: 5px; margin-top: 8px;';

          if (widgets[widget].type === 'line') {
            div.style.height = "325px";
            div.style.minWidth = "632px";
            div.style.maxWidth = "632px";
            div.style.paddingRight = "2px";
            var leftPar = "";
            var rightPar = "";

            if (widgets[widget].xAxisUnits !== "") {
              leftPar = "(";
              rightPar = ")";
            }

            div.innerHTML = "\n                        <i onclick=\"windowSwitcher('edit_line_graph','".concat(div.id, "')\" style=\"position: absolute; transform: translate(262px, -10px)\" class=\"hc p3 hac fa fa-ellipsis-v\"></i>\n                        <h2 style=\"").concat(mb, "\" id=\"").concat(div.id, "_title\">").concat(widgets[widget].title, "</h2>\n                        <p style=\"transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;\" class=\"mt0\">").concat(widgets[widget].yAxisTitle, " <i>").concat(leftPar).concat(widgets[widget].yAxisUnits).concat(rightPar, "</i></p>\n                        <div class=\"ct-").concat(div.id, "-plot\"></div>\n                        <style id=\"").concat(div.id, "_plot_styles\"></style>\n                        <i style=\"position: absolute; transform: translate(250px,-230px);\" onclick=\"resetFnc && resetFnc();\" class=\"hp hc fas fa-search-minus\" id=\"reset-zoom-btn\"></i>\n                        <div class =\"r jc ac m2\" id=\"").concat(div.id, "_plot_legend\"></div>\n                    ");
            dashboard.appendChild(div);
            drawLineGraph(".ct-".concat(div.id, "-plot"), div.id);
          }

          if (widgets[widget].type === 'scatter') {
            div.style.height = "325px";
            div.style.minWidth = "632px";
            div.style.maxWidth = "632px";
            div.style.paddingRight = "2px";
            var _leftPar = "";
            var _rightPar = "";

            if (widgets[widget].xAxisUnits !== "") {
              _leftPar = "(";
              _rightPar = ")";
            }

            div.innerHTML = "\n                        <i  onclick=\"windowSwitcher('scatter_plot_settings','".concat(div.id, "')\" style=\"position: absolute; transform: translate(262px, -10px)\" class=\"hc p3 hac fa fa-ellipsis-v\"></i>\n                        <h2 style=\"").concat(mb, "\" id=\"").concat(div.id, "_title\">").concat(widgets[widget].title, "</h2>\n                        <p style=\"transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;\" class=\"mt0\">").concat(widgets[widget].yAxisTitle, " <i>").concat(_leftPar).concat(widgets[widget].yAxisUnits).concat(_rightPar, "</i></p>\n                        <div class=\"ct-").concat(div.id, "-plot\"></div>\n                        <p class=\"mt0 mb1\">").concat(widgets[widget].xAxisTitle, " <i>").concat(_leftPar).concat(widgets[widget].xAxisUnits).concat(_rightPar, "</i></p>\n                        <style id=\"").concat(div.id, "_plot_styles\">\n                        \n                        </style>\n                        <i style=\"position: absolute; transform: translate(250px,-230px);\" onclick=\"resetFnc && resetFnc();\" class=\"hp hc fas fa-search-minus\" id=\"reset-zoom-btn\"></i>\n                        <div class =\"r jc ac m2\" id=\"").concat(div.id, "_plot_legend\"></div>\n                    ");
            dashboard.appendChild(div);
            drawScatterPLot(".ct-".concat(div.id, "-plot"), div.id);
          }

          if (widgets[widget].type === 'gauge') {
            if (widgets[widget]['hide'] === 'true') {
              display = "none";
              mb = '';
            }

            var range = Math.abs(widgets[widget].min - widgets[widget].max);
            var tic = 270 / range;
            var angle = 0;
            var value = 0;

            if (widgets[widget].variable_type === "variable") {
              value = data['variables'][widgets[widget].variable];
              angle = Math.floor(270 / (range - value));
              angle = (value - widgets[widget].min) * tic - 135;
            } else {
              var targetChart = data['charts'].findIndex(function (w) {
                return w.name === widgets[widget].variable;
              });

              try {
                if (data['charts'][targetChart].hasOwnProperty('data')) {
                  value = data['charts'][targetChart]['data'][data['charts'][targetChart]['data'].length - 1].value;
                  angle = Math.floor(270 / (range - value));
                  angle = (value - widgets[widget].min) * tic - 135;
                } else {
                  value = "No Data";
                }
              } catch (e) {}
            }

            if (angle > 135) angle = 135;
            if (angle < -135) angle = -135;
            div.innerHTML = "<i  onclick=\"windowSwitcher('gauge_settings','".concat(div.id, "')\" style=\"position: absolute; transform: translate(109px, -5px)\" class=\"hc p3 hac fa fa-ellipsis-v\"></i>") + "<h2 style=\"".concat(mb, "\" id=\"").concat(div.id, "_title\">").concat(widgets[widget].title, "</h2>") + "<h3  id=\"".concat(div.id, "_variable_title\" style=\"font-size:14px; display:").concat(display, ";\" class=\"m0 mb3 p0\" >").concat(widgets[widget].variable, "</h3>") + "<svg height=\"".concat(200 * mod, "\" width=\"").concat(200 * mod, "\">") + "<circle cx= \"".concat(100 * mod, "\" cy= \"").concat(100 * mod, "\" r=\"").concat(5 * mod, "\" fill=\"#ffffff\"/>") + "<path fill=\"".concat(widgets[widget].color1, "\" d=\"M").concat(29.29 * mod, ",").concat(170.71 * mod, "           A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(0 * mod, " ").concat(102.5 * mod, "                 L ").concat(20 * mod, " ").concat(102.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(43.432 * mod, " ").concat(156.568 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color2, "\" d=\"M").concat(0 * mod, ",").concat(97.5 * mod, "                 A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(27.592735 * mod, " ").concat(31.12827 * mod, "      L ").concat(41.6915 * mod, " ").concat(45.227 * mod, "         A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(20 * mod, " ").concat(97.5 * mod, " \"/>") + "<path fill=\"".concat(widgets[widget].color3, "\" d=\"M").concat(31.05709 * mod, ", ").concat(27.521555 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(97.5 * mod, " ").concat(0 * mod, "                  L ").concat(97.5 * mod, " ").concat(20 * mod, "                A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(45.226855 * mod, " ").concat(41.6915 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color4, "\" d=\"M").concat(102.5 * mod, ",").concat(0 * mod, "                A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(168.94291 * mod, " ").concat(27.521555 * mod, "     L ").concat(154.773145 * mod, " ").concat(41.6915 * mod, "     A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(102.5 * mod, " ").concat(20 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color5, "\" d=\"M").concat(172.407265 * mod, ",").concat(31.12827 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(200 * mod, " ").concat(97.5 * mod, "                L ").concat(180 * mod, " ").concat(97.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(158.3085 * mod, " ").concat(45.227 * mod, "\"/>") + "<path fill=\"".concat(widgets[widget].color6, "\" d=\"M").concat(200 * mod, ",").concat(102.5 * mod, "              A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(170.71 * mod, " ").concat(170.71 * mod, "           L ").concat(156.568 * mod, " ").concat(156.568 * mod, "        A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(180 * mod, " ").concat(102.5 * mod, "\"/>") + "<path style=\"transform: rotate(".concat(angle, "deg); transform-origin: ").concat(100 * mod, "px ").concat(100 * mod, "px;\" fill=\"#707070\" d=\"M").concat(95 * mod, ",").concat(110 * mod, " L ").concat(105 * mod, " ").concat(110 * mod, " L ").concat(102 * mod, " ").concat(95 * mod, " L ").concat(100 * mod, " ").concat(3 * mod, " L ").concat(98 * mod, " ").concat(95 * mod, "\"/>") + '</svg>' + '<div style="transform: translateY(-25px);" class="r ac jc">' + "<h2 id=\"".concat(div.id, "_min_title\" style=\"width: 140px; font-size: 16px;\" class=\"m0 mr5 r ac jc\" >").concat(widgets[widget].min, "</h2>") + "<h2 id=\"".concat(div.id, "_max_title\" style=\"width: 140px; font-size: 16px;\" class=\"m0 ml5 r ac jc\" >").concat(widgets[widget].max, "</h2>") + '</div>' + '<div style="transform: translateY(-40px);" class="r ac jc">' + "<h1 id=\"".concat(div.id, "_units_title\">").concat(value).concat(widgets[widget].units, "</h1>") + '</div>';
            dashboard.appendChild(div);
          }

          if (widgets[widget].type === 'data') {
            if (widgets[widget]['hide'] === 'true') {
              display = "none";
              mb = '';
            }

            div.innerHTML = "<i  onclick=\"windowSwitcher('data_settings','".concat(div.id, "')\" style=\"position: absolute; transform: translate(109px, -35px)\" class=\"hc p3 hac fa fa-ellipsis-v\"></i>") + "<h2 style=\"".concat(mb, "\" id=\"\">").concat(widgets[widget].title, "</h2>") + "<h3 style=\"font-size:14px; display:".concat(display, ";\" id=\"\" class=\"m0 mb3 p0\">").concat(widgets[widget].variable, "</h3>") + '<div style="" class="r ac jc">' + "<h1 style = \" font-size: 5rem; margin: 0; margin-bottom: 1rem;\" >".concat(data['variables'][widgets[widget].variable], "</h1>") + "<h1 style = \" font-size: 5rem; margin: 0; margin-bottom: 1rem;\"  class=\"m0\">".concat(widgets[widget].units, "</h1>") + '</div>' + "<div>".concat(new Date().toLocaleString(), "</div>");
            dashboard.appendChild(div);
          }
        }
      };

      for (var widget in widgets) {
        _loop(widget);
      }
    })();
  }
} // Variables Tab.


function paintVariableTab(data) {
  var project = document.getElementById('project_section_variables');
  project.classList = 'w100 c ac jc';
  project.style = {
    height: "100%",
    overflow: "visible"
  };
  project.innerHTML = "\n        <div style=\"\" class=\"w100 c ac\">\n            <div style=\"height: 100%; overflow: visible;\" class=\"w100 rxl ac jc\">\n                <div id=\"variables\" class=\"m1 variables c jfs ac w100xl\"> \n                    <h3 class=\"mb2 w100\" style=\"text-align: center;\">Variables </h3>\n                    <div class=\"r afe jfs\">\n                        <button class=\"fa fa-plus\" onclick=\"windowSwitcher('new_variable')\"></button>\n<!--                        <button onclick=\"editVariables()\" style=\"padding: 8px 30px;\" class=\"m0 p0 fa fa-trash-alt\" id = \"var_button\" onclick=\"\"></button>-->\n                     </div>\n                     \n                </div>\n                      \n            </div>\n        </div>";
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
    newVar.setAttribute('onmouseover', 'edit = true');
    newVar.setAttribute('onmouseleave', 'edit = false');
    newVar.innerHTML = "\n\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(data.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                    <i style=\"color:red;\" class=\"mt2 hp hc far fa-trash-alt\" onclick=\"windowSwitcher('double_check', '").concat(variable, "')\"></i>\n                </div>\n");
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


function paintChartsTab(data) {
  console.log('here charts');
  var contentBox = document.getElementById('content_box');
  contentBox.innerHTML = "<p>".concat(currentProjectData.charts, "</p>");
} // Settings Tab.


function paintSettingsTab(data) {
  var contentBox = document.getElementById('content_box');
  contentBox.innerHTML = "\n        <div id= \"PROJECT_SETTINGS_TAB\" class=\"p3 m0 ml1 c\">\n            <h1 class=\"mb1 cw\">Project Settings</h1>\n            <hr class=\"w100\">\n            <div class=\"r\">\n                <h2 class=\"cw mb3\">Your Project Key: </h2>\n            </div>\n            <div class=\"r ac fww\">\n                <input class=\"m0\"  disabled value=\" ".concat(currentProjectData.key, "\">\n                <button onclick=\"copyToClip('").concat(currentProjectData.key, "')\" style=\"color: white;\" class=\"fa fa-copy my2 mx2\"></button>\n                <button onclick=\"windowSwitcher('newKey')\" title= \"Generate New Project Key\" style=\"color: white; background: #8c2726;\" class=\"fa fa-redo mb0 my2 mx0\"></button>\n                <p id=\"clip_message\" style=\"transition: all 4s ease-in-out; color:orange; transform: translateY(20px); \" class=\"ml3 dn\">Copied to Clipboard!</p>\n            </div>\n            <div id=\"project_settings_project_name\" class=\"\">\n                <h2 class=\"cw mb3\">Project Name: </h2>\n            </div>\n            <div id=\"project_settings_project_desc\" class=\"\">\n                <h2 class=\"cw mb3\">Project Description: </h2>\n            </div>\n            <div class=\"r ac\">\n                <a href=\"/data?key=").concat(currentProjectData.key, "\"><button class=\"ml0 mt4 mb1\">Download Project Data</button></a>\n            </div>\n            <div class=\"r ac\">\n                <button onclick=\"windowSwitcher('deleteProject')\" style=\"background: #8c2726;\" class=\"ml0 mt4\">Delete Project</button>\n            </div>\n        </div>");
  var projectName = input(document.getElementById('project_settings_project_name'), {
    type: 'text',
    edit: true,
    id: 'project_settings_project_name_input',
    onSaveMessage: "The new name has been set.",
    value: currentProjectData.name,
    manualMode: true,
    onSave: function () {
      var _onSave = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setProjectName(projectName.value, currentUid, currentId);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onSave() {
        return _onSave.apply(this, arguments);
      }

      return onSave;
    }()
  });
  var projectDescription = input(document.getElementById('project_settings_project_desc'), {
    type: 'text',
    edit: true,
    id: 'project_settings_project_desc_input',
    onSaveMessage: "The new description has been set.",
    value: currentProjectData.description,
    manualMode: true,
    onSave: function () {
      var _onSave2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setProjectDescription(projectDescription.value, currentUid, currentId);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onSave() {
        return _onSave2.apply(this, arguments);
      }

      return onSave;
    }()
  });
}

function createVariable(name, uid) {
  console.log('Creating Var: ', name, uid);
  ws.send("{\"cmd\":\"CREATE_VARIABLE\", \"key\":\"".concat(currentKey, "\", \"name\":\"").concat(name, "\", \"onSuccess\":\"console.log('Success!'); windowSwitcher('none'); getProject(currentUid, currentId);\", \"onError\":\"\"}"));
}

function updateProject(project, id) {
  var variables = document.getElementById('variables');
  var vars = project.variables;
  var count = 0;

  for (var variable in vars) {
    if (variable === 'default') {
      continue;
    } // console.log(variables.querySelector('variable'));


    var newVar = document.getElementById("var_" + variable);
    newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
    newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
    newVar.setAttribute('onmouseover', 'edit = true');
    newVar.setAttribute('onmouseleave', 'edit = false');
    newVar.innerHTML = "\n                <div class=\"variable r mt4\" id = \"".concat(variable, "\">\n                    <input disabled class=\"name-input\" style =\"min-width: 100px; max-width: 100px;\"id = \"var_name_").concat(variable, "\" value =\"").concat(variable, "\">\n                    <input id = \"var_input_").concat(variable, "\" disabled class=\"m0 p0 w100 pl2\" value=\"").concat(vars[variable], "\">\n                    <button class=\"m0 p0 fa fa-pencil-alt\" id = \"var_button_").concat(variable, "\" onclick=\"variableEdit(id, '").concat(project.key, "')\"></button>\n                    <button class=\"m0 p0 fa fa-times dn\" id = \"var_button_2_").concat(variable, "\" ></button>\n                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = \"var_error_").concat(variable, "\" class=\"dn\">Error: Unable To Set Variable.</p>\n                </div>");
    variables.appendChild(newVar);
  }
}

function copyToClip(val) {
  var clipMessage = document.getElementById('clip_message');
  copyTextToClipboard(val);
  clipMessage.classList.remove('dn');
  clipMessage.style.transform = "translateY(0px)";
  setTimeout(function () {
    clipMessage.classList.add('dn');
    clipMessage.style.transform = "translateY(20px)";
  }, 2000);
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
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

function drawLineGraph(classID, targetID) {
  var data = {
    labels: ['Jan', 'Mar', 'Jun'],
    series: []
  }; // Find the widget that corresponds to the id.

  var widget = currentProjectData.widgets.find(function (widget) {
    return widget.id === targetID;
  });
  var targetSeries = widget.series;
  var index = 0;
  var seriesTitles = [];

  var _loop2 = function _loop2(targetSerie) {
    var chartData = currentProjectData.charts.find(function (chart) {
      return chart.name === targetSeries[targetSerie].name;
    });
    var seriesData = [];
    var alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
    var legend = document.getElementById("".concat(targetID, "_plot_legend"));
    seriesTitles.push(targetSeries[targetSerie].name);
    legend.innerHTML = legend.innerHTML + "<div class=\"r mr2\" style=\" font-size: 0.7rem;\"><i class=\"fas fa-circle\" style=\"margin-top:1px; color: ".concat(targetSeries[targetSerie].color, "; font-size: 0.7rem;\">&nbsp;</i>").concat(targetSeries[targetSerie].name, "</div>");

    if (chartData.entries !== 0) {
      var dataPoints = chartData.data;

      for (var point in dataPoints) {
        seriesData.push({
          x: dataPoints[point].entry,
          y: dataPoints[point].value,
          time: "Time: ".concat(new Date(dataPoints[point].timestamp), " <br> Value: ").concat(dataPoints[point].value)
        });
        document.getElementById("".concat(targetID, "_plot_styles")).innerHTML = document.getElementById("".concat(targetID, "_plot_styles")).innerHTML + "".concat(classID, " .ct-series-").concat(alphaMap[index], " .ct-line,\n                     ").concat(classID, " .ct-series-").concat(alphaMap[index], " .ct-point {\n                      stroke: ").concat(targetSeries[targetSerie].color, ";\n                    }");
      }

      index++;
      data.series.push(seriesData);
    }
  };

  for (var targetSerie in targetSeries) {
    _loop2(targetSerie);
  } // data.labels = [targetLabels[0], targetLabels[Math.ceil(targetLabels.length/3)], targetLabels[Math.ceil((targetLabels.length/3)*2)], targetLabels[Math.ceil(targetLabels.length)]];


  var options = {
    width: '90%',
    height: '220px',
    showArea: true,
    showPoint: true,
    chartPadding: {
      right: 30
    },
    axisY: {
      showLabel: true,
      showGrid: true
    },
    axisX: {
      position: 'end',
      showLabel: true,
      showGrid: true,
      type: Chartist.AutoScaleAxis,
      onlyInteger: true // type: Chartist.FixedScaleAxis,
      // divisor: 5,

    },
    plugins: [Chartist.plugins.tooltip({
      pointClass: 'my-cool-point',
      "class": "tooltip-".concat(widget.id),
      appendToBody: false,
      anchorToPoint: true
    }), Chartist.plugins.zoom({
      onZoom: onZoom,
      resetOnRightMouseBtn: true // If set to true, a right click in the zoom area, will reset zoom.

    })]
  };
  var responsiveOptions = [['screen and (min-width: 12640px)', {
    axisX: {
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
        return index % 4 === 0 ? value : null;
      }
    }
  }]];
  var plot = new Chartist.Line(classID, data, options, responsiveOptions);
  plot.on('draw', function (data) {
    if (data.type === 'point') {
      var circle = new Chartist.Svg('circle', {
        cx: [data.x],
        cy: [data.y],
        r: [5],
        'ct:value': data.series[data.index].time,
        'ct:meta': data.meta,
        "class": 'my-cool-point'
      }, 'ct-area');
      data.element.replace(circle);
    }
  });
  plot.container.addEventListener('mouseenter', function (e) {
    var x, i;
    x = document.querySelectorAll(".tooltip-".concat(widget.id));

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "block";
    }
  });
  plot.container.addEventListener('mouseleave', function (e) {
    var x, i;
    x = document.querySelectorAll(".chartist-tooltip");

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  });
}

var resetFnc;

function drawScatterPLot(classID, targetID) {
  // var times = function (n) {
  //     return Array.apply(null, new Array(n));
  // };
  var data = {
    labels: [],
    series: []
  }; // var data = {
  //     // A labels array that can contain any sort of values
  //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  //     // Our series array that contains series objects or in this case series data arrays
  //     series: [
  //         [5, 2, 4, 2, 0]
  //     ]
  // };

  var widget = currentProjectData.widgets.find(function (widget) {
    return widget.id === targetID;
  });
  var targetSeries = widget.series;
  var index = 0;
  var seriesTitles = [];

  var _loop3 = function _loop3(targetSerie) {
    var chartData = currentProjectData.charts.find(function (chart) {
      return chart.name === targetSeries[targetSerie].name;
    });
    var seriesData = [];
    var alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
    var legend = document.getElementById("".concat(targetID, "_plot_legend"));
    seriesTitles.push(targetSeries[targetSerie].name);
    legend.innerHTML = legend.innerHTML + "<div class=\"r mr2\" style=\" font-size: 0.7rem;\"><i class=\"fas fa-circle\" style=\"margin-top:1px; color: ".concat(targetSeries[targetSerie].color, "; font-size: 0.7rem;\">&nbsp;</i>").concat(targetSeries[targetSerie].name, "</div>");

    if (chartData.entries !== 0) {
      var dataPoints = chartData.data;

      for (var point in dataPoints) {
        seriesData.push({
          x: dataPoints[point].x,
          y: dataPoints[point].y
        });
        document.getElementById("".concat(targetID, "_plot_styles")).innerHTML = document.getElementById("".concat(targetID, "_plot_styles")).innerHTML + "".concat(classID, " .ct-series-").concat(alphaMap[index], " .ct-line,\n                     ").concat(classID, " .ct-series-").concat(alphaMap[index], " .ct-point {\n                      stroke: ").concat(targetSeries[targetSerie].color, ";\n                    }");
      }

      index++;
      data.series.push(seriesData);
    }
  };

  for (var targetSerie in targetSeries) {
    _loop3(targetSerie);
  } // for(let widgetSeries in widgetSeries ){
  //     // data.series.push()
  // }


  var options = {
    showLine: false,
    width: '90%',
    height: '220px',
    chartPadding: {
      right: 30
    },
    axisY: {
      showLabel: true,
      showGrid: true
    },
    axisX: {
      position: 'end',
      showLabel: true,
      showGrid: true,
      type: Chartist.AutoScaleAxis,
      onlyInteger: true
    },
    plugins: [Chartist.plugins.zoom({
      onZoom: onZoom,
      resetOnRightMouseBtn: true // If set to true, a right click in the zoom area, will reset zoom.

    })]
  };
  var responsiveOptions = [['screen and (min-width: 12640px)', {
    axisX: {
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
        return index % 4 === 0 ? value : null;
      }
    }
  }]];
  new Chartist.Line(classID, data, options, responsiveOptions);
}

function onZoom(chart, reset) {
  resetFnc = reset;
}