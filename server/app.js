require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db')
let journal = require('./controllers/journalcontroller')
let user = require('./controllers/usercontroller')
let rawGood = require('./controllers/rawgoodcontroller')
let finishedGood = require('./controllers/finishedcontroller')
let timeValue = require('./controllers/timeValuecontroller')


// app.use('/test', function (req, res) {
//     res.send('TEST endpoint')
// })
sequelize.sync();
//sequelize.sync({force: true})
app.use(express.json());
//ROUTES
app.use('/journal', journal);
app.use('/user', user); 
app.use('/rawGood', rawGood);
app.use('/finishedGood', finishedGood);
app.use('/timeValue', timeValue);


app.listen(3000, function () {
    console.log('listen 3000');
})