
function projectView(options){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.add('project-single');

    // Top bar stuff.
    let singleHeader = document.createElement('header');
    let backButton = document.createElement('button');
    backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
    backButton.addEventListener('click', ()=>{
        currentProject = null;
        viewSwitcher('dashboard');
    });
    singleHeader.appendChild(backButton);
    let singleLogout = document.createElement('button');
    singleLogout.id = 'logout';
    singleLogout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
    singleLogout.addEventListener('click', () => {
        ws.close();
        firebase.auth().signOut();
    });
    singleHeader.appendChild(singleLogout);
    appContainer.appendChild(singleHeader);

    let projectSection = document.createElement('section');
    projectSection.id = "project_projectSection";
    projectSection.innerHTML = "<div class=\"loader\"></div>";
    projectSection.style.overflow = "scroll";
    projectSection.classList.add('r');
    projectSection.classList.add('jc');
    projectSection.classList.add('ac');
    appContainer.appendChild(projectSection);
    getProject(currentUid, options);
}