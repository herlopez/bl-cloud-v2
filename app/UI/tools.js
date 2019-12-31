// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
(function (funcName, baseObj) {funcName = funcName || "docReady";baseObj = baseObj || window;let readyList = [];let readyFired = false;let readyEventHandlersInstalled = false;function ready() {if (!readyFired) {readyFired = true;for (let i = 0; i < readyList.length; i++) {readyList[i].fn.call(window, readyList[i].ctx);}readyList = [];}}function readyStateChange() {if (document.readyState === "complete") {ready();}}baseObj[funcName] = function (callback, context) {if (typeof callback !== "function") {throw new TypeError("callback for docReady(fn) must be a function");}if (readyFired) {setTimeout(function () {callback(context);}, 1);return;} else {readyList.push({fn: callback, ctx: context});}if (document.readyState === "complete") {setTimeout(ready, 1);} else if (!readyEventHandlersInstalled) {if (document.addEventListener) {document.addEventListener("DOMContentLoaded", ready, false);window.addEventListener("load", ready, false);} else {document.attachEvent("onreadystatechange", readyStateChange);window.attachEvent("onload", ready);}readyEventHandlersInstalled = true;}}})("docReady", window);
var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

function windowError(window, msg){
    let appContainer = document.getElementById(window);
    // Try to remove the previous error message.
    try {
        document.getElementById('error_message').remove();
    } catch (e) {
    }
    let errorMessage = document.createElement('div');
    errorMessage['innerText'] = msg;
    errorMessage.style.color = 'red';
    errorMessage.style.margin = '1rem';
    errorMessage.id = 'error_message';
    errorMessage.style.textAlign = 'center';
    appContainer.appendChild(errorMessage);
}
function formError(msg) {
    let appContainer = document.getElementById('app_container');
    // Try to remove the previous error message.
    try {
        document.getElementById('error_message').remove();
    } catch (e) {
    }
    let errorMessage = document.createElement('div');
    errorMessage['innerText'] = msg;
    errorMessage.style.color = 'red';
    errorMessage.style.margin = '1rem';
    errorMessage.id = 'error_message';
    appContainer.appendChild(errorMessage);
}

