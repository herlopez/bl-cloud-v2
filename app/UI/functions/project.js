function paintProject(data) {
    switch (projectTab) {
        case 'dashboard':
            paintDashboardTab(data);
            break;
        case 'variables':
            paintVariableTab(data);
            break;
        case 'charts':
            paintChartsTab(data);
            break;
        case 'settings':
            paintSettingsTab(data);
            break;
        default:
            paintDashboardTab(data);
            break;
    }
}


// Dashboard Tab.
function paintDashboardTab(data) {
    let dashboard = document.getElementById('project_section_dashboard');

    dashboard.classList = 'w100 r ac jc';
    dashboard.style = {
        height: "100%",
        overflow: "visible",
        flexWrap: 'wrap'
    };
    dashboard.style.flexWrap = "wrap";
    dashboard.innerHTML = '';

    if (data.hasOwnProperty('widgets')) {

        let widgets = data['widgets'];

        for (let widget in widgets) {

            if (widgets.hasOwnProperty(widget)) {
                console.log(widgets[widget]);

                // Widget box.
                let div = document.createElement('button');
                div.style.height = "275px";
                div.style.minWidth = "300px";
                div.style.maxWidth = "300px";
                div.id = widgets[widget].id;
                div.style.background = "rgba(3, 4, 8, 0.46)";
                div.borderRadius = "10px";

                let mod = 0.7;
                let display = "inherit";
                let mb = 'margin-bottom: 5px; margin-top: 8px;';

                if (widgets[widget].type === 'line') {
                    div.style.height = "325px";
                    div.style.minWidth = "632px";
                    div.style.maxWidth = "632px";
                    div.style.paddingRight = "2px";
                    let leftPar = "";
                    let rightPar = "";

                    if (widgets[widget].xAxisUnits !== "") {
                        leftPar = "(";
                        rightPar = ")";
                    }
                    div.innerHTML = `

                        <i onclick="windowSwitcher('edit_line_graph','${div.id}')" style="position: absolute; transform: translate(262px, -10px)" class="hc p3 hac fa fa-ellipsis-v"></i>
                        <h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>
                        <p style="transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;" class="mt0">${widgets[widget].yAxisTitle} <i>${leftPar}${widgets[widget].yAxisUnits}${rightPar}</i></p>
                        <div class="ct-${div.id}-plot"></div>
<!--                        <p class="mt0 mb1">${widgets[widget].xAxisTitle} <i>${leftPar}${widgets[widget].xAxisUnits}${rightPar}</i></p>-->
                        <style id="${div.id}_plot_styles"></style>
                        <i style="position: absolute; transform: translate(250px,-230px);" onclick="resetFnc && resetFnc();" class="hp hc fas fa-search-minus" id="reset-zoom-btn"></i>
                        <div class ="r jc ac m2" id="${div.id}_plot_legend"></div>
                    `;
                    dashboard.appendChild(div);
                    drawLineGraph(`.ct-${div.id}-plot`, div.id)

                }
                if (widgets[widget].type === 'scatter') {
                    div.style.height = "325px";
                    div.style.minWidth = "632px";
                    div.style.maxWidth = "632px";
                    div.style.paddingRight = "2px";
                    let leftPar = "";
                    let rightPar = "";
                    if (widgets[widget].xAxisUnits !== "") {
                        leftPar = "(";
                        rightPar = ")";
                    }
                    div.innerHTML = `
                        <i  onclick="windowSwitcher('scatter_plot_settings','${div.id}')" style="position: absolute; transform: translate(262px, -10px)" class="hc p3 hac fa fa-ellipsis-v"></i>
                        <h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>
                        <p style="transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;" class="mt0">${widgets[widget].yAxisTitle} <i>${leftPar}${widgets[widget].yAxisUnits}${rightPar}</i></p>
                        <div class="ct-${div.id}-plot"></div>
                        <p class="mt0 mb1">${widgets[widget].xAxisTitle} <i>${leftPar}${widgets[widget].xAxisUnits}${rightPar}</i></p>
                        <style id="${div.id}_plot_styles">
                        
                        </style>
                        <i style="position: absolute; transform: translate(250px,-230px);" onclick="resetFnc && resetFnc();" class="hp hc fas fa-search-minus" id="reset-zoom-btn"></i>
                        <div class ="r jc ac m2" id="${div.id}_plot_legend"></div>
                    `;
                    dashboard.appendChild(div);

                    drawScatterPLot(`.ct-${div.id}-plot`, div.id)
                }
                if (widgets[widget].type === 'gauge') {
                    if (widgets[widget]['hide'] === 'true') {
                        display = "none";
                        mb = '';
                    }

                    let range = Math.abs(widgets[widget].min - widgets[widget].max);
                    let tic = 270 / range;
                    let angle = Math.floor(270 / (range - data['variables'][widgets[widget].variable]));
                    angle = ((data['variables'][widgets[widget].variable] - widgets[widget].min) * tic) - 135;

                    if (angle > 135) angle = 135;
                    if (angle < -135) angle = -135;

                    div.innerHTML =  `<i  onclick="windowSwitcher('gauge_settings','${div.id}')" style="position: absolute; transform: translate(109px, -5px)" class="hc p3 hac fa fa-ellipsis-v"></i>` +
                        `<h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>` +
                        `<h3  id="${div.id}_variable_title" style="font-size:14px; display:${display};" class="m0 mb3 p0" >${widgets[widget].variable}</h3>` +
                        `<svg height="${200 * mod}" width="${200 * mod}">` +
                        `<circle cx= "${100 * mod}" cy= "${100 * mod}" r="${5 * mod}" fill="#ffffff"/>` +
                        `<path fill="${widgets[widget].color1}" d="M${29.29 * mod},${170.71 * mod}           A ${100 * mod} ${100 * mod} 0 0 1 ${0 * mod} ${102.5 * mod}                 L ${20 * mod} ${102.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${43.432 * mod} ${156.568 * mod}"/>` +
                        `<path fill="${widgets[widget].color2}" d="M${0 * mod},${97.5 * mod}                 A ${100 * mod} ${100 * mod} 0 0 1 ${27.592735 * mod} ${31.12827 * mod}      L ${41.6915 * mod} ${45.227 * mod}         A ${80 * mod} ${80 * mod} 0 0 0 ${20 * mod} ${97.5 * mod} "/>` +
                        `<path fill="${widgets[widget].color3}" d="M${31.05709 * mod}, ${27.521555 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${97.5 * mod} ${0 * mod}                  L ${97.5 * mod} ${20 * mod}                A ${80 * mod} ${80 * mod} 0 0 0 ${45.226855 * mod} ${41.6915 * mod}"/>` +
                        `<path fill="${widgets[widget].color4}" d="M${102.5 * mod},${0 * mod}                A ${100 * mod} ${100 * mod} 0 0 1 ${168.94291 * mod} ${27.521555 * mod}     L ${154.773145 * mod} ${41.6915 * mod}     A ${80 * mod} ${80 * mod} 0 0 0 ${102.5 * mod} ${20 * mod}"/>` +
                        `<path fill="${widgets[widget].color5}" d="M${172.407265 * mod},${31.12827 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${200 * mod} ${97.5 * mod}                L ${180 * mod} ${97.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${158.3085 * mod} ${45.227 * mod}"/>` +
                        `<path fill="${widgets[widget].color6}" d="M${200 * mod},${102.5 * mod}              A ${100 * mod} ${100 * mod} 0 0 1 ${170.71 * mod} ${170.71 * mod}           L ${156.568 * mod} ${156.568 * mod}        A ${80 * mod} ${80 * mod} 0 0 0 ${180 * mod} ${102.5 * mod}"/>` +
                        `<path style="transform: rotate(${angle}deg); transform-origin: ${100 * mod}px ${100 * mod}px;" fill="#707070" d="M${95 * mod},${110 * mod} L ${105 * mod} ${110 * mod} L ${102 * mod} ${95 * mod} L ${100 * mod} ${3 * mod} L ${98 * mod} ${95 * mod}"/>` +
                        '</svg>' +
                        '<div style="transform: translateY(-25px);" class="r ac jc">' +
                        `<h2 id="${div.id}_min_title" style="width: 140px; font-size: 16px;" class="m0 mr5 r ac jc" >${widgets[widget].min}</h2>` +
                        `<h2 id="${div.id}_max_title" style="width: 140px; font-size: 16px;" class="m0 ml5 r ac jc" >${widgets[widget].max}</h2>` +
                        '</div>' +
                        '<div style="transform: translateY(-40px);" class="r ac jc">' +
                        `<h1 id="${div.id}_units_title">${data['variables'][widgets[widget].variable]}${widgets[widget].units}</h1>` +
                        '</div>';
                    dashboard.appendChild(div);

                }
                if (widgets[widget].type === 'data') {

                    if (widgets[widget]['hide'] === 'true') {
                        display = "none";
                        mb = '';
                    }

                    div.innerHTML =
                        `<i  onclick="windowSwitcher('data_settings','${div.id}')" style="position: absolute; transform: translate(109px, -35px)" class="hc p3 hac fa fa-ellipsis-v"></i>` +
                        `<h2 style="${mb}" id="">${widgets[widget].title}</h2>` +
                        `<h3 style="font-size:14px; display:${display};" id="" class="m0 mb3 p0">${widgets[widget].variable}</h3>` +
                        '<div style="" class="r ac jc">' +
                        `<h1 style = " font-size: 5rem; margin: 0; margin-bottom: 1rem;" >${data['variables'][widgets[widget].variable]}</h1>` +
                        `<h1 style = " font-size: 5rem; margin: 0; margin-bottom: 1rem;"  class="m0">${widgets[widget].units}</h1>` +
                        '</div>' +
                        `<div>${new Date().toLocaleString()}</div>`;
                    dashboard.appendChild(div);

                }

            }

        }
    }
}

