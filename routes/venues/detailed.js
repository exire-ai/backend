const places = require("../../placesInterface/main");

const detailed = async (req, res) => {
  let place_id = req.params.place_id;
  let result = await places.detailed(place_id);
  res.send(result);
};

module.exports = detailed;
