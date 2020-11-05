const places = require("../../placesInterface/main");
const redis = require("../../db/redis");
const convertData = require("../../helper/conversion");

const detailedList = async (req, res) => {
  const placeIDs = req.body.placeIDs;

  let result = [];
  let newVenues = [];

  for (var i = 0; i < placeIDs.length; i++) {
    const venue = await redis.getAsync(`venues-${placeIDs[i]}`);
    if (venue) {
      result.push(JSON.parse(venue));
    } else {
      newVenues.push(placeIDs[i]);
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

module.exports = detailedList;
