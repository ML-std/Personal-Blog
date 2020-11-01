var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");


/**
 * Read function for firebase firestore, demo version.
 */
router.get('/?', (request, res) => {


    (async () => {
        try {
            const document = firebase.firestore().collection('items').doc(request.query.id);
            let item = await document.get();
            let response = item.data();
            console.log(item + ' ' + response)
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

} );

/**
 * Read all function for firebase firestore, demo version.
 */
router.get('/all', (req, res) => {

    (async () => {
        try {
            let query = firebase.firestore().collection('items');
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data().item
                    };
                    response.push(selectedItem);
                }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});





module.exports = router;
