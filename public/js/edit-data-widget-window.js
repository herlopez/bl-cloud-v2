/**
 * Data Widget Edit Window.
 * @function EditDataWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditDataWidgetWindow(widgetId) {
  var widget = currentProjectData.widgets.find(function (widget) {
    return widget.id === widgetId;
  }); // Build an list of options whereas the values are variables that are numbers.

  var validVariablesForGauge = "";

  if (currentProjectData.hasOwnProperty('variables')) {
    var variables = currentProjectData['variables'];

    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (variable !== 'default') {
          if (variable === widget.variable) {
            validVariablesForGauge += "<option selected value=\"".concat(variable, "\">").concat(variable, "</option>");
          } else {
            validVariablesForGauge += "<option value=\"".concat(variable, "\">").concat(variable, "</option>");
          }
        }
      }
    }
  }

  var hideValue = '';
  var hideTopTitle = '';

  if (widget.hide === 'true') {
    hideValue = "checked";
    hideTopTitle = "dn";
  }

  return "\n        <i style=\"color: red; top: 5px; right: 0;\" class=\"por fs125 hc hp fa fa-trash-alt\" onclick=\"removeDataWidget('".concat(widget.id, "')\"></i>\n        <div class=\"c ac jc\">\n            <h2 class=\" mb1\"  id=\"gauge_title\">").concat(widget.title, "</h2>\n            <h3 class=\"m0 ").concat(hideTopTitle, "\" style=\"font-size: 0.8rem;\" id=\"variable_title\">").concat(widget.variable, "</h3>\n            <div style=\"\" class=\"r ac jc\">\n                <h1 id=\"value\">").concat(currentProjectData.variables[widget.variable], "</h1>\n                <h1 class=\"m0\" id=\"units\">").concat(widget.units, "</h1>\n            </div> \n            <div>").concat(new Date().toLocaleString(), "</div>\n            <div class=\"r mt4 mb3\">Variable:&nbsp;            \n                <select value=\"").concat(widget.variable, "\" oninput=\"variableSettings()\" id=\"").concat(widget.id, "_variable_title_input\">\n                    <option disabled value=\"\">Select a Variable</option>\n                    ").concat(validVariablesForGauge, "\n                </select>\n                &nbsp;Hide: \n                <input id=\"gauge_variable_hide\" ").concat(hideValue, " oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"").concat(widget.title, "\"></div>\n            </div>        \n            <div class=\"r mb2\">\n                Units:&nbsp;\n                ").concat(unitsList('settings_variable_units', " unitSettings(this)", widget.units), "\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n                <button onclick=\"updateDataWidget('").concat(widget.id, "')\"> &nbsp;Save&nbsp;</button>\n            </div>\n        </div>\n    ");
}