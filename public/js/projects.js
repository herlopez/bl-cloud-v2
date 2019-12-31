function paintProjects(projects) {
  var projectSection = document.getElementById('project_section');

  if (projectSection.classList.contains('hold')) {
    return;
  }

  if (currentWindow === "new_project") {
    windowSwitcher('none');
  }

  projectSection.classList.add('jc');
  projectSection.classList.remove('ac');
  projectSection.style.flexWrap = 'wrap';
  projectSection.style.overflow = 'visible';
  projectSection.style.maxWidth = "1500px";
  projectSection.style.minHeight = "100vh";
  projectSection.style.height = "100%";
  projectSection.innerHTML = "";
  var newButton = document.createElement('button');
  newButton.innerHTML = "<i class=\"fas fa-plus\"></br></br>Add Project</i>";
  newButton.style.height = "200px";
  newButton.style.minWidth = "300px";
  newButton.style.maxWidth = "300px";
  newButton.style.color = "#9b55a3";
  newButton.style.background = "rgba(3, 4, 8, 0.46)";
  newButton.addEventListener('click', function () {
    windowSwitcher('new_project');
  });
  projectSection.appendChild(newButton);

  for (var project in projects) {
    if (projects.hasOwnProperty(project)) {
      (function () {
        var div = document.createElement('button');
        div.style.height = "200px";
        div.style.minWidth = "300px";
        div.style.maxWidth = "300px"; // div.style.background = projects[project]['color'];

        div.style.background = "rgba(3, 4, 8, 0.46)";
        div.id = projects[project]['id'];
        div.borderRadius = "10px";
        div.innerHTML = "<h3>".concat(projects[project]['name'], "</h3><p>").concat(projects[project]['description'], "</p><i class=\"fa fa-code\"</i> ").concat(projects[project]['variableCount'], " <i class=\"fa fa-chart-bar\"</i> ").concat(projects[project]['chartCount'], " ");
        div.addEventListener('click', function () {
          viewSwitcher('project', div.id);
        });
        projectSection.appendChild(div);
      })();
    }
  }
}

function projectSearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("project_search");
  filter = input.value.toUpperCase();
  var clearButton = document.getElementById("project_search_clear");
  clearButton.addEventListener('click', function () {
    input.value = '';
    document.getElementById("project_search_clear").style.color = 'transparent';
    ul = document.getElementById("project_section");
    li = ul.getElementsByTagName("button");

    for (i = 1; i < li.length; i++) {
      a = li[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;

      if (txtValue.toUpperCase().indexOf("") > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  });

  if (filter.length > 0) {
    clearButton.style.color = '#9b55a3';
  } else {
    clearButton.style.color = 'transparent';
  }

  ul = document.getElementById("project_section");
  li = ul.getElementsByTagName("button");

  for (i = 1; i < li.length; i++) {
    a = li[i].getElementsByTagName("h3")[0];
    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}