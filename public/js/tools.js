// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
(function (funcName, baseObj) {
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;

      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }

      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  }

  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }

    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      readyList.push({
        fn: callback,
        ctx: context
      });
    }

    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }

      readyEventHandlersInstalled = true;
    }
  };
})("docReady", window);

var MD5 = function MD5(d) {
  result = M(V(Y(X(d), 8 * d.length)));
  return result.toLowerCase();
};

function M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) {
    _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
  }

  return f;
}

function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
    _[m] = 0;
  }

  for (m = 0; m < 8 * d.length; m += 8) {
    _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
  }

  return _;
}

function V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8) {
    _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
  }

  return _;
}

function Y(d, _) {
  d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;

  for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
    var h = m,
        t = f,
        g = r,
        e = i;
    f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
  }

  return Array(m, f, r, i);
}

function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
}

function md5_ff(d, _, m, f, r, i, n) {
  return md5_cmn(_ & m | ~_ & f, d, _, r, i, n);
}

function md5_gg(d, _, m, f, r, i, n) {
  return md5_cmn(_ & f | m & ~f, d, _, r, i, n);
}

function md5_hh(d, _, m, f, r, i, n) {
  return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}

function md5_ii(d, _, m, f, r, i, n) {
  return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}

function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
}

function bit_rol(d, _) {
  return d << _ | d >>> 32 - _;
}

function windowError(window, msg) {
  var appContainer = document.getElementById(window); // Try to remove the previous error message.

  try {
    document.getElementById('error_message').remove();
  } catch (e) {}

  var errorMessage = document.createElement('div');
  errorMessage['innerText'] = msg;
  errorMessage.style.color = 'red';
  errorMessage.style.margin = '1rem';
  errorMessage.id = 'error_message';
  errorMessage.style.textAlign = 'center';
  appContainer.appendChild(errorMessage);
}

function formError(msg) {
  var appContainer = document.getElementById('app_container'); // Try to remove the previous error message.

  try {
    document.getElementById('error_message').remove();
  } catch (e) {}

  var errorMessage = document.createElement('div');
  errorMessage['innerText'] = msg;
  errorMessage.style.color = 'red';
  errorMessage.style.margin = '1rem';
  errorMessage.id = 'error_message';
  appContainer.appendChild(errorMessage);
}