// Variables Tab.
function paintVariableTab(data) {

    let project = document.getElementById('project_section_variables');
    project.classList = 'w100 c ac jc';
    project.style = {
        height: "100%",
        overflow: "visible"
    };
    project.innerHTML = `
        <div style="" class="w100 c ac">
            <div style="height: 100%; overflow: visible;" class="w100 rxl ac jc">
                <div id="variables" class="m1 variables c jfs ac w100xl"> 
                    <h3 class="mb2 w100" style="text-align: center;">Variables </h3>
                    <div class="r afe jfs">
                        <button class="fa fa-plus" onclick="windowSwitcher('new_variable')"></button>
<!--                        <button onclick="editVariables()" style="padding: 8px 30px;" class="m0 p0 fa fa-trash-alt" id = "var_button" onclick=""></button>-->
                     </div>
                     
                </div>
                      
            </div>
        </div>`;
    document.getElementById('content_box').appendChild(project);
    let variables = document.getElementById('variables');
    let vars = data.variables;
    let count = 0;
    for (var variable in vars) {
        if (variable === 'default') {
            continue;
        }
        let newVar = document.createElement('div');
        newVar.id = "var_" + variable;
        newVar.setAttribute('onmouseover', 'edit = true');
        newVar.setAttribute('onmouseleave', 'edit = false');
        newVar.innerHTML = `

                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${data.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                    <i style="color:red;" class="mt2 hp hc far fa-trash-alt" onclick="windowSwitcher('double_check', '${variable}')"></i>
                </div>
`;
        variables.appendChild(newVar);
        count++;
    }
    if (!count) {
        let noVars = document.createElement('div');
        noVars.innerHTML = `<p style="background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;">No Variables 🙁</p>`;
        variables.appendChild(noVars);
        return;
    }


}

