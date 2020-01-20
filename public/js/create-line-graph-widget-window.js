/**
 * @return {string}
 */
function CreateLineGraphWidgetWindow() {
  var validScatterChart = "";

  if (currentProjectData.hasOwnProperty('charts')) {
    var charts = currentProjectData['charts'];

    for (var chart in charts) {
      if (charts.hasOwnProperty(chart)) {
        if (charts[chart].type === "LINE") {
          validScatterChart += "<option value=\"".concat(charts[chart].name, "\">").concat(charts[chart].name, "</option>");
        }
      }
    }
  }

  var defaultColor = ['#ff0000', '#0000ff', '#00ff00', '#fff000', '#ff7902'];
  return "\n        <div class=\"widget-plot-graph-settings c ac jc\">\n            <h2 class=\"mb1\"  id=\"gauge_title\">Line Graph</h2> \n            <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3> \n            <div>\n                <div id=\"new_y_title_units\" class=\"ct-pl-y-title-units\"></div>\n                <div id=\"new_y_title\" class=\"ct-pl-y-title fs15\">y</div>\n                <div class=\"ct-widget-line-graph-settings\"></div>\n     \n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"Line Graph\"></div>\n                \n                <div class=\"mb2\">Y Title: <input id = 'y_axis_title' onkeyup=\"labelUpdate(this, 'new_y_title')\" type=\"text\" value=\"y\"></div>\n            </div>\n            <div>\n              \n               <div class=\"r mb2 mt4\">\n                    Y Axis Units:&nbsp;\n                    ".concat(unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')"), "\n               </div>\n               \n               <div class=\"c ac jc\" id=\"series_list\">\n                   <div class=\"r ac mt4 mb3\">Series 1:&nbsp;\n                            \n                       <select id=\"series_0\">\n                            <optgroup>\n                            <option value=\"\">Select a data set</option>\n                                ").concat(validScatterChart, "\n                            </optgroup>\n                       </select>         \n                       <input id = 'series_0_color' value = \"").concat(defaultColor[0], "\" type=\"color\">        \n                   </div>\n\n                </div>\n               <div id=\"series_add_button\" onclick=\"addSeries('series_list')\" class=\"r ac jc hp hc fa fa-plus mb3 fs125\">&nbsp;&nbsp;<b class=\"\">Add Series</b></div>\n\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>\n                <button onclick=\"newPlotWidget('', 'line', document.getElementById('series_list').children.length); \"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>\n            </div>\n        </div>\n    ");
}

function drawLineGraphWindow() {
  var times = function times(n) {
    return Array.apply(null, new Array(n));
  };

  var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
    data.labels.push(index + 1);
    data.series.forEach(function (series) {
      series.push(Math.random() * 100);
    });
    return data;
  }, {
    labels: [],
    series: times(4).map(function () {
      return new Array();
    })
  });
  var options = {
    // showLine: false,
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
      showGrid: true
    }
  };
  var responsiveOptions = [['screen and (min-width: 640px)', {
    axisX: {
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
        return index % 4 === 0 ? 'W' + value : null;
      }
    }
  }]];
  new Chartist.Line('.ct-widget-line-graph-settings', data, options, responsiveOptions);
}