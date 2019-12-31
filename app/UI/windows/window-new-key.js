function windowNewKey(content) {
    content.classList.add('c');
    content.classList.add('ac');
    content.classList.add('jc');
    content.style.maxWidth = '500px';
    content.innerHTML = `
        <h2>Are you sure you want to generate a new project key? <u style='color: red;'>All devices</u> using this key will need to have the new key implemented for all the devices connected to this project to continue functioning.</h2>
        <div class="r ac jc">
            <button onclick="windowSwitcher('none')">Cancel</button>
            <button onclick ="newProjectKey('${currentUid}', '${currentId}')" style="background: #8c2726;">New Key</button>
        </div>
    `;
    return content;
}