const router = require('express').Router();
const rawGood = require('../db').import('../models/rawGood');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')
// const rawGood = require('../models/rawGood');

router.post('/rawGood', validateSession,  function (req, res) {
    let userid = req.user.id
    rawGood.create({
        rgName: req.body.rawGood.rgName,
        rgUOM: req.body.rawGood.rgUOM,
        rgQty: req.body.rawGood.rgQty,
        rgCost: req.body.rawGood.rgCost,
        rgVendor: req.body.rawGood.rgVendor,
        userId: userid

    })
        .then(
            function createSuccess(rawGood) {
                res.json({
                    rawGood: rawGood,
                    message: "New raw material entry successful",
                    // sessionToken: token
                });
            }

        )
        .catch(err => res.status(500).json({ error: err }))
});

//Get Raw goods by user

 router.get("/rawgoodlist", validateSession, (req, res) => {
    let userid = req.user.id
    RawGood.findAll({
        where: { owner: userid }
    })
        .then(rawGood => res.status(200).json(rawGood))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/rawgoodedit/:entryId', 
// validateSession,
function (req, res){
    const editrawGood= {
        rgName: req.body.rawGood.rgName,
        rgUOM: req.body.rawGood.rgUOM,
        rgQty: req.body.rawGood.rgQty,
        rgCost: req.body.rawGood.rgCost,
        rgVendor: req.body.rawGood.rgVendor,
     
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id}}
    RawGood.update(editrawGood, query)
    .then((rawGood) => res.status(200).json(rawgood))
    .catch((err) => res.status(500).json({ error:err}))
});

router.delete('/rawgooddelete/:id', validateSession, function(req, res){
    const query = {where: { id: req.params.id, owner: requestAnimationFrame.id}};

    RawGood.destroy(query)
    .then(() => res.status(200).json({ message: "Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }))

});




module.exports = router;