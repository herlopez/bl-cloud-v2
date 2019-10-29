/*
    Projects View
    Description: Shows all the users projects.
*/
function projectsView() {
  // Empty the app container
  var appContainer = document.getElementById('app_container');
  appContainer.innerHTML = '';
  appContainer.style.userSelect = 'none';
  appContainer.classList.add('project-dash');
  appContainer.classList.remove('project-single'); // Add a loader until the projects get populated.

  var section = document.createElement('section');
  section.id = "project_section";
  section.innerHTML = "<div  class=\"loader\"></div>";
  section.style.overflow = "scroll";
  section.classList = 'r jc ac acfs'; // Add a search bar to search threw all a users projects.

  var search = document.createElement('div');
  search.classList = "rmd jfs w100 pl5";
  search.innerHTML = "<h2 class='w100'>Your Cloud Projects</h2><br><div style='' class='r jc prmd22 ac'><i class='m2 r jc ac fas fa-search'></i> <input id = 'project_search'  onkeyup=\"projectSearch()\" placeholder='Search'><button id='project_search_clear'class='m2 r jc ac fas fa-times-circle'></button></div>"; // Add the elements to the app.

  appContainer.appendChild(search);
  appContainer.appendChild(section); // Send the request to the server to send the users projects.

  if (ws) getProjects(currentUid);
}