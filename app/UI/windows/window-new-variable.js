/**
 * New Variable Window
 * @function WindowNewVariable
 * @return {string}
 */
function WindowNewVariable(){
    return `
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
}
