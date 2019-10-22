function input(parentElement) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!options.hasOwnProperty('type')) options.type = 'text';
  if (!options.hasOwnProperty('placeholder')) options.placeholder = '';
  if (!options.hasOwnProperty('edit')) options.edit = false;
  if (!options.hasOwnProperty('value')) options.value = "";
  if (!options.hasOwnProperty('name')) options.name = "";
  if (!options.hasOwnProperty('id')) options.id = "";
  if (!options.hasOwnProperty('class')) options["class"] = "";
  if (!options.hasOwnProperty('autofocus')) options.autofocus = false;
  if (!options.hasOwnProperty('disabled')) options.disabled = false;
  if (!options.hasOwnProperty('required')) options.required = false;
  var disabled = "";
  var required = "";
  var autofocus = "off";
  if (options.disabled === true) disabled = "disabled";
  if (options.required === true) required = "required";
  if (options.autofocus === true || options.autofocus === "on") autofocus = "on";
  var inputContainer = document.createElement('div');
  inputContainer.classList.add('component-input');
  inputContainer.innerHTML = "<input ".concat(required, " ").concat(disabled, " autofocus = \"").concat(autofocus, "\"  class = \"").concat(options["class"], "\" id = \"").concat(options.id, "\" name = \"").concat(options.name, "\" value = \"").concat(options.value, "\" type = \"").concat(options.type, "\" placeholder= \"").concat(options.placeholder, "\" >");

  if (options.edit === true) {
    var editButton = document.createElement('i');
    editButton.classList = 'fa fa-pencil-alt';
    editButton.addEventListener('click', function () {
      editButton.addEventListener('click', function () {});
    });
    inputContainer.appendChild(editButton);

    if (options.hasOwnProperty('onSave')) {}

    if (options.hasOwnProperty('onCancel')) {}
  }

  parentElement.appendChild(inputContainer);
}