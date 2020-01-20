/**
 * Data Widget Edit Window.
 * @function EditDataWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditDataWidgetWindow(widgetId){

    let widget = currentProjectData.widgets.find((widget) => widget.id === widgetId);

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if(variables.hasOwnProperty(variable)){
                if (variable !== 'default') {
                    if (variable === widget.variable) {
                        validVariablesForGauge += `<option selected value="${variable}">${variable}</option>`;
                    } else {
                        validVariablesForGauge += `<option value="${variable}">${variable}</option>`;
                    }
                }
            }
        }
    }

    let hideValue = '';
    let hideTopTitle = '';
    if(widget.hide === 'true'){
        hideValue= "checked";
        hideTopTitle = "dn";
    }

    return `
        <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removeDataWidget('${widget.id}')"></i>
        <div class="c ac jc">
            <h2 class=" mb1"  id="gauge_title">${widget.title}</h2>
            <h3 class="m0 ${hideTopTitle}" style="font-size: 0.8rem;" id="variable_title">${widget.variable}</h3>
            <div style="" class="r ac jc">
                <h1 id="value">${currentProjectData.variables[widget.variable]}</h1>
                <h1 class="m0" id="units">${widget.units}</h1>
            </div> 
            <div>${new Date().toLocaleString()}</div>
            <div class="r mt4 mb3">Variable:&nbsp;            
                <select value="${widget.variable}" oninput="variableSettings()" id="${widget.id}_variable_title_input">
                    <option disabled value="">Select a Variable</option>
                    ${validVariablesForGauge}
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" ${hideValue} oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${widget.title}"></div>
            </div>        
            <div class="r mb2">
                Units:&nbsp;
                ${unitsList('settings_variable_units', " unitSettings(this)", widget.units)}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updateDataWidget('${widget.id}')"> &nbsp;Save&nbsp;</button>
            </div>
        </div>
    `;
}