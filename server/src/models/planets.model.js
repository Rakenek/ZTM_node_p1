const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    //fs.createReadStream("data/kepler_data.csv")
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          try {
            await savePlanet(data);
          } catch (err) {
            console.error(`Could not save planet ${err}`);
          }
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

const getAllPlanets = async () => {
  return planets.find({}, { _id: 0, __v: 0 });
};

savePlanet = async (planet) => {
  await planets.updateOne(
    {
      keplerName: planet.keplerName,
    },
    {
      keplerName: planet.keplerName,
    },
    {
      upsert: true,
    }
  );
};

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
  getAllPlanets,
};
