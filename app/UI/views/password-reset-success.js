function passwordResetSuccessView(){
    let appContainer = document.getElementById('app_container');
    appContainer.classList.remove('project-dash');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    let pwResetLogo = document.createElement('img');
    pwResetLogo.src = "/images/logo.png";
    pwResetLogo.width = '300';
    pwResetLogo.style.marginBottom = "1rem";
    appContainer.appendChild(pwResetLogo);
    let pwResetMsg = document.createElement('h2');
    pwResetMsg.innerText = "An email has been sent with a password reset link.";
    appContainer.appendChild(pwResetMsg);
    let pwResetLogoSignIn = document.createElement('button');
    pwResetLogoSignIn.id = 'logout';
    pwResetLogoSignIn.innerText = 'Sign In';
    pwResetLogoSignIn.addEventListener('click', () => {
        viewSwitcher('sign_in');
    });
    appContainer.appendChild(pwResetLogoSignIn);
}