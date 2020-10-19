const places = require('../../placesInterface/main');

const detailed = async(req,res) => {
    let place_ids = req.body.place_ids;
    places.detailedList(place_ids, (result)=>{
        res.send(result);
    })
}

module.exports = detailed;