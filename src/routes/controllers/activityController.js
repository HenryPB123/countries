const { Country, Activity } = require("../../db");

const allActivities = async (req, res) => {
  try {
    const activitiesDB = await Activity.findAll();
    let namesActivities = [];
    let noRepeatNamesActivities = [];
    let activities = [];

    if (!activitiesDB.length) {
      res.status(400).send("No se encontraron actividades en la base de datos");
    } else {
      activitiesDB.map(
        (activity) => (
          activities.push(activity),
          namesActivities.push(
            activity.name[0].toUpperCase() + activity.name.slice(1)
          )
        )
      );
      noRepeatNamesActivities = namesActivities.filter((valor, indice) => {
        return namesActivities.indexOf(valor) === indice;
      });

      res.json({ activitiesNames: noRepeatNamesActivities, activities });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const createActivities = async (req, res) => {
  try {
    const {
      countries,
      nameActivity,
      difficulty,
      duration,
      season,
      description,
    } = req.body;

    let countriesFound = [];
    let countriesWithoutActivity = [];
    let nameActivities = [];
    let nameActivitiesNoRepeat = [];

    const countriesDb = await Country.findAll({
      include: Activity,
    });

    if (!nameActivity || !difficulty || !duration || !season || !description) {
      res
        .status(400)
        .send("Debes agregar todos los datos para crear una actividad");
    } else {
      //filtro los países que me envían por body
      for (let i = 0; i < countriesDb.length; i++) {
        for (let j = 0; j < countries.length; j++) {
          if (
            countriesDb[i].name.toLowerCase() === countries[j].toLowerCase()
          ) {
            countriesFound.push(countriesDb[i]);
          }
        }
      }

      countriesFound.map((c) => {
        if (c.activities.length === 0) {
          countriesWithoutActivity.push(c);
        } else if (c.activities.length > 0) {
          c.activities.map((a) => nameActivities.push(a.name));

          nameActivitiesNoRepeat = nameActivities.filter((item, index) => {
            return nameActivities.indexOf(item) === index;
          });

          if (
            !c.activities.includes(nameActivity) &&
            !nameActivitiesNoRepeat.includes(nameActivity)
          ) {
            countriesWithoutActivity.push(c);
          }
        }
      });

      if (countriesWithoutActivity.length === 0) {
        res.status(400).send("Esta actividad ya ha sido creada");
      } else {
        // agrego la actividad a cada uno de mis paises encontrados
        countriesWithoutActivity.forEach(async (country) => {
          let newActivity = await Activity.create({
            name: nameActivity,
            difficulty: difficulty,
            duration: duration,
            season: season,
            description: description,
          });
          country.addActivity(newActivity);
        });

        res.send("Actividad creada con éxito");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const editActivities = async (req, res) => {
  try {
    const { id } = req.query;

    const { nameActivity, difficulty, duration, season, description } =
      req.body;

    console.log("body", req.body);

    if (!nameActivity && !difficulty && !duration && !season && !description) {
      res.status(400).send("Debes elegir al menos un campo para editar");
    } else {
      await Activity.update(
        {
          name: nameActivity,
          difficulty: difficulty,
          duration: duration,
          description: description,
          season: season,
        },
        {
          where: { id: id },
        }
      );

      res.send("La actividad ya ha sido actualizada");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteActivities = async (req, res) => {
  try {
    const { id } = req.query;
    await Activity.destroy({
      where: {
        id: id,
      },
    });
    res.send("Esta actividad fue eliminada con éxito");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allActivities,
  createActivities,
  deleteActivities,
  editActivities,
};
