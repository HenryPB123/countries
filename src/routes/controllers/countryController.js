const { Country, Activity } = require("../../db");
const { Op } = require("sequelize");

const getDataDB = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const countries = await Country.findAll({
        include: Activity,
      });
      countries.length > 0
        ? res.send(countries)
        : res.status(400).send("No ha cargado la base de datos");
    } else {
      const foundCountry = await Country.findAll({
        include: Activity,
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      foundCountry
        ? res.send(foundCountry)
        : res.status(400).send("Este país no existe.");
    }
  } catch (error) {
    console.log(error);
  }
};

const getCountryById = async (req, res) => {
  try {
    let { id } = req.params;
    id.length > 3
      ? res.status(400).send("El id solo debe tener tres letras")
      : (id = id.toLocaleUpperCase());

    const countryById = await Country.findOne({
      include: Activity,
      where: { id },
    });

    countryById
      ? res.send(countryById)
      : res.status(400).send("El país con este id no se encuentra");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getCountryWithActivity = async (req, res) => {
  try {
    let { activity } = req.query;
    const countries = await Country.findAll({
      include: Activity,
    });

    let countriesWithOneActivity = [];

    countries.forEach((country) => {
      if (country.activities.length > 0) {
        country.activities.map((acti) => {
          if (acti.name.toLowerCase() === activity.toLowerCase()) {
            console.log("nombre", acti.name);
            countriesWithOneActivity.push(country);
          }
        });
      }
    });

    if (countriesWithOneActivity.length === 0) {
      res.status(404).send("No hay países con esta actividad");
    } else {
      res.send(countriesWithOneActivity);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getDataDB,
  getCountryById,
  getCountryWithActivity,
};
