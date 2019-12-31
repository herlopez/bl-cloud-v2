function windowNewVariable(content) {
  content.classList.add('new-variable');
  content.innerHTML = "\n        <form id=\"new_variable\">\n            <h2>Create a New Variable</h2>\n            <p>Variable Name:</p>\n            <input class=\"\" required type=\"text\" id=\"project\" placeholder=\"My Variable Name...\">\n            <div class=\"r jc\">\n                <button>Create</button>\n                <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            </div>\n        </form>\n    ";
  content.addEventListener('submit', function (e) {
    createVariable(document.getElementById('project').value, currentUid);
    getProjects(currentUid);
    e.preventDefault(); //stop form from submitting
  });
  return content;
}