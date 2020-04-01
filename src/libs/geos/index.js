const Transformer = require('./transformer');

let geoDetectors = [
    require('./IP2Location'),
    require('./DBIP'),
    require('./GeoLite2'),
];

module.exports = { 
    detect(ip) {
        let result = Transformer.nullModel();

        for (let detector of geoDetectors) {
            result = detector.detect(ip);
            if (result.success) {
                result._source = detector.getName();
                return result;
            }
        }

        //TODO: en-queue to call ip-api.com

        return result;
    }
}