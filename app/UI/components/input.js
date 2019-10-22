function input(parentElement, options = {}){
    if(!options.hasOwnProperty('type')) options.type = 'text';
    if(!options.hasOwnProperty('placeholder')) options.placeholder = '';
    if(!options.hasOwnProperty('edit')) options.edit = false;
    if(!options.hasOwnProperty('value')) options.value = "";
    if(!options.hasOwnProperty('name')) options.name = "";
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('class')) options.class = "";
    if(!options.hasOwnProperty('autofocus')) options.autofocus = false;
    if(!options.hasOwnProperty('disabled')) options.disabled = false;
    if(!options.hasOwnProperty('required')) options.required = false;


    let disabled = "";
    let required = "";
    let autofocus = "off";

    if(options.disabled === true) disabled = "disabled";
    if(options.required === true) required = "required";
    if(options.autofocus  === true || options.autofocus === "on")autofocus = "on";

    let inputContainer = document.createElement('div');
    inputContainer.classList.add('component-input');
    inputContainer.innerHTML = `<input ${required} ${disabled} autofocus = "${autofocus}"  class = "${options.class}" id = "${options.id}" name = "${options.name}" value = "${options.value}" type = "${options.type}" placeholder= "${options.placeholder}" >`;

    if(options.edit === true){
        let editButton = document.createElement('i');
        editButton.classList = 'fa fa-pencil-alt';

        editButton.addEventListener('click', ()=>{
            if(editButton.ha)
        });
        inputContainer.appendChild(editButton);

        if(options.hasOwnProperty('onSave')) {

        }
        if(options.hasOwnProperty('onCancel')) {

        }
    }
    parentElement.appendChild(inputContainer);
}