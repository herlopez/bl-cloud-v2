/**
 * New Project Window
 * @function WindowNewProject
 * @return {string}
 */
function WindowNewProject() {
  return "\n        <form id=\"create_project\"> \n            <h2>Create a New Project</h2>\n            <p>Project Name:</p>\n            <input required type=\"text\" id=\"project\" placeholder=\"My Project Name...\">\n            <p>Project Description:</p>\n            <textarea id=\"desc\" placeholder=\"Project Description...\" required> </textarea> \n            <p>Make this project Private or Public:</p>\n            <input class=\"input-radio\" type=\"radio\" checked=\"checked\" name=\"access\"  id=\"private\" value=\"Private\">\n            <label for=\"private\">Private</label><br>\n            <input class=\"input-radio\" type=\"radio\" name=\"access\" id=\"public\" value=\"Public\">\n            <label for=\"public\">Public</label><br>\n            <input id=\"color\" style=\"margin-left: 4px; margin-top: 4px;\" value=\"#9b55a3\" type=\"color\" hidden></div> \n            <div class=\"r jc\">\n                <button >Create</button>\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            </div>\n        </form>\n    ";
}