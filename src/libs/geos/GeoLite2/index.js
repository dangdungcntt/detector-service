const fs = require('fs');
const {Reader} = require('@maxmind/geoip2-node');

const Transformer = require('../transformer');

const dbBuffer = fs.readFileSync(Transformer.getDbFile('/GeoLite2-City.mmdb'));
const reader = Reader.openBuffer(dbBuffer);
 
module.exports = {
    detect(ip) {
        try {
            return Transformer.geoLite2(reader.city(ip));
        } catch (err) {
            return Transformer.geoLite2(null);
        }
    },
    getName() {
        return 'GeoLite2';
    }
}