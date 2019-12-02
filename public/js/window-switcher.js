function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {
  console.log('targetWindow: ', targetWindow);
  var window = document.getElementById('window');
  var app = document.getElementById('app');

  function windowHide() {
    app.classList.remove('hold');
    window.classList.remove('cr');
    window.classList.remove('ac');
    window.classList.remove('jc');
    window.classList.add('dn');
    window.innerHTML = '';
  }

  function windowShow() {
    app.classList.add('hold');
    window.classList.add('cr');
    window.classList.add('ac');
    window.classList.add('jc');
    window.classList.remove('dn');
    window.innerHTML = '';
  }

  switch (targetWindow) {
    // No window Shown.
    case 'none':
      windowHide();
      break;

    case 'deleteProject':
      windowShow();
      var deleteProjectWindow = document.createElement('div');
      deleteProjectWindow.id = 'window_content_block';
      deleteProjectWindow.classList.add('c');
      deleteProjectWindow.classList.add('ac');
      deleteProjectWindow.classList.add('jc');
      deleteProjectWindow.style.maxWidth = '500px';
      deleteProjectWindow.innerHTML = "<h2 style=\"text-align:center;\">ARE YOU SURE YOU WANT TO <u style='color: red;'>DELETE</u> THIS PROJECT?<br><br> <u style='color: red;'>All data</u> tied to this project will be lost if deleted.</h2>" + "<div class=\"r ac jc\"><button onclick=\"windowSwitcher('none')\">Cancel</button><button onclick =\"deleteProject(currentUid, currentId)\" style=\"background: #8c2726;\">DELETE</button></div>";
      window.appendChild(deleteProjectWindow);
      break;

    case 'newKey':
      windowShow();
      var newKeySettings = document.createElement('div');
      newKeySettings.id = 'window_content_block';
      newKeySettings.classList.add('c');
      newKeySettings.classList.add('ac');
      newKeySettings.classList.add('jc');
      newKeySettings.style.maxWidth = '500px';
      newKeySettings.innerHTML = "<h2>Are you sure you want to generate a new project key? <u style='color: red;'>All devices</u> using this key will need to have the new key implemented for all the devices connected to this project to continue functioning.</h2>" + "<div class=\"r ac jc\"><button onclick=\"windowSwitcher('none')\">Cancel</button><button onclick =\"newProjectKey('".concat(currentUid, "', '").concat(currentId, "')\" style=\"background: #8c2726;\">New Key</button></div>");
      window.appendChild(newKeySettings);
      break;

    case 'data':
      windowShow();
      var dataSettings = document.createElement('div');
      dataSettings.id = 'window_content_block';
      dataSettings.classList.add('widget-data-settings');
      var dataWidgetContent = "<div class=\"c ac jc\">" + '<h2 class=" mb1"  id="gauge_title">Data Point</h2>' + '<h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3>' + '<div style="" class="r ac jc">' + '<h1 id="value">50</h1>' + '<h1 class="m0" id="units"></h1>' + '</div>' + "<div>".concat(new Date().toLocaleString(), "</div>") + '<div class="r mt4 mb3">Variable:&nbsp;' + '<select oninput="variableSettings()" id="variable_title_input">';
      var validVariablesForData = "<option value=\"\">Select a Variable</option>";

      if (currentProjectData.hasOwnProperty('variables')) {
        var variables = currentProjectData['variables'];

        for (var variable in variables) {
          if (variables.hasOwnProperty(variable)) {
            if (variable !== 'default') {
              validVariablesForData = validVariablesForData + "<option value=\"".concat(variable, "\">").concat(variable, "</option>");
            }
          }
        }
      }

      dataSettings.innerHTML = dataWidgetContent + validVariablesForData + '</select>&nbsp;Hide: <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">' + '</div>' + '<div class="c jc afe p3 py0">' + '<div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Data Point"></div>' + '</div>' + '<div class="r mb2 mt0">Units:&nbsp;' + '<select oninput="unitSettings(this)" id="">' + '<option value="">-</option>' + '<optgroup label="Temperature">' + '<option value="°C" title="celsius">°C</option>' + '<option value="°F" title="fahrenheit">°F</option>' + '<option value="K" title="kelvin">K</option>' + '<option value="°Ré" title="reaumur">°Ré</option>' + '<option value="°N" title="newton">°N</option>' + '<option value="°Ra" title="rankine">°Ra</option>' + '</optgroup>' + '<optgroup label="Volume">' + ' <option value="m³" title="cubic meter">m³</option>' + ' <option value="dm³" title="cubic decimeter">dm³</option>' + ' <option value="cm³" title="cubic centimeter">cm³</option>' + ' <option value="l" title="liter">l</option>' + ' <option value="dl" title="deciliter">dl</option>' + ' <option value="cl" title="centiliter">cl</option>' + ' <option value="ml" title="milliliter">ml</option>' + ' <option value="oz" title="fluid ounce">oz</option>' + ' <option value="in³" title="cubic inch">in³</option>' + ' <option value="ft³" title="cubic foot">ft³</option>' + ' <option value="yd³" title="cubic yard">yd³</option>' + ' <option value="gal" title="gallon uk">gal</option>' + ' <option value="bbl" title="petroleum barrel">bbl</option>' + ' <option value="pt" title="pint">pt</option>' + '</optgroup>' + '<optgroup label="Distance">' + '<option value="km" title="kilometer">km</option>' + '<option value="m" title="meter">m</option>' + '<option value="dm" title="decimeter">dm</option>' + '<option value="cm" title="centimeter">cm</option>' + '<option value="mm" title="millimeter">mm</option>' + '<option value="mi" title="mile">mi</option>' + '<option value="in" title="inch">in</option>' + '<option value="ft" title="foot">ft</option>' + '<option value="yd" title="yard">yd</option>' + '</optgroup>' + '<optgroup label="Mass">' + '<option value="t" title="tonne">t</option>' + '<option value="kg" title="kilogram">kg</option>' + '<option value="hg" title="hectogram">hg</option>' + '<option value="g" title="gram">g</option>' + '<option value="dg" title="decigram">dg</option>' + '<option value="cg" title="centigram">cg</option>' + '<option value="mg" title="milligram">mg</option>' + '<option value="µg" title="microgram">µg</option>' + '<option value="carat" title="carat">carat</option>' + '<option value="grain" title="grain">grain</option>' + '<option value="oz" title="pounce avoirdupois">oz</option>' + '<option value="lb" title="pound avoirdupois">lb</option>' + '<option value="cwt" title="long hundredweight">cwt</option>' + '<option value="ton" title="ton">ton</option>' + '<option value="st" title="stone">st</option>' + '</optgroup>' + "</select>" + '</div>' + "<div class=\"r\">" + "<button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>" + "<button onclick=\"newDataWidget()\"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>" + "</div>" + '</div>';
      window.appendChild(dataSettings);
      break;

    case 'gauge_settings':
      windowShow();
      console.log("Op: ", options, currentProjectData);
      var gauge = currentProjectData.widgets.find(function (widget) {
        return widget.id === options;
      });
      var gaugeEdit = document.createElement('div');
      gaugeEdit.id = 'window_content_block';
      console.log(gauge); // Scale of the gauge.

      var gaugeEditScale = 1;
      var gaugeEditDcaleContent = "<div class=\"c ac jc\">\n                <h2 class=\" mb1\"  id=\"gauge_title\">".concat(gauge.title, "</h2>\n                <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\">").concat(gauge.variable, "</h3> \n                <svg class=\"mt2\" height=\"").concat(200 * gaugeEditScale, "\" width=\"").concat(200 * gaugeEditScale, "\">\n                    <circle cx= \"").concat(100 * gaugeEditScale, "\" cy= \"").concat(100 * gaugeEditScale, "\" r=\"").concat(5 * gaugeEditScale, "\" fill=\"#ffffff\"/>\n                    <path id=\"gauge_color_1\" fill=\"").concat(gauge.color1, "\" d=\"M").concat(29.29 * gaugeEditScale, ",").concat(170.71 * gaugeEditScale, "           A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(0 * gaugeEditScale, " ").concat(102.5 * gaugeEditScale, "                 L ").concat(20 * gaugeEditScale, " ").concat(102.5 * gaugeEditScale, "               A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(43.432 * gaugeEditScale, " ").concat(156.568 * gaugeEditScale, "\"/>\n                    <path id=\"gauge_color_2\" fill=\"").concat(gauge.color2, "\" d=\"M").concat(0 * gaugeEditScale, ",").concat(97.5 * gaugeEditScale, "                 A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(27.592735 * gaugeEditScale, " ").concat(31.12827 * gaugeEditScale, "      L ").concat(41.6915 * gaugeEditScale, " ").concat(45.227 * gaugeEditScale, "         A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(20 * gaugeEditScale, " ").concat(97.5 * gaugeEditScale, " \"/>\n                    <path id=\"gauge_color_3\" fill=\"").concat(gauge.color3, "\" d=\"M").concat(31.05709 * gaugeEditScale, ", ").concat(27.521555 * gaugeEditScale, "    A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(97.5 * gaugeEditScale, " ").concat(0 * gaugeEditScale, "                  L ").concat(97.5 * gaugeEditScale, " ").concat(20 * gaugeEditScale, "                A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(45.226855 * gaugeEditScale, " ").concat(41.6915 * gaugeEditScale, "\"/>\n                    <path id=\"gauge_color_4\" fill=\"").concat(gauge.color4, "\" d=\"M").concat(102.5 * gaugeEditScale, ",").concat(0 * gaugeEditScale, "                A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(168.94291 * gaugeEditScale, " ").concat(27.521555 * gaugeEditScale, "     L ").concat(154.773145 * gaugeEditScale, " ").concat(41.6915 * gaugeEditScale, "     A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(102.5 * gaugeEditScale, " ").concat(20 * gaugeEditScale, "\"/>\n                    <path id=\"gauge_color_5\" fill=\"").concat(gauge.color5, "\" d=\"M").concat(172.407265 * gaugeEditScale, ",").concat(31.12827 * gaugeEditScale, "    A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(200 * gaugeEditScale, " ").concat(97.5 * gaugeEditScale, "                L ").concat(180 * gaugeEditScale, " ").concat(97.5 * gaugeEditScale, "               A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(158.3085 * gaugeEditScale, " ").concat(45.227 * gaugeEditScale, "\"/>\n                    <path id=\"gauge_color_6\" fill=\"").concat(gauge.color6, "\" d=\"M").concat(200 * gaugeEditScale, ",").concat(102.5 * gaugeEditScale, "              A ").concat(100 * gaugeEditScale, " ").concat(100 * gaugeEditScale, " 0 0 1 ").concat(170.71 * gaugeEditScale, " ").concat(170.71 * gaugeEditScale, "           L ").concat(156.568 * gaugeEditScale, " ").concat(156.568 * gaugeEditScale, "        A ").concat(80 * gaugeEditScale, " ").concat(80 * gaugeEditScale, " 0 0 0 ").concat(180 * gaugeEditScale, " ").concat(102.5 * gaugeEditScale, "\"/>\n                    <path style=\"transform-origin: ").concat(100 * gaugeEditScale, "px ").concat(100 * gaugeEditScale, "px;\" fill=\"#707070\" d=\"M").concat(95 * gaugeEditScale, ",").concat(110 * gaugeEditScale, " L ").concat(105 * gaugeEditScale, " ").concat(110 * gaugeEditScale, " L ").concat(102 * gaugeEditScale, " ").concat(95 * gaugeEditScale, " L ").concat(100 * gaugeEditScale, " ").concat(3 * gaugeEditScale, " L ").concat(98 * gaugeEditScale, " ").concat(95 * gaugeEditScale, "\"/>\n                </svg> \n                <div style=\"transform: translateY(-20px);\" class=\"r ac jc\"> \n                    <h2 id=\"gauge_min_value\" class=\"m0 mr5\" >").concat(gauge.min, "</h2> \n                    <h2 id=\"gauge_max_value\" class=\"m0 ml5\" >").concat(gauge.max, "</h2> \n                </div> \n                <div style=\"transform: translateY(-40px);\" class=\"r ac jc\"> \n                    <h1 id=\"value\">").concat(currentProjectData.variables[gauge.variable], "</h1> \n                    <h1 class=\"m0\" id=\"units\">").concat(gauge.units, "</h1> \n                </div> \n            <div class=\"r mb3\">Variable:&nbsp;"); // Build an list of options whereas the values are variables that are numbers.

      var validVariablesForGauge3 = "<option >Select a Variable</option>";

      if (currentProjectData.hasOwnProperty('variables')) {
        var _variables = currentProjectData['variables'];

        for (var _variable in _variables) {
          if (_variables.hasOwnProperty(_variable)) {
            if (typeof _variables[_variable] === "number" && _variable !== 'default') {
              validVariablesForGauge3 = validVariablesForGauge3 + "<option value=\"".concat(_variable, "\">").concat(_variable, "</option>");
            }
          }
        }
      }

      gaugeEdit.innerHTML = gaugeEditDcaleContent + "<select oninput=\"variableSettings()\" id=\"".concat(gauge.id, "_variable_title_input\">") + validVariablesForGauge3 + "</select>&nbsp;Hide: <input id=\"gauge_variable_hide\"  oninput=\"gaugeHideVariableName()\" style=\"width: 20px;\" type=\"checkbox\">" + '</div>' + '<div class="c jc afe p3 pt0">' + "<div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"".concat(gauge.title, "\"></div>") + "<div class=\"mb2\">Min Value: <input type=\"number\" onkeyup=\"minSettings(this)\" onchange=\"minSettings(this)\" value=\"".concat(gauge.min, "\"></div>") + "<div class=\"mb2\">Max Value: <input type=\"number\" onkeyup=\"maxSettings(this)\" onchange=\"maxSettings(this)\" value=\"".concat(gauge.max, "\"></div>") + '</div>' + '<div class="r jc ac">' + "<input id=\"color1\" oninput=\"gaugeColorSettings(this, 1)\"  style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color1, "\">") + "<input id=\"color2\" oninput=\"gaugeColorSettings(this, 2)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color2, "\">") + "<input id=\"color3\" oninput=\"gaugeColorSettings(this, 3)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color3, "\">") + "<input id=\"color4\" oninput=\"gaugeColorSettings(this, 4)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color4, "\">") + "<input id=\"color5\" oninput=\"gaugeColorSettings(this, 5)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color5, "\">") + "<input id=\"color6\" oninput=\"gaugeColorSettings(this, 6)\" style=\"background: transparent;\" class=\"mx3\" type=\"color\" value=\"".concat(gauge.color6, "\">") + '</div>' + '<div class="r mb2 mt4">Units:&nbsp;' + "<select oninput=\"unitSettings(this)\" id=\"".concat(gauge.id, "_variable_units\">") + '<optgroup label="Genral">' + '<option value="percent">%</option>' + '</optgroup>' + '<optgroup label="Temperature">' + '<option value="°C" title="celsius">°C</option>' + '<option value="°F" title="fahrenheit">°F</option>' + '<option value="K" title="kelvin">K</option>' + '<option value="°Ré" title="reaumur">°Ré</option>' + '<option value="°N" title="newton">°N</option>' + '<option value="°Ra" title="rankine">°Ra</option>' + '</optgroup>' + '<optgroup label="Volume">' + ' <option value="m³" title="cubic meter">m³</option>' + ' <option value="dm³" title="cubic decimeter">dm³</option>' + ' <option value="cm³" title="cubic centimeter">cm³</option>' + ' <option value="l" title="liter">l</option>' + ' <option value="dl" title="deciliter">dl</option>' + ' <option value="cl" title="centiliter">cl</option>' + ' <option value="ml" title="milliliter">ml</option>' + ' <option value="oz" title="fluid ounce">oz</option>' + ' <option value="in³" title="cubic inch">in³</option>' + ' <option value="ft³" title="cubic foot">ft³</option>' + ' <option value="yd³" title="cubic yard">yd³</option>' + ' <option value="gal" title="gallon uk">gal</option>' + ' <option value="bbl" title="petroleum barrel">bbl</option>' + ' <option value="pt" title="pint">pt</option>' + '</optgroup>' + '<optgroup label="Distance">' + '<option value="km" title="kilometer">km</option>' + '<option value="m" title="meter">m</option>' + '<option value="dm" title="decimeter">dm</option>' + '<option value="cm" title="centimeter">cm</option>' + '<option value="mm" title="millimeter">mm</option>' + '<option value="mi" title="mile">mi</option>' + '<option value="in" title="inch">in</option>' + '<option value="ft" title="foot">ft</option>' + '<option value="yd" title="yard">yd</option>' + '</optgroup>' + '<optgroup label="Mass">' + '<option value="t" title="tonne">t</option>' + '<option value="kg" title="kilogram">kg</option>' + '<option value="hg" title="hectogram">hg</option>' + '<option value="g" title="gram">g</option>' + '<option value="dg" title="decigram">dg</option>' + '<option value="cg" title="centigram">cg</option>' + '<option value="mg" title="milligram">mg</option>' + '<option value="µg" title="microgram">µg</option>' + '<option value="carat" title="carat">carat</option>' + '<option value="grain" title="grain">grain</option>' + '<option value="oz" title="pounce avoirdupois">oz</option>' + '<option value="lb" title="pound avoirdupois">lb</option>' + '<option value="cwt" title="long hundredweight">cwt</option>' + '<option value="ton" title="ton">ton</option>' + '<option value="st" title="stone">st</option>' + '</optgroup>' + "</select>" + '</div>' + "<div class=\"r\">" + "<button onclick=\"windowSwitcher('none')\">Cancel</button>" + "<button onclick=\"updateGaugeWidget('".concat(gauge.id, "')\"> &nbsp;Save&nbsp;</button>") + "</div>" + '</div>';
      window.appendChild(gaugeEdit);
      document.getElementById("".concat(gauge.id, "_variable_title_input")).value = gauge.variable;
      document.getElementById("".concat(gauge.id, "_variable_units")).value = gauge.units;

      if (gauge.hide === "true") {
        document.getElementById('variable_title').classList.add('dn');
        document.getElementById('gauge_variable_hide').checked = true;
      } else {
        document.getElementById('variable_title').classList.remove('dn');
        document.getElementById('gauge_variable_hide').checked = false;
      }

      break;

    case 'gauge':
      windowShow(); // Create the root element for the gauge.

      var gaugeSettings = document.createElement('div');
      gaugeSettings.id = 'window_content_block';
      gaugeSettings.classList.add('widget-gauge-settings'); // Scale of the gauge.

      var scale = 1; // The content of the window.

      var content = "<div class=\"c ac jc\">\n                <h2 class=\" mb1\"  id=\"gauge_title\">Gauge</h2> \n                <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3> \n                <svg class=\"mt2\" height=\"".concat(200 * scale, "\" width=\"").concat(200 * scale, "\">\n                    <circle cx= \"").concat(100 * scale, "\" cy= \"").concat(100 * scale, "\" r=\"").concat(5 * scale, "\" fill=\"#ffffff\"/>\n                    <path id=\"gauge_color_1\" fill=\"#0D790A\" d=\"M").concat(29.29 * scale, ",").concat(170.71 * scale, "           A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(0 * scale, " ").concat(102.5 * scale, "                 L ").concat(20 * scale, " ").concat(102.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(43.432 * scale, " ").concat(156.568 * scale, "\"/>\n                    <path id=\"gauge_color_2\" fill=\"#0D790A\" d=\"M").concat(0 * scale, ",").concat(97.5 * scale, "                 A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(27.592735 * scale, " ").concat(31.12827 * scale, "      L ").concat(41.6915 * scale, " ").concat(45.227 * scale, "         A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(20 * scale, " ").concat(97.5 * scale, " \"/>\n                    <path id=\"gauge_color_3\" fill=\"#F3B820\" d=\"M").concat(31.05709 * scale, ", ").concat(27.521555 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(97.5 * scale, " ").concat(0 * scale, "                  L ").concat(97.5 * scale, " ").concat(20 * scale, "                A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(45.226855 * scale, " ").concat(41.6915 * scale, "\"/>\n                    <path id=\"gauge_color_4\" fill=\"#F3B820\" d=\"M").concat(102.5 * scale, ",").concat(0 * scale, "                A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(168.94291 * scale, " ").concat(27.521555 * scale, "     L ").concat(154.773145 * scale, " ").concat(41.6915 * scale, "     A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(102.5 * scale, " ").concat(20 * scale, "\"/>\n                    <path id=\"gauge_color_5\" fill=\"#D20303\" d=\"M").concat(172.407265 * scale, ",").concat(31.12827 * scale, "    A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(200 * scale, " ").concat(97.5 * scale, "                L ").concat(180 * scale, " ").concat(97.5 * scale, "               A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(158.3085 * scale, " ").concat(45.227 * scale, "\"/>\n                    <path id=\"gauge_color_6\" fill=\"#D20303\" d=\"M").concat(200 * scale, ",").concat(102.5 * scale, "              A ").concat(100 * scale, " ").concat(100 * scale, " 0 0 1 ").concat(170.71 * scale, " ").concat(170.71 * scale, "           L ").concat(156.568 * scale, " ").concat(156.568 * scale, "        A ").concat(80 * scale, " ").concat(80 * scale, " 0 0 0 ").concat(180 * scale, " ").concat(102.5 * scale, "\"/>\n                    <path style=\"transform-origin: ").concat(100 * scale, "px ").concat(100 * scale, "px;\" fill=\"#707070\" d=\"M").concat(95 * scale, ",").concat(110 * scale, " L ").concat(105 * scale, " ").concat(110 * scale, " L ").concat(102 * scale, " ").concat(95 * scale, " L ").concat(100 * scale, " ").concat(3 * scale, " L ").concat(98 * scale, " ").concat(95 * scale, "\"/>\n                </svg> \n                <div style=\"transform: translateY(-20px);\" class=\"r ac jc\"> \n                    <h2 id=\"gauge_min_value\" class=\"m0 mr5\" >0</h2> \n                    <h2 id=\"gauge_max_value\" class=\"m0 ml5\" >100</h2> \n                </div> \n                <div style=\"transform: translateY(-40px);\" class=\"r ac jc\"> \n                    <h1 id=\"value\">50</h1> \n                    <h1 class=\"m0\" id=\"units\"></h1> \n                </div> \n            <div class=\"r mb3\">Variable:&nbsp;"); // Build an list of options whereas the values are variables that are numbers.

      var validVariablesForGauge = "<option value=\"\">Select a Variable</option>";

      if (currentProjectData.hasOwnProperty('variables')) {
        var _variables2 = currentProjectData['variables'];

        for (var _variable2 in _variables2) {
          if (_variables2.hasOwnProperty(_variable2)) {
            if (typeof _variables2[_variable2] === "number" && _variable2 !== 'default') {
              validVariablesForGauge = validVariablesForGauge + "<option value=\"".concat(_variable2, "\">").concat(_variable2, "</option>");
            }
          }
        }
      }

      gaugeSettings.innerHTML = content + '<select oninput="variableSettings()" id="variable_title_input">' + validVariablesForGauge + '</select>&nbsp;Hide: <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">' + '</div>' + '<div class="c jc afe p3 pt0">' + '<div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Gauge"></div>' + '<div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="0"></div>' + '<div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="100"></div>' + '</div>' + '<div class="r jc ac">' + '<input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="#0D790A">' + '<input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="#0D790A">' + '<input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="#F3B820">' + '<input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="#F3B820">' + '<input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="#D20303">' + '<input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="#D20303">' + '</div>' + '<div class="r mb2 mt4">Units:&nbsp;' + '<select oninput="unitSettings(this)" id="">' + '<optgroup label="Math">' + '<option value="percent">%</option>' + '</optgroup>' + '<optgroup label="Temperature">' + '<option value="°C" title="celsius">°C</option>' + '<option value="°F" title="fahrenheit">°F</option>' + '<option value="K" title="kelvin">K</option>' + '<option value="°Ré" title="reaumur">°Ré</option>' + '<option value="°N" title="newton">°N</option>' + '<option value="°Ra" title="rankine">°Ra</option>' + '</optgroup>' + '<optgroup label="Volume">' + ' <option value="m³" title="cubic meter">m³</option>' + ' <option value="dm³" title="cubic decimeter">dm³</option>' + ' <option value="cm³" title="cubic centimeter">cm³</option>' + ' <option value="l" title="liter">l</option>' + ' <option value="dl" title="deciliter">dl</option>' + ' <option value="cl" title="centiliter">cl</option>' + ' <option value="ml" title="milliliter">ml</option>' + ' <option value="oz" title="fluid ounce">oz</option>' + ' <option value="in³" title="cubic inch">in³</option>' + ' <option value="ft³" title="cubic foot">ft³</option>' + ' <option value="yd³" title="cubic yard">yd³</option>' + ' <option value="gal" title="gallon uk">gal</option>' + ' <option value="bbl" title="petroleum barrel">bbl</option>' + ' <option value="pt" title="pint">pt</option>' + '</optgroup>' + '<optgroup label="Distance">' + '<option value="km" title="kilometer">km</option>' + '<option value="m" title="meter">m</option>' + '<option value="dm" title="decimeter">dm</option>' + '<option value="cm" title="centimeter">cm</option>' + '<option value="mm" title="millimeter">mm</option>' + '<option value="mi" title="mile">mi</option>' + '<option value="in" title="inch">in</option>' + '<option value="ft" title="foot">ft</option>' + '<option value="yd" title="yard">yd</option>' + '</optgroup>' + '<optgroup label="Mass">' + '<option value="t" title="tonne">t</option>' + '<option value="kg" title="kilogram">kg</option>' + '<option value="hg" title="hectogram">hg</option>' + '<option value="g" title="gram">g</option>' + '<option value="dg" title="decigram">dg</option>' + '<option value="cg" title="centigram">cg</option>' + '<option value="mg" title="milligram">mg</option>' + '<option value="µg" title="microgram">µg</option>' + '<option value="carat" title="carat">carat</option>' + '<option value="grain" title="grain">grain</option>' + '<option value="oz" title="pounce avoirdupois">oz</option>' + '<option value="lb" title="pound avoirdupois">lb</option>' + '<option value="cwt" title="long hundredweight">cwt</option>' + '<option value="ton" title="ton">ton</option>' + '<option value="st" title="stone">st</option>' + '</optgroup>' + "</select>" + '</div>' + "<div class=\"r\">" + "<button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>" + "<button onclick=\"newGaugeWidget(); \"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>" + "</div>" + '</div>';
      window.appendChild(gaugeSettings);
      break;

    case 'widget_selection':
      windowShow();
      console.log('Widget Selection');
      var widgetSelection = document.createElement('div');
      widgetSelection.id = 'window_content_block';
      widgetSelection.classList.add('widget-selection');
      var mod = 0.7;
      console.log(currentKey);
      widgetSelection.innerHTML = "\n            <h2 class=\"mb0\">Add Widget</h2>\n            <hr>\n            <div class=\"c ac jc\">\n                <div class=\"r ac jc\" style=\"flex-wrap: wrap; max-width: 1345px;\"> \n                    <div class=\"c ac jc\"> \n                        <button onclick=\"windowSwitcher('gauge')\" class=\"bbutton\"> \n                            <svg height=\"".concat(200 * mod, "\" width=\"").concat(200 * mod, "\">\n                                <circle cx= \"").concat(100 * mod, "\" cy= \"").concat(100 * mod, "\" r=\"").concat(5 * mod, "\" fill=\"#ffffff\"/>\n                                <path fill=\"#0D790A\" d=\"M").concat(29.29 * mod, ",").concat(170.71 * mod, "           A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(0 * mod, " ").concat(102.5 * mod, "                 L ").concat(20 * mod, " ").concat(102.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(43.432 * mod, " ").concat(156.568 * mod, "\"/>\n                                <path fill=\"#0D790A\" d=\"M").concat(0 * mod, ",").concat(97.5 * mod, "                 A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(27.592735 * mod, " ").concat(31.12827 * mod, "      L ").concat(41.6915 * mod, " ").concat(45.227 * mod, "         A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(20 * mod, " ").concat(97.5 * mod, " \"/>\n                                <path fill=\"#F3B820\" d=\"M").concat(31.05709 * mod, ", ").concat(27.521555 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(97.5 * mod, " ").concat(0 * mod, "                  L ").concat(97.5 * mod, " ").concat(20 * mod, "                A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(45.226855 * mod, " ").concat(41.6915 * mod, "\"/>\n                                <path fill=\"#F3B820\" d=\"M").concat(102.5 * mod, ",").concat(0 * mod, "                A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(168.94291 * mod, " ").concat(27.521555 * mod, "     L ").concat(154.773145 * mod, " ").concat(41.6915 * mod, "     A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(102.5 * mod, " ").concat(20 * mod, "\"/>\n                                <path fill=\"#D20303\" d=\"M").concat(172.407265 * mod, ",").concat(31.12827 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(200 * mod, " ").concat(97.5 * mod, "                L ").concat(180 * mod, " ").concat(97.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(158.3085 * mod, " ").concat(45.227 * mod, "\"/>\n                                <path fill=\"#D20303\" d=\"M").concat(200 * mod, ",").concat(102.5 * mod, "              A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(170.71 * mod, " ").concat(170.71 * mod, "           L ").concat(156.568 * mod, " ").concat(156.568 * mod, "        A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(180 * mod, " ").concat(102.5 * mod, "\"/>\n                                <path style=\"transform-origin: ").concat(100 * mod, "px ").concat(100 * mod, "px;\" fill=\"#707070\" d=\"M").concat(95 * mod, ",").concat(110 * mod, " L ").concat(105 * mod, " ").concat(110 * mod, " L ").concat(102 * mod, " ").concat(95 * mod, " L ").concat(100 * mod, " ").concat(3 * mod, " L ").concat(98 * mod, " ").concat(95 * mod, "\"/>\n                            </svg> \n                        </button> \n                        <h2>Gauge</h2> \n                    </div> \n                    <div class=\"c ac jc\">\n                        <button onclick = \"windowSwitcher('data')\" class=\"bbutton\"><div class=\"c\"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>\n                        <h2>Data Block</h2>\n                    </div>\n                    <div class=\"c ac jc\">\n                        <button class=\"bbutton\"><input class=\"slider\" type=\"range\"></button>\n                        <h2>Slider</h2>\n                    </div>\n                    <div class=\"c ac jc\">\n                        <button class=\"bbutton\"><div class=\"ct-chart-pie-widget\"></div></button>\n                        <h2>Pie Chart</h2>\n                    </div>\n                    <div class=\"c ac jc\">   \n                        <button class=\"bbutton\"><div class=\"ct-chart-line-chart-widget\"></div></button>\n                        <h2>Line Graph</h2>\n                    </div>\n                    <div class=\"c ac jc\">\n                        <button class=\"bbutton\"><div class=\"ct-chart-scatter-chart-widget\"></div></button>\n                        <h2>Scatter Plot</h2>\n                    </div>\n                    <div class=\"c ac jc\">\n                        <button class=\"bbutton\"><div class=\"mr3 ct-chart-histo-chart-widget\"></div></button>\n                        <h2>Bar Graph</h2>\n                    </div>\n                    <div class=\"c ac jc\">\n                        <button class=\"bbutton\"></button>\n                        <h2>Raw Data</h2>\n                    </div>\n                </div>\n                <div class=\"r\">\n                    <button onclick=\"windowSwitcher('none')\">Cancel</button>\n                </div>\n            </div>");
      window.appendChild(widgetSelection);
      new Chartist.Pie('.ct-chart-pie-widget', {
        series: [5, 10, 20, 25, 40, 100]
      }, {
        donut: true,
        donutWidth: 15,
        donutSolid: true,
        startAngle: 270,
        showLabel: false
      });
      new Chartist.Line('.ct-chart-line-chart-widget', {
        series: [[1, 5, 2, 5, 4, 3], [2, 3, 4, 8, 1, 2], [5, 4, 3, 2, 1, 0.5]]
      }, {
        fullWidth: true,
        showPoint: false,
        axisY: {
          showLabel: false,
          showGrid: false
        },
        axisX: {
          showLabel: false,
          showGrid: false
        }
      });

      var times = function times(n) {
        return Array.apply(null, new Array(n));
      };

      var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
        data.labels.push(index + 1);
        data.series.forEach(function (series) {
          series.push(Math.random() * 100);
        });
        return data;
      }, {
        labels: [],
        series: times(4).map(function () {
          return new Array();
        })
      });
      var options = {
        showLine: false,
        axisY: {
          showLabel: false,
          showGrid: false
        },
        axisX: {
          showLabel: false,
          showGrid: false
        }
      };
      var responsiveOptions = [['screen and (min-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function labelInterpolationFnc(value, index) {
            return index % 4 === 0 ? 'W' + value : null;
          }
        }
      }]];
      new Chartist.Line('.ct-chart-scatter-chart-widget', data, options, responsiveOptions);
      var data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8], [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]]
      };
      var options = {
        seriesBarDistance: 3,
        axisY: {
          showLabel: false,
          showGrid: false
        },
        axisX: {
          showLabel: false,
          showGrid: false
        }
      };
      var responsiveOptions = [['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function labelInterpolationFnc(value) {
            return value[0];
          }
        }
      }]];
      new Chartist.Bar('.ct-chart-histo-chart-widget', data, options);
      break;

    case 'profile_settings':
      document.getElementById('profile_window').classList.add('dn');
      windowHide();
      windowShow();
      var profileSettings = document.createElement('div');
      profileSettings.id = 'window_content_block';
      profileSettings.classList.add('update-profile');
      var user = firebase.auth().currentUser;
      var profileSettingsForm = document.createElement('form');
      profileSettingsForm.id = 'update_profile';
      h2(profileSettings, {
        innerText: "Profile Settings"
      });
      p(profileSettings, {
        innerText: "Display Name"
      });
      var displayNameInput = input(profileSettings, {
        type: 'test',
        edit: true,
        onSaveMessage: "Display name has been changed.",
        value: user.displayName,
        required: true,
        disabled: true,
        onSave: function () {
          var _onSave = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log("Save");

                    if (!(user.displayName === displayNameInput.value)) {
                      _context.next = 3;
                      break;
                    }

                    throw new Error('none');

                  case 3:
                    user.updateProfile({
                      displayName: displayNameInput.value
                    }).then(function () {
                      displayNameInput.value = user.displayName;
                      setProfileInformation(user);
                    })["catch"](function (error) {
                      throw error;
                    });

                  case 4:
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
      p(profileSettings, {
        innerText: "Email Address"
      });
      var emailInput = input(profileSettings, {
        type: 'email',
        edit: true,
        onSaveMessage: "A verification email was sent to your new email address.",
        value: user.email,
        required: true,
        onSave: function () {
          var _onSave2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log("Save: ", emailInput.value);

                    if (!(user.email === emailInput.value)) {
                      _context3.next = 3;
                      break;
                    }

                    throw new Error('none');

                  case 3:
                    _context3.next = 5;
                    return user.updateEmail(emailInput.value).then(
                    /*#__PURE__*/
                    _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2() {
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return user.sendEmailVerification().then(function () {})["catch"](function (error) {
                                throw error;
                              });

                            case 2:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    })))["catch"](function (error) {
                      throw error;
                    }).then(function () {
                      setProfileInformation(user);
                    });

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function onSave() {
            return _onSave2.apply(this, arguments);
          }

          return onSave;
        }(),
        disabled: true
      });
      p(profileSettings, {
        innerText: "Password"
      });
      var passwordInput = input(profileSettings, {
        type: 'password',
        edit: true,
        onSaveMessage: "Your password has been changed.",
        value: "******",
        required: true,
        onSave: function () {
          var _onSave3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(passwordInput.value !== "******")) {
                      _context4.next = 5;
                      break;
                    }

                    _context4.next = 3;
                    return user.updatePassword(passwordInput.value).then(function () {// Update successful.
                    })["catch"](function (error) {
                      throw error;
                    });

                  case 3:
                    _context4.next = 6;
                    break;

                  case 5:
                    throw new Error('none');

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function onSave() {
            return _onSave3.apply(this, arguments);
          }

          return onSave;
        }(),
        disabled: true
      });
      var closeContent = document.createElement('div');
      closeContent.classList = "c ac jc w100";
      closeContent.innerHTML = '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' + "    <button onclick=\"windowSwitcher('none')\">Close</button></div>";
      profileSettings.appendChild(closeContent);
      window.appendChild(profileSettings);
      break;
    // Creating a new project window.

    case 'new_project':
      windowShow();
      var contentBlock = document.createElement('div');
      contentBlock.id = 'window_content_block';
      contentBlock.innerHTML = '<form id="create_project"> ' + '<h2>Create a New Project</h2>' + '<p>Project Name:</p>' + '<input required type="text" id="project" placeholder="My Project Name...">' + '<p>Project Description:</p>' + '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' + '<p>Make this project Private or Public:</p>' + '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' + '<label for="private">Private</label><br>' + '<input class="input-radio" type="radio" name="access" id="public" value="Public">' + '<label for="public">Public</label><br>' + // '<div class="r ac"> <p>Project Color: </p>'+
      '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> ' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(contentBlock);
      document.getElementById('create_project').addEventListener('submit', function (e) {
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
    // Create a new variable window.

    case 'new_variable':
      windowShow();
      var newVariableContentBlock = document.createElement('div');
      newVariableContentBlock.id = 'window_content_block';
      newVariableContentBlock.innerHTML = '<form id="new_variable"> ' + '<h2>Create a New Variable</h2>' + '<p>Variable Name:</p>' + '<input class="" required type="text" id="project" placeholder="My Variable Name...">' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(newVariableContentBlock);
      document.getElementById('new_variable').addEventListener('submit', function (e) {
        createVariable(document.getElementById('project').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
  }
}

function gaugeHideVariableName() {
  if (document.getElementById('gauge_variable_hide').checked) {
    document.getElementById('variable_title').classList.add('dn');
    document.getElementById('gauge_variable_hide').value = "off";
  } else {
    document.getElementById('variable_title').classList.remove('dn');
    document.getElementById('gauge_variable_hide').value = "on";
  }
}

function gaugeSettingsTitle() {
  document.getElementById('gauge_title').innerText = document.getElementById('gauge_title_input').value;
}

function variableSettings() {
  document.getElementById('variable_title').innerText = document.getElementById('variable_title_input').value;
  var newValue = document.getElementById('variable_title_input').value;
  document.getElementById('value').innerText = currentProjectData['variables'][newValue];
}

function unitSettings(i) {
  document.getElementById('units').innerText = i.value;
}

function minSettings(i) {
  console.log("MIN   ", i.value, document.getElementById('gauge_min_value').innerText);
  document.getElementById('gauge_min_value').innerText = i.value;
}

function maxSettings(i) {
  console.log("MAX   ", i.value);
  document.getElementById('gauge_max_value').innerText = i.value;
}

function gaugeColorSettings(i, n) {
  console.log(document.getElementById("gauge_color_".concat(n)));
  document.getElementById("gauge_color_".concat(n)).style.fill = i.value;
}

function newGaugeWidget() {
  addWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
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

function updateGaugeWidget(id) {
  updateWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
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

function newDataWidget() {
  addWidget(currentUid, currentProject, {
    type: 'data',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable: "".concat(document.getElementById('variable_title_input').value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText)
  });
}