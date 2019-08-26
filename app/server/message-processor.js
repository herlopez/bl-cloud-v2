let databaseFunctions = require('./database.js');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: true,
    auth: {
        user: 'blcloudmailer@gmail.com',
        pass: 'bykrix-tAkwu4-joqrog'
    }
});
function messageProcessor(message, callback, type) {
    console.log(message);
    try {
        message = JSON.parse(JSON.stringify(message));
        console.log(message);
    } catch (e) {
        console.log(e);
        if (type === "http") {
            callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
            return;
        } else if (type === "ws") {
            callback.send(`{"error":"Unable to parse JSON: ${e}"}`);
            return;
        }
    }
    // Check if the API key exist.
    if (message.hasOwnProperty('key')) {
        if (message['key'] === 'gsqfr6DsDWfGhn4og5RHNQTA3hFE') {
            console.log("KeyGood");
        } else if (message['key'] === 'mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq') {
            console.log('Admin Create')
        } else {
            console.log(`Invalid API key given.`);
            if (type === "http") {
                callback.send('{"error":"Invalid API key given."}');
                return;
            } else if (type === "ws") {
                callback.send('{"error":"Invalid API key given."}');
                return;
            }
        }
    } else {
        console.log(`No API key given.`);
        if (type === "http") {
            callback.send('{"error":"No API key given."}');
            return;
        } else if (type === "ws") {
            callback.send('{"error":"No API key given."}');
            return;
        }
    }

    // Filter the command.
    // Check if the command field exist.
    if (message.hasOwnProperty('cmd')) {

        console.log(`Received Command: ${message['cmd']}`);

        switch (message['cmd']) {

            case 'WS_SIGN_UP':
                callback.send(JSON.stringify({"fn": databaseFunctions.sendFunction(signUpScreen, 'signUpScreen'.length)}));
            break;

            case 'WS_LOGIN':
                callback.send(JSON.stringify({"fn": databaseFunctions.sendFunction(loginScreen, 'loginScreen'.length)}));
            break;

            case 'WS_OPEN':
                callback.send(JSON.stringify({"fn": databaseFunctions.sendFunction(loginScreen, 'loginScreen'.length)}));
            break;

            case 'CREATE_USER':
                if (loginError(verifyString(message, 'first_name', 200, 1), callback)) return;
                if (loginError(verifyString(message, 'last_name', 200, 1), callback)) return;
                if (loginError(verifyString(message, 'email', 200, 1), callback)) return;
                if (loginError(verifyString(message, 'password', 200, 6), callback)) return;
                if (!validateEmail(message['email'])){loginError({error:'Invalid Email Address'}, callback); return}
                let res = databaseFunctions.createUser(message['email'], message['password'], message['name']);
                if(res){
                    callback.send(JSON.stringify({"fn": databaseFunctions.sendFunction(signUpSuccess, 'signUpSuccess'.length)}));
                    var mailOptions = {
                        from: 'blcloudmailer@gmail.com',
                        to: message['email'],
                        subject: 'Brilliant Labs Cloud: Confirm your account.',
                        text: 'Thanks for registering! Please click here to confirm your account: '
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                }else{
                    loginError({error:'Email address already registered.'}, callback)

                }
                callback.send(res);
            break;










            // Variables
            case 'CREATE_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        if (message['name'].length < 200) {
                            if (message.hasOwnProperty('value')) {
                                let res = databaseFunctions.createVariable(message['key'], message['name'], message['value']);
                                if (type === "http") {
                                    callback.send(res);
                                    return;
                                } else if (type === "ws") {
                                    callback.send(res);
                                    return;
                                }
                            } else {
                                let res = databaseFunctions.createVariable(message['key'], message['name'], null);
                                if (type === "http") {
                                    callback.send(res);
                                    return;
                                } else if (type === "ws") {
                                    callback.send(res);
                                    return;
                                }
                            }

                        } else {

                            console.log(`Variable name too long.  < 200.`);
                            if (type === "http") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            } else if (type === "ws") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }

                        }
                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }

                break;
            case 'SET_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        if (message.hasOwnProperty('value')) {
                            let res = databaseFunctions.setVariable(message['key'], message['name'], message['value']);
                            if (type === "http") {
                                callback.send(res);
                                return;
                            } else if (type === "ws") {
                                callback.send(res);
                                return;
                            }
                        } else {
                            console.log(`Please specify a value to set.`);
                            if (type === "http") {
                                callback.send('{"error":"Please specify a value to set."}');
                                return;
                            } else if (type === "ws") {
                                callback.send('{"error":"Please specify a value to set."}');
                                return;
                            }
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'GET_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.getVariable(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        } else if (type === "ws") {
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'DELETE_VARIABLE':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.deleteVariable(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        } else if (type === "ws") {
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;

            // Charts
            case 'CREATE_CHART':
                if (message.hasOwnProperty('name')) {
                    if (typeof message['name'] === 'string' || message['name'] instanceof String) {
                        if (message['name'].length < 200) {
                            if (message.hasOwnProperty('type')) {
                                if (typeof message['type'] === 'string' || message['type'] instanceof String) {
                                    if (message['type'] === 'PIE' || message['type'] === 'LINE' || message['type'] === 'BAR' || message['type'] === 'SCATTER') {
                                        let res = databaseFunctions.createChart(message['key'], message['name'], message['type'], 0, 0);
                                        if (type === "http") {
                                            callback.send(res);
                                            return;
                                        } else if (type === "ws") {
                                            callback.send(res);
                                            return;
                                        }
                                    } else if (message['type'] === 'HISTOGRAM' || message['type'] === 'HISTO') {
                                        if (message.hasOwnProperty('start') && message.hasOwnProperty('start')) {
                                            if (typeof message['start'] === 'number' || message['start'] instanceof Number) {
                                                if (typeof message['end'] === 'number' || message['end'] instanceof Number) {
                                                    if (message['end'] > message['start']) {
                                                        let res = databaseFunctions.createChart(message['key'], message['name'], message['type'], message['start'], message['end']);
                                                        if (type === "http") {
                                                            callback.send(res);
                                                            return;
                                                        } else if (type === "ws") {
                                                            callback.send(res);
                                                            return;
                                                        }
                                                    } else {
                                                        console.log(`Start value must be inferior to end value.`);
                                                        if (type === "http") {
                                                            callback.send('{"error":"Start value must be inferior to end value."}');
                                                            return;
                                                        } else if (type === "ws") {
                                                            callback.send('{"error":"Start value must be inferior to end value."}');
                                                            return;
                                                        }
                                                    }
                                                } else {
                                                    console.log(`End value must be a number.`);
                                                    if (type === "http") {
                                                        callback.send('{"error":"End value must be a number."}');
                                                        return;
                                                    } else if (type === "ws") {
                                                        callback.send('{"error":"End value must be a number."}');
                                                        return;
                                                    }
                                                }
                                            } else {
                                                console.log(`Start value must be a number.`);
                                                if (type === "http") {
                                                    callback.send('{"error":"Start value must be a number."}');
                                                    return;
                                                } else if (type === "ws") {
                                                    callback.send('{"error":"Start value must be a number."}');
                                                    return;
                                                }
                                            }
                                        } else {
                                            console.log(`When creating histograms, please provide a start and end value.`);
                                            if (type === "http") {
                                                callback.send('{"error":"When creating histograms, please provide a start and end value."}');
                                                return;
                                            } else if (type === "ws") {
                                                callback.send('{"error":"When creating histograms, please provide a start and end value."}');
                                                return;
                                            }
                                        }
                                    } else {
                                        console.log(`Invalid chart type.`);
                                        if (type === "http") {
                                            callback.send('{"error":"Invalid chart type."}');
                                            return;
                                        } else if (type === "ws") {
                                            callback.send('{"error":"Invalid chart type."}');
                                            return;
                                        }
                                    }
                                } else {
                                    console.log(`Type can only be a string value.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Type can only be a string value."}');
                                        return;
                                    } else if (type === "ws") {
                                        callback.send('{"error":"Type can only be a string value."}');
                                        return;
                                    }
                                }
                            } else {
                                console.log(`Please specify the chart type.`);
                                if (type === "http") {
                                    callback.send('{"error":"Please specify the chart type."}');
                                    return;
                                } else if (type === "ws") {
                                    callback.send('{"error":"Please specify the chart type."}');
                                    return;
                                }
                            }
                        } else {
                            console.log(`Variable name too long.  < 200.`);
                            if (type === "http") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            } else if (type === "ws") {
                                callback.send('{"error":"Variable name too long.  < 200."}');
                                return;
                            }
                        }
                    } else {
                        console.log(`Variable name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Variable name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Variable name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Variable name not provided."}');
                        return;
                    }
                }
                break;
            case 'DELETE_CHART':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.deleteChart(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        } else if (type === "ws") {
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Chart name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
                break;
            case 'ADD_CHART_POINT':
                if (message.hasOwnProperty('name')) {
                    if (typeof message['name'] === 'string' || message['name'] instanceof String) {
                        let chart_type = databaseFunctions.getChartType(message['key'], message['name']);
                        if (chart_type.includes('error')) {
                            if (type === "http") {
                                callback.send(chart_type);
                                return;
                            } else if (type === "ws") {
                                callback.send(chart_type);
                                return;
                            }
                        } else {
                            if (['BAR', 'PIE', 'LINE'].includes(chart_type)) {

                                if (!message.hasOwnProperty('value')) {
                                    console.log(`Please specify a value to add to the chart.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please specify a value to add to the chart."}');
                                        return;
                                    } else if (type === "ws") {
                                        callback.send('{"error":"Please specify a value to add to the chart."}');
                                        return;
                                    }
                                }
                                if (['BAR', 'PIE'].includes(chart_type)) {
                                    if (message.hasOwnProperty('point')) {
                                        let res = databaseFunctions.addDataPoint(message['key'], message['name'], message['point'], message['value']);
                                        if (type === "http") {
                                            callback.send(res);
                                            return;
                                        } else if (type === "ws") {
                                            callback.send(res);
                                            return;
                                        }
                                    } else {
                                        console.log(`Please specify a value name for bar and pie charts.`);
                                        if (type === "http") {
                                            callback.send('{"error":"Please specify a value name for bar and pie charts."}');
                                            return;
                                        } else if (type === "ws") {
                                            callback.send('{"error":"Please specify a value name for bar and pie charts."}');
                                            return;
                                        }
                                    }
                                }
                                if (['LINE'].includes(chart_type)) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], "", message['value']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    } else if (type === "ws") {
                                        callback.send(res);
                                        return;
                                    }
                                }
                            } else if (['SCATTER'].includes(chart_type)) {
                                if (message.hasOwnProperty('x') && message.hasOwnProperty('y')) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], message['x'], message['y']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    } else if (type === "ws") {
                                        callback.send(res);
                                        return;
                                    }
                                } else {
                                    console.log(`Please add an X and Y value for scatter plots..`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please add an X and Y value for scatter plots."}');
                                        return;
                                    } else if (type === "ws") {
                                        callback.send('{"error":"Please add an X and Y value for scatter plots."}');
                                        return;
                                    }
                                }
                            } else if (['HISTO', 'HISTOGRAM'].includes(chart_type)) {
                                if (message.hasOwnProperty('value')) {
                                    let res = databaseFunctions.addDataPoint(message['key'], message['name'], "", message['value']);
                                    if (type === "http") {
                                        callback.send(res);
                                        return;
                                    } else if (type === "ws") {
                                        callback.send(res);
                                        return;
                                    }
                                } else {
                                    console.log(`Please add  value for histograms.`);
                                    if (type === "http") {
                                        callback.send('{"error":"Please add a value for histograms."}');
                                        return;
                                    } else if (type === "ws") {
                                        callback.send('{"error":"Please add a value for histograms."}');
                                        return;
                                    }
                                }
                            } else {
                                if (type === "http") {
                                    callback.send({"error": "Invalid chart type, server error."});
                                    return;
                                } else if (type === "ws") {
                                    callback.send({"error": "Invalid chart type, server error."});
                                    return;
                                }
                            }
                        }
                    } else {
                        console.log(`Invalid chart name, must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Invalid chart name, must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Invalid chart name, must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
                break;
            case 'GET_CHART_DATA':
                if (message.hasOwnProperty('name')) {

                    if (typeof message['name'] === 'string' || value instanceof String) {

                        let res = databaseFunctions.getChartData(message['key'], message['name']);
                        if (type === "http") {
                            callback.send(res);
                            return;
                        } else if (type === "ws") {
                            callback.send(res);
                            return;
                        }

                    } else {
                        console.log(`Chart name must be a string.`);
                        if (type === "http") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        } else if (type === "ws") {
                            callback.send('{"error":"Chart name must be a string."}');
                            return;
                        }
                    }
                } else {
                    console.log(`Chart name not provided.`);
                    if (type === "http") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    } else if (type === "ws") {
                        callback.send('{"error":"Chart name not provided."}');
                        return;
                    }
                }
                break;

            default:
                console.log(`Unknown command sent.`);
                if (type === "http") {
                    callback.send('{"error":"Unknown command sent."}');
                    return;
                } else if (type === "ws") {
                    callback.send('{"error":"Unknown command sent."}');
                    return;
                }
                break;
        }
    } else {
        console.log(`No Command Specified.`);
        if (type === "http") {
            callback.send('{"error":"No Command Specified."}');
            return;
        } else if (type === "ws") {
            callback.send('{"error":"No Command Specified."}');
            return;
        }
    }

}

module.exports = {
    messageProcessor
};


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function signUpSuccess(){
    var appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    var logo = document.createElement('img');
    logo.src = "/images/logo.png";
    logo.width = '300';
    logo.style.marginBottom = "1rem";
    appContainer.appendChild(logo);
    var message = document.createElement('h2');
    message.innerText = 'Thanks for Signing up! And email has been sent to you please confirm your email before logging in.';
    message.style.padding = "0rem 5rem";
    message.style.textAlign = "center";
    message.style.fontWeight = "400";
    appContainer.appendChild(message);
    var signUp = document.createElement('button');
    signUp.innerText = "Click Here to Sign In!";
    signUp.addEventListener("click", function (e) {
        ws.send('{"cmd":"WS_LOGIN", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUp);

}
function loginScreen() {
    var appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    var logo = document.createElement('img');
    logo.src = "/images/logo.png";
    logo.width = '300';
    logo.style.marginBottom = "1rem";
    appContainer.appendChild(logo);
    var loginForm = document.createElement('form');
    loginForm.id = "main_login";
    loginForm.classList = 'cc';
    var emailInput = document.createElement('input');
    emailInput.required = 'required';
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.id = `${loginForm.id}_email`;
    var passwordInput = document.createElement('input');
    passwordInput.required = 'required';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.id = `${loginForm.id}_password`;
    var submitButton = document.createElement('button');
    submitButton.innerHTML = "Submit";
    submitButton.id = `${loginForm.id}_submit`;
    loginForm.appendChild(emailInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);
    loginForm.addEventListener("submit", function (e) {
        var email = document.getElementById(`${loginForm.id}_email`);
        var password = document.getElementById(`${loginForm.id}_password`);
        ws.send(`{"cmd":"CREATE_USER", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq", "email":"${email.value}","password":"${password.value}"}`);
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(loginForm);
    var signUp = document.createElement('a');
    signUp.innerText = "Dont Have an Account? Click Here to Sign Up!";
    signUp.addEventListener("mouseenter", function () {
        signUp.style.color = "rgb(155, 85, 163)";
        signUp.style.cursor = "pointer";
    });
    signUp.addEventListener("mouseleave", function () {
        signUp.style.color = "#000000";
        signUp.style.cursor = "default";
    });
    signUp.addEventListener("click", function (e) {
        ws.send('{"cmd":"WS_SIGN_UP", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUp);
}
function signUpScreen() {
    var appContainer = document.getElementById('app_container');
    appContainer.innerHTML = '';
    appContainer.style.userSelect = 'none';
    var logo = document.createElement('img');
    logo.src = "/images/logo.png";
    logo.width = '300';
    logo.style.marginBottom = "1rem";
    appContainer.appendChild(logo);
    var signUpForm = document.createElement('form');
    signUpForm.id = "main_sign_up";
    signUpForm.classList = 'cc';
    var userFirstName = document.createElement('input');
    userFirstName.required = 'required';
    userFirstName.type = 'name';
    userFirstName.placeholder = 'First Name';
    userFirstName.id = `${signUpForm.id}_first_name`;
    var userLastName = document.createElement('input');
    userLastName.required = 'required';
    userLastName.type = 'name';
    userLastName.placeholder = 'Last Name';
    userLastName.id = `${signUpForm.id}_last_name`;
    var emailInput = document.createElement('input');
    emailInput.required = 'required';
    emailInput.type = 'email';
    emailInput.placeholder = 'Email Address';
    emailInput.id = `${signUpForm.id}_email`;
    var passwordInput = document.createElement('input');
    passwordInput.required = 'required';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.id = `${signUpForm.id}_password`;
    var passwordInput2 = document.createElement('input');
    passwordInput2.required = 'required';
    passwordInput2.type = 'password';
    passwordInput2.placeholder = 'Confirm Password';
    passwordInput2.id = `${signUpForm.id}_password2`;
    var submitButton = document.createElement('button');
    submitButton.innerHTML = "Sign Up!";
    submitButton.id = `${signUpForm.id}_submit`;
    signUpForm.appendChild(userFirstName);
    signUpForm.appendChild(userLastName);
    signUpForm.appendChild(emailInput);
    signUpForm.appendChild(passwordInput);
    signUpForm.appendChild(passwordInput2);
    signUpForm.appendChild(submitButton);
    signUpForm.addEventListener("submit", function (e) {
        var firstName = document.getElementById(`${signUpForm.id}_first_name`);
        var lastName = document.getElementById(`${signUpForm.id}_last_name`);
        var email = document.getElementById(`${signUpForm.id}_email`);
        var password = document.getElementById(`${signUpForm.id}_password`);
        var password2 = document.getElementById(`${signUpForm.id}_password2`);
        ws.send(`{"cmd":"CREATE_USER", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq", "first_name":"${firstName.value}", "last_name":"${lastName.value}", "email":"${email.value}","password":"${password.value}", "password_2":"${password2.value}"}`);
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUpForm);
    var signUp = document.createElement('a');
    signUp.innerText = "Already have an Account? Click Here to Sign In!";
    signUp.addEventListener("mouseenter", function () {
        signUp.style.color = "rgb(155, 85, 163)";
        signUp.style.cursor = "pointer";
    });
    signUp.addEventListener("mouseleave", function () {
        signUp.style.color = "#000000";
        signUp.style.cursor = "default";
    });
    signUp.addEventListener("click", function (e) {
        ws.send('{"cmd":"WS_LOGIN", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
        e.preventDefault();    //stop form from submitting
    });
    appContainer.appendChild(signUp);
}

function verifyString(obj, string, maxLen = 200, minLen = 0) {
    console.log("1234f23f", obj[string], string);
    if (obj.hasOwnProperty(string)) {
        if (typeof obj[string] === 'string' || obj[string] instanceof String) {
            if (obj[string].length > minLen) {
                if (obj[string].length < maxLen) {
                    return ('{}');
                } else {
                    return ({error:`${titleCase(string)} is to long.`});
                }
            } else {
                return ({error:`${titleCase(string)} is to short.`});
            }
        }else{
            return ({error:`${titleCase(string)} must be a string.`});
        }
    } else {
        return ({error:`No ${titleCase(string)} was provided.`});
    }
}
try {

}catch (e) {

}
function loginError(message, cb) {
    if (message.hasOwnProperty('error')) {
        console.log('login error: ', message['error']);
        message['error'] = titleCase(message['error']);
        cb.send(JSON.stringify({
            "fn": `{console.log('login error');var appContainer=document.getElementById('app_container');try{document.getElementById('error_message').remove();}catch(e){}var errorMessage=document.createElement('div');errorMessage['innerText']="${message['error']}";errorMessage.style.color='red';errorMessage.style.margin='1rem';errorMessage.id='error_message';appContainer.appendChild(errorMessage);}`
        }));
        return true;
    }
    return false;
}
function titleCase(str){
    str = str.split('_').join(' ');
    str = str.toLowerCase().split(' ');

    let final = [ ];

    for(let  word of str){
        final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }

    return final.join(' ')

}