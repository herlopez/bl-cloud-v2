/**
 * Scatter Plot Edit Window.
 * @function EditScatterPlotWidgetWindow
 * @param {string} widgetId - Widget Id.
 * @return {string}
 */
function EditScatterPlotWidgetWindow(widgetId) {
  var widget = currentProjectData.widgets.find(function (widget) {
    return widget.id === widgetId;
  });
  return "\n         <i style=\"color: red; top: 5px; right: 0;\" class=\"por fs125 hc hp fa fa-trash-alt\" onclick=\"removePlotWidget('".concat(widgetId, "')\"></i> \n         <div class=\"c ac jc\">\n             <h2 class=\" mb1\"  id=\"gauge_title\">").concat(widget.title, "</h2>\n             <div>\n                <div id=\"new_y_title_units\" class=\"ct-pl-y-title-units\">").concat(widget.yAxisUnits, "</div>\n                <div id=\"new_y_title\" class=\"ct-pl-y-title fs15\">").concat(widget.yAxisTitle, "</div>\n                <div class=\"ct-widget-plot-graph-settings\"></div>\n                <div id=\"new_x_title_units\" class=\"ct-pl-x-title-units\">").concat(widget.xAxisUnits, "</div>\n                <div id=\"new_x_title\" class=\"ct-pl-x-title tac fs15\">").concat(widget.xAxisTitle, "</div>\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"").concat(widget.title, "\"></div>\n                <div class=\"mb2\">X Title: <input id = 'x_axis_title' onkeyup=\"labelUpdate(this, 'new_x_title')\" type=\"text\" value=\"").concat(widget.xAxisTitle, "\"></div>\n                <div class=\"mb2\">Y Title: <input id = 'y_axis_title' onkeyup=\"labelUpdate(this, 'new_y_title')\" type=\"text\" value=\"").concat(widget.yAxisTitle, "\"></div>\n            </div>\n            <div>\n                <div class=\"r mb2\">\n                    X Axis Units:&nbsp; \n                    ").concat(unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')", "".concat(widget.xAxisUnits)), "\n                </div>\n                <div class=\"r mb2 mt4\">\n                    Y Axis Units:&nbsp;\n                    ").concat(unitsList('y_axis_units', "unitSettings(this, 'new_y_title_units')", "".concat(widget.yAxisUnits)), "\n                </div>\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n                <button onclick=\"updatePlotWidget('").concat(widget.id, "','scatter')\">&nbsp;Save&nbsp;</button>\n             </div>\n        </div>\n    ");
}