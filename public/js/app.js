// Function copied pasted from Stack Overflow that makes sure the dom is fully loaded before proceeding
(function (funcName, baseObj) {funcName = funcName || "docReady";baseObj = baseObj || window;let readyList = [];let readyFired = false;let readyEventHandlersInstalled = false;function ready() {if (!readyFired) {readyFired = true;for (let i = 0; i < readyList.length; i++) {readyList[i].fn.call(window, readyList[i].ctx);}readyList = [];}}function readyStateChange() {if (document.readyState === "complete") {ready();}}baseObj[funcName] = function (callback, context) {if (typeof callback !== "function") {throw new TypeError("callback for docReady(fn) must be a function");}if (readyFired) {setTimeout(function () {callback(context);}, 1);return;} else {readyList.push({fn: callback, ctx: context});}if (document.readyState === "complete") {setTimeout(ready, 1);} else if (!readyEventHandlersInstalled) {if (document.addEventListener) {document.addEventListener("DOMContentLoaded", ready, false);window.addEventListener("load", ready, false);} else {document.attachEvent("onreadystatechange", readyStateChange);window.attachEvent("onload", ready);}readyEventHandlersInstalled = true;}}})("docReady", window);
var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

function windowError(window, msg){
    let appContainer = document.getElementById(window);
    // Try to remove the previous error message.
    try {
        document.getElementById('error_message').remove();
    } catch (e) {
    }
    let errorMessage = document.createElement('div');
    errorMessage['innerText'] = msg;
    errorMessage.style.color = 'red';
    errorMessage.style.margin = '1rem';
    errorMessage.id = 'error_message';
    errorMessage.style.textAlign = 'center';
    appContainer.appendChild(errorMessage);
}
function formError(msg) {
    let appContainer = document.getElementById('app_container');
    // Try to remove the previous error message.
    try {
        document.getElementById('error_message').remove();
    } catch (e) {
    }
    let errorMessage = document.createElement('div');
    errorMessage['innerText'] = msg;
    errorMessage.style.color = 'red';
    errorMessage.style.margin = '1rem';
    errorMessage.id = 'error_message';
    appContainer.appendChild(errorMessage);
}

function unitsList(id = "", onInput = ()=>{},  value=''){
    function f(current){
        if(value === current) return 'selected';
        else return '';
    }
    return`
        <select oninput="${onInput}" id="${id}">
             <optgroup label="General">
                <option ${f('')}  value="">None</option>
                <option ${f('%')}  value="%">%</option>
            </optgroup>
            <optgroup label="Temperature">
                <option ${f("°C")} value="°C" title="celsius">°C</option>
                <option ${f("°F")} value="°F" title="fahrenheit">°F</option>
                <option ${f("K")} value="K" title="kelvin">K</option>
                <option ${f("°Ré")} value="°Ré" title="reaumur">°Ré</option>
                <option ${f("°N")} value="°N" title="newton">°N</option>
                <option ${f("°Ra")} value="°Ra" title="rankine">°Ra</option>
            </optgroup>
            <optgroup label="Volume">
                 <option ${f("m³")} value="m³" title="cubic meter">m³</option>
                 <option ${f("dm³")} value="dm³" title="cubic decimeter">dm³</option>
                 <option ${f("cm³")} value="cm³" title="cubic centimeter">cm³</option>
                 <option ${f("l")} value="l" title="liter">l</option>
                 <option ${f("dl")} value="dl" title="deciliter">dl</option>
                 <option ${f("cl")} value="cl" title="centiliter">cl</option>
                 <option ${f("ml")} value="ml" title="milliliter">ml</option>
                 <option ${f("oz")} value="oz" title="fluid ounce">oz</option>
                 <option ${f("in³")} value="in³" title="cubic inch">in³</option>
                 <option ${f("ft³")} value="ft³" title="cubic foot">ft³</option>
                 <option ${f("yd³")} value="yd³" title="cubic yard">yd³</option>
                 <option ${f("gal")} value="gal" title="gallon uk">gal</option>
                 <option ${f("bbl")} value="bbl" title="petroleum barrel">bbl</option>
                 <option ${f("pt")} value="pt" title="pint">pt</option>
            </optgroup>
            <optgroup label="Distance">
                <option ${f("km")} value="km" title="kilometer">km</option>
                <option ${f("m")} value="m" title="meter">m</option>
                <option ${f("dm")} value="dm" title="decimeter">dm</option>
                <option ${f("cm")} value="cm" title="centimeter">cm</option>
                <option ${f("mm")} value="mm" title="millimeter">mm</option>
                <option ${f("mi")} value="mi" title="mile">mi</option>
                <option ${f("in")} value="in" title="inch">in</option>
                <option ${f("ft")} value="ft" title="foot">ft</option>
                <option ${f("yd")} value="yd" title="yard">yd</option>
            </optgroup>
            <optgroup label="Mass">
                <option ${f("t")} value="t" title="tonne">t</option>
                <option ${f("kg")} value="kg" title="kilogram">kg</option>
                <option ${f("hg")} value="hg" title="hectogram">hg</option>
                <option ${f("g")} value="g" title="gram">g</option>
                <option ${f("dg")} value="dg" title="decigram">dg</option>
                <option ${f("cg")} value="cg" title="centigram">cg</option>
                <option ${f("mg")} value="mg" title="milligram">mg</option>
                <option ${f("µg")} value="µg" title="microgram">µg</option>
                <option ${f("carat")} value="carat" title="carat">carat</option>
                <option ${f("grain")} value="grain" title="grain">grain</option>
                <option ${f("oz")} value="oz" title="pounce avoirdupois">oz</option>
                <option ${f("lb")} value="lb" title="pound avoirdupois">lb</option>
                <option ${f("cwt")} value="cwt" title="long hundredweight">cwt</option>
                <option ${f("ton")} value="ton" title="ton">ton</option>
                <option ${f("st")} value="st" title="stone">st</option>
            </optgroup>
            <optgroup label="Area">
                <option ${f("km²")} value="km²" title="square kilometer">km²</option>
                <option ${f("m²")} value="m²" title="square meter">m²</option>
                <option ${f("dm²")} value="dm²" title="square decimeter">dm²</option>
                <option ${f("cm²")} value="cm²" title="square centimeter">cm²</option>
                <option ${f("TB")} value="TB" title="square milimeter">TB</option>
                <option ${f("ha")} value="ha" title="hectare">ha</option>
                <option ${f("a")} value="a" title="are">a</option>
                <option ${f("ca")} value="ca" title="centiare">ca</option>
                <option ${f("mile²")} value="mile²" title="square mile">mile²</option>
                <option ${f("in²")} value="in²" title="square inch">in²</option>
                <option ${f("yd²")} value="yd²" title="square yard">yd²</option>
                <option ${f("ft²")} value="ft²" title="square foot">ft²</option>
                <option ${f("ro")} value="ro" title="rood">ro</option>
                <option ${f("acre")} value="acre" title="acre">acre</option>
                <option ${f("nautical mile²")} value="nautical mile²" title="square nautical mile">nautical mile²</option>
            </optgroup>
            <optgroup label="Speed">
                <option ${f("kmph")} value="kmph" title="kilometer per hour">kph</option>
                <option ${f("mps")} value="mps" title="mile per second">mps</option>
                <option ${f("mph")} value="mph" title="mile per hour">mph</option>
                <option ${f("knot")} value="knot" title="knot">knot</option>
                <option ${f("ma")} value="ma" title="mac">ma</option>
                <option ${f("a")} value="a" title="are">mg</option>
            </optgroup>
            <optgroup label="Data byte">
                <option ${f("b")} value="b" title="bit">b</option>
                <option ${f("B")} value="B" title="byte">B</option>
                <option ${f("KB")} value="KB" title="kilobyte">KB</option>
                <option ${f("MB")} value="MB" title="megabyte">MB</option>
                <option ${f("GB")} value="GB" title="gigabyte">GB</option>
                <option ${f("TB")} value="TB" title="terabyte">TB</option>
                <option ${f("PB")} value="PB" title="petabyte">PB</option>
                <option ${f("EB")} value="EB" title="exabyte">EB</option>
                <option ${f("ZB")} value="ZB" title="zettabyte">ZB</option>
                <option ${f("YB")} value="YB" title="yottabyte">YB</option>
            </optgroup>
            <optgroup label="Time">
                <option ${f("year")} value="year" title="common year">year</option>
                <option ${f("week")} value="week" title="week">week</option>
                <option ${f("day")} value="day" title="day">day</option>
                <option ${f("h")} value="h" title="hour">h</option>
                <option ${f("min")} value="min" title="minute">min</option>
                <option ${f("s")} value="s" title="second">s</option>
                <option ${f("ms")} value="ms" title="millisecond">ms</option>
                <option ${f("µs")} value="µs" title="microsecond">µs</option>
                <option ${f("nanosecond")} value="nanosecond" title="nanosecond">nanosecond</option>
                <option ${f("picosecond")} value="picosecond" title="picosecond">picosecond</option>
                <option ${f("femtosecond")} value="femtosecond" title="femtosecond">femtosecond</option>
                <option ${f("attosecond")} value="attosecond" title="attosecond">attosecond</option>
            </optgroup>  
            <optgroup label="Frequency">
                <option ${f("Hz")} value="Hz" title="Hertz">Hz</option>
                <option ${f("KHz")} value="KHz" title="K">KHz</option>
                <option ${f("MHz")} value="MHz" title="megahertz">MHz</option>
                <option ${f("GHz")} value="GHz" title="Gigahertz">GHz</option>
            </optgroup>
            <optgroup label="Pressure">
                <option ${f("atm")} value="atm" title="atmosphere">atm</option>
                <option ${f("bar")} value="bar" title="bar">bar</option>
                <option ${f("mbar")} value="mbar" title="millibar">mbar</option>
                <option ${f("Pa")} value="Pa" title="Pascal">Pa</option>
                <option ${f("hPa")} value="hPa" title="hectopascal">hPa</option>
                <option ${f("Psi")} value="Psi" title="pounds per square inch">Psi</option>
                <option ${f("Torr")} value="Torr" title="torr">torr</option>
            </optgroup>
            <optgroup label="Energy">
                <option ${f("J")} value="J" title="joule">J</option>
                <option ${f("KJ")} value="KJ" title="kilojoule">KJ</option>
                <option ${f("cal")} value="cal" title="calorie">cal</option>
                <option ${f("kcal")} value="kcal" title="kilocalorie">kcal</option>
                <option ${f("Wh")} value="Wh" title="watt-hour">Wh</option>
                <option ${f("kWh")} value="kWh" title="kilowatt-hour">kWh</option>
                <option ${f("BTU")} value="BTU" title="british thermal unit">BTU</option>
                <option ${f("thm")} value="thm" title="Therm americain">thm</option>
                <option ${f("gt-lb")} value="gt-lb" title="foot-pound">ft-lb</option>
            </optgroup>
            <optgroup label="Angle">
                <option ${f("deg")} value="deg" title="degree">deg</option>
                <option ${f("grad")} value="grad" title="grad">grad</option>
                <option ${f("angular mil")} value="angular mil" title="angular mil">angular mil</option>
                <option ${f("minute of arc")} value="minute of arc" title="minute of arc">minute of arc</option>
                <option ${f("rad")} value="rad" title="radian">rad</option>
                <option ${f("second of arc")} value="second of arc" title="second of arc">second of arc</option>
                <option ${f("BTU")} value="BTU" title="british thermal unit">BTU</option>
                <option ${f("thm")} value="thm" title="Therm americain">thm</option>
                <option ${f("gt-lb")} value="gt-lb" title="foot-pound">ft-lb</option>
            </optgroup>
        </select>
    `;
}

let ws, wsHandler;
let currentView, currentProject, currentWindow;
let currentUid = null;
let currentId = null;
let projectTab =  null;
let currentKey = null;
let edit = false;


docReady(function () {

    // Set up some
    initializeProfile(); // --> profile.js

    let serverStatus = false;

    // Set the view to the login screen.
    viewSwitcher('sign_in');
    let signInNav =document.getElementById('sign_in_nav');
    // When an authentication state has changed.
    firebase.auth().onAuthStateChanged(function (user) {

        // If the user is authenticated.
        if (user) {


            signInNav.classList.add('dn');

            // Set the users profile image and information.
            setProfileInformation(user); // --> profile.js

            // Store a global value of the current user ID.
            currentUid = user.uid;

            // Show that users projects view.
            viewSwitcher('projects');

            // Start the websocket connection interval with the server.
            wsHandler = setInterval(() => {

                // If not connected and the user it authenticated, try to connect to the server with a websocket.
                if (!serverStatus && user) {

                    // Try to connect.
                    try {

                        // Get the user id Token from firebase.
                        user.getIdToken(true).then(function(idToken) {

                            // If in development environment. Initialize websocket.
                            if(window.location.href.toUpperCase().includes('LOCALHOST')){
                                ws = new WebSocket(`ws://localhost:8080/?token=${idToken}&uid=${user.uid}`);
                            }
                            else{
                                ws = new WebSocket(`wss://cloud.brilliantlabs.ca/wsapi/?token=${idToken}&uid=${user.uid}`);
                            }

                            // Triggered when the ws is opened.
                            ws.onopen = function open() {
                                serverStatus = true;
                                getProjects(currentUid);
                            };

                            // Triggered when the ws is closed.
                            ws.onclose = function close() {
                                serverStatus = false;
                            };

                            ws.onmessage = function incoming(data) {
                                // Process incoming messages.
                                messageProcessor(data, ws); // --> message-processor.js
                            };

                            //  WebSocket Error
                            ws.error = function incoming(data) {
                                console.log("Error: ", data);
                            }

                        }).catch(function(e) {
                            //  WebSocket Error
                            console.log(e);
                            serverStatus = false;
                        });


                    } catch (e) {
                        //  WebSocket Error
                        console.log(e);
                        serverStatus = false;
                    }
                }
            }, 1000)

        }

        else {
            currentUid = null;

            signInNav.classList.remove('dn');

            viewSwitcher('sign_in');

            // Set profile to default settings.
            setDefaultProfile(); // --> profile.js
            clearInterval(wsHandler);
        }
    });

});