function unitsList(id = "", onInput = ()=>{},  value=''){
    function f(current){
        if(value === current) return 'selected';
        else return '';
    }
    return`
        <select oninput="${onInput}" id="${id}">
             <optgroup label="General">
                <option ${f('')}  value="">None</option>
                <option ${f('%')}  value="%">%</option>
            </optgroup>
            <optgroup label="Temperature">
                <option ${f("°C")} value="°C" title="celsius">°C</option>
                <option ${f("°F")} value="°F" title="fahrenheit">°F</option>
                <option ${f("K")} value="K" title="kelvin">K</option>
                <option ${f("°Ré")} value="°Ré" title="reaumur">°Ré</option>
                <option ${f("°N")} value="°N" title="newton">°N</option>
                <option ${f("°Ra")} value="°Ra" title="rankine">°Ra</option>
            </optgroup>
            <optgroup label="Volume">
                 <option ${f("m³")} value="m³" title="cubic meter">m³</option>
                 <option ${f("dm³")} value="dm³" title="cubic decimeter">dm³</option>
                 <option ${f("cm³")} value="cm³" title="cubic centimeter">cm³</option>
                 <option ${f("l")} value="l" title="liter">l</option>
                 <option ${f("dl")} value="dl" title="deciliter">dl</option>
                 <option ${f("cl")} value="cl" title="centiliter">cl</option>
                 <option ${f("ml")} value="ml" title="milliliter">ml</option>
                 <option ${f("oz")} value="oz" title="fluid ounce">oz</option>
                 <option ${f("in³")} value="in³" title="cubic inch">in³</option>
                 <option ${f("ft³")} value="ft³" title="cubic foot">ft³</option>
                 <option ${f("yd³")} value="yd³" title="cubic yard">yd³</option>
                 <option ${f("gal")} value="gal" title="gallon uk">gal</option>
                 <option ${f("bbl")} value="bbl" title="petroleum barrel">bbl</option>
                 <option ${f("pt")} value="pt" title="pint">pt</option>
            </optgroup>
            <optgroup label="Distance">
                <option ${f("km")} value="km" title="kilometer">km</option>
                <option ${f("m")} value="m" title="meter">m</option>
                <option ${f("dm")} value="dm" title="decimeter">dm</option>
                <option ${f("cm")} value="cm" title="centimeter">cm</option>
                <option ${f("mm")} value="mm" title="millimeter">mm</option>
                <option ${f("mi")} value="mi" title="mile">mi</option>
                <option ${f("in")} value="in" title="inch">in</option>
                <option ${f("ft")} value="ft" title="foot">ft</option>
                <option ${f("yd")} value="yd" title="yard">yd</option>
            </optgroup>
            <optgroup label="Mass">
                <option ${f("t")} value="t" title="tonne">t</option>
                <option ${f("kg")} value="kg" title="kilogram">kg</option>
                <option ${f("hg")} value="hg" title="hectogram">hg</option>
                <option ${f("g")} value="g" title="gram">g</option>
                <option ${f("dg")} value="dg" title="decigram">dg</option>
                <option ${f("cg")} value="cg" title="centigram">cg</option>
                <option ${f("mg")} value="mg" title="milligram">mg</option>
                <option ${f("µg")} value="µg" title="microgram">µg</option>
                <option ${f("carat")} value="carat" title="carat">carat</option>
                <option ${f("grain")} value="grain" title="grain">grain</option>
                <option ${f("oz")} value="oz" title="pounce avoirdupois">oz</option>
                <option ${f("lb")} value="lb" title="pound avoirdupois">lb</option>
                <option ${f("cwt")} value="cwt" title="long hundredweight">cwt</option>
                <option ${f("ton")} value="ton" title="ton">ton</option>
                <option ${f("st")} value="st" title="stone">st</option>
            </optgroup>
            <optgroup label="Area">
                <option ${f("km²")} value="km²" title="square kilometer">km²</option>
                <option ${f("m²")} value="m²" title="square meter">m²</option>
                <option ${f("dm²")} value="dm²" title="square decimeter">dm²</option>
                <option ${f("cm²")} value="cm²" title="square centimeter">cm²</option>
                <option ${f("TB")} value="TB" title="square milimeter">TB</option>
                <option ${f("ha")} value="ha" title="hectare">ha</option>
                <option ${f("a")} value="a" title="are">a</option>
                <option ${f("ca")} value="ca" title="centiare">ca</option>
                <option ${f("mile²")} value="mile²" title="square mile">mile²</option>
                <option ${f("in²")} value="in²" title="square inch">in²</option>
                <option ${f("yd²")} value="yd²" title="square yard">yd²</option>
                <option ${f("ft²")} value="ft²" title="square foot">ft²</option>
                <option ${f("ro")} value="ro" title="rood">ro</option>
                <option ${f("acre")} value="acre" title="acre">acre</option>
                <option ${f("nautical mile²")} value="nautical mile²" title="square nautical mile">nautical mile²</option>
            </optgroup>
            <optgroup label="Speed">
                <option ${f("kmph")} value="kmph" title="kilometer per hour">kph</option>
                <option ${f("mps")} value="mps" title="mile per second">mps</option>
                <option ${f("mph")} value="mph" title="mile per hour">mph</option>
                <option ${f("knot")} value="knot" title="knot">knot</option>
                <option ${f("ma")} value="ma" title="mac">ma</option>
                <option ${f("a")} value="a" title="are">mg</option>
            </optgroup>
            <optgroup label="Data byte">
                <option ${f("b")} value="b" title="bit">b</option>
                <option ${f("B")} value="B" title="byte">B</option>
                <option ${f("KB")} value="KB" title="kilobyte">KB</option>
                <option ${f("MB")} value="MB" title="megabyte">MB</option>
                <option ${f("GB")} value="GB" title="gigabyte">GB</option>
                <option ${f("TB")} value="TB" title="terabyte">TB</option>
                <option ${f("PB")} value="PB" title="petabyte">PB</option>
                <option ${f("EB")} value="EB" title="exabyte">EB</option>
                <option ${f("ZB")} value="ZB" title="zettabyte">ZB</option>
                <option ${f("YB")} value="YB" title="yottabyte">YB</option>
            </optgroup>
            <optgroup label="Time">
                <option ${f("year")} value="year" title="common year">year</option>
                <option ${f("week")} value="week" title="week">week</option>
                <option ${f("day")} value="day" title="day">day</option>
                <option ${f("h")} value="h" title="hour">h</option>
                <option ${f("min")} value="min" title="minute">min</option>
                <option ${f("s")} value="s" title="second">s</option>
                <option ${f("ms")} value="ms" title="millisecond">ms</option>
                <option ${f("µs")} value="µs" title="microsecond">µs</option>
                <option ${f("nanosecond")} value="nanosecond" title="nanosecond">nanosecond</option>
                <option ${f("picosecond")} value="picosecond" title="picosecond">picosecond</option>
                <option ${f("femtosecond")} value="femtosecond" title="femtosecond">femtosecond</option>
                <option ${f("attosecond")} value="attosecond" title="attosecond">attosecond</option>
            </optgroup>  
            <optgroup label="Frequency">
                <option ${f("Hz")} value="Hz" title="Hertz">Hz</option>
                <option ${f("KHz")} value="KHz" title="K">KHz</option>
                <option ${f("MHz")} value="MHz" title="megahertz">MHz</option>
                <option ${f("GHz")} value="GHz" title="Gigahertz">GHz</option>
            </optgroup>
            <optgroup label="Pressure">
                <option ${f("atm")} value="atm" title="atmosphere">atm</option>
                <option ${f("bar")} value="bar" title="bar">bar</option>
                <option ${f("mbar")} value="mbar" title="millibar">mbar</option>
                <option ${f("Pa")} value="Pa" title="Pascal">Pa</option>
                <option ${f("hPa")} value="hPa" title="hectopascal">hPa</option>
                <option ${f("Psi")} value="Psi" title="pounds per square inch">Psi</option>
                <option ${f("Torr")} value="Torr" title="torr">torr</option>
            </optgroup>
            <optgroup label="Energy">
                <option ${f("J")} value="J" title="joule">J</option>
                <option ${f("KJ")} value="KJ" title="kilojoule">KJ</option>
                <option ${f("cal")} value="cal" title="calorie">cal</option>
                <option ${f("kcal")} value="kcal" title="kilocalorie">kcal</option>
                <option ${f("Wh")} value="Wh" title="watt-hour">Wh</option>
                <option ${f("kWh")} value="kWh" title="kilowatt-hour">kWh</option>
                <option ${f("BTU")} value="BTU" title="british thermal unit">BTU</option>
                <option ${f("thm")} value="thm" title="Therm americain">thm</option>
                <option ${f("gt-lb")} value="gt-lb" title="foot-pound">ft-lb</option>
            </optgroup>
            <optgroup label="Angle">
                <option ${f("deg")} value="deg" title="degree">deg</option>
                <option ${f("grad")} value="grad" title="grad">grad</option>
                <option ${f("angular mil")} value="angular mil" title="angular mil">angular mil</option>
                <option ${f("minute of arc")} value="minute of arc" title="minute of arc">minute of arc</option>
                <option ${f("rad")} value="rad" title="radian">rad</option>
                <option ${f("second of arc")} value="second of arc" title="second of arc">second of arc</option>
                <option ${f("BTU")} value="BTU" title="british thermal unit">BTU</option>
                <option ${f("thm")} value="thm" title="Therm americain">thm</option>
                <option ${f("gt-lb")} value="gt-lb" title="foot-pound">ft-lb</option>
            </optgroup>
        </select>
    `;
}