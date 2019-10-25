function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {
  console.log('targetWindow: ', targetWindow);
  var window = document.getElementById('window');

  function windowHide() {
    window.classList.remove('cr');
    window.classList.remove('ac');
    window.classList.remove('jc');
    window.classList.add('dn');
    window.innerHTML = '';
  }

  function windowShow() {
    window.classList.add('cr');
    window.classList.add('ac');
    window.classList.add('jc');
    window.classList.remove('dn');
    window.innerHTML = '';
  }

  switch (targetWindow) {
    // No window Shown.
    case 'none':
      windowHide();
      break;

    case 'profile_settings':
      document.getElementById('profile_window').classList.add('dn');
      windowHide();
      windowShow();
      var profileSettings = document.createElement('div');
      profileSettings.id = 'window_content_block';
      profileSettings.classList.add('update-profile');
      var user = firebase.auth().currentUser;
      var profileSettingsForm = document.createElement('form');
      profileSettingsForm.id = 'update_profile';
      h2(profileSettings, {
        innerText: "Profile Settings"
      });
      p(profileSettings, {
        innerText: "Display Name"
      });
      var displayNameInput = input(profileSettings, {
        type: 'test',
        edit: true,
        onSaveMessage: "Display name has been changed.",
        value: user.displayName,
        required: true,
        disabled: true,
        onSave: function () {
          var _onSave = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log("Save");

                    if (!(user.displayName === displayNameInput.value)) {
                      _context.next = 3;
                      break;
                    }

                    throw new Error('none');

                  case 3:
                    user.updateProfile({
                      displayName: displayNameInput.value
                    }).then(function () {
                      displayNameInput.value = user.displayName;
                      setProfileInformation(user);
                    })["catch"](function (error) {
                      throw error;
                    });

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onSave() {
            return _onSave.apply(this, arguments);
          }

          return onSave;
        }()
      });
      p(profileSettings, {
        innerText: "Email Address"
      });
      var emailInput = input(profileSettings, {
        type: 'test',
        edit: true,
        onSaveMessage: "A verification email was sent to your new email address.",
        value: user.email,
        required: true,
        onSave: function () {
          var _onSave2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log("Save: ", emailInput.value);

                    if (!(user.email === emailInput.value)) {
                      _context3.next = 3;
                      break;
                    }

                    throw new Error('none');

                  case 3:
                    _context3.next = 5;
                    return user.updateEmail(emailInput.value).then(
                    /*#__PURE__*/
                    _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2() {
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return user.sendEmailVerification().then(function () {})["catch"](function (error) {
                                throw error;
                              });

                            case 2:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    })))["catch"](function (error) {
                      throw error;
                    }).then(function () {
                      setProfileInformation(user);
                    });

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function onSave() {
            return _onSave2.apply(this, arguments);
          }

          return onSave;
        }(),
        disabled: true
      });
      p(profileSettings, {
        innerText: "Password"
      });
      var passwordInput = input(profileSettings, {
        type: 'password',
        edit: true,
        onSaveMessage: "Your password has been changed.",
        value: "******",
        required: true,
        onSave: function () {
          var _onSave3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(passwordInput.value !== "******")) {
                      _context4.next = 5;
                      break;
                    }

                    _context4.next = 3;
                    return user.updatePassword(passwordInput.value).then(function () {// Update successful.
                    })["catch"](function (error) {
                      throw error;
                    });

                  case 3:
                    _context4.next = 6;
                    break;

                  case 5:
                    throw new Error('none');

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function onSave() {
            return _onSave3.apply(this, arguments);
          }

          return onSave;
        }(),
        disabled: true
      });
      var closeContent = document.createElement('div');
      closeContent.classList = "c ac jc w100";
      closeContent.innerHTML = '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' + "    <button onclick=\"windowSwitcher('none')\">Close</button></div>";
      profileSettings.appendChild(closeContent);
      window.appendChild(profileSettings);
      break;
    // Creating a new project window.

    case 'new_project':
      windowShow();
      var contentBlock = document.createElement('div');
      contentBlock.id = 'window_content_block';
      contentBlock.innerHTML = '<form id="create_project"> ' + '<h2>Create a New Project</h2>' + '<p>Project Name:</p>' + '<input required type="text" id="project" placeholder="My Project Name...">' + '<p>Project Description:</p>' + '<textarea id="desc" placeholder="Project Description..." required> </textarea> ' + '<p>Make this project Private or Public:</p>' + '<input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">' + '<label for="private">Private</label><br>' + '<input class="input-radio" type="radio" name="access" id="public" value="Public">' + '<label for="public">Public</label><br>' + // '<div class="r ac"> <p>Project Color: </p>'+
      '<input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> ' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(contentBlock);
      document.getElementById('create_project').addEventListener('submit', function (e) {
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
    // Create a new variable window.

    case 'new_variable':
      windowShow();
      var newVariableContentBlock = document.createElement('div');
      newVariableContentBlock.id = 'window_content_block';
      newVariableContentBlock.innerHTML = '<form id="new_variable"> ' + '<h2>Create a New Variable</h2>' + '<p>Variable Name:</p>' + '<input class="" required type="text" id="project" placeholder="My Variable Name...">' + '<div class="r jc"><button >Create</button>' + "<button onclick=\"windowSwitcher('none')\">Cancel</button></div>" + '</form>';
      window.appendChild(newVariableContentBlock);
      document.getElementById('new_variable').addEventListener('submit', function (e) {
        createVariable(document.getElementById('project').value, currentUid);
        getProjects(currentUid);
        e.preventDefault(); //stop form from submitting
      });
      break;
  }
}