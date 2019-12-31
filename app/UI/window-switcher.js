// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {

    // Save the current window in us for global usage.
    currentWindow = targetWindow;

    // Get the document elements. The window ele which is initially hidden.
    let window = document.getElementById('window');
    let app = document.getElementById('app');

    // Function to hide the popup window.
    function windowHide() {
        app.classList.remove('hold');
        window.classList.remove('cr');
        window.classList.remove('ac');
        window.classList.remove('jc');
        window.classList.add('dn');
        window.innerHTML = '';
    }

    // Function to show the pop up window.
    function windowShow() {
        app.classList.add('hold');
        window.classList.add('cr');
        window.classList.add('ac');
        window.classList.add('jc');
        window.classList.remove('dn');
        window.innerHTML = '';
    }

    // If the target window is none, hide the pop up window.
    if (targetWindow === 'none' || targetWindow === 'close') {
        windowHide();
        return;
    }

    // Show the window.
    windowShow();

    let windowContent = document.createElement('div');
    windowContent.id = 'window_content_block';

    let content = "";

    switch (targetWindow) {

        case 'none':
            windowHide();
            break;
        case 'widget_selection':
            content = windowWidgetSelection(windowContent);
            break;
        case 'double_check':
            content = windowDoubleCheck(windowContent, options);
            break;
        case 'deleteProject':
            content = windowDeleteProject(windowContent);
            break;
        case 'newKey':
            content = windowNewKey(windowContent);
            break;
        case 'data':
            content = windowWidgetData(windowContent);
            break;
        case 'gauge':
            content = windowWidgetGauge(windowContent);
            break;
        case 'new_variable':
            content = windowNewVariable(windowContent);
            break;
        case 'new_project':
            content = windowNewProject(windowContent);
            break;
        case 'profile_settings':
            content = windowProfileSettings(windowContent);
            break;
        case 'gauge_settings':
            content = windowGaugeSettings(windowContent, options);
            break;
        case 'data_settings':
            content = windowDataSettings(windowContent, options);
            break;
        default:
            windowHide();
            break;
    }
    window.appendChild(content);
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
function updateDataWidget(id){
    updateWidget(currentUid, currentProject, {
        type: 'data',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById(`${id}_variable_title_input`).value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        id: id
    })
}

function removeGaugeWidget(id){
    removeWidget(currentUid, currentProject, id);
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

