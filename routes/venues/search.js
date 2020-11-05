const places = require("../../placesInterface/main");
const redis = require("../../db/redis");
const convertData = require("../../helper/conversion");

const search = async (req, res) => {
  const location = req.body.location;
  const keyword = req.body.keyword;
  const radius = req.params.radius;
  const data = await places.search(location, radius, keyword);

  let result = [];
  let newVenues = [];

  for (var i = 0; i < data.length; i++) {
    const venue = await redis.getAsync(`venues-${data[i].place_id}`);
    if (venue) {
      result.push(JSON.parse(venue));
    } else {
      newVenues.push(data[i].place_id);
    }
  }

  newVenues = await places.detailedList(newVenues);
  for (var i = 0; i < newVenues.length; i++) {
    const venue = convertData(newVenues[i]);
    await redis.setAsync(
      `venues-${venue.placeID}`,
      JSON.stringify(venue),
      "EX",
      60 * 60 * 24 * 29
    );
    result.push(venue);
  }

  res.send(result);
};

module.exports = search;
