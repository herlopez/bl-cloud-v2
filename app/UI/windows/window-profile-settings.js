function windowProfileSettings(content) {

    document.getElementById('profile_window').classList.add('dn');
    content.id = 'window_content_block';
    content.classList.add('update-profile');
    let user = firebase.auth().currentUser;
    let profileSettingsForm = document.createElement('form');
    profileSettingsForm.id = 'update_profile';
    h2(content, {
        innerText: "Profile Settings"
    });

    p(content, {
        innerText: "Display Name"
    });

    let displayNameInput = input(content, {
        type: 'test',
        edit: true,
        onSaveMessage: "Display name has been changed.",
        value: user.displayName,
        required: true,
        disabled: true,
        onSave: async () => {
            console.log("Save");
            if (user.displayName === displayNameInput.value) {
                throw new Error('none');
            }
            user.updateProfile({
                displayName: displayNameInput.value
            }).then(function () {
                displayNameInput.value = user.displayName;
                setProfileInformation(user);
            }).catch(function (error) {
                throw error;
            });
        }
    });

    p(content, {
        innerText: "Email Address"
    });
    let emailInput = input(content, {
        type: 'email',
        edit: true,
        onSaveMessage: "A verification email was sent to your new email address.",
        value: user.email,
        required: true,
        onSave: async function () {
            console.log("Save: ", emailInput.value);
            if (user.email === emailInput.value) {
                throw new Error('none');
            }
            await user.updateEmail(emailInput.value).then(async function () {
                await user.sendEmailVerification().then(function () {
                }).catch(function (error) {
                    throw error;
                });
            }).catch(function (error) {
                throw error;
            }).then(() => {
                setProfileInformation(user);
            });

        },
        disabled: true
    });

    p(content, {
        innerText: "Password"
    });
    let passwordInput = input(content, {
        type: 'password',
        edit: true,
        onSaveMessage: "Your password has been changed.",
        value: "******",
        required: true,
        onSave: async function () {

            if (passwordInput.value !== "******") {
                await user.updatePassword(passwordInput.value).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    throw error;
                });
            } else {
                throw new Error('none');
            }

        },
        disabled: true
    });

    let closeContent = document.createElement('div');
    closeContent.classList = "c ac jc w100";
    closeContent.innerHTML = '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
        `    <button onclick="windowSwitcher('none')">Close</button></div>`;
    content.appendChild(closeContent);
    return content;
}