// Project View
function projectView(id){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.add('project-single');

    // Top of container.
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

    //--  Left Menu in Container   --//
    let menu = document.createElement('div');
    menu.id = "menu_box";

    // Dashboard Tab
    let dashboard = document.createElement('div');
    dashboard.classList = "dashboard-button";
    dashboard.classList.add('dashboard-button-select');
    dashboard.id = "dashboard_trigger";
    dashboard.innerHTML = "<button><i class='fa fa-chart-bar'></i>Dashboard</button>";
    dashboard.addEventListener('click', ()=>{
        projectMenuSwitcher('dashboard', this);
    });

    // Variables Tab
    let variables = document.createElement('div');
    variables.classList = "dashboard-button";
    variables.id = "variables_trigger";
    variables.innerHTML = "<button><i class='fa fa-code'></i>Variables</button>";
    variables.addEventListener('click', ()=>{
        projectMenuSwitcher('variables', this);
    });

    // Charts Tab
    let charts = document.createElement('div');
    charts.classList = "dashboard-button";
    charts.id = "charts_trigger";
    charts.innerHTML = "<button><i class='fa fa-chart-pie'></i>Charts</button>";
    charts.addEventListener('click', ()=>{
        projectMenuSwitcher('charts', this);
    });

    // Settings Page
    let settings = document.createElement('div');
    settings.classList = "dashboard-button";
    settings.id = "settings_trigger";
    settings.innerHTML = "<button><i class='fa fa-cogs'></i>Project Settings</button>";
    settings.addEventListener('click', ()=>{
        projectMenuSwitcher('settings', this);
    });

    menu.appendChild(singleHeader);
    menu.appendChild(dashboard);
    menu.appendChild(variables);
    menu.appendChild(charts);
    menu.appendChild(settings);
    appContainer.appendChild(menu);
    //--  Left Menu in Container END   --//

    // Main Content
    let content = document.createElement('div');
    content.id = "content_box";
    appContainer.appendChild(content);

    // Select Dash tab
    projectMenuSwitcher('dashboard');
    getProject(currentUid, id);
    currentId = id;

}


// Menu Tab Switcher
function projectMenuSwitcher(target){

    // Highlight the proper tab.
    document.getElementById('menu_box').querySelectorAll('.dashboard-button').forEach((e)=>{
        e.classList.remove('dashboard-button-select');
    });
    let el = document.getElementById(`${target}_trigger`);

    // Get the content element and empty.
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = "";

    // Switch to the correct tab.
    switch (target) {

        case 'dashboard':
            projectTab = 'dashboard';
            el.classList.add('dashboard-button-select');
            let optionBar = document.createElement('div');
            optionBar.innerHTML =`
            <button onclick="windowSwitcher('widget_selection')">Add Widget</button>`;
            contentBox.appendChild(optionBar);
            contentBox.classList.add('c');
            let projectSectionDashboard = document.createElement('section');
            projectSectionDashboard.id = "project_section_dashboard";
            projectSectionDashboard.innerHTML = "<div class=\"loader\"></div>";
            projectSectionDashboard.style.overflow = "scroll";
            projectSectionDashboard.classList.add('r');
            projectSectionDashboard.classList.add('jc');
            projectSectionDashboard.classList.add('ac');
            contentBox.appendChild(projectSectionDashboard);
            getProject(currentUid, currentId);
            break;

        case 'variables':
            projectTab = 'variables';
            el.classList.add('dashboard-button-select');
            let projectSection = document.createElement('section');
            projectSection.id = "project_section_variables";
            projectSection.innerHTML = "<div class=\"loader\"></div>";
            projectSection.style.overflow = "scroll";
            projectSection.classList.add('r');
            projectSection.classList.add('jc');
            projectSection.classList.add('ac');
            contentBox.appendChild(projectSection);
            getProject(currentUid, currentId);
            break;

        case 'charts':
            projectTab = 'charts';
            el.classList.add('dashboard-button-select');
            break;

        case 'settings':
            projectTab = 'settings';
            el.classList.add('dashboard-button-select');
            break;
    }
}