function viewSwitcher(targetView, options) {
    currentView = targetView;
    switch (targetView) {
        case 'project':
        case 'projectSingle':
            projectView(options);
            break;

        case 'forgot_password':
            forgotPasswordView();
            break;

        case 'sign_up':
            signUpView();
            break;

        case 'projects':
        case 'dashboard':
            projectsView();
            break;

        case 'pw_reset_success':
            passwordResetSuccessView();
            break;

        case 'sign_in':
            signInView();
            break;

        default:
            viewSwitcher('sign_in');
            break;
    }
}
function signInView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.classList.remove('project-dash');
    appContainer.style.userSelect = 'none';
    let signInLogo = document.createElement('img');
    signInLogo.src = "/images/BL_Logo_white.png";
    signInLogo.width = '300';
    signInLogo.style.marginBottom = "1rem";
    appContainer.appendChild(signInLogo);
    let signInForm = document.createElement('form');
    signInForm.id = "main_sign_in";
    signInForm.classList = 'c jc ac';
    let emailInput = document.createElement('input');
    emailInput.required = 'required';
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.id = `${signInForm.id}_email`;
    let passwordInput = document.createElement('input');
    passwordInput.required = 'required';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.id = `${signInForm.id}_password`;
    let submitButton = document.createElement('button');
    submitButton.innerHTML = "Submit";
    submitButton.id = `${signInForm.id}_submit`;
    signInForm.appendChild(emailInput);
    signInForm.appendChild(passwordInput);
    signInForm.appendChild(submitButton);
    signInForm.addEventListener("submit", function (e) {
        let email = document.getElementById(`${signInForm.id}_email`);
        let password = document.getElementById(`${signInForm.id}_password`);
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    formError('Wrong password.');

                } else {
                    formError(errorMessage);
                }
                // console.log(error);
            });
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signInForm);
    let signUp = document.createElement('a');
    signUp.style.color = "#fff";
    signUp.innerText = "Dont Have an Account? Click Here to Sign Up!";
    signUp.addEventListener("mouseenter", function () {
        signUp.style.color = "rgb(155, 85, 163)";
        signUp.style.cursor = "pointer";
    });
    signUp.addEventListener("mouseleave", function () {
        signUp.style.color = "#fff";
        signUp.style.cursor = "default";
    });
    signUp.addEventListener("click", function (e) {
        viewSwitcher('sign_up');
        e.preventDefault();    //stop form from submitting
    });
    let forgot = document.createElement('a');
    forgot.innerText = "Forgot password?";
    forgot.style.fontSize = "12px";
    forgot.style.margin = "8px";
    forgot.style.color = "rgb(79, 156, 121)";

    forgot.addEventListener("mouseenter", function () {
        forgot.style.cursor = "pointer";
    });
    forgot.addEventListener("mouseleave", function () {
        forgot.style.cursor = "default";
    });
    forgot.addEventListener("click", function (e) {
        viewSwitcher('forgot_password');
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUp);
    appContainer.appendChild(forgot);

}
function passwordResetSuccessView(){
    let appContainer = document.getElementById('app_container');
    appContainer.classList.remove('project-dash');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    let pwResetLogo = document.createElement('img');
    pwResetLogo.src = "/images/BL_Logo_white.png";
    pwResetLogo.width = '300';
    pwResetLogo.style.marginBottom = "1rem";
    appContainer.appendChild(pwResetLogo);
    let pwResetMsg = document.createElement('h2');
    pwResetMsg.innerText = "An email has been sent with a password reset link.";
    pwResetMsg.style.color = "#fff";
    appContainer.appendChild(pwResetMsg);
    let pwResetLogoSignIn = document.createElement('button');
    pwResetLogoSignIn.id = 'logout';
    pwResetLogoSignIn.innerText = 'Sign In';
    pwResetLogoSignIn.addEventListener('click', () => {
        viewSwitcher('sign_in');
    });
    appContainer.appendChild(pwResetLogoSignIn);
}
function signUpView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.remove('project-single');
    let signUpLogo = document.createElement('img');
    signUpLogo.src = "/images/BL_Logo_white.png";
    signUpLogo.width = '300';
    signUpLogo.style.marginBottom = "1rem";
    appContainer.appendChild(signUpLogo);
    let signUpForm = document.createElement('form');
    signUpForm.id = "main_sign_up";
    signUpForm.classList = 'c jc ac';
    let userFirstName = document.createElement('input');
    userFirstName.required = 'required';
    userFirstName.type = 'name';
    userFirstName.placeholder = 'First Name';
    userFirstName.id = `${signUpForm.id}_first_name`;
    userFirstName.style.width = "100% !important";

    let userLastName = document.createElement('input');
    userLastName.required = 'required';
    userLastName.type = 'name';
    userLastName.placeholder = 'Last Name';
    userLastName.id = `${signUpForm.id}_last_name`;
    userLastName.style.width = "100% !important";
    let signUpEmail = document.createElement('input');
    signUpEmail.required = 'required';
    signUpEmail.type = 'email';
    signUpEmail.placeholder = 'Email Address';
    signUpEmail.style.width = "100% !important";
    signUpEmail.id = `${signUpForm.id}_email`;
    let signUpPasswordInput = document.createElement('input');
    signUpPasswordInput.required = 'required';
    signUpPasswordInput.type = 'password';
    signUpPasswordInput.placeholder = 'Password';
    signUpPasswordInput.id = `${signUpForm.id}_password`;
    signUpPasswordInput.style.width = "100% !important";

    let signUpPasswordInput2 = document.createElement('input');
    signUpPasswordInput2.required = 'required';
    signUpPasswordInput2.type = 'password';
    signUpPasswordInput2.placeholder = 'Confirm Password';
    signUpPasswordInput2.id = `${signUpForm.id}_password2`;
    signUpPasswordInput2.style.width = "100% !important";

    let signUpSubmitButton = document.createElement('button');
    signUpSubmitButton.innerHTML = "Sign Up!";
    signUpSubmitButton.id = `${signUpForm.id}_submit`;
    signUpForm.appendChild(userFirstName);
    signUpForm.appendChild(userLastName);
    signUpForm.appendChild(signUpEmail);
    signUpForm.appendChild(signUpPasswordInput);
    signUpForm.appendChild(signUpPasswordInput2);
    signUpForm.appendChild(signUpSubmitButton);
    signUpForm.addEventListener("submit", function (e) {
        let firstName = document.getElementById(`${signUpForm.id}_first_name`);
        let lastName = document.getElementById(`${signUpForm.id}_last_name`);
        let email = document.getElementById(`${signUpForm.id}_email`);
        let password = document.getElementById(`${signUpForm.id}_password`);
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                    formError('The password is too weak.');
                } else {
                    formError(errorMessage);
                }
                // console.log(error);
            }).then(function(){
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: firstName.value + " " + lastName.value,
            }).then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
            });
        });
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUpForm);
    let signInButton = document.createElement('a');
    signInButton.innerText = "Already have an Account? Click Here to Sign In!";
    signInButton.style.color = "#ffffff";
    signInButton.addEventListener("mouseenter", function () {
        signInButton.style.color = "rgb(155, 85, 163)";
        signInButton.style.cursor = "pointer";
    });
    signInButton.addEventListener("mouseleave", function () {
        signInButton.style.color = "#ffffff";
        signInButton.style.cursor = "default";
    });
    signInButton.addEventListener("click", function (e) {
        viewSwitcher('sign_in');
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signInButton);
}
// Project View
function projectView(id){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.add('project-single');

    // Top of container.

    let backButton = document.createElement('button');
    backButton.style.maxWidth = '74px';
    backButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
    backButton.addEventListener('click', ()=>{
        currentProject = null;
        viewSwitcher('dashboard');
    });
    // singleHeader.appendChild(backButton);

    //--  Left Menu in Container   --//
    let menu = document.createElement('div');
    menu.id = "menu_box";
    menu.classList.add('cxl');
    menu.classList.add('mw100xl');
    menu.classList.add('w100xl');
    menu.classList.add('h100xl');
    menu.classList.add('tacxl');
    menu.classList.add('fww');
    menu.appendChild(backButton);

    // Dashboard Tab
    let dashboard = document.createElement('div');
    dashboard.classList = "dashboard-button";
    dashboard.classList.add('dashboard-button-select');
    dashboard.id = "dashboard_trigger";
    dashboard.innerHTML = "<button class='r ac jc'><i class='fa fa-chart-bar'></i><p>Dashboard</p></button>";
    dashboard.addEventListener('click', ()=>{
        projectMenuSwitcher('dashboard', this);
    });

    // Variables Tab
    let variables = document.createElement('div');
    variables.classList = "dashboard-button";
    variables.id = "variables_trigger";
    variables.innerHTML = "<button class='r ac jc'><i class='fa fa-code'></i><p>Variables</p></button>";
    variables.addEventListener('click', ()=>{
        projectMenuSwitcher('variables', this);
    });

    // Charts Tab
    let charts = document.createElement('div');
    charts.classList = "dashboard-button";
    charts.id = "charts_trigger";
    charts.innerHTML = "<button class='r ac jc'><i class='fa fa-chart-pie'></i><p>Charts</p></button>";
    charts.addEventListener('click', ()=>{
        projectMenuSwitcher('charts', this);
    });

    // Settings Page
    let settings = document.createElement('div');
    settings.classList = "dashboard-button";
    settings.id = "settings_trigger";
    settings.innerHTML = "<button class='r ac jc'><i class='fa fa-cogs'></i><p>Settings</p></button>";
    settings.addEventListener('click', ()=>{
        projectMenuSwitcher('settings', this);
    });

    menu.appendChild(dashboard);
    menu.appendChild(variables);
    // menu.appendChild(charts);
    menu.appendChild(settings);
    appContainer.appendChild(menu);
    //--  Left Menu in Container END   --//

    // Main Content
    let content = document.createElement('div');
    content.id = "content_box";
    appContainer.appendChild(content);

    // Select Dash tab
    projectMenuSwitcher('dashboard');
    getProject(currentUid, id);
    currentId = id;

}


// Menu Tab Switcher
function projectMenuSwitcher(target){

    // Highlight the proper tab.
    document.getElementById('menu_box').querySelectorAll('.dashboard-button').forEach((e)=>{
        e.classList.remove('dashboard-button-select');
    });
    let el = document.getElementById(`${target}_trigger`);

    // Get the content element and empty.
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = "";
    contentBox.style.overflow = "hidden";


    // Switch to the correct tab.
    switch (target) {

        case 'dashboard':
            projectTab = 'dashboard';
            el.classList.add('dashboard-button-select');
            let optionBar = document.createElement('div');
            optionBar.innerHTML =`
            <button onclick="windowSwitcher('widget_selection')">Add Widget</button>`;
            contentBox.appendChild(optionBar);
            contentBox.classList.add('c');
            let projectSectionDashboard = document.createElement('section');
            projectSectionDashboard.id = "project_section_dashboard";
            projectSectionDashboard.innerHTML = "<div class=\"loader\"></div>";
            projectSectionDashboard.style.overflow = "hidden";
            projectSectionDashboard.classList.add('r');
            projectSectionDashboard.classList.add('jc');
            projectSectionDashboard.classList.add('ac');
            contentBox.appendChild(projectSectionDashboard);
            getProject(currentUid, currentId);
            break;

        case 'variables':
            projectTab = 'variables';
            el.classList.add('dashboard-button-select');
            let projectSection = document.createElement('section');
            projectSection.id = "project_section_variables";
            projectSection.innerHTML = "<div class=\"loader\"></div>";
            projectSection.style.overflow = "hidden";
            projectSection.classList.add('r');
            projectSection.classList.add('jc');
            projectSection.classList.add('ac');
            contentBox.appendChild(projectSection);
            getProject(currentUid, currentId);
            break;

        case 'charts':
            projectTab = 'charts';
            el.classList.add('dashboard-button-select');
            break;

        case 'settings':
            projectTab = 'settings';
            el.classList.add('dashboard-button-select');
            let projectSettings = document.createElement('section');
            projectSettings.id = "project_section_settings";
            projectSettings.innerHTML = "<div class=\"loader\"></div>";
            projectSettings.style.overflow = "hidden";
            projectSettings.classList.add('r');
            projectSettings.classList.add('jc');
            projectSettings.classList.add('ac');
            contentBox.appendChild(projectSettings);
            getProject(currentUid, currentId);
            break;
    }
}

/*
    Projects View
    Description: Shows all the users projects.
*/
function projectsView(){

    // Empty the app container
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.add('project-dash');
    appContainer.classList.add('rxl');
    appContainer.classList.remove('project-single');

    // Add a loader until the projects get populated.
    let section = document.createElement('section');
    section.id = "project_section";
    section.innerHTML = "<div  class=\"loader\"></div>";
    section.style.overflow = "hidden";
    section.classList = 'r jc ac acfs';


    // Add a search bar to search threw all a users projects.
    let search = document.createElement('div');
    search.classList = "rmd jfs w100 pl5";
    search.innerHTML = "<h2 class='w100'>Your Cloud Projects</h2><br><div style='' class='r jc prmd22 ac'><i class='m2 r jc ac fas fa-search'></i> <input id = 'project_search'  onkeyup=\"projectSearch()\" placeholder='Search'><button id='project_search_clear'class='m2 r jc ac fas fa-times-circle'></button></div>";

    // Add the elements to the app.
    appContainer.appendChild(search);
    appContainer.appendChild(section);

    // Send the request to the server to send the users projects.
    if(ws) getProjects(currentUid);
}