// Charts Tab.
function paintChartsTab(data) {
    console.log('here charts');
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = `<p>${currentProjectData.charts}</p>`;
}

// Settings Tab.
function paintSettingsTab(data) {
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = `
        <div id= "PROJECT_SETTINGS_TAB" class="p3 m0 ml1 c">
            <h1 class="mb1 cw">Project Settings</h1>
            <hr class="w100">
            <div class="r">
                <h2 class="cw mb3">Your Project Key: </h2>
            </div>
            <div class="r ac fww">
                <input class="m0"  disabled value=" ${currentProjectData.key}">
                <button onclick="copyToClip('${currentProjectData.key}')" style="color: white;" class="fa fa-copy my2 mx2"></button>
                <button onclick="windowSwitcher('newKey')" title= "Generate New Project Key" style="color: white; background: #8c2726;" class="fa fa-redo mb0 my2 mx0"></button>
                <p id="clip_message" style="transition: all 4s ease-in-out; color:orange; transform: translateY(20px); " class="ml3 dn">Copied to Clipboard!</p>
            </div>
            <div id="project_settings_project_name" class="">
                <h2 class="cw mb3">Project Name: </h2>
            </div>
            <div id="project_settings_project_desc" class="">
                <h2 class="cw mb3">Project Description: </h2>
            </div>
            <div class="r ac">
                <a href="/data?key=${currentProjectData.key}"><button class="ml0 mt4 mb1">Download Project Data</button></a>
            </div>
            <div class="r ac">
                <button onclick="windowSwitcher('deleteProject')" style="background: #8c2726;" class="ml0 mt4">Delete Project</button>
            </div>
        </div>`;

    let projectName = input(document.getElementById('project_settings_project_name'), {
        type: 'text',
        edit: true,
        id: 'project_settings_project_name_input',
        onSaveMessage: "The new name has been set.",
        value: currentProjectData.name,
        manualMode: true,
        onSave: async function () {
            setProjectName(projectName.value, currentUid, currentId);
        }
    });
    let projectDescription = input(document.getElementById('project_settings_project_desc'), {
        type: 'text',
        edit: true,
        id: 'project_settings_project_desc_input',
        onSaveMessage: "The new description has been set.",
        value: currentProjectData.description,
        manualMode: true,
        onSave: async function () {
            setProjectDescription(projectDescription.value, currentUid, currentId);
        }
    })
}

