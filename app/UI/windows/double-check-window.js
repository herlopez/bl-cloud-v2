/**
 * @return {string}
 */
function DoubleCheckWindow(options){
    return `
        <h2 style="max-width:500px; text-align:center;">ARE YOU SURE YOU WANT TO <u style="color: red;">DELETE</u> THIS VARIABLE?<br>
        <div class="r ac jc">
            <button onclick="windowSwitcher('none')">Cancel</button>
            <button onclick ="deleteVariable('${currentUid}','${currentKey}','${options}')" style="background: #8c2726;">DELETE</button>
        </div>
    `;}
