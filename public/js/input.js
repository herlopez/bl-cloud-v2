function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function h1(parentElement, options) {
  var h1 = document.createElement('h1');
  if (options.hasOwnProperty('innerText')) h1.innerText = options.innerText;
  if (!options.hasOwnProperty('id')) options.id = "";
  if (!options.hasOwnProperty('classList')) options.classList = "";
  h1.classList = options.classList;
  h1.id = options.id;
  parentElement.appendChild(h1);
}

function h2(parentElement, options) {
  var h2 = document.createElement('h2');
  if (options.hasOwnProperty('innerText')) h2.innerText = options.innerText;
  if (!options.hasOwnProperty('id')) options.id = "";
  if (!options.hasOwnProperty('classList')) options.classList = "";
  h2.classList = options.classList;
  h2.id = options.id;
  parentElement.appendChild(h2);
}

function p(parentElement, options) {
  var p = document.createElement('p');
  if (options.hasOwnProperty('innerText')) p.innerText = options.innerText;
  if (!options.hasOwnProperty('id')) options.id = "";
  if (!options.hasOwnProperty('classList')) options.classList = "";
  p.classList = options.classList;
  p.id = options.id;
  parentElement.appendChild(p);
}

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
  if (!options.hasOwnProperty('onSaveMessage')) options.onSaveMessage = "";
  if (!options.hasOwnProperty('disabled')) options.disabled = false;
  if (!options.hasOwnProperty('required')) options.required = false;
  if (!options.hasOwnProperty('onCancel')) options.onCancel = {};
  if (!options.hasOwnProperty('onSave')) options.onSave = {};
  if (!options.hasOwnProperty('manualMode')) options.manualMode = false;
  if (!options.hasOwnProperty('manualClass')) options.manualClass = "none";
  var disabled = "";
  var required = "";
  var autofocus = "off";
  if (options.disabled === true || options.edit === true) disabled = "disabled";
  if (options.required === true) required = "required";
  if (options.autofocus === true || options.autofocus === "on") autofocus = "on";
  var inputContainer = document.createElement('div');
  inputContainer.classList.add('component-input');
  inputContainer.innerHTML = "<input max=\"30\" ".concat(required, " ").concat(disabled, " autofocus = \"").concat(autofocus, "\"  class = \"").concat(options["class"], "\" id = \"").concat(options.id, "\" name = \"").concat(options.name, "\" value = \"").concat(options.value, "\" type = \"").concat(options.type, "\" placeholder= \"").concat(options.placeholder, "\" >");
  var inputTag = inputContainer.querySelector('input');

  if (options.edit === true) {
    var loaderMode = function loaderMode() {
      app.classList.add('hold');
      editButton.classList.remove('fa-pencil-alt');
      editButton.classList.remove('fa-check');
      editButton.classList.add('fa-loader');
      closeButton.classList.add('dn');
      inputTag.disabled = true;
    };

    var editMode = function editMode() {
      app.classList.add('hold');
      editButton.classList.remove('fa-pencil-alt');
      editButton.classList.add('fa-check');
      editButton.classList.remove('fa-loader');
      closeButton.classList.remove('dn');
      inputTag.disabled = false;
      errorPopup.classList.add('dn');
    };

    var pencilMode = function pencilMode() {
      app.classList.remove('hold');
      editButton.classList.add('fa-pencil-alt');
      editButton.classList.remove('fa-check');
      editButton.classList.remove('fa-loader');
      closeButton.classList.add('dn');
      inputTag.disabled = true;
    };

    var editButton = document.createElement('i');
    var closeButton = document.createElement('i');
    editButton.setAttribute('onmouseover', 'edit = true');
    editButton.setAttribute('onmouseleave', 'edit = false');
    closeButton.setAttribute('onmouseover', 'edit = true');
    closeButton.setAttribute('onmouseleave', 'edit = false');
    var classWatcher;
    var popupError;
    closeButton.classList = 'fa fa-times dn';
    editButton.classList = 'fa fa-pencil-alt';
    var errorPopup = document.createElement('div');
    errorPopup.classList = "r ac jc dn error-popup px3 py1";
    errorPopup.innerHTML = '<i class="pr3 fa fa-exclamation"></i> <p></p><i class="fa fa-times-circle">';
    inputContainer.appendChild(errorPopup);
    inputTag.disabled = true;
    var oldInputValue = inputTag.value;
    var app = document.getElementById('app');
    editButton.addEventListener('click',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var timeout;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              app.classList.add('hold');

              if (!editButton.classList.contains('fa-pencil-alt')) {
                _context.next = 6;
                break;
              }

              oldInputValue = inputTag.value;
              editMode();
              _context.next = 28;
              break;

            case 6:
              console.log("Options", options);

              if (!options.hasOwnProperty('onSave')) {
                _context.next = 27;
                break;
              }

              timeout = setTimeout(function () {
                inputTag.value = oldInputValue;
                pencilMode();
                inputContainer.querySelector('p').innerText = "Timeout!";
                popupError = inputContainer.querySelector('.error-popup');
                popupError.classList.remove('dn');
                popupError.querySelector('.fa-times-circle').addEventListener('click', function () {
                  popupError.classList.add('dn');
                });
              }, 4000);
              _context.prev = 9;
              loaderMode();
              _context.next = 13;
              return options.onSave();

            case 13:
              if (!options.manualClass) {
                popupError = inputContainer.querySelector('.error-popup');
                popupError.innerHTML = '<i class="pr3 fa fa-check"></i> <p></p>';
                popupError.classList.remove('dn');
                setTimeout(function () {
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
              } else {
                classWatcher = setInterval(function () {
                  console.log(inputTag);

                  if (inputTag.classList.contains('done')) {
                    if (inputTag.classList.contains('error')) {
                      inputTag.value = oldInputValue;
                      pencilMode();
                      inputContainer.querySelector('p').innerText = inputTag.getAttribute('error');
                      popupError = inputContainer.querySelector('.error-popup');
                      popupError.classList.remove('dn');
                      popupError.querySelector('.fa-times-circle').addEventListener('click', function () {
                        popupError.classList.add('dn');
                      });
                      clearInterval(timeout);
                    } else {
                      popupError = inputContainer.querySelector('.error-popup');
                      popupError.innerHTML = '<i class="pr3 fa fa-check"></i> <p></p>';
                      popupError.classList.remove('dn');
                      setTimeout(function () {
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

              _context.next = 25;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](9);
              inputTag.value = oldInputValue;
              pencilMode();

              if (_context.t0.message !== 'none') {
                inputContainer.querySelector('p').innerText = _context.t0.message;
                popupError = inputContainer.querySelector('.error-popup');
                popupError.classList.remove('dn');
                popupError.querySelector('.fa-times-circle').addEventListener('click', function () {
                  popupError.classList.add('dn');
                });
              }

              clearInterval(timeout);
              inputTag.classList.remove('done');
              inputTag.classList.remove('error');
              clearInterval(classWatcher);

            case 25:
              _context.next = 28;
              break;

            case 27:
              pencilMode();

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 16]]);
    })));
    closeButton.addEventListener('click', function () {
      pencilMode();
      inputTag.value = oldInputValue;

      if (options.hasOwnProperty('onCancel')) {
        options.onCancel();
      }
    });
    inputContainer.appendChild(editButton);
    inputContainer.appendChild(closeButton);
  }

  parentElement.appendChild(inputContainer);
  return inputTag;
}