function createVariable(name, uid) {
    console.log('Creating Var: ', name, uid);
    ws.send(`{"cmd":"CREATE_VARIABLE", "key":"${currentKey}", "name":"${name}", "onSuccess":"console.log('Success!'); windowSwitcher('none'); getProject(currentUid, currentId);", "onError":""}`);
}

function updateProject(project, id) {
    let variables = document.getElementById('variables');

    let vars = project.variables;
    let count = 0;
    for (var variable in vars) {
        if (variable === 'default') {
            continue;
        }
        // console.log(variables.querySelector('variable'));
        let newVar = document.getElementById("var_" + variable);
        newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
        newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
        newVar.setAttribute('onmouseover', 'edit = true');
        newVar.setAttribute('onmouseleave', 'edit = false');
        newVar.innerHTML = `
                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${project.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                </div>`;
        variables.appendChild(newVar);


    }

}

function copyToClip(val) {
    let clipMessage = document.getElementById('clip_message');
    copyTextToClipboard(val);
    clipMessage.classList.remove('dn');
    clipMessage.style.transform = "translateY(0px)";
    setTimeout(() => {
        clipMessage.classList.add('dn');
        clipMessage.style.transform = "translateY(20px)";
    }, 2000);

}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function editVariables() {
    if (currentView === 'projectSingle') {
        let variables = document.getElementById('variables');
        console.log(document.getElementById('variables'));

    }
}

