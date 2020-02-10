/**
 * @return {string}
 */
function CreateGaugeWidgetWindow() {
  // Build an list of options whereas the values are variables that are numbers.
  var validVariablesForGauge = "";

  if (currentProjectData.hasOwnProperty('variables')) {
    var variables = currentProjectData['variables'];

    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (typeof variables[variable] === "number" && variable !== 'default') {
          validVariablesForGauge += "<option variable-type=\"variable\" value=\"".concat(variable, "\">Variable: ").concat(variable, "</option>");
        }
      }
    }
  }

  if (currentProjectData.hasOwnProperty('charts')) {
    var charts = currentProjectData['charts'];

    for (var chart in charts) {
      if (charts.hasOwnProperty(chart)) {
        if (charts[chart].type === "LINE") {
          validVariablesForGauge += "<option variable-type=\"chart\" value=\"".concat(charts[chart].name, "\">Chart: ").concat(charts[chart].name, "</option>");
        }
      }
    }
  } // The content of the window.


  return "\n        <div class=\"widget-gauge-settings c ac jc\">\n            <h2 class=\"mb1\"  id=\"gauge_title\">Gauge</h2> \n            <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3> \n            <svg class=\"mt2\" height=\"".concat(200 * 1, "\" width=\"").concat(200 * 1, "\">\n                <circle cx= \"").concat(100 * 1, "\" cy= \"").concat(100 * 1, "\" r=\"").concat(5 * 1, "\" fill=\"#ffffff\"/>\n                <path id=\"gauge_color_1\" fill=\"#0D790A\" d=\"M").concat(29.29 * 1, ",").concat(170.71 * 1, "           A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(0 * 1, " ").concat(102.5 * 1, "                 L ").concat(20 * 1, " ").concat(102.5 * 1, "               A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(43.432 * 1, " ").concat(156.568 * 1, "\"/>\n                <path id=\"gauge_color_2\" fill=\"#0D790A\" d=\"M").concat(0 * 1, ",").concat(97.5 * 1, "                 A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(27.592735 * 1, " ").concat(31.12827 * 1, "      L ").concat(41.6915 * 1, " ").concat(45.227 * 1, "         A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(20 * 1, " ").concat(97.5 * 1, " \"/>\n                <path id=\"gauge_color_3\" fill=\"#F3B820\" d=\"M").concat(31.05709 * 1, ", ").concat(27.521555 * 1, "    A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(97.5 * 1, " ").concat(0 * 1, "                  L ").concat(97.5 * 1, " ").concat(20 * 1, "                A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(45.226855 * 1, " ").concat(41.6915 * 1, "\"/>\n                <path id=\"gauge_color_4\" fill=\"#F3B820\" d=\"M").concat(102.5 * 1, ",").concat(0 * 1, "                A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(168.94291 * 1, " ").concat(27.521555 * 1, "     L ").concat(154.773145 * 1, " ").concat(41.6915 * 1, "     A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(102.5 * 1, " ").concat(20 * 1, "\"/>\n                <path id=\"gauge_color_5\" fill=\"#D20303\" d=\"M").concat(172.407265 * 1, ",").concat(31.12827 * 1, "    A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(200 * 1, " ").concat(97.5 * 1, "                L ").concat(180 * 1, " ").concat(97.5 * 1, "               A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(158.3085 * 1, " ").concat(45.227 * 1, "\"/>\n                <path id=\"gauge_color_6\" fill=\"#D20303\" d=\"M").concat(200 * 1, ",").concat(102.5 * 1, "              A ").concat(100 * 1, " ").concat(100 * 1, " 0 0 1 ").concat(170.71 * 1, " ").concat(170.71 * 1, "           L ").concat(156.568 * 1, " ").concat(156.568 * 1, "        A ").concat(80 * 1, " ").concat(80 * 1, " 0 0 0 ").concat(180 * 1, " ").concat(102.5 * 1, "\"/>\n                <path style=\"transform-origin: ").concat(100 * 1, "px ").concat(100 * 1, "px;\" fill=\"#707070\" d=\"M").concat(95 * 1, ",").concat(110 * 1, " L ").concat(105 * 1, " ").concat(110 * 1, " L ").concat(102 * 1, " ").concat(95 * 1, " L ").concat(100 * 1, " ").concat(3 * 1, " L ").concat(98 * 1, " ").concat(95 * 1, "\"/>\n            </svg> \n            <div style=\"transform: translateY(-20px);\" class=\"r ac jc\"> \n                <h2 id=\"gauge_min_value\" class=\"m0 mr5\" >0</h2> \n                <h2 id=\"gauge_max_value\" class=\"m0 ml5\" >100</h2> \n            </div> \n            <div style=\"transform: translateY(-40px);\" class=\"r ac jc\"> \n                <h1 id=\"value\">50</h1> \n                <h1 class=\"m0\" id=\"units\"></h1> \n            </div> \n            <div class=\"r mb3\">Variable:&nbsp;            \n                <select oninput=\"variableSettings()\" id=\"variable_title_input\">\n                    <optgroup value=\"Variables\">\n                        <option value=\"\">Select a Variable / Chart</option>\n                        ").concat(validVariablesForGauge, "\n                    </optgroup>\n                </select>\n                &nbsp;Hide: \n                <input id=\"gauge_variable_hide\" oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"Gauge\"></div>\n                <div class=\"mb2\">Min Value: <input type=\"number\" onkeyup=\"minSettings(this)\" onchange=\"minSettings(this)\" value=\"0\"></div>\n                <div class=\"mb2\">Max Value: <input type=\"number\" onkeyup=\"maxSettings(this)\" onchange=\"maxSettings(this)\" value=\"100\"></div>\n            </div>\n            <div class=\"r jc ac\">\n                <input id=\"color1\" oninput=\"gaugeColorSettings(this, 1)\"  style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#0D790A\">\n                <input id=\"color2\" oninput=\"gaugeColorSettings(this, 2)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#0D790A\">\n                <input id=\"color3\" oninput=\"gaugeColorSettings(this, 3)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#F3B820\">\n                <input id=\"color4\" oninput=\"gaugeColorSettings(this, 4)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#F3B820\">\n                <input id=\"color5\" oninput=\"gaugeColorSettings(this, 5)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#D20303\">\n                <input id=\"color6\" oninput=\"gaugeColorSettings(this, 6)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#D20303\">\n            </div>\n            <div class=\"r mb2 mt4\">\n                Units:&nbsp;\n                ").concat(unitsList('', " unitSettings(this)"), "\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>\n                <button onclick=\"newGaugeWidget(); \"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>\n            </div>\n        </div>\n    ");
}

function newGaugeWidget() {
  var sel = document.getElementById('variable_title_input');
  var selected = sel.options[sel.selectedIndex];
  addWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable_type: "".concat(selected.getAttribute('variable-type')),
    variable: "".concat(document.getElementById('variable_title_input').value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText),
    color1: "".concat(document.getElementById('color1').value),
    color2: "".concat(document.getElementById('color2').value),
    color3: "".concat(document.getElementById('color3').value),
    color4: "".concat(document.getElementById('color4').value),
    color5: "".concat(document.getElementById('color5').value),
    color6: "".concat(document.getElementById('color6').value),
    min: parseInt(document.getElementById('gauge_min_value').innerText),
    max: parseInt(document.getElementById('gauge_max_value').innerText)
  });
}