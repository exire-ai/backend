const places = require('../../placesInterface/main');
const redis = require('../../db/redis');

const get = async (req, res)=> {
    let id = req.params.id;
    let cachedData = await redis.getAsync(`venues-${id}`);
    if (cachedData) {
      res.send(JSON.parse(cachedShow));
    } else {
        try {
            let result = await places.get(id);
            await redis.setAsync(`venues-${id}`, JSON.stringify(result), 'EX', 60 * 60 * 24 * 29);
            res.send(result);
        } catch (error) {
            res.status(404).send({ message: '404: Not Found' });
        }
    }
}

module.exports = get;
