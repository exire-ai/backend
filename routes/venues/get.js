const places = require("../../placesInterface/main");
const redis = require("../../db/redis");
const convertData = require("../../helper/conversion");

const get = async (req, res) => {
  let id = req.params.id;
  let cachedData = await redis.getAsync(`venues-${id}`);
  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    try {
      let result = await places.detailed(id);
      result = convertData(result);
      await redis.setAsync(
        `venues-${id}`,
        JSON.stringify(result),
        "EX",
        60 * 60 * 24 * 29
      );
      res.send(result);
    } catch (error) {
      res.status(404).send({ message: "404: Not Found" });
    }
  }
};

module.exports = get;
