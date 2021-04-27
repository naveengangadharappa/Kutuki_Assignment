
const express = require('express');
//const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');
const routs = require('./Routs/Routs');
const cors = require('cors');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    extended: true
}));

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses if this request header is present
        return false;
    }
    // fallback to standard compression
    return compression.filter(req, res);
};

app.use(compression({
    filter: shouldCompress,
    threshold: 0
}));
//app.enable('trust proxy');
app.use(helmet());

app.use(cors({
    origin: ['http://localhost:3000',],//your front url,
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

// let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
// app.use(session({ secret: 'ssshhhhh' }));

app.use('/Assignment', routs);

app.listen(3000, () => { console.log('Express server started and listening on port 3000') });
