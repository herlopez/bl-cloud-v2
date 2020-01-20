/**
 * Scatter Plot Edit Window.
 * @function EditScatterPlotWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditScatterPlotWidgetWindow(widgetId) {

    let widget = currentProjectData.widgets.find((widget) => widget.id === widgetId);

    return `
         <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removePlotWidget('${widgetId}')"></i> 
         <div class="c ac jc">
             <h2 class=" mb1"  id="gauge_title">${widget.title}</h2>
             <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units">${widget.yAxisUnits}</div>
                <div id="new_y_title" class="ct-pl-y-title fs15">${widget.yAxisTitle}</div>
                <div class="ct-widget-plot-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units">${widget.xAxisUnits}</div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">${widget.xAxisTitle}</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${widget.title}"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="${widget.xAxisTitle}"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="${widget.yAxisTitle}"></div>
            </div>
            <div>
                <div class="r mb2">
                    X Axis Units:&nbsp; 
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')", `${widget.xAxisUnits}`)}
                </div>
                <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', "unitSettings(this, 'new_y_title_units')", `${widget.yAxisUnits}`)}
                </div>
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updatePlotWidget('${widget.id}','scatter')">&nbsp;Save&nbsp;</button>
             </div>
        </div>
    `;
}

