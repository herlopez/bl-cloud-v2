/**
 * @return {string}
 */
function DoubleCheckWindow(options) {
  return "\n        <h2 style=\"max-width:500px; text-align:center;\">ARE YOU SURE YOU WANT TO <u style=\"color: red;\">DELETE</u> THIS VARIABLE?<br>\n        <div class=\"r ac jc\">\n            <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            <button onclick =\"deleteVariable('".concat(currentUid, "','").concat(currentKey, "','").concat(options, "')\" style=\"background: #8c2726;\">DELETE</button>\n        </div>\n    ");
}