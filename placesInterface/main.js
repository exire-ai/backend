const fetch = require('node-fetch');
const { PLACES_KEY } = require('../config.js');

module.exports = {
    get: async id => {
        return {
            id,
            name: 'Hello!'
        }
    },
    search: async (location, radius, keyword, callback) => {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.lat +',' + location.long + '&radius=' + radius + '&keyword=' + keyword + '&key=' + PLACES_KEY)
        .then((result) => result.json())
        .then((places) => {
            callback(places['results']);
        })
        .catch((err) => {
            console.log(err);
            callback(null);
        })
    },
    detailed: async (place_id, callback) => {
        fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&key=' + PLACES_KEY)
        .then((result) => result.json())
        .then((place) => {
            callback(place);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    detailedList: async function(place_ids, callback) {
        detailedPlaces = [];
        fetches = [];
        for (const item of place_ids) {
            fetches.push(
                fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + item + '&key=' + PLACES_KEY)
                .then((res) => res.json())
                .then((place) => {
                    detailedPlaces.push(place);
                })
                .catch((err) => {
                    console.log(err);
                })
            )
        }
        Promise.all(fetches).then(function() {
            callback(detailedPlaces);
        })
    }
}