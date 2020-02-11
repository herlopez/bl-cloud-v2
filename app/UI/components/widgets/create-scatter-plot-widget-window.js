/**
 * @return {string}
 */
function CreateScatterPlotWidgetWindow(){

    let validScatterChart = "";
    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if(charts.hasOwnProperty(chart)){
                if (charts[chart].type === "SCATTER") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
            }
        }
    }

    let defaultColor = [
        '#ff0000',
        '#0000ff',
        '#00ff00',
        '#fff000',
        '#ff7902'
    ];

    return `
        <div class="widget-plot-graph-settings c ac jc">
            <h2 class="mb1"  id="gauge_title">Scatter Plot</h2> 
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
            <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units"></div>
                <div id="new_y_title" class="ct-pl-y-title fs15">y</div>
                <div class="ct-widget-plot-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units"></div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">x</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Scatter Plot"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="x"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="y"></div>
            </div>
            <div>
                <div class="r mb2">
                    X Axis Units:&nbsp;
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')")}
                </div>
                <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')")}
                </div>
                <div class="c ac jc" id="series_list">
                    <div class="r ac mt4 mb3">Series 1:&nbsp;
                        <select id="series_0">
                            <optgroup>
                                <option value="">Select a data set</option>
                                ${validScatterChart}
                            </optgroup>
                        </select>         
                        <input id = 'series_0_color' value = "${defaultColor[0]}" type="color">        
                    </div>
                </div>
                <div id="series_add_button" onclick="addSeries('series_list')" class="r ac jc hp hc fa fa-plus mb3 fs125">&nbsp;&nbsp;<b class="">Add Series</b></div>
            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newPlotWidget('', 'scatter', document.getElementById('series_list').children.length); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>
    `;
}


function addSeries(id){

    let defaultColor = [
        '#ff0000',
        '#0000ff',
        '#00ff00',
        '#fff000',
        '#ff7902'
    ];

    let series = document.getElementById(id);

    let validScatterChart = "";

    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if(charts.hasOwnProperty(chart)){
                if (charts[chart].type === "SCATTER") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
                if (charts[chart].type === "SCATTER") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
            }
        }
    }
    series.innerHTML =  series.innerHTML + `
    <div class="r ac mt1 mb3">Series ${series.children.length+1}:&nbsp;
        <select id="series_${series.children.length}">
            <optgroup value="Variables">
                <option value="">Select a data set</option>
                ${validScatterChart}
                <input id = 'series_${series.children.length}_color' value = "${defaultColor[series.children.length]}"  type="color">
            </optgroup>
        </select>
    </div>`;
    if(series.children.length >= 5){
        document.getElementById('series_add_button').classList.add('dn');
    }
    else{
        document.getElementById('series_add_button').classList.remove('dn');
    }
}
function labelUpdate(src_el, target_id){
    document.getElementById(target_id).innerText = src_el.value;
}
function drawPLotWindow(){
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
        fullWidth: true,
        chartPadding: {
            right: 10
        },
        low: 0,
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            showLabel: true,
            showGrid: true,
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

    new Chartist.Line('.ct-widget-plot-graph-settings', data, options, responsiveOptions);

}