function forgotPasswordView(){
    let appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    appContainer.classList.remove('project-dash');
    appContainer.classList.remove('project-single');
    let forgotPasswordLogo = document.createElement('img');
    forgotPasswordLogo.src = "/images/BL_Logo_white.png";
    forgotPasswordLogo.width = '300';
    forgotPasswordLogo.style.marginBottom = "1rem";
    let message = document.createElement('h2');
    message.innerText = 'Enter your account email address.';
    message.style.color = "#fff";

    appContainer.appendChild(forgotPasswordLogo);
    appContainer.appendChild(message);
    let forgotPasswordForm = document.createElement('form');
    forgotPasswordForm.id = "main_forgot_password";
    forgotPasswordForm.classList = 'c jc ac';
    let forgotPasswordEmail = document.createElement('input');
    forgotPasswordEmail.required = 'required';
    forgotPasswordEmail.type = 'email';
    forgotPasswordEmail.placeholder = 'Email Address';
    forgotPasswordEmail.id = `${forgotPasswordForm.id}_email`;
    forgotPasswordForm.appendChild(forgotPasswordEmail);
    let forgotPasswordSubmitButton = document.createElement('button');
    forgotPasswordSubmitButton.innerHTML = "Send Recovery Email";
    forgotPasswordSubmitButton.id = `${forgotPasswordForm.id}_submit`;
    forgotPasswordForm.appendChild(forgotPasswordSubmitButton);
    forgotPasswordForm.addEventListener("submit", function (e) {
        let email = document.getElementById(`${forgotPasswordForm.id}_email`);
        firebase.auth().sendPasswordResetEmail(email.value)
            .then(function () {
                // Password reset email sent.
                viewSwitcher('pw_reset_success');
            })
            .catch(function (error) {
                formError(error);
            });
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(forgotPasswordForm);
    let forgotPasswordSignInButton = document.createElement('a');
    forgotPasswordSignInButton.innerText = "Din't forget your password? Click Here to Sign In!";
    forgotPasswordSignInButton.style.color = "#fff";

    forgotPasswordSignInButton.addEventListener("mouseenter", function () {
        forgotPasswordSignInButton.style.color = "rgb(155, 85, 163)";
        forgotPasswordSignInButton.style.cursor = "pointer";
    });
    forgotPasswordSignInButton.addEventListener("mouseleave", function () {
        forgotPasswordSignInButton.style.color = "#fff";
        forgotPasswordSignInButton.style.cursor = "default";
    });
    forgotPasswordSignInButton.addEventListener("click", function (e) {
        viewSwitcher('sign_in');
        e.preventDefault();    //stop form from submitting
    });

    appContainer.appendChild(forgotPasswordSignInButton);
}
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
        editButton.setAttribute('onmouseover', 'edit = true');
        editButton.setAttribute('onmouseleave', 'edit = false');
        closeButton.setAttribute('onmouseover', 'edit = true');
        closeButton.setAttribute('onmouseleave', 'edit = false');
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
        let app = document.getElementById('app');
        function loaderMode(){
            app.classList.add('hold');
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.add('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }
        function editMode(){
            app.classList.add('hold');
            editButton.classList.remove('fa-pencil-alt');
            editButton.classList.add('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.remove('dn');
            inputTag.disabled = false;
            errorPopup.classList.add('dn');
        }
        function pencilMode(){
            app.classList.remove('hold');
            editButton.classList.add('fa-pencil-alt');
            editButton.classList.remove('fa-check');
            editButton.classList.remove('fa-loader');
            closeButton.classList.add('dn');
            inputTag.disabled = true;
        }



        editButton.addEventListener('click', async () => {
            app.classList.add('hold');

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

function initializeProfile(){
    document.getElementById('profile_image').addEventListener('click', ()=>{
        document.getElementById('profile_window').classList.toggle('dn');
        let profileWindow = document.getElementById('window');
        profileWindow.classList.add('cr');
        profileWindow.classList.add('ac');
        profileWindow.classList.add('jc');
        profileWindow.classList.remove('dn');
        profileWindow.innerHTML = '';
        profileWindow.addEventListener('click', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')){
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }


        });
        window.addEventListener('resize', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')) {
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }
        });
    });
}

function setProfileInformation(user) {
    document.getElementById('profile_image').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('profile_image').classList.remove('dn');
    document.getElementById('profile_image_sidebar').classList.remove('dn');
    document.getElementById('profile_image_sidebar').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('user_email').innerText = user.email;
    document.getElementById('user_name').innerText = user.displayName;
}
function setDefaultProfile(){
    document.getElementById('profile_image').classList.add('dn');
    document.getElementById('profile_image').src = `/images/empty-avatar.png`;
    document.getElementById('profile_image_sidebar').classList.add('dn');
    document.getElementById('profile_image_sidebar').src = `/images/empty-avatar.png`;
}
// Function that opens a pop up window.
function windowSwitcher(targetWindow, options) {

    // Save the current window in us for global usage.
    currentWindow = targetWindow;

    // Get the document elements. The window ele which is initially hidden.
    let window = document.getElementById('window');
    let app = document.getElementById('app');

    // Function to hide the popup window.
    function windowHide() {
        app.classList.remove('hold');
        window.classList.remove('cr');
        window.classList.remove('ac');
        window.classList.remove('jc');
        window.classList.add('dn');
        window.innerHTML = '';
    }

    // Function to show the pop up window.
    function windowShow() {
        app.classList.add('hold');
        window.classList.add('cr');
        window.classList.add('ac');
        window.classList.add('jc');
        window.classList.remove('dn');
        window.innerHTML = '';
    }

    // If the target window is none, hide the pop up window.
    if (targetWindow === 'none' || targetWindow === 'close') {
        windowHide();
        return;
    }

    // Show the window.
    windowShow();

    let windowContent = document.createElement('div');
    windowContent.id = 'window_content_block';

    let content = "";

    switch (targetWindow) {

        case 'none':
            windowHide();
            break;
        case 'widget_selection':
            content = windowWidgetSelection(windowContent);
            break;
        case 'double_check':
            content = windowDoubleCheck(windowContent, options);
            break;
        case 'deleteProject':
            content = windowDeleteProject(windowContent);
            break;
        case 'newKey':
            content = windowNewKey(windowContent);
            break;
        case 'data':
            content = windowWidgetData(windowContent);
            break;
        case 'gauge':
            content = windowWidgetGauge(windowContent);
            break;
        case 'new_variable':
            content = windowNewVariable(windowContent);
            break;
        case 'new_project':
            content = windowNewProject(windowContent);
            break;
        case 'scatter_plot_settings':
            content = windowScatterSettings(windowContent,options);
            break;
        case 'profile_settings':
            content = windowProfileSettings(windowContent);
            break;
        case 'gauge_settings':
            content = windowGaugeSettings(windowContent, options);
            break;
        case 'data_settings':
            content = windowDataSettings(windowContent, options);
            break;
        case 'line_graph':
            content = windowWidgetLineGraph(windowContent, options);
            break;
        case 'plot_graph':
            content = windowWidgetPlotGraph(windowContent, options);
            break;
        default:
            windowHide();
            break;
    }
    window.appendChild(content);
    drawPLotWindow()
    drawLineGraphWindow();
    new Chartist.Pie('.ct-chart-pie-widget', {
        series: [5, 10, 20, 25, 40, 100]
    }, {
        donut: true,
        donutWidth: 15,
        donutSolid: true,
        startAngle: 270,
        showLabel: false
    });
    new Chartist.Line('.ct-chart-line-chart-widget', {
        series: [
            [1, 5, 2, 5, 4, 3],
            [2, 3, 4, 8, 1, 2],
            [5, 4, 3, 2, 1, 0.5]
        ]
    }, {
        fullWidth: true,
        showPoint: false,
        axisY: {
            showLabel: false,
            showGrid: false
        },
        axisX: {
            showLabel: false,
            showGrid: false
        }

    });
    var times = function (n) {
        return Array.apply(null, new Array(n));
    };

    var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
        data.labels.push(index + 1);
        data.series.forEach(function (series) {
            series.push(Math.random() * 100)
        });

        return data;
    }, {
        labels: [],
        series: times(4).map(function () {
            return new Array()
        })
    });

    var options = {
        showLine: false,

        axisY: {
            showLabel: false,
            showGrid: false
        },
        axisX: {
            showLabel: false,
            showGrid: false
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? 'W' + value : null;
                }
            }
        }]
    ];

    new Chartist.Line('.ct-chart-scatter-chart-widget', data, options, responsiveOptions);

    var data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    };

    var options = {
        seriesBarDistance: 3,
        axisY: {
            showLabel: false,
            showGrid: false
        },
        axisX: {
            showLabel: false,
            showGrid: false
        }
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];
    new Chartist.Bar('.ct-chart-histo-chart-widget', data, options);
}

function gaugeHideVariableName() {
    if (document.getElementById('gauge_variable_hide').checked) {
        document.getElementById('variable_title').classList.add('dn');
        document.getElementById('gauge_variable_hide').value = "off";
    } else {
        document.getElementById('variable_title').classList.remove('dn');
        document.getElementById('gauge_variable_hide').value = "on";
    }
}

function gaugeSettingsTitle() {
    document.getElementById('gauge_title').innerText = document.getElementById('gauge_title_input').value;
}

function variableSettings() {
    let newValue = document.getElementById('variable_title_input').value;
    document.getElementById('value').innerText = currentProjectData['variables'][newValue];

}

function unitSettings(i, id = 'units') {
    document.getElementById(id).innerText = i.value;
}

function minSettings(i) {
    console.log("MIN   ", i.value, document.getElementById('gauge_min_value').innerText);
    document.getElementById('gauge_min_value').innerText = i.value;
}

function maxSettings(i) {
    console.log("MAX   ", i.value);
    document.getElementById('gauge_max_value').innerText = i.value;
}

function gaugeColorSettings(i, n) {
    console.log(document.getElementById(`gauge_color_${n}`));
    document.getElementById(`gauge_color_${n}`).style.fill = i.value;
}






//
// Plot Widget
//
function newPlotWidget(id, type, seriesCount){
    let series = [];
    for(let i = 0; i < seriesCount; i++){
        console.log(i)
        series[i] = {
            name: document.getElementById(`series_${i}`).value,
            color: document.getElementById(`series_${i}_color`).value,
        }
    }
    addWidget(currentUid, currentProject, {
        type: type,
        hide:'false',
        title: `${document.getElementById('gauge_title').innerText}`,
        xAxisTitle: `${document.getElementById('x_axis_title').value}`,
        xAxisUnits: `${document.getElementById('x_axis_units').value}`,
        yAxisTitle: `${document.getElementById('y_axis_title').value}`,
        yAxisUnits: `${document.getElementById('y_axis_units').value}`,
        series: series
    });
}
function updatePlotWidget(id, type){
    updateWidget(currentUid, currentProject, {
        type: type,
        hide: 'false',
        title: `${document.getElementById('gauge_title').innerText}`,
        xAxisTitle: `${document.getElementById('x_axis_title').value}`,
        xAxisUnits: `${document.getElementById('x_axis_units').value}`,
        yAxisTitle: `${document.getElementById('y_axis_title').value}`,
        yAxisUnits: `${document.getElementById('y_axis_units').value}`,
        id: id,
    });
}
function removePlotWidget(id){
    removeWidget(currentUid, currentProject, id);
}


//
// Gauge Widget
//
function newGaugeWidget() {
    addWidget(currentUid, currentProject, {
        type: 'gauge',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById('variable_title_input').value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        color1: `${document.getElementById('color1').value}`,
        color2: `${document.getElementById('color2').value}`,
        color3: `${document.getElementById('color3').value}`,
        color4: `${document.getElementById('color4').value}`,
        color5: `${document.getElementById('color5').value}`,
        color6: `${document.getElementById('color6').value}`,
        min: parseInt(document.getElementById('gauge_min_value').innerText),
        max: parseInt(document.getElementById('gauge_max_value').innerText)
    });
}
function updateGaugeWidget(id){
    updateWidget(currentUid, currentProject, {
        type: 'gauge',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById(`${id}_variable_title_input`).value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        color1: `${document.getElementById('color1').value}`,
        color2: `${document.getElementById('color2').value}`,
        color3: `${document.getElementById('color3').value}`,
        color4: `${document.getElementById('color4').value}`,
        color5: `${document.getElementById('color5').value}`,
        color6: `${document.getElementById('color6').value}`,
        min: parseInt(document.getElementById('gauge_min_value').innerText),
        max: parseInt(document.getElementById('gauge_max_value').innerText),
        id: id
    })
}
function removeGaugeWidget(id){
    removeWidget(currentUid, currentProject, id);
}



//
// Data Widget
//
function newDataWidget() {
    addWidget(currentUid, currentProject, {
        type: 'data',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById('variable_title_input').value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
    });
}

function updateDataWidget(id){
    updateWidget(currentUid, currentProject, {
        type: 'data',
        hide: `${document.getElementById('gauge_variable_hide').checked}`,
        variable: `${document.getElementById(`${id}_variable_title_input`).value}`,
        units: `${document.getElementById('units').innerText}`,
        title: `${document.getElementById('gauge_title').innerText}`,
        id: id
    })
}
function removeDataWidget(id){
    removeWidget(currentUid, currentProject, id);
}