// Handles the events of editing a variable value in the UI.
function variableEdit(id, key = null) {
    // console.log('key: ', id);
    edit = true;
    let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
    error.classList.add('dn');
    // Get the input element.
    let inputString = `var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);

    // Make the input editable by removing the disabled attribute.
    input.removeAttribute('disabled');

    // Store the current value, so that if someone decides to cancel instead of editing the variable, it will set the input back to the original value (oldValue).
    let oldValue = input.value;

    // Get the edit button and switch it to the check mark styling, also remove the onClick attribute.
    let button = document.getElementById(id);
    button.classList.remove('fa-pencil-alt');
    button.classList.add('fa-check');
    button.classList.add('double-button');
    button.style.color = 'green';

    button.removeAttribute('onClick');

    // Add a click listener in the event that the save (check mark) button is clicked.
    button.setAttribute('onclick', `variableSave(id, "${oldValue}","${key}")`);
    // Get the second close button element. "Currently Hidden".
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);

    // Remove the dn class which is hiding it. So it is now visible.
    button2.classList.remove('dn');

    // Add this class to translate it into position inside the input element.
    button2.classList.add('double-button2');

    // Set the color to red.
    button2.style.color = 'red';

    // When someone clicks the red cross to cancel the variable edit.
    button2.addEventListener('click', () => {
        edit = false;

        // Get the input ele.
        let input2 = document.getElementById(inputString);

        // Set it back to the original value.
        input2.value = oldValue;

        // Disabled it again.
        input2.setAttribute('disabled', true);

        // Remove the check mark and add the pencil and styling again to the edit button.
        button.classList.add('fa-pencil-alt');
        button.classList.remove('fa-check', 'loader-small');
        button.style.color = '#9b55a3';
        button.classList.remove('double-button'); // Translation to give room to the cross button.

        // Set the on click function back to this.
        button.setAttribute('onClick', `variableEdit(id, '${key}')`);

        // Hide the close button.
        button2.classList.add('dn');
    });


}

function variableSave(id, old, key) {
    let editButton = document.getElementById(id);
    editButton.classList.remove('fa-check');
    editButton.classList.remove('fa-pencil-alt');
    editButton.classList.add('loader-small', 'double-button-load');
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);
    button2.classList.add('dn');
    let inputString = `var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);
    input.setAttribute('disabled', true);
    let name = document.getElementById(`var_name_${id.substring('var_button_'.length)}`);
    let errorElement = `var_error_${id.substring('var_button_'.length)}`;
    let value = input.value;
    console.log("here: ", value.substring(0, 2));

    function filterInt(value) {
        if (/^[-+]|(\d)|[.]$/.test(value)) {
            return Number(value);
        } else {
            return NaN;
        }
    }

    if (value.substring(0, 2) === "@@") {

        if (!isNaN(filterInt(value.substring(2, value.length)))) {
            value = `\"${value.substring(2, value.length)}\"`;
        } else {
            value = `\"${input.value}\"`;
        }
    } else {
        if (isNaN(filterInt(value))) {
            value = `\"${input.value}\"`;
        }
    }

    ws.send(`{"cmd":"SET_VARIABLE", "key":"${key}", "name":"${name.value}", "value":${value}, "onSuccess":"console.log('Success!'); var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', \`variableEdit(id, '${key}')\`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); ", "onError":"var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('${errorElement}'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;"}`);
    setTimeout(() => {
        if (!editButton.classList.contains('done')) {
            editButton.classList.add('fa-pencil-alt');
            edit = false;
            editButton.classList.remove('fa-check', 'loader-small', 'double-button-load');
            editButton.style.color = '#9b55a3';
            editButton.classList.remove('double-button'); // Translation to give room to the cross button.
            let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
            error.classList.remove('dn');
            input.value = old;
            // Set the on click function back to this.
            editButton.setAttribute('onClick', `variableEdit(id, '${key}')`);
        }
    }, 3000);
}

function drawLineGraph(classID, targetID){

    let data = {
        labels: ['Jan', 'Mar', 'Jun'],
        series: []
    };

    // Find the widget that corresponds to the id.
    let widget = currentProjectData.widgets.find((widget) => widget.id === targetID);

    let targetSeries = widget.series;

    let index = 0;
    let seriesTitles = [];
    for (let targetSerie in targetSeries) {
        let chartData = currentProjectData.charts.find((chart) => chart.name === targetSeries[targetSerie].name);
        let seriesData = [];
        let alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
        let legend = document.getElementById(`${targetID}_plot_legend`);
        seriesTitles.push(targetSeries[targetSerie].name);
        legend.innerHTML = legend.innerHTML + `<div class="r mr2" style=" font-size: 0.7rem;"><i class="fas fa-circle" style="margin-top:1px; color: ${targetSeries[targetSerie].color}; font-size: 0.7rem;">&nbsp;\</i>${targetSeries[targetSerie].name}</div>`;
        if (chartData.entries !== 0) {

            let dataPoints = chartData.data;
            for (let point in dataPoints) {
                seriesData.push({x: dataPoints[point].entry, y: dataPoints[point].value, time: `Time: ${new Date(dataPoints[point].timestamp)} <br> Value: ${dataPoints[point].value}`});
                document.getElementById(`${targetID}_plot_styles`).innerHTML = document.getElementById(`${targetID}_plot_styles`).innerHTML +
                    `${classID} .ct-series-${alphaMap[index]} .ct-line,
                     ${classID} .ct-series-${alphaMap[index]} .ct-point {
                      stroke: ${targetSeries[targetSerie].color};
                    }`;
            }
            index++;
            data.series.push(seriesData)
        }
    }
    // data.labels = [targetLabels[0], targetLabels[Math.ceil(targetLabels.length/3)], targetLabels[Math.ceil((targetLabels.length/3)*2)], targetLabels[Math.ceil(targetLabels.length)]];
    var options = {
        width: '90%',

        height: '220px',
        showArea: true,
        showPoint: true,
        chartPadding: {
            right: 30
        },
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            position: 'end',
            showLabel: true,
            showGrid: true,
            type: Chartist.AutoScaleAxis,
            onlyInteger: true,
            //
            // type: Chartist.FixedScaleAxis,
            // divisor: 5,
        },
        plugins: [
            Chartist.plugins.tooltip({
                pointClass: 'my-cool-point',
                class: `tooltip-${widget.id}`,
                appendToBody: false, anchorToPoint: true,
            }),
            Chartist.plugins.zoom({
                onZoom: onZoom,
                resetOnRightMouseBtn: true  // If set to true, a right click in the zoom area, will reset zoom.
            }),
        ],
    };

    var responsiveOptions = [
        ['screen and (min-width: 12640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? value : null;
                }
            }
        }]
    ];


    let plot = new Chartist.Line(classID, data, options, responsiveOptions);
    plot.on('draw', function(data) {
        if(data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
                cx: [data.x],
                cy: [data.y],
                r: [5],
                'ct:value': data.series[data.index].time,
                'ct:meta': data.meta,
                class: 'my-cool-point',
            }, 'ct-area');
            data.element.replace(circle);
        }
    });

    plot.container.addEventListener('mouseenter', function(e){
        let x, i;
        x = document.querySelectorAll(`.tooltip-${widget.id}`);
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    });

    plot.container.addEventListener('mouseleave', function(e){
        let x, i;
        x = document.querySelectorAll(".chartist-tooltip");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    });
}

