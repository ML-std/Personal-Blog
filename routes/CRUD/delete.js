var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");


/**
 * Delete function for firebase firestore, demo version.
 */
router.delete('/?', (req, res) => {
    (async () => {
        try {
            const document = firebase.firestore().collection('items').doc(req.query.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
module.exports = router;
