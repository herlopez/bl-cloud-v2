
function projectView(id){

    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.add('project-single');

    // Top bar stuff.
    let singleHeader = document.createElement('header');
    singleHeader.style.padding = 0;
    let backButton = document.createElement('button');
    backButton.style.marginTop = 0;
    backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
    backButton.addEventListener('click', ()=>{
        currentProject = null;
        viewSwitcher('dashboard');
    });
    singleHeader.appendChild(backButton);
    let menu = document.createElement('div');
    menu.id = "menu_box";

    let dashboard = document.createElement('div');

    dashboard.classList = "dashboar-button";
    dashboard.inneinneeHTML = "<i class='fa fa-chart'></i>Dashboard"
    menu.appendChild(dashboard);




    appContainer.appendChild(menu);




    menu.appendChild(singleHeader);
    let content = document.createElement('div');
    content.id = "content_box";
    appContainer.appendChild(content);

    let projectSection = document.createElement('section');
    projectSection.id = "project_projectSection";
    projectSection.innerHTML = "<div class=\"loader\"></div>";
    projectSection.style.overflow = "scroll";
    projectSection.classList.add('r');
    projectSection.classList.add('jc');
    projectSection.classList.add('ac');
    content.appendChild(projectSection);
    getProject(currentUid, id);
}