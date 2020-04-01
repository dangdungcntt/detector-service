require('dotenv').config();
require('./helpers/helper');

const bodyParser = require('body-parser');
const cacheControl = require('express-cache-controller');
const morgan = require('./morgan');

module.exports = (app) => {
    app.disable('x-powered-by');

    if (process.env.SENTRY_DSN) {
        const Sentry = require('@sentry/node');
        Sentry.init({ dsn: process.env.SENTRY_DSN, release: process.env.APP_VERSION });
        app.use(Sentry.Handlers.requestHandler());
    }

    app.use((req, res, next) => {
        req.realIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;

        return next();
    })

    morgan(app);
    
    app.use(cacheControl());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}