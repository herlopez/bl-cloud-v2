function createDataWidget(content) {
  content.classList.add('widget-data-settings');
  var validVariablesForData = '';

  if (currentProjectData.hasOwnProperty('variables')) {
    var variables = currentProjectData['variables'];

    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (variable !== 'default') {
          validVariablesForData += "<option value=\"".concat(variable, "\">").concat(variable, "</option>");
        }
      }
    }
  }

  content.innerHTML = "\n        <div class=\"c ac jc\">\n            <h2 class=\" mb1\"  id=\"gauge_title\">Data Point</h2>\n            <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3>\n            <div style=\"\" class=\"r ac jc\">\n                <h1 id=\"value\">50</h1>\n                <h1 class=\"m0\" id=\"units\"></h1>\n            </div>\n            <div>\n                ".concat(new Date().toLocaleString(), "\n            </div>\n            <div class=\"r mt4 mb3\">Variable:&nbsp;\n                <select oninput=\"variableSettings()\" id=\"variable_title_input\">\n                    <optgroup value=\"Variables\">\n                        <option value=\"\">Select a Variable</option>\n                        ").concat(validVariablesForData, "\n                    </optgroup>\n                </select>\n                &nbsp;Hide: \n                <input id=\"gauge_variable_hide\" oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">\n            </div>\n            <div class=\"c jc afe p3 py0\">\n                <div class=\"mb2\">\n                    Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"Data Point\">\n                </div>\n            </div>\n            <div class=\"r mb2 mt0\">\n               Units:&nbsp;\n               ").concat(unitsList('', " unitSettings(this)"), "\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>\n                <button onclick=\"newDataWidget()\"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>\n            </div>\n        </div>      \n    ");
  return content;
}