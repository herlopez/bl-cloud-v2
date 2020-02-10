/**
 * Gauge Widget Edit Window.
 * @function EditGaugeWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditGaugeWidgetWindow(widgetId) {
  var widget = currentProjectData.widgets.find(function (widget) {
    return widget.id === widgetId;
  }); // Scale of the widget.

  var scale = 1; // Build an list of options whereas the values are variables that are numbers.

  var validVariablesForGauge = "";

  if (currentProjectData.hasOwnProperty('variables')) {
    var variables = currentProjectData['variables'];

    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (typeof variables[variable] === "number" && variable !== 'default') {
          if (variable === widget.variable) {
            validVariablesForGauge += "<option variable-type=\"variable\" selected value=\"".concat(variable, "\">Variable: ").concat(variable, "</option>");
          } else {
            validVariablesForGauge += "<option variable-type=\"variable\" value=\"".concat(variable, "\">Variable: ").concat(variable, "</option>");
          }
        }
      }
    }
  }

  if (currentProjectData.hasOwnProperty('charts')) {
    var charts = currentProjectData['charts'];

    for (var chart in charts) {
      if (charts.hasOwnProperty(chart)) {
        if (charts[chart].type === "LINE") {
          if (charts[chart].name === widget.variable) {
            validVariablesForGauge += "<option selected variable-type=\"chart\" value=\"".concat(charts[chart].name, "\">Chart: ").concat(charts[chart].name, "</option>");
          } else {
            validVariablesForGauge += "<option variable-type=\"chart\" value=\"".concat(charts[chart].name, "\">Chart: ").concat(charts[chart].name, "</option>");
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

  var widgetValue = "NA";

  if (widget.variable_type === "chart") {
    var targetChart = currentProjectData['charts'].findIndex(function (w) {
      return w.name === widget.variable;
    });

    if (targetChart !== null) {
      console.log("d".concat(targetChart), widget.variable, currentProjectData['charts'], currentProjectData['charts'][targetChart]);

      if (currentProjectData['charts'][targetChart].hasOwnProperty('data')) {
        widgetValue = currentProjectData['charts'][targetChart]['data'][currentProjectData['charts'][targetChart]['data'].length - 1].value;
      } else {
        widgetValue = 'No Data Yet';
      }
    }
  } else {
    widgetValue = currentProjectData.variables[widget.variable];
  }

  return "\n        <i style=\"color: red; top: 5px; right: 0;\" class=\"por fs125 hc hp fa fa-trash-alt\" onclick=\"removeGaugeWidget('".concat(widget.id, "')\"></i> \n        <div class=\"c ac jc\">\n            <h2 class=\" mb1\"  id=\"gauge_title\">").concat(widget.title, "</h2>\n            <h3 class=\"m0 ").concat(hideTopTitle, "\" style=\"font-size: 0.8rem;\" id=\"variable_title\">").concat(widget.variable, "</h3> \n            <svg class=\"mt2\" height=\"").concat(200 * scale, "\" width=\"").concat(200 * scale, "\">\n                <circle cx= \"").concat(100 * scale, "\" cy= \"").concat(100 * scale, "\" r=\"").concat(5 * scale, "\" fill=\"#ffffff\"/>\n                <path id=\"gauge_color_1\" fill=\"").concat(widget.color1, "\" d=\"M").concat(29.29 * scale, ",").concat(170.71 * scale, "           A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(0 * scale, " ").concat(102.5 * scale, "                 L ").concat(20 * scale, " ").concat(102.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(43.432 * scale, " ").concat(156.568 * scale, "\"/>\n                <path id=\"gauge_color_2\" fill=\"").concat(widget.color2, "\" d=\"M").concat(0 * scale, ",").concat(97.5 * scale, "                 A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(27.592735 * scale, " ").concat(31.12827 * scale, "      L ").concat(41.6915 * scale, " ").concat(45.227 * scale, "         A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(20 * scale, " ").concat(97.5 * scale, " \"/>\n                <path id=\"gauge_color_3\" fill=\"").concat(widget.color3, "\" d=\"M").concat(31.05709 * scale, ", ").concat(27.521555 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(97.5 * scale, " ").concat(0 * scale, "                  L ").concat(97.5 * scale, " ").concat(20 * scale, "                A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(45.226855 * scale, " ").concat(41.6915 * scale, "\"/>\n                <path id=\"gauge_color_4\" fill=\"").concat(widget.color4, "\" d=\"M").concat(102.5 * scale, ",").concat(0 * scale, "                A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(168.94291 * scale, " ").concat(27.521555 * scale, "     L ").concat(154.773145 * scale, " ").concat(41.6915 * scale, "     A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(102.5 * scale, " ").concat(20 * scale, "\"/>\n                <path id=\"gauge_color_5\" fill=\"").concat(widget.color5, "\" d=\"M").concat(172.407265 * scale, ",").concat(31.12827 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(200 * scale, " ").concat(97.5 * scale, "                L ").concat(180 * scale, " ").concat(97.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(158.3085 * scale, " ").concat(45.227 * scale, "\"/>\n                <path id=\"gauge_color_6\" fill=\"").concat(widget.color6, "\" d=\"M").concat(200 * scale, ",").concat(102.5 * scale, "              A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(170.71 * scale, " ").concat(170.71 * scale, "           L ").concat(156.568 * scale, " ").concat(156.568 * scale, "        A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(180 * scale, " ").concat(102.5 * scale, "\"/>\n                <path style=\"transform-origin: ").concat(100 * scale, "px ").concat(100 * scale, "px;\" fill=\"#707070\" d=\"M").concat(95 * scale, ",").concat(110 * scale, " L ").concat(105 * scale, " ").concat(110 * scale, " L ").concat(102 * scale, " ").concat(95 * scale, " L ").concat(100 * scale, " ").concat(3 * scale, " L ").concat(98 * scale, " ").concat(95 * scale, "\"/>\n            </svg> \n            <div style=\"transform: translateY(-20px);\" class=\"r ac jc\"> \n                <h2 id=\"gauge_min_value\" class=\"m0 mr5\" >").concat(widget.min, "</h2> \n                <h2 id=\"gauge_max_value\" class=\"m0 ml5\" >").concat(widget.max, "</h2> \n            </div> \n            <div style=\"transform: translateY(-40px);\" class=\"r ac jc\"> \n                <h1 id=\"value\">").concat(widgetValue, "</h1> \n                <h1 class=\"m0\" id=\"units\">").concat(widget.units, "</h1> \n            </div> \n             <div class=\"r mb3\">Variable:&nbsp;            \n                <select value=\"").concat(widget.variable, "\" oninput=\"variableSettingsSettings(this.id)\" id=\"").concat(widget.id, "_variable_title_input\">\n                    <option disabled value=\"\">Select a Variable / Chart</option>\n                    ").concat(validVariablesForGauge, "\n                </select>\n                &nbsp;Hide: \n                <input id=\"gauge_variable_hide\" ").concat(hideValue, " oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"").concat(widget.title, "\"></div>\n                <div class=\"mb2\">Min Value: <input type=\"number\" onkeyup=\"minSettings(this)\" onchange=\"minSettings(this)\" value=\"").concat(widget.min, "\"></div>\n                <div class=\"mb2\">Max Value: <input type=\"number\" onkeyup=\"maxSettings(this)\" onchange=\"maxSettings(this)\" value=\"").concat(widget.max, "\"></div>\n            </div>\n            <div class=\"r jc ac\">\n                <input id=\"color1\" oninput=\"gaugeColorSettings(this, 1)\"  style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color1, "\">\n                <input id=\"color2\" oninput=\"gaugeColorSettings(this, 2)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color2, "\">\n                <input id=\"color3\" oninput=\"gaugeColorSettings(this, 3)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color3, "\">\n                <input id=\"color4\" oninput=\"gaugeColorSettings(this, 4)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color4, "\">\n                <input id=\"color5\" oninput=\"gaugeColorSettings(this, 5)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color5, "\">\n                <input id=\"color6\" oninput=\"gaugeColorSettings(this, 6)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"").concat(widget.color6, "\">\n            </div>\n             <div class=\"r mb2 mt4\">\n                Units:&nbsp;\n                ").concat(unitsList('settings_variable_units', " unitSettings(this)", widget.units), "\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n                <button onclick=\"updateGaugeWidget('").concat(widget.id, "')\"> &nbsp;Save&nbsp;</button>\n            </div>\n        </div>\n    ");
}

function updateGaugeWidget(id) {
  var sel = document.getElementById("".concat(id, "_variable_title_input"));
  var selected = sel.options[sel.selectedIndex];
  updateWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable_type: "".concat(selected.getAttribute('variable-type')),
    variable: "".concat(document.getElementById("".concat(id, "_variable_title_input")).value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText),
    color1: "".concat(document.getElementById('color1').value),
    color2: "".concat(document.getElementById('color2').value),
    color3: "".concat(document.getElementById('color3').value),
    color4: "".concat(document.getElementById('color4').value),
    color5: "".concat(document.getElementById('color5').value),
    color6: "".concat(document.getElementById('color6').value),
    min: parseInt(document.getElementById('gauge_min_value').innerText),
    max: parseInt(document.getElementById('gauge_max_value').innerText),
    id: id
  });
}