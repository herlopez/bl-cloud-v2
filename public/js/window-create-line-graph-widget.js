function windowCreateLineGraphWidget(content, options) {
  content.classList.add('widget-plot-graph-settings');
  var validScatterChart = "";

  if (currentProjectData.hasOwnProperty('charts')) {
    var charts = currentProjectData['charts'];

    for (var chart in charts) {
      if (charts.hasOwnProperty(chart)) {
        if (charts[chart].type === "SCATTER") {
          validScatterChart += "<option value=\"".concat(charts[chart].name, "\">").concat(charts[chart].name, "</option>");
        }
      }
    }
  }

  var defaultColor = ['#ff0000', '#0000ff', '#00ff00', '#fff000', '#ff7902'];
  content.innerHTML = "<div class=\"c ac jc\">\n            <h2 class=\"mb1\"  id=\"gauge_title\">Scatter Plot</h2> \n            <h3 class=\"m0\" style=\"font-size: 0.8rem;\" id=\"variable_title\"></h3> \n            <div>\n                <div id=\"new_y_title_units\" class=\"ct-pl-y-title-units\"></div>\n                <div id=\"new_y_title\" class=\"ct-pl-y-title fs15\">y</div>\n                <div class=\"ct-widget-plot-graph-settings\"></div>\n                <div id=\"new_x_title_units\" class=\"ct-pl-x-title-units\"></div>\n                <div id=\"new_x_title\" class=\"ct-pl-x-title tac fs15\">x</div>\n            </div>\n            <div class=\"c jc afe p3 pt0\">\n                <div class=\"mb2\">Title: <input id=\"gauge_title_input\" onkeyup=\"gaugeSettingsTitle()\" type=\"text\" value=\"Scatter Plot\"></div>\n                <div class=\"mb2\">X Title: <input id = 'x_axis_title' onkeyup=\"labelUpdate(this, 'new_x_title')\" type=\"text\" value=\"x\"></div>\n                <div class=\"mb2\">Y Title: <input id = 'y_axis_title' onkeyup=\"labelUpdate(this, 'new_y_title')\" type=\"text\" value=\"y\"></div>\n            </div>\n            <div>\n               <div class=\"r mb2\">\n                    X Axis Units:&nbsp;\n                    ".concat(unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')"), "\n               </div>\n               <div class=\"r mb2 mt4\">\n                    Y Axis Units:&nbsp;\n                    ").concat(unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')"), "\n               </div>\n               \n               <div class=\"c ac jc\" id=\"series_list\">\n                   <div class=\"r ac mt4 mb3\">Series 1:&nbsp;\n                            \n                       <select id=\"series_0\">\n                            <optgroup>\n                            <option value=\"\">Select a data set</option>\n                                ").concat(validScatterChart, "\n                            </optgroup>\n                       </select>         \n                       <input id = 'series_0_color' value = \"").concat(defaultColor[0], "\" type=\"color\">        \n                   </div>\n\n                </div>\n               <div id=\"series_add_button\" onclick=\"addSeries('series_list')\" class=\"r ac jc hp hc fa fa-plus mb3 fs125\">&nbsp;&nbsp;<b class=\"\">Add Series</b></div>\n\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('widget_selection')\">Cancel</button>\n                <button onclick=\"newPlotWidget('', 'scatter', document.getElementById('series_list').children.length); \"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>\n            </div>\n        </div>\n    ");
  return content;
}

function addSeries(id) {
  var defaultColor = ['#ff0000', '#0000ff', '#00ff00', '#fff000', '#ff7902'];
  var series = document.getElementById(id);
  var validScatterChart = "";

  if (currentProjectData.hasOwnProperty('charts')) {
    var charts = currentProjectData['charts'];

    for (var chart in charts) {
      if (charts.hasOwnProperty(chart)) {
        if (charts[chart].type === "SCATTER") {
          validScatterChart += "<option value=\"".concat(charts[chart].name, "\">").concat(charts[chart].name, "</option>");
        }
      }
    }
  }

  series.innerHTML = series.innerHTML + "\n    <div class=\"r ac mt1 mb3\">Series ".concat(series.children.length + 1, ":&nbsp;\n        <select id=\"series_").concat(series.children.length, "\">\n            <optgroup value=\"Variables\">\n                <option value=\"\">Select a data set</option>\n                ").concat(validScatterChart, "\n                <input id = 'series_").concat(series.children.length, "_color' value = \"").concat(defaultColor[series.children.length], "\"  type=\"color\">\n            </optgroup>\n        </select>\n    </div>");

  if (series.children.length >= 5) {
    document.getElementById('series_add_button').classList.add('dn');
  } else {
    document.getElementById('series_add_button').classList.remove('dn');
  }
}

function labelUpdate(src_el, target_id) {
  document.getElementById(target_id).innerText = src_el.value;
}

function drawPLotWindow() {
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
  new Chartist.Line('.ct-widget-plot-graph-settings', data, options, responsiveOptions);
}