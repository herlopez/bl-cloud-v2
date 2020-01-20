function windowDeleteProject(){
    return `
        <h2 style="max-width: 500px; text-align:center;">ARE YOU SURE YOU WANT TO <u style='color: red;'>DELETE</u> THIS PROJECT?<br><br> <u style="color: red;">All data</u> tied to this project will be lost if deleted.</h2>
        <div class="r ac jc">
            <button onclick="windowSwitcher('none')">Cancel</button>
            <button onclick ="deleteProject(currentUid, currentId)" style="background: #8c2726;">DELETE</button>
        </div>
    `;
}
