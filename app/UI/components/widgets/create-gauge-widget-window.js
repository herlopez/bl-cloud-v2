/**
 * @return {string}
 */
function CreateGaugeWidgetWindow(){

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
    return `
        <div class="widget-gauge-settings c ac jc">
            <h2 class="mb1"  id="gauge_title">Gauge</h2> 
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
            <svg class="mt2" height="${200 * 1}" width="${200 * 1}">
                <circle cx= "${100 * 1}" cy= "${100 * 1}" r="${5 * 1}" fill="#ffffff"/>
                <path id="gauge_color_1" fill="#0D790A" d="M${29.29 * 1},${170.71 * 1}           A ${100 * 1} ${100 * 1} 0 0 1 ${0 * 1} ${102.5 * 1}                 L ${20 * 1} ${102.5 * 1}               A ${80 * 1} ${80 * 1} 0 0 0 ${43.432 * 1} ${156.568 * 1}"/>
                <path id="gauge_color_2" fill="#0D790A" d="M${0 * 1},${97.5 * 1}                 A ${100 * 1} ${100 * 1} 0 0 1 ${27.592735 * 1} ${31.12827 * 1}      L ${41.6915 * 1} ${45.227 * 1}         A ${80 * 1} ${80 * 1} 0 0 0 ${20 * 1} ${97.5 * 1} "/>
                <path id="gauge_color_3" fill="#F3B820" d="M${31.05709 * 1}, ${27.521555 * 1}    A ${100 * 1} ${100 * 1} 0 0 1 ${97.5 * 1} ${0 * 1}                  L ${97.5 * 1} ${20 * 1}                A ${80 * 1} ${80 * 1} 0 0 0 ${45.226855 * 1} ${41.6915 * 1}"/>
                <path id="gauge_color_4" fill="#F3B820" d="M${102.5 * 1},${0 * 1}                A ${100 * 1} ${100 * 1} 0 0 1 ${168.94291 * 1} ${27.521555 * 1}     L ${154.773145 * 1} ${41.6915 * 1}     A ${80 * 1} ${80 * 1} 0 0 0 ${102.5 * 1} ${20 * 1}"/>
                <path id="gauge_color_5" fill="#D20303" d="M${172.407265 * 1},${31.12827 * 1}    A ${100 * 1} ${100 * 1} 0 0 1 ${200 * 1} ${97.5 * 1}                L ${180 * 1} ${97.5 * 1}               A ${80 * 1} ${80 * 1} 0 0 0 ${158.3085 * 1} ${45.227 * 1}"/>
                <path id="gauge_color_6" fill="#D20303" d="M${200 * 1},${102.5 * 1}              A ${100 * 1} ${100 * 1} 0 0 1 ${170.71 * 1} ${170.71 * 1}           L ${156.568 * 1} ${156.568 * 1}        A ${80 * 1} ${80 * 1} 0 0 0 ${180 * 1} ${102.5 * 1}"/>
                <path style="transform-origin: ${100 * 1}px ${100 * 1}px;" fill="#707070" d="M${95 * 1},${110 * 1} L ${105 * 1} ${110 * 1} L ${102 * 1} ${95 * 1} L ${100 * 1} ${3 * 1} L ${98 * 1} ${95 * 1}"/>
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
}