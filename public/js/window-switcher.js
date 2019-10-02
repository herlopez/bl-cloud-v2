// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {
  var window = document.getElementById('window');

  function windowHide() {
    window.classList.remove('cr');
    window.classList.remove('ac');
    window.classList.remove('jc');
    window.classList.add('dn');
    window.innerHTML = '';
  }

  function windowShow() {
    window.classList.add('cr');
    window.classList.add('ac');
    window.classList.add('jc');
    window.classList.remove('dn');
    window.innerHTML = '';
  }

  switch (targetWindow) {
    // No window Shown.
    case 'none':
      windowHide();
      break;
    // Creating a new project window.

    case 'new_project':
      windowShow();
      var contentBlock = document.createElement('div');
      contentBlock.id = 'window_content_block';
      contentBlock.innerHTML = '<form id="create_project"> ' + '<h2>Create a New Project</h2>' + '<p>Project Name:</p>' + '<input required type="text" id="project" placeholder="My Project Name...">' + '<p>Project Description:</p>' + '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' + '<p>Make this project Private or Public:</p>' + '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' + '<label for="private">Private</label><br>' + '<input class="input-radio" type="radio" name="access" id="public" value="Public">' + '<label for="public">Public</label><br>' + '<div class="r ac"> <p>Project Color: </p>' + '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color"></div> ' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(contentBlock);
      document.getElementById('create_project').addEventListener('submit', function (e) {
        console.log("23");
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        console.log("234");
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
    // Create a new variable window.

    case 'new_variable':
      windowShow();
      var newVariableContentBlock = document.createElement('div');
      newVariableContentBlock.id = 'window_content_block';
      newVariableContentBlock.innerHTML = '<form id="new_variable"> ' + '<h2>Create a New Variable</h2>' + '<p>Variable Name:</p>' + '<input class="" required type="text" id="project" placeholder="My Variable Name...">' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(newVariableContentBlock);
      document.getElementById('new_variable').addEventListener('submit', function (e) {
        createVariable(document.getElementById('project').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
  }
}