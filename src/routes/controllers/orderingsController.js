const { Country, Activity } = require("../../db");

const orderings = async (req, res) => {
  try {
    const { order } = req.query;
    let countries = await Country.findAll({
      include: Activity,
    });
    switch (order) {
      case "a-z":
        {
          countries.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          res.send(countries);
        }
        break;
      case "z-a":
        {
          countries.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          res.send(countries);
        }
        break;
      case "max":
        {
          countries.sort((a, b) => {
            if (a.population < b.population) return 1;
            if (a.population > b.population) return -1;
            return 0;
          });
          res.send(countries);
        }
        break;
      case "min":
        {
          countries.sort((a, b) => {
            if (a.population > b.population) return 1;
            if (a.population < b.population) return -1;
            return 0;
          });
          res.send(countries);
        }
        break;
      default:
        res.send(countries);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  orderings,
};
