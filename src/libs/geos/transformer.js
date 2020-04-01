const path = require('path');

module.exports = {
    ip2location(result) {
        if (!result || result.status != 'OK') {
            return this.nullModel();
        }

        return {
            success: true,
            ip: result.ip,
            country_code: result.country_short,
            country_name: result.country_long,
            region: result.region,
            city: result.city,
            latitude: result.latitude,
            longitude: result.longitude,
            zipcode: result.zipcode,
            timezone: result.timezone
        };
    },
    geoLite2(result) {
        if (!result) {
            return this.nullModel();
        }

        return {
            success: true,
            ip: data_get(result, 'traits.ipAddress'),
            country_code: data_get(result, 'country.isoCode'),
            country_name: data_get(result, 'country.names.en'),
            region: data_get(result, 'subdivisions.0.names.en'),
            city: data_get(result, 'city.names.en'),
            latitude: data_get(result, 'location.latitude'),
            longitude: data_get(result, 'location.longitude'),
            zipcode: null,
            timezone: data_get(result, 'location.timeZone')
        }
    },

    nullModel() {
        return {
            success: false,
            country_code: null,
            country_name: null,
            region: null,
            city: null,
            latitude: null,
            longitude: null,
            zipcode: null,
            timezone: null
        }
    },

    getDbFile(fileName) {
        return path.resolve(__root + '/db/' + fileName)
    }
}