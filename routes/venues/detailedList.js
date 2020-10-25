const places = require('../../placesInterface/main');

const detailed = async(req,res) => {
    let place_ids = req.body.place_ids;
    let result = await places.detailedList(place_ids)
    res.send(result);
}

module.exports = detailed;