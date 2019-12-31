function windowNewVariable(content){
    content.classList.add('new-variable');
    content.innerHTML = `
        <form id="new_variable">
            <h2>Create a New Variable</h2>
            <p>Variable Name:</p>
            <input class="" required type="text" id="project" placeholder="My Variable Name...">
            <div class="r jc">
                <button>Create</button>
                <button onclick="windowSwitcher('none')">Cancel</button>
            </div>
        </form>
    `;
    content.addEventListener('submit', (e) => {
        createVariable(document.getElementById('project').value, currentUid);
        getProjects(currentUid);
        e.preventDefault();    //stop form from submitting
    });
    return content;
}
        