/*
    Get Projects
    @Desc: Tell the server to send over the list of all the projects of a specific user.
    @param: uid - User ID
*/
function getProjects(uid){
    ws.send(JSON.stringify({
        cmd: "GET_PROJECTS",
        uid: uid,
    }));
}

/*
    Create Project
    @Desc: Tell the server create a new project for a given user.
    @param: name - Name 0f project.
    @param desc - Project description.
    @param access - Project access.
    @param color - Project color.
    @param uid - User id of the user.
*/
function createProject(name, desc, access, color, uid){
    ws.send(JSON.stringify({
        cmd: "CREATE_PROJECT",
        uid: uid,
        name : name,
        color: color,
        description : desc,
        access: access
    }));
}

/*
    Set Project Title
    @Desc: Change the title of the project.
    @param: uid - User ID
    @param id - Project ID
    @param title - New titlee.
*/
function setProjectName(name, uid, id){
    ws.send(JSON.stringify({
        cmd: "SET_PROJECT_NAME",
        uid: uid,
        id: id,
        name: name
    }));
}

function deleteProject(uid, id){
    ws.send(JSON.stringify({
        cmd: "DELETE_PROJECT",
        uid: uid,
        id: id,
    }));
}

/*
    Set Project Description
    @Desc: Change the description of the project.
    @param: uid - User ID
    @param id - Project ID
    @param title - New Description.
*/
function setProjectDescription(description, uid, id){
    ws.send(JSON.stringify({
        cmd: "SET_PROJECT_DESCRIPTION",
        uid: uid,
        id: id,
        description: description
    }));
}

/*
    New Project Key
    @Desc: Tell the server to send over a new project key.
    @param: uid - User ID
    @param id - Project ID
*/
function newProjectKey(uid, id){
    ws.send(JSON.stringify({
        cmd: "NEW_KEY",
        uid: uid,
        id: id
    }));
}

/*
    Get Project
    @Desc: Tell the server to send over the information for a specific project.
    @param: uid - User ID
    @param id - Project ID
*/
function getProject(uid, id){
    ws.send(JSON.stringify({
        cmd: "GET_PROJECT",
        uid: uid,
        id: id
    }));
}

/*
    Add Widget
    @Desc: Add a new widget to a project.
    @param: uid - User ID
    @param id - Project ID
    @param options - Widget Options
*/

function addWidget(uid, project, options){
    ws.send(JSON.stringify({
        cmd: "ADD_WIDGET",
        uid: uid,
        project: project,
        options : options
    }));
}

function removeWidget(uid, project, options){
    ws.send(JSON.stringify({
        cmd: "REMOVE_WIDGET",
        uid: uid,
        project: project,
        id : options
    }));
}
function deleteVariable(uid, project, name){
    ws.send(JSON.stringify({
        cmd: "DELETE_VARIABLE",
        uid: uid,
        key: project,
        name : name
    }));
}

/*
    Save Widget
    @Desc: Update widget.
    @param: uid - User ID
    @param id - Project ID
    @param options - Widget Options
*/
function updateWidget(uid, project, options){
    ws.send(JSON.stringify({
        cmd: "UPDATE_WIDGET",
        uid: uid,
        project: project,
        options : options
    }));
}


function messageProcessor(message, callback) {

    // Try to parse the JSON message.
    try {
        console.log("Message : PARSE:  ", message);
        message = JSON.parse(message.data);
    } catch (e) {
        console.log(e);
        callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
        return;
    }

    // If a command was sent.
    if(message.hasOwnProperty('cmd')){{

        // Print command.
        console.log("Cmd Received: ", message.cmd, message);


        switch (message.cmd) {

            // Server sends back a list of all a users projects.
            case 'GET_PROJECTS':
                try{
                    let projects = message['results'];
                    if(currentView === 'projectSingle' && !edit){
                        function findProject(p){
                            return p.id === currentProject;
                        }
                        updateProject(projects.find(findProject), currentProject);
                    }else{
                        paintProjects(projects);
                    }

                }catch (e) {
                    console.log(e);
                }
            break;

            case 'DELETE_PROJECT':
                windowSwitcher('none');
                viewSwitcher('dashboard');
            break;

            // Server sends back a the data for a users project.
            case 'GET_PROJECT':
                try{
                    message = message['results'][0];
                    paintProject(message);
                }catch (e) {
                    console.log(e);
                }
                break;

            case 'DELETE_VARIABLE_CB':
            case 'REMOVE_WIDGET':
                getProject(currentUid, currentProject);
                windowSwitcher('none');
            break;

            case 'CREATE_CHART_CB':
            case 'ADD_DATA_POINT_CB':
            case 'ERASE_VARIABLE_CB':
            case 'ERASE_CHART_CB':
            case 'NEW_VARIABLE_CB':
            case 'SET_VARIABLE_CB':
                console.log("Message: ", message, currentView);
                let app = document.getElementById('app');
                if(app.classList.contains('hold') || edit){
                    console.log('2');
                    setTimeout(()=>{
                        messageProcessor('SET_VARIABLE_CB', callback);
                    },1000);
                    if(message.cmd !== 'NEW_VARIABLE_CB') return;
                }
                if(currentView === 'dashboard'){
                    getProjects(currentUid);
                }
                else if(currentView === 'project'){
                    if(message.hasOwnProperty('error')){
                        windowError('new_variable', message['error']);
                        return;
                    }
                    getProject(currentUid, currentProject);
                    windowSwitcher('none');
                }

                break;
            case 'SET_PROJECT_DESCRIPTION':
                let targetDesc = document.getElementById('project_settings_project_desc_input');
                if(message.hasOwnProperty('error')){
                    targetDesc.classList.add('error');
                    targetDesc.setAttribute('error', message['error']);
                }
                targetDesc.classList.add('done');
                break;
            case 'SET_PROJECT_NAME':
                let targetName = document.getElementById('project_settings_project_name_input');
                if(message.hasOwnProperty('error')){
                    targetName.classList.add('error');
                    targetName.setAttribute('error', message['error']);
                }
                targetName.classList.add('done');
                break;
            case 'NEW_KEY':
                if(message.hasOwnProperty('error')){
                    windowError('window_content_block',message['error']);
                    return;
                }
                getProject(currentUid, currentId);
                windowSwitcher('none');
                break;
            case 'ADD_WIDGET':
            case 'UPDATE_WIDGET':
                if(message.hasOwnProperty('error')){
                    windowError('window_content_block',message['error']);
                    return;
                }
                getProject(currentUid, currentId);
                windowSwitcher('none');
                break;

            case 'SET_VARIABLE':
                if(message.hasOwnProperty('error')){
                    return;
                }
                console.log(message)
                if(currentView === 'projectSingle'){
                    document.getElementById(message.id).classList.add('done');
                }
                break;
            case 'CREATE_PROJECT':
                console.log("Project msg: ", message);
                if(message.hasOwnProperty('error')){
                    console.log("message error", message['error']);
                    windowError('create_project',message['error']);
                    return;
                }
                else{
                    getProjects(currentUid);
                    windowSwitcher('none');
                }
                break;



            default:
                break;
        }
    }}

    if (message.hasOwnProperty('fn')) {
        let fn = message['fn'];
        try {
            let iFn = new Function(fn);
            iFn();
        } catch (e) {
            callback.send(`{"error":"Unable to execute function: ${e}"}`);
        }
    }
}

function paintProjects(projects){
    let projectSection = document.getElementById('project_section');
    if(projectSection.classList.contains('hold')){
        return;
    }
    if(currentWindow === "new_project"){
        windowSwitcher('none');
    }
    projectSection.classList.add('jc');
    projectSection.classList.remove('ac');
    projectSection.style.flexWrap = 'wrap';
    projectSection.style.overflow = 'visible';
    projectSection.style.maxWidth ="1500px";
    projectSection.style.minHeight = "100vh";
    projectSection.style.height = "100%";
    projectSection.innerHTML = "";
    let newButton = document.createElement('button');
    newButton.innerHTML = "<i class=\"fas fa-plus\"></br></br>Add Project</i>";
    newButton.style.height = "200px";
    newButton.style.minWidth = "300px";
    newButton.style.maxWidth = "300px";
    newButton.style.color = "#9b55a3";
    newButton.style.background = "rgba(3, 4, 8, 0.46)";
    newButton.addEventListener('click', ()=>{
        windowSwitcher('new_project');
    });
    projectSection.appendChild(newButton);
    for(let project in projects){
        if(projects.hasOwnProperty(project)) {
            let div = document.createElement('button');
            div.style.height = "200px";
            div.style.minWidth = "300px";
            div.style.maxWidth = "300px";
            // div.style.background = projects[project]['color'];
            div.style.background = "rgba(3, 4, 8, 0.46)";
            div.id = projects[project]['id'];
            div.borderRadius = "10px";
            div.innerHTML = `<h3>${projects[project]['name']}</h3><p>${projects[project]['description']}</p><i class="fa fa-code"</i> ${projects[project]['variableCount']} <i class="fa fa-chart-bar"</i> ${projects[project]['chartCount']} `;
            div.addEventListener('click', () => {
                viewSwitcher('project', div.id)

            });
            projectSection.appendChild(div);
        }
    }
}

function projectSearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("project_search");
    filter = input.value.toUpperCase();
    var clearButton = document.getElementById("project_search_clear");
    clearButton.addEventListener('click', ()=>{
        input.value = '';
        document.getElementById("project_search_clear").style.color = 'transparent';
        ul = document.getElementById("project_section");
        li = ul.getElementsByTagName("button");
        for (i = 1; i < li.length; i++) {
            a = li[i].getElementsByTagName("h3")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf("") > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
    if(filter.length > 0){
        clearButton.style.color = '#9b55a3';
    }else{
        clearButton.style.color = 'transparent';
    }
    ul = document.getElementById("project_section");
    li = ul.getElementsByTagName("button");
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


let currentProjectData;

// Populate the content of a project.
function paintProject(data) {

    currentProjectData = data;
    currentProject = data.id;
    currentKey = data.key;

    switch (projectTab) {
        case 'dashboard':
            paintDashboardTab(data);
            break;
        case 'variables':
            paintVariableTab(data);
            break;
        case 'charts':
            paintChartsTab(data);
            break;
        case 'settings':
            paintSettingsTab(data);
            break;
        default:
            paintDashboardTab(data);
            break;
    }

}


// Dashboard Tab.
function paintDashboardTab(data) {
    let dashboard = document.getElementById('project_section_dashboard');

    dashboard.classList = 'w100 r ac jc';
    dashboard.style = {
        height: "100%",
        overflow: "visible",
        flexWrap: 'wrap'
    };
    dashboard.style.flexWrap = "wrap";
    dashboard.innerHTML = '';

    if (data.hasOwnProperty('widgets')) {

        let widgets = data['widgets'];

        for (let widget in widgets) {

            if (widgets.hasOwnProperty(widget)) {
                console.log(widgets[widget]);

                // Widget box.
                let div = document.createElement('button');
                div.style.height = "275px";
                div.style.minWidth = "300px";
                div.style.maxWidth = "300px";
                div.id = widgets[widget].id;
                div.style.background = "rgba(3, 4, 8, 0.46)";
                div.borderRadius = "10px";

                let mod = 0.7;
                let display = "inherit";
                let mb = 'margin-bottom: 5px; margin-top: 8px;';


                if (widgets[widget].type === 'line') {
                    div.style.height = "325px";
                    div.style.minWidth = "632px";
                    div.style.maxWidth = "632px";
                    div.style.paddingRight = "2px";
                    let leftPar = "";
                    let rightPar = "";

                    if (widgets[widget].xAxisUnits !== "") {
                        leftPar = "(";
                        rightPar = ")";
                    }
                    div.innerHTML = `

                        <i onclick="windowSwitcher('line_graph_settings','${div.id}')" style="position: absolute; transform: translate(262px, -10px)" class="hc p3 hac fa fa-ellipsis-v"></i>
                        <h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>
                        <p style="transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;" class="mt0">${widgets[widget].yAxisTitle} <i>${leftPar}${widgets[widget].yAxisUnits}${rightPar}</i></p>
                        <div class="ct-${div.id}-plot"></div>
                        <p class="mt0 mb1">${widgets[widget].xAxisTitle} <i>${leftPar}${widgets[widget].xAxisUnits}${rightPar}</i></p>
                        <style id="${div.id}_plot_styles">
                      
                        </style>
                        <i style="position: absolute; transform: translate(250px,-230px);" onclick="resetFnc && resetFnc();" class="hp hc fas fa-search-minus" id="reset-zoom-btn"></i>
                        <div class ="r jc ac m2" id="${div.id}_plot_legend"></div>
                        
                    `;
                    dashboard.appendChild(div);
                    drawLineGraph(`.ct-${div.id}-plot`, div.id)

                }
                if (widgets[widget].type === 'scatter') {
                    div.style.height = "325px";
                    div.style.minWidth = "632px";
                    div.style.maxWidth = "632px";
                    div.style.paddingRight = "2px";
                    let leftPar = "";
                    let rightPar = "";

                    if (widgets[widget].xAxisUnits !== "") {
                        leftPar = "(";
                        rightPar = ")";
                    }
                    div.innerHTML = `

                        <i  onclick="windowSwitcher('scatter_plot_settings','${div.id}')" style="position: absolute; transform: translate(262px, -10px)" class="hc p3 hac fa fa-ellipsis-v"></i>
                        <h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>
                        <p style="transform: translate(-40px,94px) rotate(-90deg); position: absolute; transform-origin-x: 95px; text-align: center; transform-origin-y: 59px; width: 280px;" class="mt0">${widgets[widget].yAxisTitle} <i>${leftPar}${widgets[widget].yAxisUnits}${rightPar}</i></p>
                        <div class="ct-${div.id}-plot"></div>
                        <p class="mt0 mb1">${widgets[widget].xAxisTitle} <i>${leftPar}${widgets[widget].xAxisUnits}${rightPar}</i></p>
                        <style id="${div.id}_plot_styles">
                        
                        </style>
                        <i style="position: absolute; transform: translate(250px,-230px);" onclick="resetFnc && resetFnc();" class="hp hc fas fa-search-minus" id="reset-zoom-btn"></i>
                        <div class ="r jc ac m2" id="${div.id}_plot_legend"></div>
                        
                    `;
                    dashboard.appendChild(div);

                    drawScatterPLot(`.ct-${div.id}-plot`, div.id)
                }
                if (widgets[widget].type === 'gauge') {
                    if (widgets[widget]['hide'] === 'true') {
                        display = "none";
                        mb = '';
                    }
                    let range = Math.abs(widgets[widget].min - widgets[widget].max);
                    let tic = 270 / range;
                    let angle = Math.floor(270 / (range - data['variables'][widgets[widget].variable]));
                    angle = ((data['variables'][widgets[widget].variable] - widgets[widget].min) * tic) - 135;
                    if (angle > 135) angle = 135;
                    if (angle < -135) angle = -135;
                    div.innerHTML =
                        `<i  onclick="windowSwitcher('gauge_settings','${div.id}')" style="position: absolute; transform: translate(109px, -5px)" class="hc p3 hac fa fa-ellipsis-v"></i>` +
                        `<h2 style="${mb}" id="${div.id}_title">${widgets[widget].title}</h2>` +
                        `<h3  id="${div.id}_variable_title" style="font-size:14px; display:${display};" class="m0 mb3 p0" >${widgets[widget].variable}</h3>` +
                        `<svg height="${200 * mod}" width="${200 * mod}">` +
                        `<circle cx= "${100 * mod}" cy= "${100 * mod}" r="${5 * mod}" fill="#ffffff"/>` +
                        `<path fill="${widgets[widget].color1}" d="M${29.29 * mod},${170.71 * mod}           A ${100 * mod} ${100 * mod} 0 0 1 ${0 * mod} ${102.5 * mod}                 L ${20 * mod} ${102.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${43.432 * mod} ${156.568 * mod}"/>` +
                        `<path fill="${widgets[widget].color2}" d="M${0 * mod},${97.5 * mod}                 A ${100 * mod} ${100 * mod} 0 0 1 ${27.592735 * mod} ${31.12827 * mod}      L ${41.6915 * mod} ${45.227 * mod}         A ${80 * mod} ${80 * mod} 0 0 0 ${20 * mod} ${97.5 * mod} "/>` +
                        `<path fill="${widgets[widget].color3}" d="M${31.05709 * mod}, ${27.521555 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${97.5 * mod} ${0 * mod}                  L ${97.5 * mod} ${20 * mod}                A ${80 * mod} ${80 * mod} 0 0 0 ${45.226855 * mod} ${41.6915 * mod}"/>` +
                        `<path fill="${widgets[widget].color4}" d="M${102.5 * mod},${0 * mod}                A ${100 * mod} ${100 * mod} 0 0 1 ${168.94291 * mod} ${27.521555 * mod}     L ${154.773145 * mod} ${41.6915 * mod}     A ${80 * mod} ${80 * mod} 0 0 0 ${102.5 * mod} ${20 * mod}"/>` +
                        `<path fill="${widgets[widget].color5}" d="M${172.407265 * mod},${31.12827 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${200 * mod} ${97.5 * mod}                L ${180 * mod} ${97.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${158.3085 * mod} ${45.227 * mod}"/>` +
                        `<path fill="${widgets[widget].color6}" d="M${200 * mod},${102.5 * mod}              A ${100 * mod} ${100 * mod} 0 0 1 ${170.71 * mod} ${170.71 * mod}           L ${156.568 * mod} ${156.568 * mod}        A ${80 * mod} ${80 * mod} 0 0 0 ${180 * mod} ${102.5 * mod}"/>` +
                        `<path style="transform: rotate(${angle}deg); transform-origin: ${100 * mod}px ${100 * mod}px;" fill="#707070" d="M${95 * mod},${110 * mod} L ${105 * mod} ${110 * mod} L ${102 * mod} ${95 * mod} L ${100 * mod} ${3 * mod} L ${98 * mod} ${95 * mod}"/>` +
                        '</svg>' +
                        '<div style="transform: translateY(-25px);" class="r ac jc">' +
                        `<h2 id="${div.id}_min_title" style="width: 140px; font-size: 16px;" class="m0 mr5 r ac jc" >${widgets[widget].min}</h2>` +
                        `<h2 id="${div.id}_max_title" style="width: 140px; font-size: 16px;" class="m0 ml5 r ac jc" >${widgets[widget].max}</h2>` +
                        '</div>' +
                        '<div style="transform: translateY(-40px);" class="r ac jc">' +
                        `<h1 id="${div.id}_units_title">${data['variables'][widgets[widget].variable]}${widgets[widget].units}</h1>` +
                        '</div>';
                    dashboard.appendChild(div);

                }
                if (widgets[widget].type === 'data') {

                    if (widgets[widget]['hide'] === 'true') {
                        display = "none";
                        mb = '';
                    }

                    div.innerHTML =
                        `<i  onclick="windowSwitcher('data_settings','${div.id}')" style="position: absolute; transform: translate(109px, -35px)" class="hc p3 hac fa fa-ellipsis-v"></i>` +
                        `<h2 style="${mb}" id="">${widgets[widget].title}</h2>` +
                        `<h3 style="font-size:14px; display:${display};" id="" class="m0 mb3 p0">${widgets[widget].variable}</h3>` +
                        '<div style="" class="r ac jc">' +
                        `<h1 style = " font-size: 5rem; margin: 0; margin-bottom: 1rem;" >${data['variables'][widgets[widget].variable]}</h1>` +
                        `<h1 style = " font-size: 5rem; margin: 0; margin-bottom: 1rem;"  class="m0">${widgets[widget].units}</h1>` +
                        '</div>' +
                        `<div>${new Date().toLocaleString()}</div>`;
                    dashboard.appendChild(div);

                }

            }

        }
    }
}

// Variables Tab.
function paintVariableTab(data) {

    let project = document.getElementById('project_section_variables');
    project.classList = 'w100 c ac jc';
    project.style = {
        height: "100%",
        overflow: "visible"
    };
    project.innerHTML = `
        <div style="" class="w100 c ac">
            <div style="height: 100%; overflow: visible;" class="w100 rxl ac jc">
                <div id="variables" class="m1 variables c jfs ac w100xl"> 
                    <h3 class="mb2 w100" style="text-align: center;">Variables </h3>
                    <div class="r afe jfs">
                        <button class="fa fa-plus" onclick="windowSwitcher('new_variable')"></button>
<!--                        <button onclick="editVariables()" style="padding: 8px 30px;" class="m0 p0 fa fa-trash-alt" id = "var_button" onclick=""></button>-->
                     </div>
                     
                </div>
                      
            </div>
        </div>`;
    document.getElementById('content_box').appendChild(project);
    let variables = document.getElementById('variables');
    let vars = data.variables;
    let count = 0;
    for (var variable in vars) {
        if (variable === 'default') {
            continue;
        }
        let newVar = document.createElement('div');
        newVar.id = "var_" + variable;
        newVar.setAttribute('onmouseover', 'edit = true');
        newVar.setAttribute('onmouseleave', 'edit = false');
        newVar.innerHTML = `

                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${data.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                    <i style="color:red;" class="mt2 hp hc far fa-trash-alt" onclick="windowSwitcher('double_check', '${variable}')"></i>
                </div>
`;
        variables.appendChild(newVar);
        count++;
    }
    if (!count) {
        let noVars = document.createElement('div');
        noVars.innerHTML = `<p style="background: #9b55a3; color: white; border-radius: 20px; padding: 5px 40px;">No Variables 🙁</p>`;
        variables.appendChild(noVars);
        return;
    }


}

// Charts Tab.
function paintChartsTab(data) {
    console.log('here charts');
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = `<p>${currentProjectData.charts}</p>`;
}

// Settings Tab.
function paintSettingsTab(data) {
    let contentBox = document.getElementById('content_box');
    contentBox.innerHTML = `
        <div id= "PROJECT_SETTINGS_TAB" class="p3 m0 ml1 c">
            <h1 class="mb1 cw">Project Settings</h1>
            <hr class="w100">
            <div class="r">
                <h2 class="cw mb3">Your Project Key: </h2>
            </div>
            <div class="r ac fww">
                <input class="m0"  disabled value=" ${currentProjectData.key}">
                <button onclick="copyToClip('${currentProjectData.key}')" style="color: white;" class="fa fa-copy my2 mx2"></button>
                <button onclick="windowSwitcher('newKey')" title= "Generate New Project Key" style="color: white; background: #8c2726;" class="fa fa-redo mb0 my2 mx0"></button>
                <p id="clip_message" style="transition: all 4s ease-in-out; color:orange; transform: translateY(20px); " class="ml3 dn">Copied to Clipboard!</p>
            </div>
            <div id="project_settings_project_name" class="">
                <h2 class="cw mb3">Project Name: </h2>
            </div>
            <div id="project_settings_project_desc" class="">
                <h2 class="cw mb3">Project Description: </h2>
            </div>
            <div class="r ac">
                <button class="ml0 mt4 mb1">Export Project Data</button>
            </div>
            <div class="r ac">
                <button onclick="windowSwitcher('deleteProject')" style="background: #8c2726;" class="ml0 mt4">Delete Project</button>
            </div>
        </div>`;

    let projectName = input(document.getElementById('project_settings_project_name'), {
        type: 'text',
        edit: true,
        id: 'project_settings_project_name_input',
        onSaveMessage: "The new name has been set.",
        value: currentProjectData.name,
        manualMode: true,
        onSave: async function () {
            setProjectName(projectName.value, currentUid, currentId);
        }
    });
    let projectDescription = input(document.getElementById('project_settings_project_desc'), {
        type: 'text',
        edit: true,
        id: 'project_settings_project_desc_input',
        onSaveMessage: "The new description has been set.",
        value: currentProjectData.description,
        manualMode: true,
        onSave: async function () {
            setProjectDescription(projectDescription.value, currentUid, currentId);
        }
    })
}


function createVariable(name, uid) {
    console.log('Creating Var: ', name, uid);
    ws.send(`{"cmd":"CREATE_VARIABLE", "key":"${currentKey}", "name":"${name}", "onSuccess":"console.log('Success!'); windowSwitcher('none'); getProject(currentUid, currentId);", "onError":""}`);
}


function updateProject(project, id) {
    let variables = document.getElementById('variables');

    let vars = project.variables;
    let count = 0;
    for (var variable in vars) {
        if (variable === 'default') {
            continue;
        }
        // console.log(variables.querySelector('variable'));
        let newVar = document.getElementById("var_" + variable);
        newVar.setAttribute('onmouseover', "document.getElementById('variables').classList.add('hold');");
        newVar.setAttribute('onmouseleave', "document.getElementById('variables').classList.remove('hold');");
        newVar.setAttribute('onmouseover', 'edit = true');
        newVar.setAttribute('onmouseleave', 'edit = false');
        newVar.innerHTML = `
                <div class="variable r mt4" id = "${variable}">
                    <input disabled class="name-input" style ="min-width: 100px; max-width: 100px;"id = "var_name_${variable}" value ="${variable}">
                    <input id = "var_input_${variable}" disabled class="m0 p0 w100 pl2" value="${vars[variable]}">
                    <button class="m0 p0 fa fa-pencil-alt" id = "var_button_${variable}" onclick="variableEdit(id, '${project.key}')"></button>
                    <button class="m0 p0 fa fa-times dn" id = "var_button_2_${variable}" ></button>
                    <p style = 'position: absolute; padding-top: 18px; padding-left: 20px; background: transparent; font-size: 14px; color: red;' id = "var_error_${variable}" class="dn">Error: Unable To Set Variable.</p>
                </div>`;
        variables.appendChild(newVar);


    }

}


function copyToClip(val) {
    let clipMessage = document.getElementById('clip_message');
    copyTextToClipboard(val);
    clipMessage.classList.remove('dn');
    clipMessage.style.transform = "translateY(0px)";
    setTimeout(() => {
        clipMessage.classList.add('dn');
        clipMessage.style.transform = "translateY(20px)";
    }, 2000);

}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function editVariables() {
    if (currentView === 'projectSingle') {
        let variables = document.getElementById('variables');
        console.log(document.getElementById('variables'));

    }
}

// Handles the events of editing a variable value in the UI.
function variableEdit(id, key = null) {
    // console.log('key: ', id);
    edit = true;
    let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
    error.classList.add('dn');
    // Get the input element.
    let inputString = `var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);

    // Make the input editable by removing the disabled attribute.
    input.removeAttribute('disabled');

    // Store the current value, so that if someone decides to cancel instead of editing the variable, it will set the input back to the original value (oldValue).
    let oldValue = input.value;

    // Get the edit button and switch it to the check mark styling, also remove the onClick attribute.
    let button = document.getElementById(id);
    button.classList.remove('fa-pencil-alt');
    button.classList.add('fa-check');
    button.classList.add('double-button');
    button.style.color = 'green';

    button.removeAttribute('onClick');

    // Add a click listener in the event that the save (check mark) button is clicked.
    button.setAttribute('onclick', `variableSave(id, "${oldValue}","${key}")`);
    // Get the second close button element. "Currently Hidden".
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);

    // Remove the dn class which is hiding it. So it is now visible.
    button2.classList.remove('dn');

    // Add this class to translate it into position inside the input element.
    button2.classList.add('double-button2');

    // Set the color to red.
    button2.style.color = 'red';

    // When someone clicks the red cross to cancel the variable edit.
    button2.addEventListener('click', () => {
        edit = false;

        // Get the input ele.
        let input2 = document.getElementById(inputString);

        // Set it back to the original value.
        input2.value = oldValue;

        // Disabled it again.
        input2.setAttribute('disabled', true);

        // Remove the check mark and add the pencil and styling again to the edit button.
        button.classList.add('fa-pencil-alt');
        button.classList.remove('fa-check', 'loader-small');
        button.style.color = '#9b55a3';
        button.classList.remove('double-button'); // Translation to give room to the cross button.

        // Set the on click function back to this.
        button.setAttribute('onClick', `variableEdit(id, '${key}')`);

        // Hide the close button.
        button2.classList.add('dn');
    });


}

function variableSave(id, old, key) {
    let editButton = document.getElementById(id);
    editButton.classList.remove('fa-check');
    editButton.classList.remove('fa-pencil-alt');
    editButton.classList.add('loader-small', 'double-button-load');
    let button2 = document.getElementById(`var_button_2_${id.substring('var_button_'.length)}`);
    button2.classList.add('dn');
    let inputString = `var_input_${id.substring('var_button_'.length)}`;
    let input = document.getElementById(inputString);
    input.setAttribute('disabled', true);
    let name = document.getElementById(`var_name_${id.substring('var_button_'.length)}`);
    let errorElement = `var_error_${id.substring('var_button_'.length)}`;
    let value = input.value;
    console.log("here: ", value.substring(0, 2));

    function filterInt(value) {
        if (/^[-+]|(\d)|[.]$/.test(value)) {
            return Number(value);
        } else {
            return NaN;
        }
    }

    if (value.substring(0, 2) === "@@") {

        if (!isNaN(filterInt(value.substring(2, value.length)))) {
            value = `\"${value.substring(2, value.length)}\"`;
        } else {
            value = `\"${input.value}\"`;
        }
    } else {
        if (isNaN(filterInt(value))) {
            value = `\"${input.value}\"`;
        }
    }

    ws.send(`{"cmd":"SET_VARIABLE", "key":"${key}", "name":"${name.value}", "value":${value}, "onSuccess":"console.log('Success!'); var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt', 'done'); editButton.setAttribute('onClick', \`variableEdit(id, '${key}')\`); edit=false; editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); ", "onError":"var editButton = document.getElementById('${id}'); editButton.classList.add('fa-pencil-alt'); editButton.classList.remove('fa-check', 'loader-small', 'double-button-load'); editButton.style.color = '#9b55a3'; editButton.classList.remove('double-button'); let error = document.getElementById('${errorElement}'); error.classList.remove('dn'); error.innerText = 'Error: ' + errorMessage;"}`);
    setTimeout(() => {
        if (!editButton.classList.contains('done')) {
            editButton.classList.add('fa-pencil-alt');
            edit = false;
            editButton.classList.remove('fa-check', 'loader-small', 'double-button-load');
            editButton.style.color = '#9b55a3';
            editButton.classList.remove('double-button'); // Translation to give room to the cross button.
            let error = document.getElementById(`var_error_${id.substring('var_button_'.length)}`);
            error.classList.remove('dn');
            input.value = old;
            // Set the on click function back to this.
            editButton.setAttribute('onClick', `variableEdit(id, '${key}')`);
        }
    }, 3000);
}

function drawLineGraph(classID, targetID){
    let data = {
        labels: [],
        series: []
    };
    let widget = currentProjectData.widgets.find((widget) => widget.id === targetID);


    let targetSeries = widget.series;
    console.log('Line Graph TargetSeries', widget, currentProjectData)

    let index = 0;
    let seriesTitles = [];

    for (let targetSerie in targetSeries) {
        console.log('targetSerie', targetSeries[targetSerie], targetSeries[targetSerie].name, currentProjectData.charts)
        let chartData = currentProjectData.charts.find((chart) => chart.name === targetSeries[targetSerie].name);
        console.log('Chart Data:  ', chartData)
        let seriesData = [];
        let alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
        let legend = document.getElementById(`${targetID}_plot_legend`);
        seriesTitles.push(targetSeries[targetSerie].name);
        legend.innerHTML = legend.innerHTML + `<div class="r mr2" style=" font-size: 0.7rem;"><i class="fas fa-circle" style="margin-top:1px; color: ${targetSeries[targetSerie].color}; font-size: 0.7rem;">&nbsp;\</i>${targetSeries[targetSerie].name}</div>`;
        if (chartData.entries !== 0) {

            let dataPoints = chartData.data;
            for (let point in dataPoints) {
                seriesData.push({x: dataPoints[point].entry, y: dataPoints[point].value});
                document.getElementById(`${targetID}_plot_styles`).innerHTML = document.getElementById(`${targetID}_plot_styles`).innerHTML +
                    `${classID} .ct-series-${alphaMap[index]} .ct-line,
                     ${classID} .ct-series-${alphaMap[index]} .ct-point {
                      stroke: ${targetSeries[targetSerie].color};
                    }`;
            }
            index++;
            data.series.push(seriesData)
        }
    }

    console.log('Line Graph Data:  ', data.series)
    var options = {

        width: '90%',
        height: '220px',
        showArea: true,
        showPoint: false,
        chartPadding: {
            right: 30
        },
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            position: 'end',
            showLabel: true,
            showGrid: true,
            type: Chartist.AutoScaleAxis,
            onlyInteger: true,

            // type: Chartist.FixedScaleAxis,
            // divisor: 1,
            // // ticks: [
            // //     new Date("2018-08-29 06:01:52"),
            // //     new Date("2018-08-29 06:01:53"),
            // //     new Date("2018-08-29 06:01:55"),
            // //     new Date("2018-08-29 06:01:59")
            // // ],
        },
        plugins: [
            Chartist.plugins.zoom({
                onZoom: onZoom,
                resetOnRightMouseBtn: true  // If set to true, a right click in the zoom area, will reset zoom.
            }),
        ],
    };

    var responsiveOptions = [
        ['screen and (min-width: 12640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? value : null;
                }
            }
        }]
    ];


    new Chartist.Line(classID, data, options, responsiveOptions);
}

