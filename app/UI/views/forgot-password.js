function forgotPasswordView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.remove('project-single');
    let forgotPasswordLogo = document.createElement('img');
    forgotPasswordLogo.src = "/images/logo.png";
    forgotPasswordLogo.width = '300';
    forgotPasswordLogo.style.marginBottom = "1rem";
    let message = document.createElement('h2');
    message.innerText = 'Enter your account email address.';
    appContainer.appendChild(forgotPasswordLogo);
    appContainer.appendChild(message);
    let forgotPasswordForm = document.createElement('form');
    forgotPasswordForm.id = "main_forgot_password";
    forgotPasswordForm.classList = 'c jc ac';
    let forgotPasswordEmail = document.createElement('input');
    forgotPasswordEmail.required = 'required';
    forgotPasswordEmail.type = 'email';
    forgotPasswordEmail.placeholder = 'Email Address';
    forgotPasswordEmail.id = `${forgotPasswordForm.id}_email`;
    forgotPasswordForm.appendChild(forgotPasswordEmail);
    let forgotPasswordSubmitButton = document.createElement('button');
    forgotPasswordSubmitButton.innerHTML = "Send Recovery Email";
    forgotPasswordSubmitButton.id = `${forgotPasswordForm.id}_submit`;
    forgotPasswordForm.appendChild(forgotPasswordSubmitButton);
    forgotPasswordForm.addEventListener("submit", function (e) {
        let email = document.getElementById(`${forgotPasswordForm.id}_email`);
        firebase.auth().sendPasswordResetEmail(email.value)
            .then(function () {
                // Password reset email sent.
                viewSwitcher('pw_reset_success');
            })
            .catch(function (error) {
                formError(error);
            });
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(forgotPasswordForm);
    let forgotPasswordSignInButton = document.createElement('a');
    forgotPasswordSignInButton.innerText = "Din't forget your password? Click Here to Sign In!";
    forgotPasswordSignInButton.addEventListener("mouseenter", function () {
        forgotPasswordSignInButton.style.color = "rgb(155, 85, 163)";
        forgotPasswordSignInButton.style.cursor = "pointer";
    });
    forgotPasswordSignInButton.addEventListener("mouseleave", function () {
        forgotPasswordSignInButton.style.color = "#000000";
        forgotPasswordSignInButton.style.cursor = "default";
    });
    forgotPasswordSignInButton.addEventListener("click", function (e) {
        viewSwitcher('sign_in');
        e.preventDefault();    //stop form from submitting
    });

    appContainer.appendChild(forgotPasswordSignInButton);
}