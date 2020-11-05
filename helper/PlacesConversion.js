const { PLACES_KEY } = require("../config.js");

const PlacesCategories = {
  Mexican: "mexican",
};

const PlacesConversion = {
  placeID: ["place_id"],
  title: ["name"],
  description: ["default", ""],
  tips: ["default", ""],
  category: ["default", "food"],
  subcategory: [
    "type",
    (categories) => {
      for (category in categories) {
        if (_.has(PlacesCategories, category)) {
          return PlacesCategories[this.category];
        }
      }
      return "";
    },
  ],
  type: ["default", "venue"],
  imgURL: [
    "photos[0].photo_reference",
    (url) => {
      return (
        "https://maps.googleapis.com/maps/api/place/photo?key=" +
        PLACES_KEY +
        "&photoreference=" +
        url
      );
    },
  ],
  // region: ["location.city"],
  open: ["default", 0],
  closed: ["default", 0],
  closed_days: ["default", []],
  // latitude: ["location.lat"],
  // longitude: ["location.lng"],
  address: ["location.formattedAddress"],
  cost: ["price_level"],
  rank: ["rating"],
  peopleWatching: ["default", 0],
  linkClicks: ["default", 0],
  tag: [""],
  // accessURL: ["url"],
  businessID: ["place_id"],
  times: ["weekday_text"],
  valid: ["default", false],
};

module.exports = PlacesConversion;
