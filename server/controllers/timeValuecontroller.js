const router = require('express').Router();
const TimeValue = require('../db').import('../models/timeValue');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')

router.post('/timeValue', validateSession, function (req, res){
    TimeValue.create({
        timeValue: req.body.timeValue.timeValue,
        owner: req.user.id
    })
    .then(
        function createSuccess(timeValue) {
            res.json({
                timeValue: timeValue,
                message: "Time Value entered",
                // sessionToken: token
            });
        }

    )
    .catch(err => res.status(500).json({ error: err }))
});

router.put('/timevalueedit/:entryId', validateSession, function (req, res) {
    const edittimeValue = {
        timeValue: req.body.timeValue.timeValue,
    }
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    TimeValue.update(edittimeVAlue, query)
        .then((timeValue) => res.status(200).json(timeValue))
        .catch((err) => res.status(500).json({ error: err }))

});





module.exports = router
