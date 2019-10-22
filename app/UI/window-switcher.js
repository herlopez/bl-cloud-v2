

// Function that opens a pop up window.
function windowSwitcher(targetWindow, options){
    console.log('targetWindow: ', targetWindow);
    let window = document.getElementById('window');

    function windowHide(){
        window.classList.remove('cr');
        window.classList.remove('ac');
        window.classList.remove('jc');
        window.classList.add('dn');
        window.innerHTML = '';
    }
    function windowShow(){
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

        case 'profile_settings':
            document.getElementById('profile_window').classList.add('dn');
            windowHide();
            windowShow();
            let profileSettings = document.createElement('div');
            profileSettings.id = 'window_content_block';
            profileSettings.classList.add('update-profile');
            var user = firebase.auth().currentUser;
            profileSettings.innerHTML =
                '<form id="update_profile">   ' +
                '    <h2>Profile Settings</h2>' +
                '    <p>Display Name:</p>' +
                `    <div id="display_mame" class="r ac jc">
                        <input required type="text" value="${user.displayName}" disabled>
                        <div class="fa fa-pencil-alt">
                        </div>
                    </div>` +
                '    <p>Email Address:</p>' +
                `    <div class="r ac jc"><input type = "email"  value="${user.email}" required disabled ><div class="fa fa-pencil-alt"></div></div>` +
                '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
                `    <button onclick="windowSwitcher('none')">Close</button></div>` +
                '</form>';
            input(window, {
                type: 'test',
                placeholder: 'Display Name',
                edit: true,
                value: user.displayName,
                required: true,
                disabled: false
            });
            window.appendChild(profileSettings);
            let displayName =  document.getElementById('display_mame');
            let nameButtonEdit = displayName.querySelector('.fa-pencil-alt');

            nameButtonEdit.addEventListener('click', ()=>{
                nameButtonEdit.classList.remove('fa-pencil-alt');
                // nameButtonEdit.classList.add('double-button');
                nameButtonEdit.style.color = 'green';
                nameButtonEdit.classList.add('fa-check');

                let cancelButton = document.createElement('div');
                cancelButton.classList = 'fa fa-times';
                cancelButton.style.color = 'red';
                displayName.appendChild(cancelButton);
            });
            break;
        // Creating a new project window.
        case 'new_project':
            windowShow();
            let contentBlock = document.createElement('div');
            contentBlock.id = 'window_content_block';
            contentBlock.innerHTML =
                '<form id="create_project"> ' +
                '<h2>Create a New Project</h2>' +
                '<p>Project Name:</p>' +
                '<input required type="text" id="project" placeholder="My Project Name...">' +
                '<p>Project Description:</p>' +
                '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' +
                '<p>Make this project Private or Public:</p>' +
                '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' +
                '<label for="private">Private</label><br>' +
                '<input class="input-radio" type="radio" name="access" id="public" value="Public">'+
                '<label for="public">Public</label><br>' +
                // '<div class="r ac"> <p>Project Color: </p>'+
                '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> '+
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(contentBlock);
            document.getElementById('create_project').addEventListener('submit',(e) => {
                createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value,document.getElementById('color').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
            });
            break;

        // Create a new variable window.
        case 'new_variable':
            windowShow();
            let newVariableContentBlock = document.createElement('div');
            newVariableContentBlock.id = 'window_content_block';
            newVariableContentBlock.innerHTML =
                '<form id="new_variable"> ' +
                '<h2>Create a New Variable</h2>' +
                '<p>Variable Name:</p>' +
                '<input class="" required type="text" id="project" placeholder="My Variable Name...">' +
                '<div class="r jc"><button >Create</button>' +
                `<button onclick="windowSwitcher('none')">Cancel</button></div>` +
                '</form>';
            window.appendChild(newVariableContentBlock);
            document.getElementById('new_variable').addEventListener('submit',(e) => {
                createVariable(document.getElementById('project').value, currentUid);
                getProjects(currentUid);
                e.preventDefault();    //stop form from submitting
            });
            break;
    }
}
