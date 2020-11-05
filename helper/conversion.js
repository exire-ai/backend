const _ = require("lodash");

const PlacesConversion = require("./PlacesConversion");

const convertData = (data) => {
  let newData = {};
  for (key in PlacesConversion) {
    if (PlacesConversion[key][0] == "default") {
      newData[key] = PlacesConversion[key][1];
    } else {
      let val = _.get(data, PlacesConversion[key][0]);
      newData[key] =
        PlacesConversion[key].length == 2 ? PlacesConversion[key][1](val) : val;
    }
  }
  return newData;
};

module.exports = convertData;
