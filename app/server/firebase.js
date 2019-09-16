

let admin = require("firebase-admin");
let serviceAccount = require("./../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bl-cloud.firebaseio.com"
});


module.exports = {
    admin
};
