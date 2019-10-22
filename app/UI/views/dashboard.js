function dashboardView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.add('project-dash');
    appContainer.classList.remove('project-single');
    let header = document.createElement('header');

    let logout = document.createElement('button');
    logout.id = 'logout';
    logout.innerHTML = 'Sign Out  <i style="margin-left: 4px;" class="fas fa-door-open"></i>';
    logout.addEventListener('click', () => {
        ws.close();
        firebase.auth().signOut();
    });
    header.appendChild(logout);
    let section = document.createElement('section');
    section.id = "project_section";
    section.innerHTML = "<div  class=\"loader\"></div>";
    section.style.overflow = "scroll";
    section.classList.add('r');
    section.classList.add('jc');
    section.classList.add('ac');
    section.classList.add('acfs');


    // each project here
    let myPrj = document.createElement('div');
    myPrj.classList = "rmd jfs w100 pl5";
    myPrj.innerHTML = "<h2 class='w100'>Your Cloud Projects</h2><br><div style='' class='r jc prmd22 ac'><i class='m2 r jc ac fas fa-search'></i> <input id = 'project_search'  onkeyup=\"projectSearch()\" placeholder='Search'><button id='project_search_clear'class='m2 r jc ac fas fa-times-circle'></button></div>";

    let footer = document.createElement('footer');
    // appContainer.appendChild(header);
    appContainer.appendChild(myPrj);
    appContainer.appendChild(section);
    appContainer.appendChild(footer);
    if(ws) getProjects(currentUid);
}