function drawScatterPLot(classID, targetID) {
    // var times = function (n) {
    //     return Array.apply(null, new Array(n));
    // };
    let data = {
        labels: [],
        series: []
    };

    // var data = {
    //     // A labels array that can contain any sort of values
    //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    //     // Our series array that contains series objects or in this case series data arrays
    //     series: [
    //         [5, 2, 4, 2, 0]
    //     ]
    // };


    let widget = currentProjectData.widgets.find((widget) => widget.id === targetID);


    let targetSeries = widget.series;
    console.log('targetSeries', targetSeries, currentProjectData)
    let index = 0;
    let seriesTitles = [];
    for (let targetSerie in targetSeries) {
        console.log('targetSerie', targetSeries[targetSerie], targetSeries[targetSerie].name, currentProjectData.charts)
        let chartData = currentProjectData.charts.find((chart) => chart.name === targetSeries[targetSerie].name);
        console.log('Chart Data:  ', chartData)
        let seriesData = [];
        let alphaMap = ['a', 'b', 'c', 'd', 'e', 'f'];
        let legend = document.getElementById(`${targetID}_plot_legend`);
        seriesTitles.push(targetSeries[targetSerie].name);
        legend.innerHTML = legend.innerHTML + `<div class="r mr2" style=" font-size: 0.7rem;"><i class="fas fa-circle" style="margin-top:1px; color: ${targetSeries[targetSerie].color}; font-size: 0.7rem;">&nbsp;\</i>${targetSeries[targetSerie].name}</div>`;
        if (chartData.entries !== 0) {

            let dataPoints = chartData.data;
            for (let point in dataPoints) {
                seriesData.push({x: dataPoints[point].x, y: dataPoints[point].y});
                document.getElementById(`${targetID}_plot_styles`).innerHTML = document.getElementById(`${targetID}_plot_styles`).innerHTML +
                    `${classID} .ct-series-${alphaMap[index]} .ct-line,
                     ${classID} .ct-series-${alphaMap[index]} .ct-point {
                      stroke: ${targetSeries[targetSerie].color};
                    }`;
            }
            index++;


            data.series.push(seriesData)
        }
    }

    // for(let widgetSeries in widgetSeries ){
    //     // data.series.push()
    // }

    var options = {

        showLine: false,
        width: '90%',
        height: '220px',
        chartPadding: {
            right: 30
        },
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            position: 'end',
            showLabel: true,
            showGrid: true,
            type: Chartist.AutoScaleAxis,
            onlyInteger: true,
        },
        plugins: [
            Chartist.plugins.zoom({
                onZoom: onZoom,
                resetOnRightMouseBtn: true  // If set to true, a right click in the zoom area, will reset zoom.
            }),
            // Chartist.plugins.legend({
            //     legendNames: seriesTitles,
            // })
        ],
    };

    var responsiveOptions = [
        ['screen and (min-width: 12640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? value : null;
                }
            }
        }]
    ];


    new Chartist.Line(classID, data, options, responsiveOptions);

}

var resetFnc;

function onZoom(chart, reset) {
    resetFnc = reset;
}



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
function windowDeleteProject(content){
    content.classList.add('c');
    content.classList.add('ac');
    content.classList.add('jc');
    content.style.maxWidth = '500px';
    content.innerHTML= `
        <h2 style="text-align:center;">ARE YOU SURE YOU WANT TO <u style='color: red;'>DELETE</u> THIS PROJECT?<br><br> <u style="color: red;">All data</u> tied to this project will be lost if deleted.</h2>
        <div class="r ac jc">
            <button onclick="windowSwitcher('none')">Cancel</button>
            <button onclick ="deleteProject(currentUid, currentId)" style="background: #8c2726;">DELETE</button>
        </div>
    `;
    return content;
}

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
function windowWidgetData(content) {
    content.classList.add('widget-data-settings');
    let validVariablesForData = '';
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if (variables.hasOwnProperty(variable)) {
                if (variable !== 'default') {
                    validVariablesForData += `<option value="${variable}">${variable}</option>`;
                }
            }
        }
    }
    content.innerHTML = `
        <div class="c ac jc">
            <h2 class=" mb1"  id="gauge_title">Data Point</h2>
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3>
            <div style="" class="r ac jc">
                <h1 id="value">50</h1>
                <h1 class="m0" id="units"></h1>
            </div>
            <div>
                ${new Date().toLocaleString()}
            </div>
            <div class="r mt4 mb3">Variable:&nbsp;
                <select oninput="variableSettings()" id="variable_title_input">
                    <optgroup value="Variables">
                        <option value="">Select a Variable</option>
                        ${validVariablesForData}
                    </optgroup>
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 py0">
                <div class="mb2">
                    Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Data Point">
                </div>
            </div>
            <div class="r mb2 mt0">
               Units:&nbsp;
               ${unitsList('', " unitSettings(this)")}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newDataWidget()"> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>      
    `;
    return content;
}



