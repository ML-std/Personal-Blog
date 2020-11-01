var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");


/**
 * Create function for firebase firestore, demo version.
 */
router.post('/', (request, response) => {

    (async () => {
        try {
            var db = firebase.firestore();
            await db.collection('items').doc('/' + 'demo' + '/')
                .create({item: "demoWriting"});
            return response.status(200).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    })();

} );


module.exports = router;
