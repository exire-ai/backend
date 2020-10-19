const places = require('../../placesInterface/main');

const detailed = async(req,res) => {
    let place_id = req.params.place_id;
    places.detailed(place_id, (result)=>{
        res.send(result);
    })
}

module.exports = detailed;