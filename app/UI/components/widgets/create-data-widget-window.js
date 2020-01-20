/**
 * @return {string}
 */
function CreateDataWidgetWindow() {
    let validVariablesForData = '';
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if (variables.hasOwnProperty(variable)) {
                if (variable !== 'default') {
                    validVariablesForData += `<option value="${variable}">${variable}</option>`;
                }
            }
        }
    }
    return `
        <div class="widget-data-settings c ac jc">
            <h2 class=" mb1"  id="gauge_title">Data Point</h2>
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3>
            <div style="" class="r ac jc">
                <h1 id="value">50</h1>
                <h1 class="m0" id="units"></h1>
            </div>
            <div>
                ${new Date().toLocaleString()}
            </div>
            <div class="r mt4 mb3">Variable:&nbsp;
                <select oninput="variableSettings()" id="variable_title_input">
                    <optgroup value="Variables">
                        <option value="">Select a Variable</option>
                        ${validVariablesForData}
                    </optgroup>
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 py0">
                <div class="mb2">
                    Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Data Point">
                </div>
            </div>
            <div class="r mb2 mt0">
               Units:&nbsp;
               ${unitsList('', " unitSettings(this)")}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newDataWidget()"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>      
    `;
}


