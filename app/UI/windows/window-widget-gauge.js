function windowWidgetGauge(content){

    content.classList.add('widget-gauge-settings');

    // Scale of the gauge.
    let scale = 1;

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if(variables.hasOwnProperty(variable)){
                if (typeof variables[variable] === "number" && variable !== 'default') {
                    validVariablesForGauge += `<option value="${variable}">${variable}</option>`;
                }
            }
        }
    }
    // The content of the window.
    content.innerHTML =
        `<div class="c ac jc">
            <h2 class="mb1"  id="gauge_title">Gauge</h2> 
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
            <div class="r mb3">Variable:&nbsp;            
                <select oninput="variableSettings()" id="variable_title_input">
                    <optgroup value="Variables">
                    <option value="">Select a Variable</option>
                        ${validVariablesForGauge}
                    </optgroup>
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Gauge"></div>
                <div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="0"></div>
                <div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="100"></div>
            </div>
            <div class="r jc ac">
                <input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="#0D790A">
                <input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="#0D790A">
                <input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="#F3B820">
                <input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="#F3B820">
                <input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="#D20303">
                <input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="#D20303">
            </div>
            <div class="r mb2 mt4">
                Units:&nbsp;
                ${unitsList('', " unitSettings(this)")}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newGaugeWidget(); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>
        `;

    return content;
}