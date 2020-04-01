const ip2loc = require("ip2location-nodejs");
const Transformer = require('../transformer');

ip2loc.IP2Location_init(Transformer.getDbFile('IP2LOCATION-LITE-DB11.IPV6.BIN'));

module.exports = {
    detect(ip) {
        try {
            return Transformer.ip2location(ip2loc.IP2Location_get_all(ip));
        } catch (err) {
            return Transformer.ip2location(null);
        }
    },
    getName() {
        return 'IP2Location';
    }
}