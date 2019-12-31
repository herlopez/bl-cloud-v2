function windowDoubleCheck(content, options){
    content.classList.add('c');
    content.classList.add('ac');
    content.classList.add('jc');
    content.style.maxWidth = '500px';
    content.innerHTML= `
        <h2 style="text-align:center;">ARE YOU SURE YOU WANT TO <u style="color: red;">DELETE</u> THIS VARIABLE?<br>
        <div class="r ac jc">
            <button onclick="windowSwitcher('none')">Cancel</button>
            <button onclick ="deleteVariable('${currentUid}','${currentKey}','${options}')" style="background: #8c2726;">DELETE</button>
        </div>
    `;
    return content;
}