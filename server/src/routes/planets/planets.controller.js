const { planets } = require("../../models/planets.model");

exports.getAllPlanets = (req, res, next) => {
  console.log("get all planets");
  return res.json(planets);
};
