const { Country, Activity } = require("../../db");
const { Op } = require("sequelize");

const countriesByContinents = async (req, res) => {
  try {
    const { continent } = req.query;

    const countries = await Country.findAll({
      include: Activity,
    });

    const getCountryByContinent = (continent) => {
      let countriesByContinent = [];
      countriesByContinent = countries.filter(
        (country) => country.continent === continent
      );
      res.send(countriesByContinent);
    };

    switch (continent) {
      case "Antarctic":
        getCountryByContinent(continent);
        break;

      case "Africa":
        getCountryByContinent(continent);
        break;

      case "Europe":
        getCountryByContinent(continent);
        break;

      case "Asia":
        getCountryByContinent(continent);
        break;

      case "Americas":
        getCountryByContinent(continent);
        break;

      case "Oceania":
        getCountryByContinent(continent);
        break;

      default:
        res.send(countries);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  countriesByContinents,
};
