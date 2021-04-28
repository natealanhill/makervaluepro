let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');

router.get('/practice', validateSession, function (req, res)
{
    res.send('PRACTICE ROUTE')
})

router.get('/about', function (req, res)
{
    res.send('about')
})

module.exports = router