
let ws, wsHandler;
let currentView, currentProject;
let currentUid = null;
let currentId = null;
let edit = false;


docReady(function () {

    // Set up some
    initializeProfile(); // --> profile.js

    let serverStatus = false;

    // Set the view to the login screen.
    viewSwitcher('sign_in');

    // When an authentication state has changed.
    firebase.auth().onAuthStateChanged(function (user) {

        // If the user is authenticated.
        if (user) {

            // Set the users profile image and information.
            setProfileInformation(user); // --> profile.js

            // Store a global value of the current user ID.
            currentUid = user.uid;

            // Show that users project view.
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
            viewSwitcher('sign_in');

            // Set profile to default settings.
            setDefaultProfile(); // --> profile.js
            clearInterval(wsHandler);
        }
    });

});







