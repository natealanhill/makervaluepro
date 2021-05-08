const router = require('express').Router();
const BOM = require('../db').import('../models/BOM');
const rawGood = require('../db').import('../models/rawGood');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')



router.post('/BOM', validateSession, function (req, res) {
    rawGood.findAll({ where: { userId: req.user.id } }).then((rawGoodList) => {
        BOM.create({
            BOMname: req.body.BOMname,
            BOMrawGoods: rawGoodList,
            rgUnits: req.body.rgUnits,
            BOMtime: req.body.BOMtime,
            userId: userid
        })
            .then(
                function createSuccess(response) {
                    res.json({
                        BOM: response,
                        message: "New BOM entry successful",
                    });
                })

    })
        .catch(err => res.status(500).json({ error: err }))
});



router.get("/BOMlist", validateSession, (req, res) => {
    let userid = req.user.id
    BOM.findAll({
        where: { owner: userid }
    })
        .then(BOM => res.status(200).json(BOM))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/BOMedit/:entryId', validateSession, function (req, res) {
    const editBOM = {
        BOMname: req.body.BOM.BOMname,
        BOMrawGoods: [],  //is this a fetch?
        rgUnits: req.body.BOM.rgUnits,

    };
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    BOM.update(editBOM, query)
        .then((rawGood) => res.status(200).json(rawgood))
        .catch((err) => res.status(500).json({ error: err }))
});

router.delete('/BOMdelete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: requestAnimationFrame.id } };

    RawGood.destroy(query)
        .then(() => res.status(200).json({ message: "Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }))

});




module.exports = router;