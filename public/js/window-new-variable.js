/**
 * New Variable Window
 * @function WindowNewVariable
 * @return {string}
 */
function WindowNewVariable() {
  return "\n        <form id=\"new_variable\">\n            <h2>Create a New Variable</h2>\n            <p>Variable Name:</p>\n            <input class=\"\" required type=\"text\" id=\"project\" placeholder=\"My Variable Name...\">\n            <div class=\"r jc\">\n                <button>Create</button>\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            </div>\n        </form>\n    ";
}