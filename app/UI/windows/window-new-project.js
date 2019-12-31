function windowNewProject(content){
    content.innerHTML = `
        <form id="create_project"> 
            <h2>Create a New Project</h2>
            <p>Project Name:</p>
            <input required type="text" id="project" placeholder="My Project Name...">
            <p>Project Description:</p>
            <textarea id="desc" placeholder="Project Description..." required> </textarea> 
            <p>Make this project Private or Public:</p>
            <input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">
            <label for="private">Private</label><br>
            <input class="input-radio" type="radio" name="access" id="public" value="Public">
            <label for="public">Public</label><br>
            <input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> 
            <div class="r jc">
                <button >Create</button>
                <button onclick="windowSwitcher('none')">Cancel</button>
            </div>
        </form>
    `;
    content.addEventListener('submit', (e) => {
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        e.preventDefault();    //stop form from submitting
    });
    return content;
}