const fetch = require('node-fetch');
const { PLACES_KEY } = require('../config.js');

module.exports = {
    get: async id => {
        return {
            id,
            name: 'Hello!'
        }
    },
    search: async (location, radius, keyword) => {
        const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.lat +',' + location.long + '&radius=' + radius + '&keyword=' + keyword + '&key=' + PLACES_KEY)
        .then((result) => result.json())
        .then((places) => {
            console.log(places['results']);
            return places['results'];
        })
        .catch((err) => {
            console.log(err);
            return null;
        })
        return response;
    },
    detailed: async (place_id) => {
        const response = await fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&key=' + PLACES_KEY)
        .then((result) => result.json())
        .then((place) => {
            return place.result;
        })
        .catch((err) => {
            console.log(err);
            return null;
        })
        return response
    },
    detailedList: async function(place_ids) {
        detailedPlaces = [];
        fetches = [];
        for (const item of place_ids) {
            fetches.push(
                fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + item + '&key=' + PLACES_KEY)
                .then((res) => res.json())
                .then((place) => {
                    detailedPlaces.push(place.result);
                })
                .catch((err) => {
                    console.log(err);
                })
            )
        }
        return Promise.all(fetches).then(function() {
            return detailedPlaces;
        })
    }
}