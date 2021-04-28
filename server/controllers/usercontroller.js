const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', function (req, res) {
    User.create({
        fname: req.body.user.fname,
        lname: req.body.user.lname,
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 11),
        // isAdmin: req.body.user.isAdmin || "False"
    })
        .then(
            function createSuccess(user) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.json({
                    user: user,
                    message: "Welcome ",
                    sessionToken: token
                });
            }
        )
        .catch(err => res.status(500).json({ error: err }))
});


router.post('/login', function (req, res) {
    User.findOne({
        where: {
            username: req.body.user.username,
        }
    })
        .then(
            function loginSuccess(user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                        if (matches) {

                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                            res.status(200).json({
                                user: user,
                                message: "Success",
                                sessionToken: token
                            })

                        } else {
                            res.status(502).send({ error: "Login failed. Please check username and password." });
                        }
                    });
                } else {
                    res.status(500).json({ error: "Unknown username. Please try again." })
                }
            })
        .catch(err => res.status(500).json({ error: err }))
});




module.exports = router;
