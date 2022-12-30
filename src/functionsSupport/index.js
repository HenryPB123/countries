const axios = require("axios");
const { Country, Activity } = require("../db");

let getDataCountries = async () => {
  try {
    const apiContries = await axios.get(`https://restcountries.com/v3/all`);

    apiContries
      ? apiContries.data.forEach((country) => {
          Country.findOrCreate({
            include: Activity,
            where: {
              id: country.cca3,
              name: country.name.common,
              flag: country.flags[1],
              continent: country.region,
              capital: country.capital ? country.capital[0] : "Unkown capital",
              subregion: country.subregion
                ? country.subregion
                : "Unkown subregion",
              area: country.area,
              population: country.population,
            },
          });
        })
      : "No se ha podido cargar la base de datos";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDataCountries,
};
