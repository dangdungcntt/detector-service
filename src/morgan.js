const morgan = require('morgan');
const LOG_FORMAT = ':userip - :req[cf-ipcountry].:req[x-request-id].:req[host] [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

morgan.token('userip', (req, res) => { 
    return req.realIp || req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
});

module.exports = (app) => {
    app.use(morgan(LOG_FORMAT, {
        skip: (req, res) => {
            return req.headers['user-agent'].includes('uptimerobot') 
                || ['/favicon.ico', '/robots.txt'].includes(req.path);
        }
    }));
};