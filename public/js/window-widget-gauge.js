function windowWidgetGauge(content) {
  content.classList.add('widget-gauge-settings'); // Scale of the gauge.

  var scale = 1; // Build an list of options whereas the values are variables that are numbers.

  var validVariablesForGauge = "";

  if (currentProjectData.hasOwnProperty('variables')) {
    var variables = currentProjectData['variables'];

    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (typeof variables[variable] === "number" && variable !== 'default') {
          validVariablesForGauge += "<option value=\"".concat(variable, "\">").concat(variable, "</option>");
        }
      }
    }
  } // The content of the window.


  content.innerHTML = "<div class=\"c ac jc\">\n            <h2 class=\"mb1\"  id=\"gauge_title\">Gauge</h2> \n            <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3> \n            <svg class=\"mt2\" height=\"".concat(200 * scale, "\" width=\"").concat(200 * scale, "\">\n                <circle cx= \"").concat(100 * scale, "\" cy= \"").concat(100 * scale, "\" r=\"").concat(5 * scale, "\" fill=\"#ffffff\"/>\n                <path id=\"gauge_color_1\" fill=\"#0D790A\" d=\"M").concat(29.29 * scale, ",").concat(170.71 * scale, "           A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(0 * scale, " ").concat(102.5 * scale, "                 L ").concat(20 * scale, " ").concat(102.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(43.432 * scale, " ").concat(156.568 * scale, "\"/>\n                <path id=\"gauge_color_2\" fill=\"#0D790A\" d=\"M").concat(0 * scale, ",").concat(97.5 * scale, "                 A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(27.592735 * scale, " ").concat(31.12827 * scale, "      L ").concat(41.6915 * scale, " ").concat(45.227 * scale, "         A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(20 * scale, " ").concat(97.5 * scale, " \"/>\n                <path id=\"gauge_color_3\" fill=\"#F3B820\" d=\"M").concat(31.05709 * scale, ", ").concat(27.521555 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(97.5 * scale, " ").concat(0 * scale, "                  L ").concat(97.5 * scale, " ").concat(20 * scale, "                A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(45.226855 * scale, " ").concat(41.6915 * scale, "\"/>\n                <path id=\"gauge_color_4\" fill=\"#F3B820\" d=\"M").concat(102.5 * scale, ",").concat(0 * scale, "                A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(168.94291 * scale, " ").concat(27.521555 * scale, "     L ").concat(154.773145 * scale, " ").concat(41.6915 * scale, "     A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(102.5 * scale, " ").concat(20 * scale, "\"/>\n                <path id=\"gauge_color_5\" fill=\"#D20303\" d=\"M").concat(172.407265 * scale, ",").concat(31.12827 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(200 * scale, " ").concat(97.5 * scale, "                L ").concat(180 * scale, " ").concat(97.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(158.3085 * scale, " ").concat(45.227 * scale, "\"/>\n                <path id=\"gauge_color_6\" fill=\"#D20303\" d=\"M").concat(200 * scale, ",").concat(102.5 * scale, "              A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(170.71 * scale, " ").concat(170.71 * scale, "           L ").concat(156.568 * scale, " ").concat(156.568 * scale, "        A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(180 * scale, " ").concat(102.5 * scale, "\"/>\n                <path style=\"transform-origin: ").concat(100 * scale, "px ").concat(100 * scale, "px;\" fill=\"#707070\" d=\"M").concat(95 * scale, ",").concat(110 * scale, " L ").concat(105 * scale, " ").concat(110 * scale, " L ").concat(102 * scale, " ").concat(95 * scale, " L ").concat(100 * scale, " ").concat(3 * scale, " L ").concat(98 * scale, " ").concat(95 * scale, "\"/>\n            </svg> \n            <div style=\"transform: translateY(-20px);\" class=\"r ac jc\"> \n                <h2 id=\"gauge_min_value\" class=\"m0 mr5\" >0</h2> \n                <h2 id=\"gauge_max_value\" class=\"m0 ml5\" >100</h2> \n            </div> \n            <div style=\"transform: translateY(-40px);\" class=\"r ac jc\"> \n                <h1 id=\"value\">50</h1> \n                <h1 class=\"m0\" id=\"units\"></h1> \n            </div> \n            <div class=\"r mb3\">Variable:&nbsp;            \n                <select oninput=\"variableSettings()\" id=\"variable_title_input\">\n                    <optgroup value=\"Variables\">\n                    <option value=\"\">Select a Variable</option>\n                        ").concat(validVariablesForGauge, "\n                    </optgroup>\n                </select>\n                &nbsp;Hide: \n                <input id=\"gauge_variable_hide\" oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"Gauge\"></div>\n                <div class=\"mb2\">Min Value: <input type=\"number\" onkeyup=\"minSettings(this)\" onchange=\"minSettings(this)\" value=\"0\"></div>\n                <div class=\"mb2\">Max Value: <input type=\"number\" onkeyup=\"maxSettings(this)\" onchange=\"maxSettings(this)\" value=\"100\"></div>\n            </div>\n            <div class=\"r jc ac\">\n                <input id=\"color1\" oninput=\"gaugeColorSettings(this, 1)\"  style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#0D790A\">\n                <input id=\"color2\" oninput=\"gaugeColorSettings(this, 2)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#0D790A\">\n                <input id=\"color3\" oninput=\"gaugeColorSettings(this, 3)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#F3B820\">\n                <input id=\"color4\" oninput=\"gaugeColorSettings(this, 4)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#F3B820\">\n                <input id=\"color5\" oninput=\"gaugeColorSettings(this, 5)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#D20303\">\n                <input id=\"color6\" oninput=\"gaugeColorSettings(this, 6)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"#D20303\">\n            </div>\n            <div class=\"r mb2 mt4\">\n                Units:&nbsp;\n                ").concat(unitsList('', " unitSettings(this)"), "\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>\n                <button onclick=\"newGaugeWidget(); \"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>\n            </div>\n        </div>\n        ");
  return content;
}