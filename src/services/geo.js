const geoDetector = require('../libs/geos');

module.exports = (req, res) => {
    let result = geoDetector.detect((req.query.ip || req.realIp).trim());
    let source = result._source;
    delete result._source;
    res.header('X-Detector', source);
    res.cacheControl = {
        public: true,
        maxAge: 86400 //1 day
    }
    return res.json(result)
};