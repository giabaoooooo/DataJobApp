var expess = require('express');
var router = expess.Router();
const genderModel = require('../modules/gender')


//get list
router.get('/', (req, res) => {
    genderModel.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router;