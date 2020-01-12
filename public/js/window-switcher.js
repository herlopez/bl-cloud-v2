// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {
  // Save the current window in us for global usage.
  currentWindow = targetWindow; // Get the document elements. The window ele which is initially hidden.

  var window = document.getElementById('window');
  var app = document.getElementById('app'); // Function to hide the popup window.

  function windowHide() {
    app.classList.remove('hold');
    window.classList.remove('cr');
    window.classList.remove('ac');
    window.classList.remove('jc');
    window.classList.add('dn');
    window.innerHTML = '';
  } // Function to show the pop up window.


  function windowShow() {
    app.classList.add('hold');
    window.classList.add('cr');
    window.classList.add('ac');
    window.classList.add('jc');
    window.classList.remove('dn');
    window.innerHTML = '';
  } // If the target window is none, hide the pop up window.


  if (targetWindow === 'none' || targetWindow === 'close') {
    windowHide();
    return;
  } // Show the window.


  windowShow();
  var windowContent = document.createElement('div');
  windowContent.id = 'window_content_block';
  var content = "";

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

    case 'scatter_plot_settings':
      content = windowScatterSettings(windowContent, options);
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

    case 'line_graph':
      content = windowWidgetLineGraph(windowContent, options);
      break;

    case 'plot_graph':
      content = windowWidgetPlotGraph(windowContent, options);
      break;

    default:
      windowHide();
      break;
  }

  window.appendChild(content);
  drawPLotWindow();
  drawLineGraphWindow();
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
    series: [[1, 5, 2, 5, 4, 3], [2, 3, 4, 8, 1, 2], [5, 4, 3, 2, 1, 0.5]]
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
    axisY: {
      showLabel: false,
      showGrid: false
    },
    axisX: {
      showLabel: false,
      showGrid: false
    }
  };
  var responsiveOptions = [['screen and (min-width: 640px)', {
    axisX: {
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
        return index % 4 === 0 ? 'W' + value : null;
      }
    }
  }]];
  new Chartist.Line('.ct-chart-scatter-chart-widget', data, options, responsiveOptions);
  var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8], [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]]
  };
  var options = {
    seriesBarDistance: 3,
    axisY: {
      showLabel: false,
      showGrid: false
    },
    axisX: {
      showLabel: false,
      showGrid: false
    }
  };
  var responsiveOptions = [['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function labelInterpolationFnc(value) {
        return value[0];
      }
    }
  }]];
  new Chartist.Bar('.ct-chart-histo-chart-widget', data, options);
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
  var newValue = document.getElementById('variable_title_input').value;
  document.getElementById('value').innerText = currentProjectData['variables'][newValue];
}

function unitSettings(i) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'units';
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
  console.log(document.getElementById("gauge_color_".concat(n)));
  document.getElementById("gauge_color_".concat(n)).style.fill = i.value;
} //
// Plot Widget
//


function newPlotWidget(id, type, seriesCount) {
  var series = [];

  for (var i = 0; i < seriesCount; i++) {
    console.log(i);
    series[i] = {
      name: document.getElementById("series_".concat(i)).value,
      color: document.getElementById("series_".concat(i, "_color")).value
    };
  }

  addWidget(currentUid, currentProject, {
    type: type,
    hide: 'false',
    title: "".concat(document.getElementById('gauge_title').innerText),
    xAxisTitle: "".concat(document.getElementById('x_axis_title').value),
    xAxisUnits: "".concat(document.getElementById('x_axis_units').value),
    yAxisTitle: "".concat(document.getElementById('y_axis_title').value),
    yAxisUnits: "".concat(document.getElementById('y_axis_units').value),
    series: series
  });
}

function updatePlotWidget(id, type) {
  updateWidget(currentUid, currentProject, {
    type: type,
    hide: 'false',
    title: "".concat(document.getElementById('gauge_title').innerText),
    xAxisTitle: "".concat(document.getElementById('x_axis_title').value),
    xAxisUnits: "".concat(document.getElementById('x_axis_units').value),
    yAxisTitle: "".concat(document.getElementById('y_axis_title').value),
    yAxisUnits: "".concat(document.getElementById('y_axis_units').value),
    id: id
  });
}

function removePlotWidget(id) {
  removeWidget(currentUid, currentProject, id);
} //
// Gauge Widget
//


function newGaugeWidget() {
  addWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable: "".concat(document.getElementById('variable_title_input').value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText),
    color1: "".concat(document.getElementById('color1').value),
    color2: "".concat(document.getElementById('color2').value),
    color3: "".concat(document.getElementById('color3').value),
    color4: "".concat(document.getElementById('color4').value),
    color5: "".concat(document.getElementById('color5').value),
    color6: "".concat(document.getElementById('color6').value),
    min: parseInt(document.getElementById('gauge_min_value').innerText),
    max: parseInt(document.getElementById('gauge_max_value').innerText)
  });
}

function updateGaugeWidget(id) {
  updateWidget(currentUid, currentProject, {
    type: 'gauge',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable: "".concat(document.getElementById("".concat(id, "_variable_title_input")).value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText),
    color1: "".concat(document.getElementById('color1').value),
    color2: "".concat(document.getElementById('color2').value),
    color3: "".concat(document.getElementById('color3').value),
    color4: "".concat(document.getElementById('color4').value),
    color5: "".concat(document.getElementById('color5').value),
    color6: "".concat(document.getElementById('color6').value),
    min: parseInt(document.getElementById('gauge_min_value').innerText),
    max: parseInt(document.getElementById('gauge_max_value').innerText),
    id: id
  });
}

function removeGaugeWidget(id) {
  removeWidget(currentUid, currentProject, id);
} //
// Data Widget
//


function newDataWidget() {
  addWidget(currentUid, currentProject, {
    type: 'data',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable: "".concat(document.getElementById('variable_title_input').value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText)
  });
}

function updateDataWidget(id) {
  updateWidget(currentUid, currentProject, {
    type: 'data',
    hide: "".concat(document.getElementById('gauge_variable_hide').checked),
    variable: "".concat(document.getElementById("".concat(id, "_variable_title_input")).value),
    units: "".concat(document.getElementById('units').innerText),
    title: "".concat(document.getElementById('gauge_title').innerText),
    id: id
  });
}

function removeDataWidget(id) {
  removeWidget(currentUid, currentProject, id);
}