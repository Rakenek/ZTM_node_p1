const { getAllPlanets } = require("../../models/planets.model");

exports.httpGetAllPlanets = (req, res, next) => {
  console.log("get all planets");
  return res.status(200).json(getAllPlanets());
};
