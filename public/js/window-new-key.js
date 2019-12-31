function windowNewKey(content) {
  content.classList.add('c');
  content.classList.add('ac');
  content.classList.add('jc');
  content.style.maxWidth = '500px';
  content.innerHTML = "\n        <h2>Are you sure you want to generate a new project key? <u style='color: red;'>All devices</u> using this key will need to have the new key implemented for all the devices connected to this project to continue functioning.</h2>\n        <div class=\"r ac jc\">\n            <button onclick=\"windowSwitcher('none')\">Cancel</button>\n            <button onclick =\"newProjectKey('".concat(currentUid, "', '").concat(currentId, "')\" style=\"background: #8c2726;\">New Key</button>\n        </div>\n    ");
  return content;
}