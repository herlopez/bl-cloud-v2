function viewSwitcher(targetView, options) {
    currentView = targetView;
    switch (targetView) {

        case 'projectSingle':
            projectView(options);
            break;

        case 'forgot_password':
            forgotPasswordView();
            break;

        case 'sign_up':
            signUpView();
            break;

        case 'dashboard':
            dashboardView();
            break;

        case 'pw_reset_success':
            passwordResetSuccessView();
            break;

        case 'sign_in':
            signInView();
            break;

        default:
            viewSwitcher('sign_in');
            break;
    }
}