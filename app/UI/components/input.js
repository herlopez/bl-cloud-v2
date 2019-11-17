function h1(parentElement, options) {
    let h1 = document.createElement('h1');
    if(options.hasOwnProperty('innerText')) h1.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    h1.classList = options.classList;
    h1.id = options.id;
    parentElement.appendChild(h1);
}
function h2(parentElement, options) {
    let h2 = document.createElement('h2');
    if(options.hasOwnProperty('innerText')) h2.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    h2.classList = options.classList;
    h2.id = options.id;
    parentElement.appendChild(h2);
}
function p(parentElement, options) {
    let p = document.createElement('p');
    if(options.hasOwnProperty('innerText')) p.innerText = options.innerText;
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('classList')) options.classList = "";
    p.classList = options.classList;
    p.id = options.id;
    parentElement.appendChild(p);
}
function input(parentElement, options = {}){
    if(!options.hasOwnProperty('type')) options.type = 'text';
    if(!options.hasOwnProperty('placeholder')) options.placeholder = '';
    if(!options.hasOwnProperty('edit')) options.edit = false;
    if(!options.hasOwnProperty('value')) options.value = "";
    if(!options.hasOwnProperty('name')) options.name = "";
    if(!options.hasOwnProperty('id')) options.id = "";
    if(!options.hasOwnProperty('class')) options.class = "";
    if(!options.hasOwnProperty('autofocus')) options.autofocus = false;
    if(!options.hasOwnProperty('onSaveMessage')) options.onSaveMessage = "";
    if(!options.hasOwnProperty('disabled')) options.disabled = false;
    if(!options.hasOwnProperty('required')) options.required = false;
    if(!options.hasOwnProperty('onCancel')) options.onCancel = {};
    if(!options.hasOwnProperty('onSave')) options.onSave = {};
    if(!options.hasOwnProperty('manualMode')) options.manualMode = false;
    if(!options.hasOwnProperty('manualClass')) options.manualClass = "none";



    let disabled = "";
    let required = "";
    let autofocus = "off";

    if(options.disabled === true || options.edit === true) disabled = "disabled";
    if(options.required === true) required = "required";
    if(options.autofocus  === true || options.autofocus === "on")autofocus = "on";

    let inputContainer = document.createElement('div');
    inputContainer.classList.add('component-input');
    inputContainer.innerHTML = `<input max="30" ${required} ${disabled} autofocus = "${autofocus}"  class = "${options.class}" id = "${options.id}" name = "${options.name}" value = "${options.value}" type = "${options.type}" placeholder= "${options.placeholder}" >`;
    let inputTag = inputContainer.querySelector('input');

    if(options.edit === true){

        let editButton = document.createElement('i');
        let closeButton = document.createElement('i');
        let classWatcher;
        let popupError;
        closeButton.classList = 'fa fa-times dn';
        editButton.classList = 'fa fa-pencil-alt';
        let errorPopup = document.createElement('div');
        errorPopup.classList = "r ac jc dn error-popup px3 py1";
        errorPopup.innerHTML = '<i class="pr3 fa fa-exclamation"></i> <p></p><i class="fa fa-times-circle">';
        inputContainer.appendChild(errorPopup);
        inputTag.disabled = true;
        let oldInputValue = inputTag.value;
        function loaderMode(){
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.add('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }
        function editMode(){
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.add('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.remove('dn');
            inputTag.disabled = false;
            errorPopup.classList.add('dn');
        }
        function pencilMode(){
            editButton.classList.add('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }



        editButton.addEventListener('click', async () => {
            if (editButton.classList.contains('fa-pencil-alt')) {
                oldInputValue = inputTag.value;
                editMode();
            } else {
                console.log("Options", options);
                if (options.hasOwnProperty('onSave')) {
                    let timeout = setTimeout(() => {
                        inputTag.value = oldInputValue;
                        pencilMode();
                        inputContainer.querySelector('p').innerText = "Timeout!";
                        popupError = inputContainer.querySelector('.error-popup');
                        popupError.classList.remove('dn');
                        popupError.querySelector('.fa-times-circle').addEventListener('click', ()=>{
                            popupError.classList.add('dn');
                        });
                    }, 4000);
                    try {
                        loaderMode();
                        await options.onSave();

                        if(!options.manualClass){
                            popupError = inputContainer.querySelector('.error-popup');
                            popupError.innerHTML = '<i class="pr3 fa fa-check"></i> <p></p>';
                            popupError.classList.remove('dn');
                            setTimeout(()=>{
                                popupError.innerHTML = '<i class="pr3 fa fa-exclamation"></i> <p></p><i class="fa fa-times-circle">';
                                popupError.classList.remove('error-popup-success');
                                popupError.classList.add('dn');
                            }, 3000);
                            popupError.classList.add('error-popup-success');
                            inputContainer.querySelector('p').innerText = 'Success. ' + options.onSaveMessage;
                            pencilMode();
                            clearInterval(timeout);
                            inputTag.classList.remove('done');
                            inputTag.classList.remove('error');

                            clearInterval(classWatcher);
                        }else{

                            classWatcher = setInterval(()=>{
                                console.log(inputTag);
                                if(inputTag.classList.contains('done')){
                                    if(inputTag.classList.contains('error')){
                                        inputTag.value = oldInputValue;
                                        pencilMode();
                                        inputContainer.querySelector('p').innerText = inputTag.getAttribute('error');
                                        popupError = inputContainer.querySelector('.error-popup');
                                        popupError.classList.remove('dn');
                                        popupError.querySelector('.fa-times-circle').addEventListener('click', ()=>{
                                            popupError.classList.add('dn');
                                        });
                                        clearInterval(timeout);
                                    }
                                    else{
                                        popupError = inputContainer.querySelector('.error-popup');
                                        popupError.innerHTML = '<i class="pr3 fa fa-check"></i> <p></p>';
                                        popupError.classList.remove('dn');
                                        setTimeout(()=>{
                                            popupError.innerHTML = '<i class="pr3 fa fa-exclamation"></i> <p></p><i class="fa fa-times-circle">';
                                            popupError.classList.remove('error-popup-success');
                                            popupError.classList.add('dn');
                                        }, 3000);
                                        popupError.classList.add('error-popup-success');
                                        inputContainer.querySelector('p').innerText = 'Success. ' + options.onSaveMessage;
                                        pencilMode();
                                        clearInterval(timeout);
                                    }
                                    inputTag.classList.remove('done');
                                    inputTag.classList.remove('error');
                                    clearInterval(classWatcher);
                                }
                            }, 100);


                        }


                    } catch (e) {
                        inputTag.value = oldInputValue;
                        pencilMode();
                        if(e.message !== 'none'){
                        inputContainer.querySelector('p').innerText = e.message;
                        popupError = inputContainer.querySelector('.error-popup');
                        popupError.classList.remove('dn');
                        popupError.querySelector('.fa-times-circle').addEventListener('click', ()=>{
                            popupError.classList.add('dn');
                        });
                        }
                        clearInterval(timeout);
                        inputTag.classList.remove('done');
                        inputTag.classList.remove('error');
                        clearInterval(classWatcher);
                    }


                } else {
                    pencilMode();
                }
            }
        });

        closeButton.addEventListener('click', ()=>{
            pencilMode();
            inputTag.value = oldInputValue;
            if(options.hasOwnProperty('onCancel')) {
                options.onCancel();
            }
        });

        inputContainer.appendChild(editButton);
        inputContainer.appendChild(closeButton);

    }
    parentElement.appendChild(inputContainer);
    return inputTag;
}