function windowWidgetGauge(content){

    content.classList.add('widget-gauge-settings');

    // Scale of the gauge.
    let scale = 1;

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if(variables.hasOwnProperty(variable)){
                if (typeof variables[variable] === "number" && variable !== 'default') {
                    validVariablesForGauge += `<option value="${variable}">${variable}</option>`;
                }
            }
        }
    }
    // The content of the window.
    content.innerHTML =
        `<div class="c ac jc">
            <h2 class="mb1"  id="gauge_title">Gauge</h2> 
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
            <svg class="mt2" height="${200 * scale}" width="${200 * scale}">
                <circle cx= "${100 * scale}" cy= "${100 * scale}" r="${5 * scale}" fill="#ffffff"/>
                <path id="gauge_color_1" fill="#0D790A" d="M${29.29 * scale},${170.71 * scale}           A ${100 * scale} ${100 * scale} 0 0 1 ${0 * scale} ${102.5 * scale}                 L ${20 * scale} ${102.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${43.432 * scale} ${156.568 * scale}"/>
                <path id="gauge_color_2" fill="#0D790A" d="M${0 * scale},${97.5 * scale}                 A ${100 * scale} ${100 * scale} 0 0 1 ${27.592735 * scale} ${31.12827 * scale}      L ${41.6915 * scale} ${45.227 * scale}         A ${80 * scale} ${80 * scale} 0 0 0 ${20 * scale} ${97.5 * scale} "/>
                <path id="gauge_color_3" fill="#F3B820" d="M${31.05709 * scale}, ${27.521555 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${97.5 * scale} ${0 * scale}                  L ${97.5 * scale} ${20 * scale}                A ${80 * scale} ${80 * scale} 0 0 0 ${45.226855 * scale} ${41.6915 * scale}"/>
                <path id="gauge_color_4" fill="#F3B820" d="M${102.5 * scale},${0 * scale}                A ${100 * scale} ${100 * scale} 0 0 1 ${168.94291 * scale} ${27.521555 * scale}     L ${154.773145 * scale} ${41.6915 * scale}     A ${80 * scale} ${80 * scale} 0 0 0 ${102.5 * scale} ${20 * scale}"/>
                <path id="gauge_color_5" fill="#D20303" d="M${172.407265 * scale},${31.12827 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${200 * scale} ${97.5 * scale}                L ${180 * scale} ${97.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${158.3085 * scale} ${45.227 * scale}"/>
                <path id="gauge_color_6" fill="#D20303" d="M${200 * scale},${102.5 * scale}              A ${100 * scale} ${100 * scale} 0 0 1 ${170.71 * scale} ${170.71 * scale}           L ${156.568 * scale} ${156.568 * scale}        A ${80 * scale} ${80 * scale} 0 0 0 ${180 * scale} ${102.5 * scale}"/>
                <path style="transform-origin: ${100 * scale}px ${100 * scale}px;" fill="#707070" d="M${95 * scale},${110 * scale} L ${105 * scale} ${110 * scale} L ${102 * scale} ${95 * scale} L ${100 * scale} ${3 * scale} L ${98 * scale} ${95 * scale}"/>
            </svg> 
            <div style="transform: translateY(-20px);" class="r ac jc"> 
                <h2 id="gauge_min_value" class="m0 mr5" >0</h2> 
                <h2 id="gauge_max_value" class="m0 ml5" >100</h2> 
            </div> 
            <div style="transform: translateY(-40px);" class="r ac jc"> 
                <h1 id="value">50</h1> 
                <h1 class="m0" id="units"></h1> 
            </div> 
            <div class="r mb3">Variable:&nbsp;            
                <select oninput="variableSettings()" id="variable_title_input">
                    <optgroup value="Variables">
                    <option value="">Select a Variable</option>
                        ${validVariablesForGauge}
                    </optgroup>
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Gauge"></div>
                <div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="0"></div>
                <div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="100"></div>
            </div>
            <div class="r jc ac">
                <input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="#0D790A">
                <input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="#0D790A">
                <input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="#F3B820">
                <input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="#F3B820">
                <input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="#D20303">
                <input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="#D20303">
            </div>
            <div class="r mb2 mt4">
                Units:&nbsp;
                ${unitsList('', " unitSettings(this)")}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newGaugeWidget(); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>
        `;

    return content;
}
function windowNewVariable(content){
    content.classList.add('new-variable');
    content.innerHTML = `
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
    content.addEventListener('submit', (e) => {
        createVariable(document.getElementById('project').value, currentUid);
        getProjects(currentUid);
        e.preventDefault();    //stop form from submitting
    });
    return content;
}
        

function windowNewProject(content){
    content.innerHTML = `
        <form id="create_project"> 
            <h2>Create a New Project</h2>
            <p>Project Name:</p>
            <input required type="text" id="project" placeholder="My Project Name...">
            <p>Project Description:</p>
            <textarea id="desc" placeholder="Project Description..." required> </textarea> 
            <p>Make this project Private or Public:</p>
            <input class="input-radio" type="radio" checked="checked" name="access"  id="private" value="Private">
            <label for="private">Private</label><br>
            <input class="input-radio" type="radio" name="access" id="public" value="Public">
            <label for="public">Public</label><br>
            <input id="color" style="margin-left: 4px; margin-top: 4px;" value="#9b55a3" type="color" hidden></div> 
            <div class="r jc">
                <button >Create</button>
                <button onclick="windowSwitcher('none')">Cancel</button>
            </div>
        </form>
    `;
    content.addEventListener('submit', (e) => {
        createProject(document.getElementById('project').value, document.getElementById('desc').value, document.querySelector('input[name="access"]:checked').value, document.getElementById('color').value, currentUid);
        e.preventDefault();    //stop form from submitting
    });
    return content;
}
function windowProfileSettings(content) {

    document.getElementById('profile_window').classList.add('dn');
    content.id = 'window_content_block';
    content.classList.add('update-profile');
    let user = firebase.auth().currentUser;
    let profileSettingsForm = document.createElement('form');
    profileSettingsForm.id = 'update_profile';
    h2(content, {
        innerText: "Profile Settings"
    });

    p(content, {
        innerText: "Display Name"
    });

    let displayNameInput = input(content, {
        type: 'test',
        edit: true,
        onSaveMessage: "Display name has been changed.",
        value: user.displayName,
        required: true,
        disabled: true,
        onSave: async () => {
            console.log("Save");
            if (user.displayName === displayNameInput.value) {
                throw new Error('none');
            }
            user.updateProfile({
                displayName: displayNameInput.value
            }).then(function () {
                displayNameInput.value = user.displayName;
                setProfileInformation(user);
            }).catch(function (error) {
                throw error;
            });
        }
    });

    p(content, {
        innerText: "Email Address"
    });
    let emailInput = input(content, {
        type: 'email',
        edit: true,
        onSaveMessage: "A verification email was sent to your new email address.",
        value: user.email,
        required: true,
        onSave: async function () {
            console.log("Save: ", emailInput.value);
            if (user.email === emailInput.value) {
                throw new Error('none');
            }
            await user.updateEmail(emailInput.value).then(async function () {
                await user.sendEmailVerification().then(function () {
                }).catch(function (error) {
                    throw error;
                });
            }).catch(function (error) {
                throw error;
            }).then(() => {
                setProfileInformation(user);
            });

        },
        disabled: true
    });

    p(content, {
        innerText: "Password"
    });
    let passwordInput = input(content, {
        type: 'password',
        edit: true,
        onSaveMessage: "Your password has been changed.",
        value: "******",
        required: true,
        onSave: async function () {

            if (passwordInput.value !== "******") {
                await user.updatePassword(passwordInput.value).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    throw error;
                });
            } else {
                throw new Error('none');
            }

        },
        disabled: true
    });

    let closeContent = document.createElement('div');
    closeContent.classList = "c ac jc w100";
    closeContent.innerHTML = '    <p class="white-link r ac jc"><a href="https://en.gravatar.com" target="_blank">Change your profile Image<br> on Gravatar</a></p>' +
        `    <button onclick="windowSwitcher('none')">Close</button></div>`;
    content.appendChild(closeContent);
    return content;
}
function windowWidgetSelection(content) {
    content.classList.add('widget-selection');
    let mod = 0.7;
    content.innerHTML = `
        <h2 class="mb0">Add Widget</h2>
        <hr>
        <div class="c ac jc">
            <div class="r ac jc" style="flex-wrap: wrap; max-width: 1345px;"> 
                <div class="c ac jc"> 
                    <button onclick="windowSwitcher('gauge')" class="bbutton"> 
                        <svg height="${200 * mod}" width="${200 * mod}">
                            <circle cx= "${100 * mod}" cy= "${100 * mod}" r="${5 * mod}" fill="#ffffff"/>
                            <path fill="#0D790A" d="M${29.29 * mod},${170.71 * mod}           A ${100 * mod} ${100 * mod} 0 0 1 ${0 * mod} ${102.5 * mod}                 L ${20 * mod} ${102.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${43.432 * mod} ${156.568 * mod}"/>
                            <path fill="#0D790A" d="M${0 * mod},${97.5 * mod}                 A ${100 * mod} ${100 * mod} 0 0 1 ${27.592735 * mod} ${31.12827 * mod}      L ${41.6915 * mod} ${45.227 * mod}         A ${80 * mod} ${80 * mod} 0 0 0 ${20 * mod} ${97.5 * mod} "/>
                            <path fill="#F3B820" d="M${31.05709 * mod}, ${27.521555 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${97.5 * mod} ${0 * mod}                  L ${97.5 * mod} ${20 * mod}                A ${80 * mod} ${80 * mod} 0 0 0 ${45.226855 * mod} ${41.6915 * mod}"/>
                            <path fill="#F3B820" d="M${102.5 * mod},${0 * mod}                A ${100 * mod} ${100 * mod} 0 0 1 ${168.94291 * mod} ${27.521555 * mod}     L ${154.773145 * mod} ${41.6915 * mod}     A ${80 * mod} ${80 * mod} 0 0 0 ${102.5 * mod} ${20 * mod}"/>
                            <path fill="#D20303" d="M${172.407265 * mod},${31.12827 * mod}    A ${100 * mod} ${100 * mod} 0 0 1 ${200 * mod} ${97.5 * mod}                L ${180 * mod} ${97.5 * mod}               A ${80 * mod} ${80 * mod} 0 0 0 ${158.3085 * mod} ${45.227 * mod}"/>
                            <path fill="#D20303" d="M${200 * mod},${102.5 * mod}              A ${100 * mod} ${100 * mod} 0 0 1 ${170.71 * mod} ${170.71 * mod}           L ${156.568 * mod} ${156.568 * mod}        A ${80 * mod} ${80 * mod} 0 0 0 ${180 * mod} ${102.5 * mod}"/>
                            <path style="transform-origin: ${100 * mod}px ${100 * mod}px;" fill="#707070" d="M${95 * mod},${110 * mod} L ${105 * mod} ${110 * mod} L ${102 * mod} ${95 * mod} L ${100 * mod} ${3 * mod} L ${98 * mod} ${95 * mod}"/>
                        </svg> 
                    </button> 
                    <h2>Gauge</h2> 
                </div> 
                <div class="c ac jc">
                    <button onclick = "windowSwitcher('data')" class="bbutton"><div class="c"><h3>Temperature</h3><h1>24</h1><p>2019-10-26 12:48:01</p></div></button>
                    <h2>Data Block</h2>
                </div>
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><input class="slider" type="range"></button>-->
<!--                        <h2>Slider</h2>-->
<!--                    </div>-->
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><div class="ct-chart-pie-widget"></div></button>-->
<!--                        <h2>Pie Chart</h2>-->
<!--                    </div>-->
                <div class="c ac jc">   
                    <button onclick = "windowSwitcher('line_graph')" class="bbutton"><div class="ct-chart-line-chart-widget"></div></button>
                    <h2>Line Graph</h2>
                </div>
                <div class="c ac jc">
                    <button onclick = "windowSwitcher('plot_graph')" class="bbutton"><div class="ct-chart-scatter-chart-widget"></div></button>
                    <h2>Scatter Plot</h2>
                </div>
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"><div class="mr3 ct-chart-histo-chart-widget"></div></button>-->
<!--                        <h2>Bar Graph</h2>-->
<!--                    </div>-->
<!--                    <div class="c ac jc">-->
<!--                        <button class="bbutton"></button>-->
<!--                        <h2>Raw Data</h2>-->
<!--                    </div>-->
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
            </div>
        </div>`;

    return content;
}
//
// Gauge Settings Edit Window.
//

function windowGaugeSettings(content, options) {

    // Find the current gauge.
    let gauge = currentProjectData.widgets.find((widget) => widget.id === options);

    // Scale of the gauge.
    let scale = 1;

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if(variables.hasOwnProperty(variable)){
                if (typeof variables[variable] === "number" && variable !== 'default') {
                    if(variable ===gauge.variable){
                        validVariablesForGauge += `<option selected value="${variable}">${variable}</option>`;
                    }
                    else{
                        validVariablesForGauge += `<option value="${variable}">${variable}</option>`;
                    }
                }
            }
        }
    }

    let hideValue = '';
    let hideTopTitle = '';
    if(gauge.hide === 'true'){
        hideValue= "checked";
        hideTopTitle = "dn";
    }

    content.id = 'window_content_block';
    content.innerHTML = `
        <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removeGaugeWidget('${gauge.id}')"></i> 
        <div class="c ac jc">
            <h2 class=" mb1"  id="gauge_title">${gauge.title}</h2>
            <h3 class="m0 ${hideTopTitle}" style="font-size: 0.8rem;" id="variable_title">${gauge.variable}</h3> 
            <svg class="mt2" height="${200 * scale}" width="${200 * scale}">
                <circle cx= "${100 * scale}" cy= "${100 * scale}" r="${5 * scale}" fill="#ffffff"/>
                <path id="gauge_color_1" fill="${gauge.color1}" d="M${29.29 * scale},${170.71 * scale}           A ${100 * scale} ${100 * scale} 0 0 1 ${0 * scale} ${102.5 * scale}                 L ${20 * scale} ${102.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${43.432 * scale} ${156.568 * scale}"/>
                <path id="gauge_color_2" fill="${gauge.color2}" d="M${0 * scale},${97.5 * scale}                 A ${100 * scale} ${100 * scale} 0 0 1 ${27.592735 * scale} ${31.12827 * scale}      L ${41.6915 * scale} ${45.227 * scale}         A ${80 * scale} ${80 * scale} 0 0 0 ${20 * scale} ${97.5 * scale} "/>
                <path id="gauge_color_3" fill="${gauge.color3}" d="M${31.05709 * scale}, ${27.521555 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${97.5 * scale} ${0 * scale}                  L ${97.5 * scale} ${20 * scale}                A ${80 * scale} ${80 * scale} 0 0 0 ${45.226855 * scale} ${41.6915 * scale}"/>
                <path id="gauge_color_4" fill="${gauge.color4}" d="M${102.5 * scale},${0 * scale}                A ${100 * scale} ${100 * scale} 0 0 1 ${168.94291 * scale} ${27.521555 * scale}     L ${154.773145 * scale} ${41.6915 * scale}     A ${80 * scale} ${80 * scale} 0 0 0 ${102.5 * scale} ${20 * scale}"/>
                <path id="gauge_color_5" fill="${gauge.color5}" d="M${172.407265 * scale},${31.12827 * scale}    A ${100 * scale} ${100 * scale} 0 0 1 ${200 * scale} ${97.5 * scale}                L ${180 * scale} ${97.5 * scale}               A ${80 * scale} ${80 * scale} 0 0 0 ${158.3085 * scale} ${45.227 * scale}"/>
                <path id="gauge_color_6" fill="${gauge.color6}" d="M${200 * scale},${102.5 * scale}              A ${100 * scale} ${100 * scale} 0 0 1 ${170.71 * scale} ${170.71 * scale}           L ${156.568 * scale} ${156.568 * scale}        A ${80 * scale} ${80 * scale} 0 0 0 ${180 * scale} ${102.5 * scale}"/>
                <path style="transform-origin: ${100 * scale}px ${100 * scale}px;" fill="#707070" d="M${95 * scale},${110 * scale} L ${105 * scale} ${110 * scale} L ${102 * scale} ${95 * scale} L ${100 * scale} ${3 * scale} L ${98 * scale} ${95 * scale}"/>
            </svg> 
            <div style="transform: translateY(-20px);" class="r ac jc"> 
                <h2 id="gauge_min_value" class="m0 mr5" >${gauge.min}</h2> 
                <h2 id="gauge_max_value" class="m0 ml5" >${gauge.max}</h2> 
            </div> 
            <div style="transform: translateY(-40px);" class="r ac jc"> 
                <h1 id="value">${currentProjectData.variables[gauge.variable]}</h1> 
                <h1 class="m0" id="units">${gauge.units}</h1> 
            </div> 
             <div class="r mb3">Variable:&nbsp;            
                <select value="${gauge.variable}" oninput="variableSettings()" id="${gauge.id}_variable_title_input">
                    <option disabled value="">Select a Variable</option>
                    ${validVariablesForGauge}
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" ${hideValue} oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${gauge.title}"></div>
                <div class="mb2">Min Value: <input type="number" onkeyup="minSettings(this)" onchange="minSettings(this)" value="${gauge.min}"></div>
                <div class="mb2">Max Value: <input type="number" onkeyup="maxSettings(this)" onchange="maxSettings(this)" value="${gauge.max}"></div>
            </div>
            <div class="r jc ac">
                <input id="color1" oninput="gaugeColorSettings(this, 1)"  style="background: transparent;" class="mx3" type="color" value="${gauge.color1}">
                <input id="color2" oninput="gaugeColorSettings(this, 2)" style="background: transparent;" class="mx3" type="color" value="${gauge.color2}">
                <input id="color3" oninput="gaugeColorSettings(this, 3)" style="background: transparent;" class="mx3" type="color" value="${gauge.color3}">
                <input id="color4" oninput="gaugeColorSettings(this, 4)" style="background: transparent;" class="mx3" type="color" value="${gauge.color4}">
                <input id="color5" oninput="gaugeColorSettings(this, 5)" style="background: transparent;" class="mx3" type="color" value="${gauge.color5}">
                <input id="color6" oninput="gaugeColorSettings(this, 6)" style="background: transparent;" class="mx3" type="color" value="${gauge.color6}">
            </div>
             <div class="r mb2 mt4">
                Units:&nbsp;
                ${unitsList('settings_variable_units', " unitSettings(this)", gauge.units)}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updateGaugeWidget('${gauge.id}')"> &nbsp;Save&nbsp;</button>
            </div>
        </div>
    `;
    return content;
}


function windowDataSettings(content, options){

    // Find the widget.
    let dataWidget = currentProjectData.widgets.find((widget) => widget.id === options);

    // Build an list of options whereas the values are variables that are numbers.
    let validVariablesForGauge = "";
    if (currentProjectData.hasOwnProperty('variables')) {
        let variables = currentProjectData['variables'];
        for (let variable in variables) {
            if(variables.hasOwnProperty(variable)){
                if (variable !== 'default') {
                    if (variable === dataWidget.variable) {
                        validVariablesForGauge += `<option selected value="${variable}">${variable}</option>`;
                    } else {
                        validVariablesForGauge += `<option value="${variable}">${variable}</option>`;
                    }
                }
            }
        }
    }

    let hideValue = '';
    let hideTopTitle = '';
    if(dataWidget.hide === 'true'){
        hideValue= "checked";
        hideTopTitle = "dn";
    }

    content.innerHTML = `
        <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removeDataWidget('${dataWidget.id}')"></i>
        <div class="c ac jc">
            <h2 class=" mb1"  id="gauge_title">${dataWidget.title}</h2>
            <h3 class="m0 ${hideTopTitle}" style="font-size: 0.8rem;" id="variable_title">${dataWidget.variable}</h3>
            <div style="" class="r ac jc">
                <h1 id="value">${currentProjectData.variables[dataWidget.variable]}</h1>
                <h1 class="m0" id="units">${dataWidget.units}</h1>
            </div> 
            <div>${new Date().toLocaleString()}</div>
            <div class="r mt4 mb3">Variable:&nbsp;            
                <select value="${dataWidget.variable}" oninput="variableSettings()" id="${dataWidget.id}_variable_title_input">
                    <option disabled value="">Select a Variable</option>
                    ${validVariablesForGauge}
                </select>
                &nbsp;Hide: 
                <input id="gauge_variable_hide" ${hideValue} oninput="gaugeHideVariableName()" style="width: 20px;" type="checkbox">
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${dataWidget.title}"></div>
            </div>        
            <div class="r mb2">
                Units:&nbsp;
                ${unitsList('settings_variable_units', " unitSettings(this)", dataWidget.units)}
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updateDataWidget('${dataWidget.id}')"> &nbsp;Save&nbsp;</button>
            </div>
        </div>
    `;
    return content;
}
function windowWidgetLineGraph(content, options){
    content.classList.add('widget-plot-graph-settings');
    let validScatterChart = "";
    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if(charts.hasOwnProperty(chart)){
                if (charts[chart].type === "LINE") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
            }
        }
    }
    let defaultColor = [
        '#ff0000',
        '#0000ff',
        '#00ff00',
        '#fff000',
        '#ff7902'
    ];
    content.innerHTML =
        `<div class="c ac jc">
            <h2 class="mb1"  id="gauge_title">Line Graph</h2> 
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
            <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units"></div>
                <div id="new_y_title" class="ct-pl-y-title fs15">y</div>
                <div class="ct-widget-line-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units"></div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">x</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Line Graph"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="x"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="y"></div>
            </div>
            <div>
               <div class="r mb2">
                    X Axis Units:&nbsp;
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')")}
               </div>
               <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')")}
               </div>
               
               <div class="c ac jc" id="series_list">
                   <div class="r ac mt4 mb3">Series 1:&nbsp;
                            
                       <select id="series_0">
                            <optgroup>
                            <option value="">Select a data set</option>
                                ${validScatterChart}
                            </optgroup>
                       </select>         
                       <input id = 'series_0_color' value = "${defaultColor[0]}" type="color">        
                   </div>

                </div>
               <div id="series_add_button" onclick="addSeries('series_list')" class="r ac jc hp hc fa fa-plus mb3 fs125">&nbsp;&nbsp;<b class="">Add Series</b></div>

            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newPlotWidget('', 'line', document.getElementById('series_list').children.length); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>
    `;
    return content;
}


function drawLineGraphWindow(){
    var times = function (n) {
        return Array.apply(null, new Array(n));
    };

    var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
        data.labels.push(index + 1);
        data.series.forEach(function (series) {
            series.push(Math.random() * 100)
        });

        return data;
    }, {
        labels: [],
        series: times(4).map(function () {
            return new Array()
        })
    });

    var options = {
        // showLine: false,
        fullWidth: true,
        chartPadding: {
            right: 10
        },
        low: 0,
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            showLabel: true,
            showGrid: true,
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? 'W' + value : null;
                }
            }
        }]
    ];

    new Chartist.Line('.ct-widget-line-graph-settings', data, options, responsiveOptions);

}

function windowWidgetPlotGraph(content, options){
    content.classList.add('widget-plot-graph-settings');

    let validScatterChart = "";
    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if(charts.hasOwnProperty(chart)){
                if (charts[chart].type === "SCATTER") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
            }
        }
    }

    let defaultColor = [
        '#ff0000',
        '#0000ff',
        '#00ff00',
        '#fff000',
        '#ff7902'
    ];
    content.innerHTML =
        `<div class="c ac jc">
            <h2 class="mb1"  id="gauge_title">Scatter Plot</h2> 
            <h3 class="m0" style="font-size: 0.8rem;" id="variable_title"></h3> 
            <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units"></div>
                <div id="new_y_title" class="ct-pl-y-title fs15">y</div>
                <div class="ct-widget-plot-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units"></div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">x</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="Scatter Plot"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="x"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="y"></div>
            </div>
            <div>
               <div class="r mb2">
                    X Axis Units:&nbsp;
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')")}
               </div>
               <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')")}
               </div>
               
               <div class="c ac jc" id="series_list">
                   <div class="r ac mt4 mb3">Series 1:&nbsp;
                            
                       <select id="series_0">
                            <optgroup>
                            <option value="">Select a data set</option>
                                ${validScatterChart}
                            </optgroup>
                       </select>         
                       <input id = 'series_0_color' value = "${defaultColor[0]}" type="color">        
                   </div>

                </div>
               <div id="series_add_button" onclick="addSeries('series_list')" class="r ac jc hp hc fa fa-plus mb3 fs125">&nbsp;&nbsp;<b class="">Add Series</b></div>

            </div>
            <div class="r">
                <button onclick="windowSwitcher('widget_selection')">Cancel</button>
                <button onclick="newPlotWidget('', 'scatter', document.getElementById('series_list').children.length); "> &nbsp;&nbsp;Add&nbsp;&nbsp;</button>
            </div>
        </div>
    `;
    return content;
}


function addSeries(id){

    let defaultColor = [
        '#ff0000',
        '#0000ff',
        '#00ff00',
        '#fff000',
        '#ff7902'
    ];

    let series = document.getElementById(id);

    let validScatterChart = "";

    if (currentProjectData.hasOwnProperty('charts')) {
        let charts = currentProjectData['charts'];
        for (let chart in charts) {
            if(charts.hasOwnProperty(chart)){
                if (charts[chart].type === "SCATTER") {
                    validScatterChart += `<option value="${charts[chart].name}">${charts[chart].name}</option>`;
                }
            }
        }
    }
    series.innerHTML =  series.innerHTML + `
    <div class="r ac mt1 mb3">Series ${series.children.length+1}:&nbsp;
        <select id="series_${series.children.length}">
            <optgroup value="Variables">
                <option value="">Select a data set</option>
                ${validScatterChart}
                <input id = 'series_${series.children.length}_color' value = "${defaultColor[series.children.length]}"  type="color">
            </optgroup>
        </select>
    </div>`;
    if(series.children.length >= 5){
        document.getElementById('series_add_button').classList.add('dn');
    }
    else{
        document.getElementById('series_add_button').classList.remove('dn');
    }
}
function labelUpdate(src_el, target_id){
    document.getElementById(target_id).innerText = src_el.value;
}

function drawPLotWindow(){
    var times = function (n) {
        return Array.apply(null, new Array(n));
    };

    var data = times(5).map(Math.random).reduce(function (data, rnd, index) {
        data.labels.push(index + 1);
        data.series.forEach(function (series) {
            series.push(Math.random() * 100)
        });

        return data;
    }, {
        labels: [],
        series: times(4).map(function () {
            return new Array()
        })
    });

    var options = {
        showLine: false,
        fullWidth: true,
        chartPadding: {
            right: 10
        },
        low: 0,
        axisY: {
            showLabel: true,
            showGrid: true
        },
        axisX: {
            showLabel: true,
            showGrid: true,
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 4 === 0 ? 'W' + value : null;
                }
            }
        }]
    ];

    new Chartist.Line('.ct-widget-plot-graph-settings', data, options, responsiveOptions);

}

//
// Scatter Plot Settings Edit Window.
//

function windowScatterSettings(content, options) {

    let plot = currentProjectData.widgets.find((widget) => widget.id === options);

    content.id = 'window_content_block';
    content.innerHTML = `
         <i style="color: red; top: 5px; right: 0;" class="por fs125 hc hp fa fa-trash-alt" onclick="removePlotWidget('${options}')"></i> 
         <div class="c ac jc">
             <h2 class=" mb1"  id="gauge_title">${plot.title}</h2>
             <div>
                <div id="new_y_title_units" class="ct-pl-y-title-units">${plot.yAxisUnits}</div>
                <div id="new_y_title" class="ct-pl-y-title fs15">${plot.yAxisTitle}</div>
                <div class="ct-widget-plot-graph-settings"></div>
                <div id="new_x_title_units" class="ct-pl-x-title-units">${plot.xAxisUnits}</div>
                <div id="new_x_title" class="ct-pl-x-title tac fs15">${plot.xAxisTitle}</div>
            </div>
            <div class="c jc afe p3 pt0">
                <div class="mb2">Title: <input id="gauge_title_input" onkeyup="gaugeSettingsTitle()" type="text" value="${plot.title}"></div>
                <div class="mb2">X Title: <input id = 'x_axis_title' onkeyup="labelUpdate(this, 'new_x_title')" type="text" value="${plot.xAxisTitle}"></div>
                <div class="mb2">Y Title: <input id = 'y_axis_title' onkeyup="labelUpdate(this, 'new_y_title')" type="text" value="${plot.yAxisTitle}"></div>
            </div>
            <div>
                <div class="r mb2">
                    X Axis Units:&nbsp; 
                    ${unitsList('x_axis_units', "unitSettings(this, 'new_x_title_units')", `${plot.xAxisUnits}`)}
                </div>
                <div class="r mb2 mt4">
                    Y Axis Units:&nbsp;
                    ${unitsList('y_axis_units', " unitSettings(this, 'new_y_title_units')", `${plot.yAxisUnits}`)}
                </div>
            </div>
            <div class="r">
                <button onclick="windowSwitcher('none')">Cancel</button>
                <button onclick="updatePlotWidget('${plot.id}','scatter')">&nbsp;Save&nbsp;</button>
             </div>
        </div>
    `;

    return content;
}

