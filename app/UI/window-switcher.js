

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
            let user = firebase.auth().currentUser;
            let profileSettingsForm = document.createElement('form');
            profileSettingsForm.id = 'update_profile';
            h2(profileSettings, {
                innerText: "Profile Settings"
            });

            p(profileSettings, {
                innerText: "Display Name"
            });

            let displayNameInput = input(profileSettings, {
                type: 'test',
                edit: true,
                onSaveMessage: "Display name has been changed.",
                value: user.displayName,
                required: true,
                disabled: true,
                onSave : async () =>{
                    console.log("Save");
                    if( user.displayName === displayNameInput.value){
                        throw new Error('none');
                    }
                    user.updateProfile({
                        displayName: displayNameInput.value
                    }).then(function() {
                        displayNameInput.value = user.displayName;
                        setProfileInformation(user);
                    }).catch(function(error) {
                        throw error;
                    });
                }
            });

            p(profileSettings, {
                innerText: "Email Address"
            });
            let emailInput = input(profileSettings, {
                    type: 'test',
                    edit: true,
                    onSaveMessage: "A verification email was sent to your new email address.",
                    value: user.email,
                    required: true,
                    onSave : async function () {
                        console.log("Save: ", emailInput.value);
                        if( user.email === emailInput.value){
                            throw new Error('none');
                        }
                        await user.updateEmail(emailInput.value).then(async function () {
                            await user.sendEmailVerification().then(function () {
                            }).catch(function (error) {
                                throw error;
                            });
                        }).catch(function (error) {
                            throw error;
                        }).then(()=>{
                            setProfileInformation(user);
                        });

                    },
                disabled: true
            });

            p(profileSettings, {
                innerText: "Password"
            });
            let passwordInput = input(profileSettings, {
                type: 'password',
                edit: true,
                onSaveMessage: "Your password has been changed.",
                value: "******",
                required: true,
                onSave : async function () {

                    if(passwordInput.value !== "******"){
                        await user.updatePassword(passwordInput.value).then(function() {
                            // Update successful.
                        }).catch(function(error) {
                            throw error;
                        });
                    }else {
                        throw new Error('none');
                    }

                },
                disabled: true
            });

            let closeContent = document.createElement('div');
            closeContent.classList = "c ac jc w100";
            closeContent.innerHTML ='    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
                `    <button onclick="windowSwitcher('none')">Close</button></div>`;
            profileSettings.appendChild(closeContent);
            window.appendChild(profileSettings);
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
