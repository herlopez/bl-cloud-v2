// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {
    console.log('targetWindow: ', targetWindow);
    let window = document.getElementById('window');
    let app = document.getElementById('app');

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
            let deleteProjectWindow = document.createElement('div');
            deleteProjectWindow.id = 'window_content_block';
            deleteProjectWindow.classList.add('c');
            deleteProjectWindow.classList.add('ac');
            deleteProjectWindow.classList.add('jc');
            deleteProjectWindow.style.maxWidth = '500px';
            deleteProjectWindow.innerHTML= "<h2 style=\"text-align:center;\">ARE YOU SURE YOU WANT TO <u style='color: red;'>DELETE</u> THIS PROJECT?<br><br> <u style='color: red;'>All data</u> tied to this project will be lost if deleted.</h2>" +
                `<div class="r ac jc"><button onclick="windowSwitcher('none')">Cancel</button><button onclick ="deleteProject(currentUid, currentId)" style="background: #8c2726;">DELETE</button></div>`;
            window.appendChild(deleteProjectWindow);

            break;
        case 'newKey':
            windowShow();
            let newKeySettings = document.createElement('div');
            newKeySettings.id = 'window_content_block';
            newKeySettings.classList.add('c');
            newKeySettings.classList.add('ac');
            newKeySettings.classList.add('jc');
            newKeySettings.style.maxWidth = '500px';
            newKeySettings.innerHTML= "<h2>Are you sure you want to generate a new project key? <u style='color: red;'>All devices</u> using this key will need to have the new key implemented for all the devices connected to this project to continue functioning.</h2>" +
                `<div class="r ac jc"><button onclick="windowSwitcher('none')">Cancel</button><button onclick ="newProjectKey('${currentUid}', '${currentId}')" style="background: #8c2726;">New Key</button></div>`;
            window.appendChild(newKeySettings);

            break;
        case 'data':
            windowShow();

            let dataSettings = document.createElement('div');
            dataSettings.id = 'window_content_block';
            dataSettings.classList.add('widget-data-settings');
            let dataWidgetContent =
                `<div class="c ac jc">` +
                    '<h2 class=" mb1"  id="gauge_title">Data Point</h2>' +
                    '<h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3>' +
                    '<div style="" class="r ac jc">' +
                        '<h1 id="value">50</h1>' +
                        '<h1 class="m0" id="units"></h1>' +
                    '</div>' +
                    `<div>${new Date().toLocaleString()}</div>` +
                    '<div class="r mt4 mb3">Variable:&nbsp;' +
                    '<select oninput="variableSettings()" id="variable_title_input">';
                    let validVariablesForData = `<option value="">Select a Variable</option>`;
                    if (currentProjectData.hasOwnProperty('variables')) {
                        let variables = currentProjectData['variables'];
                        for (let variable in variables) {
                            if(variables.hasOwnProperty(variable)){
                                if (variable !== 'default') {
                                    validVariablesForData = validVariablesForData +`<option value="${variable}">${variable}</option>`;
                                }
                            }
                        }
                    }
            dataSettings.innerHTML = dataWidgetContent + validVariablesForData + '</select>&nbsp;Hide: <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">' +
                '</div>' +
                '<div class="c jc afe p3 py0">' +
                '<div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Data Point"></div>' +
                '</div>' +
                '<div class="r mb2 mt0">Units:&nbsp;' +
                '<select oninput="unitSettings(this)" id="">' +
                '<option value="">-</option>' +
                '<optgroup label="Temperature">' +
                '<option value="°C" title="celsius">°C</option>' +
                '<option value="°F" title="fahrenheit">°F</option>' +
                '<option value="K" title="kelvin">K</option>' +
                '<option value="°Ré" title="reaumur">°Ré</option>' +
                '<option value="°N" title="newton">°N</option>' +
                '<option value="°Ra" title="rankine">°Ra</option>' +
                '</optgroup>' +
                '<optgroup label="Volume">' +
                ' <option value="m³" title="cubic meter">m³</option>' +
                ' <option value="dm³" title="cubic decimeter">dm³</option>' +
                ' <option value="cm³" title="cubic centimeter">cm³</option>' +
                ' <option value="l" title="liter">l</option>' +
                ' <option value="dl" title="deciliter">dl</option>' +
                ' <option value="cl" title="centiliter">cl</option>' +
                ' <option value="ml" title="milliliter">ml</option>' +
                ' <option value="oz" title="fluid ounce">oz</option>' +
                ' <option value="in³" title="cubic inch">in³</option>' +
                ' <option value="ft³" title="cubic foot">ft³</option>' +
                ' <option value="yd³" title="cubic yard">yd³</option>' +
                ' <option value="gal" title="gallon uk">gal</option>' +
                ' <option value="bbl" title="petroleum barrel">bbl</option>' +
                ' <option value="pt" title="pint">pt</option>' +
                '</optgroup>' +
                '<optgroup label="Distance">' +
                '<option value="km" title="kilometer">km</option>' +
                '<option value="m" title="meter">m</option>' +
                '<option value="dm" title="decimeter">dm</option>' +
                '<option value="cm" title="centimeter">cm</option>' +
                '<option value="mm" title="millimeter">mm</option>' +
                '<option value="mi" title="mile">mi</option>' +
                '<option value="in" title="inch">in</option>' +
                '<option value="ft" title="foot">ft</option>' +
                '<option value="yd" title="yard">yd</option>' +
                '</optgroup>' +
                '<optgroup label="Mass">' +
                '<option value="t" title="tonne">t</option>' +
                '<option value="kg" title="kilogram">kg</option>' +
                '<option value="hg" title="hectogram">hg</option>' +
                '<option value="g" title="gram">g</option>' +
                '<option value="dg" title="decigram">dg</option>' +
                '<option value="cg" title="centigram">cg</option>' +
                '<option value="mg" title="milligram">mg</option>' +
                '<option value="µg" title="microgram">µg</option>' +
                '<option value="carat" title="carat">carat</option>' +
                '<option value="grain" title="grain">grain</option>' +
                '<option value="oz" title="pounce avoirdupois">oz</option>' +
                '<option value="lb" title="pound avoirdupois">lb</option>' +
                '<option value="cwt" title="long hundredweight">cwt</option>' +
                '<option value="ton" title="ton">ton</option>' +
                '<option value="st" title="stone">st</option>' +
                '</optgroup>' +
                `</select>` +
                '</div>' +

                `<div class="r">` +
                `<button onclick="windowSwitcher('widget_selection')">Cancel</button>` +
                `<button onclick="newDataWidget()"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>` +
                `</div>` +
                '</div>';
            window.appendChild(dataSettings);

            break;

        case 'gauge_settings':
            windowShow();
            console.log("Op: ",options, currentProjectData);
            let gauge = currentProjectData.widgets.find((widget) => widget.id === options);
            let gaugeEdit = document.createElement('div');
            gaugeEdit.id = 'window_content_block';
            console.log(gauge)
            // Scale of the gauge.
            let gaugeEditScale = 1;


            let gaugeEditDcaleContent =
                `<div class="c ac jc">
                <h2 class=" mb1"  id="gauge_title">${gauge.title}</h2>
                <h3 class="m0" style="font-size: 0.8rem;" id="variable_title">${gauge.variable}</h3> 
                <svg class="mt2" height="${200 * gaugeEditScale}" width="${200 * gaugeEditScale}">
                    <circle cx= "${100 * gaugeEditScale}" cy= "${100 * gaugeEditScale}" r="${5 * gaugeEditScale}" fill="#ffffff"/>
                    <path id="gauge_color_1" fill="${gauge.color1}" d="M${29.29 * gaugeEditScale},${170.71 * gaugeEditScale}           A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${0 * gaugeEditScale} ${102.5 * gaugeEditScale}                 L ${20 * gaugeEditScale} ${102.5 * gaugeEditScale}               A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${43.432 * gaugeEditScale} ${156.568 * gaugeEditScale}"/>
                    <path id="gauge_color_2" fill="${gauge.color2}" d="M${0 * gaugeEditScale},${97.5 * gaugeEditScale}                 A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${27.592735 * gaugeEditScale} ${31.12827 * gaugeEditScale}      L ${41.6915 * gaugeEditScale} ${45.227 * gaugeEditScale}         A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${20 * gaugeEditScale} ${97.5 * gaugeEditScale} "/>
                    <path id="gauge_color_3" fill="${gauge.color3}" d="M${31.05709 * gaugeEditScale}, ${27.521555 * gaugeEditScale}    A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${97.5 * gaugeEditScale} ${0 * gaugeEditScale}                  L ${97.5 * gaugeEditScale} ${20 * gaugeEditScale}                A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${45.226855 * gaugeEditScale} ${41.6915 * gaugeEditScale}"/>
                    <path id="gauge_color_4" fill="${gauge.color4}" d="M${102.5 * gaugeEditScale},${0 * gaugeEditScale}                A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${168.94291 * gaugeEditScale} ${27.521555 * gaugeEditScale}     L ${154.773145 * gaugeEditScale} ${41.6915 * gaugeEditScale}     A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${102.5 * gaugeEditScale} ${20 * gaugeEditScale}"/>
                    <path id="gauge_color_5" fill="${gauge.color5}" d="M${172.407265 * gaugeEditScale},${31.12827 * gaugeEditScale}    A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${200 * gaugeEditScale} ${97.5 * gaugeEditScale}                L ${180 * gaugeEditScale} ${97.5 * gaugeEditScale}               A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${158.3085 * gaugeEditScale} ${45.227 * gaugeEditScale}"/>
                    <path id="gauge_color_6" fill="${gauge.color6}" d="M${200 * gaugeEditScale},${102.5 * gaugeEditScale}              A ${100 * gaugeEditScale} ${100 * gaugeEditScale} 0 0 1 ${170.71 * gaugeEditScale} ${170.71 * gaugeEditScale}           L ${156.568 * gaugeEditScale} ${156.568 * gaugeEditScale}        A ${80 * gaugeEditScale} ${80 * gaugeEditScale} 0 0 0 ${180 * gaugeEditScale} ${102.5 * gaugeEditScale}"/>
                    <path style="transform-origin: ${100 * gaugeEditScale}px ${100 * gaugeEditScale}px;" fill="#707070" d="M${95 * gaugeEditScale},${110 * gaugeEditScale} L ${105 * gaugeEditScale} ${110 * gaugeEditScale} L ${102 * gaugeEditScale} ${95 * gaugeEditScale} L ${100 * gaugeEditScale} ${3 * gaugeEditScale} L ${98 * gaugeEditScale} ${95 * gaugeEditScale}"/>
                </svg> 
                <div style="transform: translateY(-20px);" class="r ac jc"> 
                    <h2 id="gauge_min_value" class="m0 mr5" >${gauge.min}</h2> 
                    <h2 id="gauge_max_value" class="m0 ml5" >${gauge.max}</h2> 
                </div> 
                <div style="transform: translateY(-40px);" class="r ac jc"> 
                    <h1 id="value">${currentProjectData.variables[gauge.variable]}</h1> 
                    <h1 class="m0" id="units">${gauge.units}</h1> 
                </div> 
            <div class="r mb3">Variable:&nbsp;`;
            // Build an list of options whereas the values are variables that are numbers.
            let validVariablesForGauge3 = `<option >Select a Variable</option>`;
            if (currentProjectData.hasOwnProperty('variables')) {
                let variables = currentProjectData['variables'];
                for (let variable in variables) {
                    if(variables.hasOwnProperty(variable)){
                        if (typeof variables[variable] === "number" && variable !== 'default') {
                            validVariablesForGauge3 = validVariablesForGauge3 +`<option value="${variable}">${variable}</option>`;
                        }
                    }
                }
            }
            gaugeEdit.innerHTML = gaugeEditDcaleContent + `<select oninput="variableSettings()" id="${gauge.id}_variable_title_input">` + validVariablesForGauge3 +
                `</select>&nbsp;Hide: <input id="gauge_variable_hide"  oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">` +
                '</div>' +
                '<div class="c jc afe p3 pt0">' +
                `<div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${gauge.title}"></div>` +
                `<div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="${gauge.min}"></div>` +
                `<div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="${gauge.max}"></div>` +
                '</div>' +
                '<div class="r jc ac">' +
                `<input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="${gauge.color1}">` +
                `<input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="${gauge.color2}">` +
                `<input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="${gauge.color3}">` +
                `<input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="${gauge.color4}">` +
                `<input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="${gauge.color5}">` +
                `<input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="${gauge.color6}">` +
                '</div>' +
                '<div class="r mb2 mt4">Units:&nbsp;' +
                `<select oninput="unitSettings(this)" id="${gauge.id}_variable_units">` +
                '<optgroup label="Genral">' +
                '<option value="percent">%</option>' +
                '</optgroup>' +
                '<optgroup label="Temperature">' +
                '<option value="°C" title="celsius">°C</option>' +
                '<option value="°F" title="fahrenheit">°F</option>' +
                '<option value="K" title="kelvin">K</option>' +
                '<option value="°Ré" title="reaumur">°Ré</option>' +
                '<option value="°N" title="newton">°N</option>' +
                '<option value="°Ra" title="rankine">°Ra</option>' +
                '</optgroup>' +
                '<optgroup label="Volume">' +
                ' <option value="m³" title="cubic meter">m³</option>' +
                ' <option value="dm³" title="cubic decimeter">dm³</option>' +
                ' <option value="cm³" title="cubic centimeter">cm³</option>' +
                ' <option value="l" title="liter">l</option>' +
                ' <option value="dl" title="deciliter">dl</option>' +
                ' <option value="cl" title="centiliter">cl</option>' +
                ' <option value="ml" title="milliliter">ml</option>' +
                ' <option value="oz" title="fluid ounce">oz</option>' +
                ' <option value="in³" title="cubic inch">in³</option>' +
                ' <option value="ft³" title="cubic foot">ft³</option>' +
                ' <option value="yd³" title="cubic yard">yd³</option>' +
                ' <option value="gal" title="gallon uk">gal</option>' +
                ' <option value="bbl" title="petroleum barrel">bbl</option>' +
                ' <option value="pt" title="pint">pt</option>' +
                '</optgroup>' +
                '<optgroup label="Distance">' +
                '<option value="km" title="kilometer">km</option>' +
                '<option value="m" title="meter">m</option>' +
                '<option value="dm" title="decimeter">dm</option>' +
                '<option value="cm" title="centimeter">cm</option>' +
                '<option value="mm" title="millimeter">mm</option>' +
                '<option value="mi" title="mile">mi</option>' +
                '<option value="in" title="inch">in</option>' +
                '<option value="ft" title="foot">ft</option>' +
                '<option value="yd" title="yard">yd</option>' +
                '</optgroup>' +
                '<optgroup label="Mass">' +
                '<option value="t" title="tonne">t</option>' +
                '<option value="kg" title="kilogram">kg</option>' +
                '<option value="hg" title="hectogram">hg</option>' +
                '<option value="g" title="gram">g</option>' +
                '<option value="dg" title="decigram">dg</option>' +
                '<option value="cg" title="centigram">cg</option>' +
                '<option value="mg" title="milligram">mg</option>' +
                '<option value="µg" title="microgram">µg</option>' +
                '<option value="carat" title="carat">carat</option>' +
                '<option value="grain" title="grain">grain</option>' +
                '<option value="oz" title="pounce avoirdupois">oz</option>' +
                '<option value="lb" title="pound avoirdupois">lb</option>' +
                '<option value="cwt" title="long hundredweight">cwt</option>' +
                '<option value="ton" title="ton">ton</option>' +
                '<option value="st" title="stone">st</option>' +
                '</optgroup>' +
                `</select>` +
                '</div>' +
                `<div class="r">` +
                `<button onclick="windowSwitcher('none')">Cancel</button>` +
                `<button onclick="updateGaugeWidget('${gauge.id}')"> &nbsp;Save&nbsp;</button>` +
                `</div>` +
                '</div>';
            window.appendChild(gaugeEdit);
            document.getElementById(`${gauge.id}_variable_title_input`).value = gauge.variable;
            document.getElementById(`${gauge.id}_variable_units`).value = gauge.units;
            if (gauge.hide === "true") {
                document.getElementById('variable_title').classList.add('dn');
                document.getElementById('gauge_variable_hide').checked = true;
            } else {
                document.getElementById('variable_title').classList.remove('dn');
                document.getElementById('gauge_variable_hide').checked = false;
            }
            break;
        case 'gauge':

            windowShow();

            // Create the root element for the gauge.
            let gaugeSettings = document.createElement('div');
            gaugeSettings.id = 'window_content_block';
            gaugeSettings.classList.add('widget-gauge-settings');

            // Scale of the gauge.
            let scale = 1;

            // The content of the window.
            let content =
            `<div class="c ac jc">
                <h2 class=" mb1"  id="gauge_title">Gauge</h2> 
                <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
                <svg class="mt2" height="${200 * scale}" width="${200 * scale}">
                    <circle cx= "${100 * scale}" cy= "${100 * scale}" r="${5 * scale}" fill="#ffffff"/>
                    <path id="gauge_color_1" fill="#0D790A" d="M${29.29 * scale},${170.71 * scale}           A ${100 * scale} ${100 * scale} 0 0 1 ${0 * scale} ${102.5 * scale}                 L ${20 * scale} ${102.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${43.432 * scale} ${156.568 * scale}"/>
                    <path id="gauge_color_2" fill="#0D790A" d="M${0 * scale},${97.5 * scale}                 A ${100 * scale} ${100 * scale} 0 0 1 ${27.592735 * scale} ${31.12827 * scale}      L ${41.6915 * scale} ${45.227 * scale}         A ${80 * scale} ${80 * scale} 0 0 0 ${20 * scale} ${97.5 * scale} "/>
                    <path id="gauge_color_3" fill="#F3B820" d="M${31.05709 * scale}, ${27.521555 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${97.5 * scale} ${0 * scale}                  L ${97.5 * scale} ${20 * scale}                A ${80 * scale} ${80 * scale} 0 0 0 ${45.226855 * scale} ${41.6915 * scale}"/>
                    <path id="gauge_color_4" fill="#F3B820" d="M${102.5 * scale},${0 * scale}                A ${100 * scale} ${100 * scale} 0 0 1 ${168.94291 * scale} ${27.521555 * scale}     L ${154.773145 * scale} ${41.6915 * scale}     A ${80 * scale} ${80 * scale} 0 0 0 ${102.5 * scale} ${20 * scale}"/>
                    <path id="gauge_color_5" fill="#D20303" d="M${172.407265 * scale},${31.12827 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${200 * scale} ${97.5 * scale}                L ${180 * scale} ${97.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${158.3085 * scale} ${45.227 * scale}"/>
                    <path id="gauge_color_6" fill="#D20303" d="M${200 * scale},${102.5 * scale}              A ${100 * scale} ${100 * scale} 0 0 1 ${170.71 * scale} ${170.71 * scale}           L ${156.568 * scale} ${156.568 * scale}        A ${80 * scale} ${80 * scale} 0 0 0 ${180 * scale} ${102.5 * scale}"/>
                    <path style="transform-origin: ${100 * scale}px ${100 * scale}px;" fill="#707070" d="M${95 * scale},${110 * scale} L ${105 * scale} ${110 * scale} L ${102 * scale} ${95 * scale} L ${100 * scale} ${3 * scale} L ${98 * scale} ${95 * scale}"/>
                </svg> 
                <div style="transform: translateY(-20px);" class="r ac jc"> 
                    <h2 id="gauge_min_value" class="m0 mr5" >0</h2> 
                    <h2 id="gauge_max_value" class="m0 ml5" >100</h2> 
                </div> 
                <div style="transform: translateY(-40px);" class="r ac jc"> 
                    <h1 id="value">50</h1> 
                    <h1 class="m0" id="units"></h1> 
                </div> 
            <div class="r mb3">Variable:&nbsp;`;

            // Build an list of options whereas the values are variables that are numbers.
            let validVariablesForGauge = `<option value="">Select a Variable</option>`;
            if (currentProjectData.hasOwnProperty('variables')) {
                let variables = currentProjectData['variables'];
                for (let variable in variables) {
                    if(variables.hasOwnProperty(variable)){
                        if (typeof variables[variable] === "number" && variable !== 'default') {
                            validVariablesForGauge = validVariablesForGauge +`<option value="${variable}">${variable}</option>`;
                        }
                    }
                }
            }

            gaugeSettings.innerHTML = content + '<select oninput="variableSettings()" id="variable_title_input">' + validVariablesForGauge +
                '</select>&nbsp;Hide: <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">' +
                '</div>' +
                '<div class="c jc afe p3 pt0">' +
                '<div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Gauge"></div>' +
                '<div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="0"></div>' +
                '<div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="100"></div>' +
                '</div>' +
                '<div class="r jc ac">' +
                '<input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="#0D790A">' +
                '<input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="#0D790A">' +
                '<input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="#F3B820">' +
                '<input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="#F3B820">' +
                '<input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="#D20303">' +
                '<input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="#D20303">' +
                '</div>' +
                '<div class="r mb2 mt4">Units:&nbsp;' +
                '<select oninput="unitSettings(this)" id="">' +
                '<optgroup label="Math">' +
                '<option value="percent">%</option>' +
                '</optgroup>' +
                '<optgroup label="Temperature">' +
                '<option value="°C" title="celsius">°C</option>' +
                '<option value="°F" title="fahrenheit">°F</option>' +
                '<option value="K" title="kelvin">K</option>' +
                '<option value="°Ré" title="reaumur">°Ré</option>' +
                '<option value="°N" title="newton">°N</option>' +
                '<option value="°Ra" title="rankine">°Ra</option>' +
                '</optgroup>' +
                '<optgroup label="Volume">' +
                ' <option value="m³" title="cubic meter">m³</option>' +
                ' <option value="dm³" title="cubic decimeter">dm³</option>' +
                ' <option value="cm³" title="cubic centimeter">cm³</option>' +
                ' <option value="l" title="liter">l</option>' +
                ' <option value="dl" title="deciliter">dl</option>' +
                ' <option value="cl" title="centiliter">cl</option>' +
                ' <option value="ml" title="milliliter">ml</option>' +
                ' <option value="oz" title="fluid ounce">oz</option>' +
                ' <option value="in³" title="cubic inch">in³</option>' +
                ' <option value="ft³" title="cubic foot">ft³</option>' +
                ' <option value="yd³" title="cubic yard">yd³</option>' +
                ' <option value="gal" title="gallon uk">gal</option>' +
                ' <option value="bbl" title="petroleum barrel">bbl</option>' +
                ' <option value="pt" title="pint">pt</option>' +
                '</optgroup>' +
                '<optgroup label="Distance">' +
                '<option value="km" title="kilometer">km</option>' +
                '<option value="m" title="meter">m</option>' +
                '<option value="dm" title="decimeter">dm</option>' +
                '<option value="cm" title="centimeter">cm</option>' +
                '<option value="mm" title="millimeter">mm</option>' +
                '<option value="mi" title="mile">mi</option>' +
                '<option value="in" title="inch">in</option>' +
                '<option value="ft" title="foot">ft</option>' +
                '<option value="yd" title="yard">yd</option>' +
                '</optgroup>' +
                '<optgroup label="Mass">' +
                '<option value="t" title="tonne">t</option>' +
                '<option value="kg" title="kilogram">kg</option>' +
                '<option value="hg" title="hectogram">hg</option>' +
                '<option value="g" title="gram">g</option>' +
                '<option value="dg" title="decigram">dg</option>' +
                '<option value="cg" title="centigram">cg</option>' +
                '<option value="mg" title="milligram">mg</option>' +
                '<option value="µg" title="microgram">µg</option>' +
                '<option value="carat" title="carat">carat</option>' +
                '<option value="grain" title="grain">grain</option>' +
                '<option value="oz" title="pounce avoirdupois">oz</option>' +
                '<option value="lb" title="pound avoirdupois">lb</option>' +
                '<option value="cwt" title="long hundredweight">cwt</option>' +
                '<option value="ton" title="ton">ton</option>' +
                '<option value="st" title="stone">st</option>' +
                '</optgroup>' +
                `</select>` +
                '</div>' +
                `<div class="r">` +
                `<button onclick="windowSwitcher('widget_selection')">Cancel</button>` +
                `<button onclick="newGaugeWidget(); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>` +
                `</div>` +
                '</div>';
            window.appendChild(gaugeSettings);
        break;

        case 'widget_selection':
            windowShow();
            console.log('Widget Selection');
            let widgetSelection = document.createElement('div');
            widgetSelection.id = 'window_content_block';
            widgetSelection.classList.add('widget-selection');
            let mod = 0.7;
            console.log(currentKey);
            widgetSelection.innerHTML = `
            <h2 class="mb0">Add Widget</h2>
            <hr>
            <div class="c ac jc">
                <div class="r ac jc" style="flex-wrap: wrap; max-width: 1345px;"> 
                    <div class="c ac jc"> 
                        <button onclick="windowSwitcher('gauge')" class="bbutton"> 
                            <svg height="${200 * mod}" width="${200 * mod}">
                                <circle cx= "${100 * mod}" cy= "${100 * mod}" r="${5 * mod}" fill="#ffffff"/>
                                <path fill="#0D790A" d="M${29.29 * mod},${170.71 * mod}           A ${100 * mod} ${100 * mod} 0 0 1 ${0 * mod} ${102.5 * mod}                 L ${20 * mod} ${102.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${43.432 * mod} ${156.568 * mod}"/>
                                <path fill="#0D790A" d="M${0 * mod},${97.5 * mod}                 A ${100 * mod} ${100 * mod} 0 0 1 ${27.592735 * mod} ${31.12827 * mod}      L ${41.6915 * mod} ${45.227 * mod}         A ${80 * mod} ${80 * mod} 0 0 0 ${20 * mod} ${97.5 * mod} "/>
                                <path fill="#F3B820" d="M${31.05709 * mod}, ${27.521555 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${97.5 * mod} ${0 * mod}                  L ${97.5 * mod} ${20 * mod}                A ${80 * mod} ${80 * mod} 0 0 0 ${45.226855 * mod} ${41.6915 * mod}"/>
                                <path fill="#F3B820" d="M${102.5 * mod},${0 * mod}                A ${100 * mod} ${100 * mod} 0 0 1 ${168.94291 * mod} ${27.521555 * mod}     L ${154.773145 * mod} ${41.6915 * mod}     A ${80 * mod} ${80 * mod} 0 0 0 ${102.5 * mod} ${20 * mod}"/>
                                <path fill="#D20303" d="M${172.407265 * mod},${31.12827 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${200 * mod} ${97.5 * mod}                L ${180 * mod} ${97.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${158.3085 * mod} ${45.227 * mod}"/>
                                <path fill="#D20303" d="M${200 * mod},${102.5 * mod}              A ${100 * mod} ${100 * mod} 0 0 1 ${170.71 * mod} ${170.71 * mod}           L ${156.568 * mod} ${156.568 * mod}        A ${80 * mod} ${80 * mod} 0 0 0 ${180 * mod} ${102.5 * mod}"/>
                                <path style="transform-origin: ${100 * mod}px ${100 * mod}px;" fill="#707070" d="M${95 * mod},${110 * mod} L ${105 * mod} ${110 * mod} L ${102 * mod} ${95 * mod} L ${100 * mod} ${3 * mod} L ${98 * mod} ${95 * mod}"/>
                            </svg> 
                        </button> 
                        <h2>Gauge</h2> 
                    </div> 
                    <div class="c ac jc">
                        <button onclick = "windowSwitcher('data')" class="bbutton"><div class="c"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>
                        <h2>Data Block</h2>
                    </div>
                    <div class="c ac jc">
                        <button class="bbutton"><input class="slider" type="range"></button>
                        <h2>Slider</h2>
                    </div>
                    <div class="c ac jc">
                        <button class="bbutton"><div class="ct-chart-pie-widget"></div></button>
                        <h2>Pie Chart</h2>
                    </div>
                    <div class="c ac jc">   
                        <button class="bbutton"><div class="ct-chart-line-chart-widget"></div></button>
                        <h2>Line Graph</h2>
                    </div>
                    <div class="c ac jc">
                        <button class="bbutton"><div class="ct-chart-scatter-chart-widget"></div></button>
                        <h2>Scatter Plot</h2>
                    </div>
                    <div class="c ac jc">
                        <button class="bbutton"><div class="mr3 ct-chart-histo-chart-widget"></div></button>
                        <h2>Bar Graph</h2>
                    </div>
                    <div class="c ac jc">
                        <button class="bbutton"></button>
                        <h2>Raw Data</h2>
                    </div>
                </div>
                <div class="r">
                    <button onclick="windowSwitcher('none')">Cancel</button>
                </div>
            </div>`;
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
                series: [
                    [1, 5, 2, 5, 4, 3],
                    [2, 3, 4, 8, 1, 2],
                    [5, 4, 3, 2, 1, 0.5]
                ]
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
            var times = function (n) {
                return Array.apply(null, new Array(n));
            };

            var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
                data.labels.push(index + 1);
                data.series.forEach(function (series) {
                    series.push(Math.random() * 100)
                });

                return data;
            }, {
                labels: [],
                series: times(4).map(function () {
                    return new Array()
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

            var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                    axisX: {
                        labelInterpolationFnc: function (value, index) {
                            return index % 4 === 0 ? 'W' + value : null;
                        }
                    }
                }]
            ];

            new Chartist.Line('.ct-chart-scatter-chart-widget', data, options, responsiveOptions);

            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                ]
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

            var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            new Chartist.Bar('.ct-chart-histo-chart-widget', data, options);


            break;
        case 'profile_settings':
            document.getElementById('profile_window').classList.add('dn');
            windowHide();
            windowShow();
            let profileSettings = document.createElement('div');
            profileSettings.id = 'window_content_block';
            profileSettings.classList.add('update-profile');
            let user = firebase.auth().currentUser;
            let profileSettingsForm = document.createElement('form');
            profileSettingsForm.id = 'update_profile';
            h2(profileSettings, {
                innerText: "Profile Settings"
            });

            p(profileSettings, {
                innerText: "Display Name"
            });

            let displayNameInput = input(profileSettings, {
                type: 'test',
                edit: true,
                onSaveMessage: "Display name has been changed.",
                value: user.displayName,
                required: true,
                disabled: true,
                onSave: async () => {
                    console.log("Save");
                    if (user.displayName === displayNameInput.value) {
                        throw new Error('none');
                    }
                    user.updateProfile({
                        displayName: displayNameInput.value
                    }).then(function () {
                        displayNameInput.value = user.displayName;
                        setProfileInformation(user);
                    }).catch(function (error) {
                        throw error;
                    });
                }
            });

            p(profileSettings, {
                innerText: "Email Address"
            });
            let emailInput = input(profileSettings, {
                type: 'email',
                edit: true,
                onSaveMessage: "A verification email was sent to your new email address.",
                value: user.email,
                required: true,
                onSave: async function () {
                    console.log("Save: ", emailInput.value);
                    if (user.email === emailInput.value) {
                        throw new Error('none');
                    }
                    await user.updateEmail(emailInput.value).then(async function () {
                        await user.sendEmailVerification().then(function () {
                        }).catch(function (error) {
                            throw error;
                        });
                    }).catch(function (error) {
                        throw error;
                    }).then(() => {
                        setProfileInformation(user);
                    });

                },
                disabled: true
            });

            p(profileSettings, {
                innerText: "Password"
            });
            let passwordInput = input(profileSettings, {
                type: 'password',
                edit: true,
                onSaveMessage: "Your password has been changed.",
                value: "******",
                required: true,
                onSave: async function () {

                    if (passwordInput.value !== "******") {
                        await user.updatePassword(passwordInput.value).then(function () {
                            // Update successful.
                        }).catch(function (error) {
                            throw error;
                        });
                    } else {
                        throw new Error('none');
                    }

                },
                disabled: true
            });

            let closeContent = document.createElement('div');
            closeContent.classList = "c ac jc w100";
            closeContent.innerHTML = '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
                `    <button onclick="windowSwitcher('none')">Close</button></div>`;
            profileSettings.appendChild(closeContent);
            window.appendChild(profileSettings);
            break;

        // Creating a new project window.
        case 'new_project':
            windowShow();
            let contentBlock = document.createElement('div');
            contentBlock.id = 'window_content_block';
            contentBlock.innerHTML =
                '<form id="create_project"> ' +
                '<h2>Create a New Project</h2>' +
                '<p>Project Name:</p>' +
                '<input required type="text" id="project" placeholder="My Project Name...">' +
                '<p>Project Description:</p>' +
                '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' +
                '<p>Make this project Private or Public:</p>' +
                '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' +
                '<label for="private">Private</label><br>' +
                '<input class="input-radio" type="radio" name="access" id="public" value="Public">' +
                '<label for="public">Public</label><br>' +
                // '<div class="r ac"> <p>Project Color: </p>'+
                '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> ' +
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(contentBlock);
            document.getElementById('create_project').addEventListener('submit', (e) => {
                createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
            });
            break;

        // Create a new variable window.
        case 'new_variable':
            windowShow();
            let newVariableContentBlock = document.createElement('div');
            newVariableContentBlock.id = 'window_content_block';
            newVariableContentBlock.innerHTML =
                '<form id="new_variable"> ' +
                '<h2>Create a New Variable</h2>' +
                '<p>Variable Name:</p>' +
                '<input class="" required type="text" id="project" placeholder="My Variable Name...">' +
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(newVariableContentBlock);
            document.getElementById('new_variable').addEventListener('submit', (e) => {
                createVariable(document.getElementById('project').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
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
    let newValue = document.getElementById('variable_title_input').value;
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
    console.log(document.getElementById(`gauge_color_${n}`));
    document.getElementById(`gauge_color_${n}`).style.fill = i.value;
}

function newGaugeWidget() {
    addWidget(currentUid, currentProject, {
        type: 'gauge',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById('variable_title_input').value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        color1: `${document.getElementById('color1').value}`,
        color2: `${document.getElementById('color2').value}`,
        color3: `${document.getElementById('color3').value}`,
        color4: `${document.getElementById('color4').value}`,
        color5: `${document.getElementById('color5').value}`,
        color6: `${document.getElementById('color6').value}`,
        min: parseInt(document.getElementById('gauge_min_value').innerText),
        max: parseInt(document.getElementById('gauge_max_value').innerText)
    });
}
function updateGaugeWidget(id){
    updateWidget(currentUid, currentProject, {
        type: 'gauge',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById(`${id}_variable_title_input`).value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        color1: `${document.getElementById('color1').value}`,
        color2: `${document.getElementById('color2').value}`,
        color3: `${document.getElementById('color3').value}`,
        color4: `${document.getElementById('color4').value}`,
        color5: `${document.getElementById('color5').value}`,
        color6: `${document.getElementById('color6').value}`,
        min: parseInt(document.getElementById('gauge_min_value').innerText),
        max: parseInt(document.getElementById('gauge_max_value').innerText),
        id: id
    })
}

function newDataWidget() {
    addWidget(currentUid, currentProject, {
        type: 'data',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById('variable_title_input').value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
    });
}