function unitsList() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var onInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  function f(current) {
    if (value === current) return 'selected';else return '';
  }

  return "\n        <select oninput=\"".concat(onInput, "\" id=\"").concat(id, "\">\n             <optgroup label=\"General\">\n                <option ").concat(f(''), "  value=\"\">None</option>\n                <option ").concat(f('%'), "  value=\"%\">%</option>\n            </optgroup>\n            <optgroup label=\"Temperature\">\n                <option ").concat(f("°C"), " value=\"\xB0C\" title=\"celsius\">\xB0C</option>\n                <option ").concat(f("°F"), " value=\"\xB0F\" title=\"fahrenheit\">\xB0F</option>\n                <option ").concat(f("K"), " value=\"K\" title=\"kelvin\">K</option>\n                <option ").concat(f("°Ré"), " value=\"\xB0R\xE9\" title=\"reaumur\">\xB0R\xE9</option>\n                <option ").concat(f("°N"), " value=\"\xB0N\" title=\"newton\">\xB0N</option>\n                <option ").concat(f("°Ra"), " value=\"\xB0Ra\" title=\"rankine\">\xB0Ra</option>\n            </optgroup>\n            <optgroup label=\"Volume\">\n                 <option ").concat(f("m³"), " value=\"m\xB3\" title=\"cubic meter\">m\xB3</option>\n                 <option ").concat(f("dm³"), " value=\"dm\xB3\" title=\"cubic decimeter\">dm\xB3</option>\n                 <option ").concat(f("cm³"), " value=\"cm\xB3\" title=\"cubic centimeter\">cm\xB3</option>\n                 <option ").concat(f("l"), " value=\"l\" title=\"liter\">l</option>\n                 <option ").concat(f("dl"), " value=\"dl\" title=\"deciliter\">dl</option>\n                 <option ").concat(f("cl"), " value=\"cl\" title=\"centiliter\">cl</option>\n                 <option ").concat(f("ml"), " value=\"ml\" title=\"milliliter\">ml</option>\n                 <option ").concat(f("oz"), " value=\"oz\" title=\"fluid ounce\">oz</option>\n                 <option ").concat(f("in³"), " value=\"in\xB3\" title=\"cubic inch\">in\xB3</option>\n                 <option ").concat(f("ft³"), " value=\"ft\xB3\" title=\"cubic foot\">ft\xB3</option>\n                 <option ").concat(f("yd³"), " value=\"yd\xB3\" title=\"cubic yard\">yd\xB3</option>\n                 <option ").concat(f("gal"), " value=\"gal\" title=\"gallon uk\">gal</option>\n                 <option ").concat(f("bbl"), " value=\"bbl\" title=\"petroleum barrel\">bbl</option>\n                 <option ").concat(f("pt"), " value=\"pt\" title=\"pint\">pt</option>\n            </optgroup>\n            <optgroup label=\"Distance\">\n                <option ").concat(f("km"), " value=\"km\" title=\"kilometer\">km</option>\n                <option ").concat(f("m"), " value=\"m\" title=\"meter\">m</option>\n                <option ").concat(f("dm"), " value=\"dm\" title=\"decimeter\">dm</option>\n                <option ").concat(f("cm"), " value=\"cm\" title=\"centimeter\">cm</option>\n                <option ").concat(f("mm"), " value=\"mm\" title=\"millimeter\">mm</option>\n                <option ").concat(f("mi"), " value=\"mi\" title=\"mile\">mi</option>\n                <option ").concat(f("in"), " value=\"in\" title=\"inch\">in</option>\n                <option ").concat(f("ft"), " value=\"ft\" title=\"foot\">ft</option>\n                <option ").concat(f("yd"), " value=\"yd\" title=\"yard\">yd</option>\n            </optgroup>\n            <optgroup label=\"Mass\">\n                <option ").concat(f("t"), " value=\"t\" title=\"tonne\">t</option>\n                <option ").concat(f("kg"), " value=\"kg\" title=\"kilogram\">kg</option>\n                <option ").concat(f("hg"), " value=\"hg\" title=\"hectogram\">hg</option>\n                <option ").concat(f("g"), " value=\"g\" title=\"gram\">g</option>\n                <option ").concat(f("dg"), " value=\"dg\" title=\"decigram\">dg</option>\n                <option ").concat(f("cg"), " value=\"cg\" title=\"centigram\">cg</option>\n                <option ").concat(f("mg"), " value=\"mg\" title=\"milligram\">mg</option>\n                <option ").concat(f("µg"), " value=\"\xB5g\" title=\"microgram\">\xB5g</option>\n                <option ").concat(f("carat"), " value=\"carat\" title=\"carat\">carat</option>\n                <option ").concat(f("grain"), " value=\"grain\" title=\"grain\">grain</option>\n                <option ").concat(f("oz"), " value=\"oz\" title=\"pounce avoirdupois\">oz</option>\n                <option ").concat(f("lb"), " value=\"lb\" title=\"pound avoirdupois\">lb</option>\n                <option ").concat(f("cwt"), " value=\"cwt\" title=\"long hundredweight\">cwt</option>\n                <option ").concat(f("ton"), " value=\"ton\" title=\"ton\">ton</option>\n                <option ").concat(f("st"), " value=\"st\" title=\"stone\">st</option>\n            </optgroup>\n            <optgroup label=\"Area\">\n                <option ").concat(f("km²"), " value=\"km\xB2\" title=\"square kilometer\">km\xB2</option>\n                <option ").concat(f("m²"), " value=\"m\xB2\" title=\"square meter\">m\xB2</option>\n                <option ").concat(f("dm²"), " value=\"dm\xB2\" title=\"square decimeter\">dm\xB2</option>\n                <option ").concat(f("cm²"), " value=\"cm\xB2\" title=\"square centimeter\">cm\xB2</option>\n                <option ").concat(f("TB"), " value=\"TB\" title=\"square milimeter\">TB</option>\n                <option ").concat(f("ha"), " value=\"ha\" title=\"hectare\">ha</option>\n                <option ").concat(f("a"), " value=\"a\" title=\"are\">a</option>\n                <option ").concat(f("ca"), " value=\"ca\" title=\"centiare\">ca</option>\n                <option ").concat(f("mile²"), " value=\"mile\xB2\" title=\"square mile\">mile\xB2</option>\n                <option ").concat(f("in²"), " value=\"in\xB2\" title=\"square inch\">in\xB2</option>\n                <option ").concat(f("yd²"), " value=\"yd\xB2\" title=\"square yard\">yd\xB2</option>\n                <option ").concat(f("ft²"), " value=\"ft\xB2\" title=\"square foot\">ft\xB2</option>\n                <option ").concat(f("ro"), " value=\"ro\" title=\"rood\">ro</option>\n                <option ").concat(f("acre"), " value=\"acre\" title=\"acre\">acre</option>\n                <option ").concat(f("nautical mile²"), " value=\"nautical mile\xB2\" title=\"square nautical mile\">nautical mile\xB2</option>\n            </optgroup>\n            <optgroup label=\"Speed\">\n                <option ").concat(f("kmph"), " value=\"kmph\" title=\"kilometer per hour\">kph</option>\n                <option ").concat(f("mps"), " value=\"mps\" title=\"mile per second\">mps</option>\n                <option ").concat(f("mph"), " value=\"mph\" title=\"mile per hour\">mph</option>\n                <option ").concat(f("knot"), " value=\"knot\" title=\"knot\">knot</option>\n                <option ").concat(f("ma"), " value=\"ma\" title=\"mac\">ma</option>\n                <option ").concat(f("a"), " value=\"a\" title=\"are\">mg</option>\n            </optgroup>\n            <optgroup label=\"Data byte\">\n                <option ").concat(f("b"), " value=\"b\" title=\"bit\">b</option>\n                <option ").concat(f("B"), " value=\"B\" title=\"byte\">B</option>\n                <option ").concat(f("KB"), " value=\"KB\" title=\"kilobyte\">KB</option>\n                <option ").concat(f("MB"), " value=\"MB\" title=\"megabyte\">MB</option>\n                <option ").concat(f("GB"), " value=\"GB\" title=\"gigabyte\">GB</option>\n                <option ").concat(f("TB"), " value=\"TB\" title=\"terabyte\">TB</option>\n                <option ").concat(f("PB"), " value=\"PB\" title=\"petabyte\">PB</option>\n                <option ").concat(f("EB"), " value=\"EB\" title=\"exabyte\">EB</option>\n                <option ").concat(f("ZB"), " value=\"ZB\" title=\"zettabyte\">ZB</option>\n                <option ").concat(f("YB"), " value=\"YB\" title=\"yottabyte\">YB</option>\n            </optgroup>\n            <optgroup label=\"Time\">\n                <option ").concat(f("year"), " value=\"year\" title=\"common year\">year</option>\n                <option ").concat(f("week"), " value=\"week\" title=\"week\">week</option>\n                <option ").concat(f("day"), " value=\"day\" title=\"day\">day</option>\n                <option ").concat(f("h"), " value=\"h\" title=\"hour\">h</option>\n                <option ").concat(f("min"), " value=\"min\" title=\"minute\">min</option>\n                <option ").concat(f("s"), " value=\"s\" title=\"second\">s</option>\n                <option ").concat(f("ms"), " value=\"ms\" title=\"millisecond\">ms</option>\n                <option ").concat(f("µs"), " value=\"\xB5s\" title=\"microsecond\">\xB5s</option>\n                <option ").concat(f("nanosecond"), " value=\"nanosecond\" title=\"nanosecond\">nanosecond</option>\n                <option ").concat(f("picosecond"), " value=\"picosecond\" title=\"picosecond\">picosecond</option>\n                <option ").concat(f("femtosecond"), " value=\"femtosecond\" title=\"femtosecond\">femtosecond</option>\n                <option ").concat(f("attosecond"), " value=\"attosecond\" title=\"attosecond\">attosecond</option>\n            </optgroup>  \n            <optgroup label=\"Frequency\">\n                <option ").concat(f("Hz"), " value=\"Hz\" title=\"Hertz\">Hz</option>\n                <option ").concat(f("KHz"), " value=\"KHz\" title=\"K\">KHz</option>\n                <option ").concat(f("MHz"), " value=\"MHz\" title=\"megahertz\">MHz</option>\n                <option ").concat(f("GHz"), " value=\"GHz\" title=\"Gigahertz\">GHz</option>\n            </optgroup>\n            <optgroup label=\"Pressure\">\n                <option ").concat(f("atm"), " value=\"atm\" title=\"atmosphere\">atm</option>\n                <option ").concat(f("bar"), " value=\"bar\" title=\"bar\">bar</option>\n                <option ").concat(f("mbar"), " value=\"mbar\" title=\"millibar\">mbar</option>\n                <option ").concat(f("Pa"), " value=\"Pa\" title=\"Pascal\">Pa</option>\n                <option ").concat(f("hPa"), " value=\"hPa\" title=\"hectopascal\">hPa</option>\n                <option ").concat(f("Psi"), " value=\"Psi\" title=\"pounds per square inch\">Psi</option>\n                <option ").concat(f("Torr"), " value=\"Torr\" title=\"torr\">torr</option>\n            </optgroup>\n            <optgroup label=\"Energy\">\n                <option ").concat(f("J"), " value=\"J\" title=\"joule\">J</option>\n                <option ").concat(f("KJ"), " value=\"KJ\" title=\"kilojoule\">KJ</option>\n                <option ").concat(f("cal"), " value=\"cal\" title=\"calorie\">cal</option>\n                <option ").concat(f("kcal"), " value=\"kcal\" title=\"kilocalorie\">kcal</option>\n                <option ").concat(f("Wh"), " value=\"Wh\" title=\"watt-hour\">Wh</option>\n                <option ").concat(f("kWh"), " value=\"kWh\" title=\"kilowatt-hour\">kWh</option>\n                <option ").concat(f("BTU"), " value=\"BTU\" title=\"british thermal unit\">BTU</option>\n                <option ").concat(f("thm"), " value=\"thm\" title=\"Therm americain\">thm</option>\n                <option ").concat(f("gt-lb"), " value=\"gt-lb\" title=\"foot-pound\">ft-lb</option>\n            </optgroup>\n            <optgroup label=\"Angle\">\n                <option ").concat(f("deg"), " value=\"deg\" title=\"degree\">deg</option>\n                <option ").concat(f("grad"), " value=\"grad\" title=\"grad\">grad</option>\n                <option ").concat(f("angular mil"), " value=\"angular mil\" title=\"angular mil\">angular mil</option>\n                <option ").concat(f("minute of arc"), " value=\"minute of arc\" title=\"minute of arc\">minute of arc</option>\n                <option ").concat(f("rad"), " value=\"rad\" title=\"radian\">rad</option>\n                <option ").concat(f("second of arc"), " value=\"second of arc\" title=\"second of arc\">second of arc</option>\n                <option ").concat(f("BTU"), " value=\"BTU\" title=\"british thermal unit\">BTU</option>\n                <option ").concat(f("thm"), " value=\"thm\" title=\"Therm americain\">thm</option>\n                <option ").concat(f("gt-lb"), " value=\"gt-lb\" title=\"foot-pound\">ft-lb</option>\n            </optgroup>\n        </select>\n    ");
}