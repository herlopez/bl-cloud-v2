function windowWidgetSelection(content) {
  content.classList.add('widget-selection');
  var mod = 0.7;
  content.innerHTML = "\n        <h2 class=\"mb0\">Add Widget</h2>\n        <hr>\n        <div class=\"c ac jc\">\n            <div class=\"r ac jc\" style=\"flex-wrap: wrap; max-width: 1345px;\"> \n                <div class=\"c ac jc\"> \n                    <button onclick=\"windowSwitcher('gauge')\" class=\"bbutton\"> \n                        <svg height=\"".concat(200 * mod, "\" width=\"").concat(200 * mod, "\">\n                            <circle cx= \"").concat(100 * mod, "\" cy= \"").concat(100 * mod, "\" r=\"").concat(5 * mod, "\" fill=\"#ffffff\"/>\n                            <path fill=\"#0D790A\" d=\"M").concat(29.29 * mod, ",").concat(170.71 * mod, "           A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(0 * mod, " ").concat(102.5 * mod, "                 L ").concat(20 * mod, " ").concat(102.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(43.432 * mod, " ").concat(156.568 * mod, "\"/>\n                            <path fill=\"#0D790A\" d=\"M").concat(0 * mod, ",").concat(97.5 * mod, "                 A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(27.592735 * mod, " ").concat(31.12827 * mod, "      L ").concat(41.6915 * mod, " ").concat(45.227 * mod, "         A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(20 * mod, " ").concat(97.5 * mod, " \"/>\n                            <path fill=\"#F3B820\" d=\"M").concat(31.05709 * mod, ", ").concat(27.521555 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(97.5 * mod, " ").concat(0 * mod, "                  L ").concat(97.5 * mod, " ").concat(20 * mod, "                A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(45.226855 * mod, " ").concat(41.6915 * mod, "\"/>\n                            <path fill=\"#F3B820\" d=\"M").concat(102.5 * mod, ",").concat(0 * mod, "                A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(168.94291 * mod, " ").concat(27.521555 * mod, "     L ").concat(154.773145 * mod, " ").concat(41.6915 * mod, "     A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(102.5 * mod, " ").concat(20 * mod, "\"/>\n                            <path fill=\"#D20303\" d=\"M").concat(172.407265 * mod, ",").concat(31.12827 * mod, "    A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(200 * mod, " ").concat(97.5 * mod, "                L ").concat(180 * mod, " ").concat(97.5 * mod, "               A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(158.3085 * mod, " ").concat(45.227 * mod, "\"/>\n                            <path fill=\"#D20303\" d=\"M").concat(200 * mod, ",").concat(102.5 * mod, "              A ").concat(100 * mod, " ").concat(100 * mod, " 0 0 1 ").concat(170.71 * mod, " ").concat(170.71 * mod, "           L ").concat(156.568 * mod, " ").concat(156.568 * mod, "        A ").concat(80 * mod, " ").concat(80 * mod, " 0 0 0 ").concat(180 * mod, " ").concat(102.5 * mod, "\"/>\n                            <path style=\"transform-origin: ").concat(100 * mod, "px ").concat(100 * mod, "px;\" fill=\"#707070\" d=\"M").concat(95 * mod, ",").concat(110 * mod, " L ").concat(105 * mod, " ").concat(110 * mod, " L ").concat(102 * mod, " ").concat(95 * mod, " L ").concat(100 * mod, " ").concat(3 * mod, " L ").concat(98 * mod, " ").concat(95 * mod, "\"/>\n                        </svg> \n                    </button> \n                    <h2>Gauge</h2> \n                </div> \n                <div class=\"c ac jc\">\n                    <button onclick = \"windowSwitcher('data')\" class=\"bbutton\"><div class=\"c\"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>\n                    <h2>Data Block</h2>\n                </div>\n<!--                    <div class=\"c ac jc\">-->\n<!--                        <button class=\"bbutton\"><input class=\"slider\" type=\"range\"></button>-->\n<!--                        <h2>Slider</h2>-->\n<!--                    </div>-->\n<!--                    <div class=\"c ac jc\">-->\n<!--                        <button class=\"bbutton\"><div class=\"ct-chart-pie-widget\"></div></button>-->\n<!--                        <h2>Pie Chart</h2>-->\n<!--                    </div>-->\n                <div class=\"c ac jc\">   \n                    <button class=\"bbutton\"><div class=\"ct-chart-line-chart-widget\"></div></button>\n                    <h2>Line Graph</h2>\n                </div>\n                <div class=\"c ac jc\">\n                    <button class=\"bbutton\"><div class=\"ct-chart-scatter-chart-widget\"></div></button>\n                    <h2>Scatter Plot</h2>\n                </div>\n<!--                    <div class=\"c ac jc\">-->\n<!--                        <button class=\"bbutton\"><div class=\"mr3 ct-chart-histo-chart-widget\"></div></button>-->\n<!--                        <h2>Bar Graph</h2>-->\n<!--                    </div>-->\n<!--                    <div class=\"c ac jc\">-->\n<!--                        <button class=\"bbutton\"></button>-->\n<!--                        <h2>Raw Data</h2>-->\n<!--                    </div>-->\n            </div>\n            <div class=\"r\">\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            </div>\n        </div>");
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
  return content;
}