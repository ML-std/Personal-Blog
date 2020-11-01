var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

/* GET home page. */
router.get('/', (request, response) => {
    /*
    * This is for realtime database, however does not work for now
    * const ref = firebase.database().ref("/baslik");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });*/
    /**
     * Create function for firebase firestore, demo version.
     */
    (async () => {
        try {
            var db = firebase.firestore();
            await db.collection('itemsaa').doc('/' + 'demo' + '/')
                .create({item: "demoWriting"});
            return response.status(200).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    })();

} );


module.exports = router;
