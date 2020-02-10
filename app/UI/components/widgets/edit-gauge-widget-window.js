/**
 * Gauge Widget Edit Window.
 * @function EditGaugeWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditGaugeWidgetWindow(widgetId) {

    let widget = currentProjectData.widgets.find((widget) => widget.id === widgetId);

    // Scale of the widget.
    let scale = 1;

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if (variables.hasOwnProperty(variable)) {
                if (typeof variables[variable] === "number" && variable !== 'default') {
                    if (variable === widget.variable) {
                        validVariablesForGauge += `<option variable-type="variable" selected value="${variable}">Variable: ${variable}</option>`;
                    } else {
                        validVariablesForGauge += `<option variable-type="variable" value="${variable}">Variable: ${variable}</option>`;
                    }
                }
            }
        }
    }
    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if (charts.hasOwnProperty(chart)) {
                if (charts[chart].type === "LINE") {
                    if (charts[chart].name === widget.variable) {
                        validVariablesForGauge += `<option selected variable-type="chart" value="${charts[chart].name}">Chart: ${charts[chart].name}</option>`;
                    } else {
                        validVariablesForGauge += `<option variable-type="chart" value="${charts[chart].name}">Chart: ${charts[chart].name}</option>`;
                    }
                }
            }
        }
    }

    let hideValue = '';
    let hideTopTitle = '';
    if (widget.hide === 'true') {
        hideValue = "checked";
        hideTopTitle = "dn";
    }
    let widgetValue = "NA";
    if (widget.variable_type === "chart") {
         let targetChart = currentProjectData['charts'].findIndex(w => w.name === widget.variable);
        if (targetChart !== null) {
            console.log(`d${targetChart}`,widget.variable, currentProjectData['charts'], currentProjectData['charts'][targetChart])
            if (currentProjectData['charts'][targetChart].hasOwnProperty('data')) {
                widgetValue = currentProjectData['charts'][targetChart]['data'][currentProjectData['charts'][targetChart]['data'].length - 1].value;
            } else {
                widgetValue = 'No Data Yet';
            }
        }
    } else {
               widgetValue = currentProjectData.variables[widget.variable];

    }
    return `
        <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removeGaugeWidget('${widget.id}')"></i> 
        <div class="c ac jc">
            <h2 class=" mb1"  id="gauge_title">${widget.title}</h2>
            <h3 class="m0 ${hideTopTitle}" style="font-size: 0.8rem;" id="variable_title">${widget.variable}</h3> 
            <svg class="mt2" height="${200 * scale}" width="${200 * scale}">
                <circle cx= "${100 * scale}" cy= "${100 * scale}" r="${5 * scale}" fill="#ffffff"/>
                <path id="gauge_color_1" fill="${widget.color1}" d="M${29.29 * scale},${170.71 * scale}           A ${100 * scale} ${100 * scale} 0 0 1 ${0 * scale} ${102.5 * scale}                 L ${20 * scale} ${102.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${43.432 * scale} ${156.568 * scale}"/>
                <path id="gauge_color_2" fill="${widget.color2}" d="M${0 * scale},${97.5 * scale}                 A ${100 * scale} ${100 * scale} 0 0 1 ${27.592735 * scale} ${31.12827 * scale}      L ${41.6915 * scale} ${45.227 * scale}         A ${80 * scale} ${80 * scale} 0 0 0 ${20 * scale} ${97.5 * scale} "/>
                <path id="gauge_color_3" fill="${widget.color3}" d="M${31.05709 * scale}, ${27.521555 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${97.5 * scale} ${0 * scale}                  L ${97.5 * scale} ${20 * scale}                A ${80 * scale} ${80 * scale} 0 0 0 ${45.226855 * scale} ${41.6915 * scale}"/>
                <path id="gauge_color_4" fill="${widget.color4}" d="M${102.5 * scale},${0 * scale}                A ${100 * scale} ${100 * scale} 0 0 1 ${168.94291 * scale} ${27.521555 * scale}     L ${154.773145 * scale} ${41.6915 * scale}     A ${80 * scale} ${80 * scale} 0 0 0 ${102.5 * scale} ${20 * scale}"/>
                <path id="gauge_color_5" fill="${widget.color5}" d="M${172.407265 * scale},${31.12827 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${200 * scale} ${97.5 * scale}                L ${180 * scale} ${97.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${158.3085 * scale} ${45.227 * scale}"/>
                <path id="gauge_color_6" fill="${widget.color6}" d="M${200 * scale},${102.5 * scale}              A ${100 * scale} ${100 * scale} 0 0 1 ${170.71 * scale} ${170.71 * scale}           L ${156.568 * scale} ${156.568 * scale}        A ${80 * scale} ${80 * scale} 0 0 0 ${180 * scale} ${102.5 * scale}"/>
                <path style="transform-origin: ${100 * scale}px ${100 * scale}px;" fill="#707070" d="M${95 * scale},${110 * scale} L ${105 * scale} ${110 * scale} L ${102 * scale} ${95 * scale} L ${100 * scale} ${3 * scale} L ${98 * scale} ${95 * scale}"/>
            </svg> 
            <div style="transform: translateY(-20px);" class="r ac jc"> 
                <h2 id="gauge_min_value" class="m0 mr5" >${widget.min}</h2> 
                <h2 id="gauge_max_value" class="m0 ml5" >${widget.max}</h2> 
            </div> 
            <div style="transform: translateY(-40px);" class="r ac jc"> 
                <h1 id="value">${widgetValue}</h1> 
                <h1 class="m0" id="units">${widget.units}</h1> 
            </div> 
             <div class="r mb3">Variable:&nbsp;            
                <select value="${widget.variable}" oninput="variableSettingsSettings(this.id)" id="${widget.id}_variable_title_input">
                    <option disabled value="">Select a Variable / Chart</option>
                    ${validVariablesForGauge}
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" ${hideValue} oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${widget.title}"></div>
                <div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="${widget.min}"></div>
                <div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="${widget.max}"></div>
            </div>
            <div class="r jc ac">
                <input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="${widget.color1}">
                <input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="${widget.color2}">
                <input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="${widget.color3}">
                <input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="${widget.color4}">
                <input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="${widget.color5}">
                <input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="${widget.color6}">
            </div>
             <div class="r mb2 mt4">
                Units:&nbsp;
                ${unitsList('settings_variable_units', " unitSettings(this)", widget.units)}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updateGaugeWidget('${widget.id}')"> &nbsp;Save&nbsp;</button>
            </div>
        </div>
    `;
}
function updateGaugeWidget(id){
    let sel = document.getElementById(`${id}_variable_title_input`);
    var selected = sel.options[sel.selectedIndex];
    updateWidget(currentUid, currentProject, {
        type: 'gauge',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable_type: `${selected.getAttribute('variable-type')}`,
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
