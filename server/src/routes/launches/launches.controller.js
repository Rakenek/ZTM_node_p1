const { launches } = require("../../models/launches.model");

const getAllLaunches = (req, res, next) => {
  const laun = Array.from(launches.values());
  return res.status(200).json(laun);
};

module.exports = {
  getAllLaunches,
};
