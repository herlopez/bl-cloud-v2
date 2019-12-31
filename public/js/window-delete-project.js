function windowDeleteProject(content) {
  content.classList.add('c');
  content.classList.add('ac');
  content.classList.add('jc');
  content.style.maxWidth = '500px';
  content.innerHTML = "\n        <h2 style=\"text-align:center;\">ARE YOU SURE YOU WANT TO <u style='color: red;'>DELETE</u> THIS PROJECT?<br><br> <u style=\"color: red;\">All data</u> tied to this project will be lost if deleted.</h2>\n        <div class=\"r ac jc\">\n            <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            <button onclick =\"deleteProject(currentUid, currentId)\" style=\"background: #8c2726;\">DELETE</button>\n        </div>\n    ";
  return content;
}