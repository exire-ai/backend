const places = require('../../placesInterface/main');

const search = async(req,res) => {
    let location = req.body.location;
    let keyword = req.body.keyword;
    let radius = req.params.radius;
    let result = await places.search(location, radius, keyword)
    res.send(result);
}

module.exports = search;