var resetFnc;

function drawScatterPLot(classID, targetID) {
    // var times = function (n) {
    //     return Array.apply(null, new Array(n));
    // };
    let data = {
        labels: [],
        series: []
    };

    // var data = {
    //     // A labels array that can contain any sort of values
    //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    //     // Our series array that contains series objects or in this case series data arrays
    //     series: [
    //         [5, 2, 4, 2, 0]
    //     ]
    // };


    let widget = currentProjectData.widgets.find((widget) => widget.id === targetID);


    let targetSeries = widget.series;
    let index = 0;
    let seriesTitles = [];
    for (let targetSerie in targetSeries) {
        let chartData = currentProjectData.charts.find((chart) => chart.name === targetSeries[targetSerie].name);
        let seriesData = [];
        let alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
        let legend = document.getElementById(`${targetID}_plot_legend`);
        seriesTitles.push(targetSeries[targetSerie].name);
        legend.innerHTML = legend.innerHTML + `<div class="r mr2" style=" font-size: 0.7rem;"><i class="fas fa-circle" style="margin-top:1px; color: ${targetSeries[targetSerie].color}; font-size: 0.7rem;">&nbsp;\</i>${targetSeries[targetSerie].name}</div>`;
        if (chartData.entries !== 0) {

            let dataPoints = chartData.data;
            for (let point in dataPoints) {
                seriesData.push({x: dataPoints[point].x, y: dataPoints[point].y});
                document.getElementById(`${targetID}_plot_styles`).innerHTML = document.getElementById(`${targetID}_plot_styles`).innerHTML +
                    `${classID} .ct-series-${alphaMap[index]} .ct-line,
                     ${classID} .ct-series-${alphaMap[index]} .ct-point {
                      stroke: ${targetSeries[targetSerie].color};
                    }`;
            }
            index++;


            data.series.push(seriesData)
        }
    }

    // for(let widgetSeries in widgetSeries ){
    //     // data.series.push()
    // }

    var options = {

        showLine: false,
        width: '90%',
        height: '220px',
        chartPadding: {
            right: 30
        },
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            position: 'end',
            showLabel: true,
            showGrid: true,
            type: Chartist.AutoScaleAxis,
            onlyInteger: true,
        },
        plugins: [
            Chartist.plugins.zoom({
                onZoom: onZoom,
                resetOnRightMouseBtn: true  // If set to true, a right click in the zoom area, will reset zoom.
            })
        ],
    };

    var responsiveOptions = [
        ['screen and (min-width: 12640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? value : null;
                }
            }
        }]
    ];


    new Chartist.Line(classID, data, options, responsiveOptions);

}

function onZoom(chart, reset) {
    resetFnc = reset;
}



