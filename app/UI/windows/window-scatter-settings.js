//
// Scatter Plot Settings Edit Window.
//

function windowScatterSettings(content, options) {

    let plot = currentProjectData.widgets.find((widget) => widget.id === options);

    content.id = 'window_content_block';
    content.innerHTML = `
         <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removePlotWidget('${options}')"></i> 
         <div class="c ac jc">
             <h2 class=" mb1"  id="gauge_title">${plot.title}</h2>
             <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units">${plot.yAxisUnits}</div>
                <div id="new_y_title" class="ct-pl-y-title fs15">${plot.yAxisTitle}</div>
                <div class="ct-widget-plot-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units">${plot.xAxisUnits}</div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">${plot.xAxisTitle}</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${plot.title}"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="${plot.xAxisTitle}"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="${plot.yAxisTitle}"></div>
            </div>
            <div>
                <div class="r mb2">
                    X Axis Units:&nbsp; 
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')", `${plot.xAxisUnits}`)}
                </div>
                <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')", `${plot.yAxisUnits}`)}
                </div>
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updatePlotWidget('${plot.id}','scatter')">&nbsp;Save&nbsp;</button>
             </div>
        </div>
    `;

    return content;
}

