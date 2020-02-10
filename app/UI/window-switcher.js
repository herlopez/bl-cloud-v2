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

    switch (targetWindow) {
        case 'none':
            windowHide();
            break;
        case 'widget_selection':
            windowContent.innerHTML = WidgetSelectionWindow();
            break;
        case 'double_check':
            windowContent.innerHTML = DoubleCheckWindow(options);
            break;
        case 'deleteProject':
            windowContent.innerHTML = windowDeleteProject();
            break;
        case 'newKey':
            windowContent.innerHTML = windowNewKey();
            break;
        case 'new_variable':
            windowContent.innerHTML = WindowNewVariable();
            windowContent.addEventListener('submit', (e) => {
                createVariable(document.getElementById('project').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();
            });
            break;
        case 'new_project':
            windowContent.innerHTML = WindowNewProject();
            windowContent.addEventListener('submit', (e) => {
                createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
                e.preventDefault();
            });
            break;
        case 'profile_settings':
            window.appendChild(windowProfileSettings(windowContent));
            return;
        case 'gauge_settings':
            windowContent.innerHTML = EditGaugeWidgetWindow(options);
            break;
        case 'data_settings':
            windowContent.innerHTML = EditDataWidgetWindow(options);
            break;
        case 'edit_line_graph':
            windowContent.innerHTML = EditLineGraphWidgetWindow(options);
            break;
        case 'scatter_plot_settings':
            windowContent.innerHTML = EditScatterPlotWidgetWindow(options);
            break;
        case 'data':
            windowContent.innerHTML = CreateDataWidgetWindow();
            break;
        case 'gauge':
            windowContent.innerHTML = CreateGaugeWidgetWindow();
            break;
        case 'line_graph':
            windowContent.innerHTML = CreateLineGraphWidgetWindow();
            break;
        case 'plot_graph':
            windowContent.innerHTML = CreateScatterPlotWidgetWindow();
            break;
        default:
            windowHide();
            break;
    }

    window.appendChild(windowContent);

    drawPLotWindow();
    drawLineGraphWindow();



    let times = function (n) {
        return Array.apply(null, new Array(n));
    };

    let data = times(5).map(Math.random).reduce(function (data, rnd, index) {
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

    new Chartist.Line('.ct-chart-scatter-chart-widget', data, {
        showLine: false,

        axisY: {
            showLabel: false,
            showGrid: false
        },
        axisX: {
            showLabel: false,
            showGrid: false
        }
    }, [
        ['screen and (min-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? 'W' + value : null;
                }
            }
        }]
    ]);
    new Chartist.Bar('.ct-chart-histo-chart-widget', {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    }, {
        seriesBarDistance: 3,
        axisY: {
            showLabel: false,
            showGrid: false
        },
        axisX: {
            showLabel: false,
            showGrid: false
        }
    });
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
    let newValue = document.getElementById('variable_title_input').value;
    if(currentWindow === "gauge"){
        let sel = document.getElementById('variable_title_input');
        let selected = sel.options[sel.selectedIndex];
        let varType = selected.getAttribute('variable-type');
        if(varType === 'chart'){
            let targetChart = currentProjectData['charts'].findIndex(w => w.name === newValue);
            if(currentProjectData['charts'][targetChart].hasOwnProperty('data')){
                document.getElementById('value').innerText = currentProjectData['charts'][targetChart]['data'][currentProjectData['charts'][targetChart]['data'].length-1].value;
            }
            else{
                document.getElementById('value').innerText = 'No Data Yet';
            }
        }else{
        document.getElementById('value').innerText = currentProjectData['variables'][newValue];
    }

    }else{
        document.getElementById('value').innerText = currentProjectData['variables'][newValue];
    }
    document.getElementById('variable_title').innerText = newValue;
}
function variableSettingsSettings(id) {
    let newValue = document.getElementById(id).value;
    let sel = document.getElementById(id);
    let selected = sel.options[sel.selectedIndex];
    let varType = selected.getAttribute('variable-type');
    if(varType === 'chart'){
        let targetChart = currentProjectData['charts'].findIndex(w => w.name === newValue);
        if(currentProjectData['charts'][targetChart].hasOwnProperty('data')){
            document.getElementById('value').innerText = currentProjectData['charts'][targetChart]['data'][currentProjectData['charts'][targetChart]['data'].length-1].value;
        }
        else{
            document.getElementById('value').innerText = 'No Data Yet';
        }
    }
else{
        document.getElementById('value').innerText = currentProjectData['variables'][newValue];
    }
    document.getElementById('variable_title').innerText = newValue;
}

function unitSettings(i, id = 'units') {
    document.getElementById(id).innerText = i.value;
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






//
// Plot Widget
//
function newPlotWidget(id, type, seriesCount){
    let series = [];
    for(let i = 0; i < seriesCount; i++){
        console.log(i)
        series[i] = {
            name: document.getElementById(`series_${i}`).value,
            color: document.getElementById(`series_${i}_color`).value,
        }
    }
    let xAxisTitle = 'nothing';
    let xAxisUnits = '';
    if(type === 'scatter'){
        xAxisTitle = document.getElementById('x_axis_title').value;
        xAxisUnits = document.getElementById('x_axis_units').value;
    }
    addWidget(currentUid, currentProject, {
        type: type,
        hide:'false',
        title: `${document.getElementById('gauge_title').innerText}`,
        xAxisTitle: xAxisTitle,
        xAxisUnits: xAxisUnits,
        yAxisTitle: `${document.getElementById('y_axis_title').value}`,
        yAxisUnits: `${document.getElementById('y_axis_units').value}`,
        series: series
    });
}
function updatePlotWidget(id, type){
    let xAxisTitle, xAxisUnits = 'nothing';
    if(type === 'scatter'){
        xAxisTitle = document.getElementById('x_axis_title').value;
        xAxisUnits = document.getElementById('x_axis_units').value;
    }
    updateWidget(currentUid, currentProject, {
        type: type,
        hide: 'false',
        title: `${document.getElementById('gauge_title').innerText}`,
        xAxisTitle: xAxisTitle,
        xAxisUnits: xAxisUnits,
        yAxisTitle: `${document.getElementById('y_axis_title').value}`,
        yAxisUnits: `${document.getElementById('y_axis_units').value}`,
        id: id,
    });
}
function removePlotWidget(id){
    removeWidget(currentUid, currentProject, id);
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
function removeGaugeWidget(id){
    removeWidget(currentUid, currentProject, id);
}



//
// Data Widget
//
function newDataWidget() {
    addWidget(currentUid, currentProject, {
        type: 'data',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById('variable_title_input').value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
    });
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
function removeDataWidget(id){
    removeWidget(currentUid, currentProject, id);
}




