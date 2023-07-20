const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true, logging: false });
    const [instance, created] =
      await require("./models/user.model").User.findOrCreate({
        where: {
          userName: "admin",
          password: "admin",
          role: "admin",
        },
        defaults: {
          userName: "admin",
          password: "admin",
          role: "admin",
        },
      });
      const [instanceEmploye, createdEmploye] =
      await require("./models/employe.model").Employe.findOrCreate({
        where: {
          nom: "stock informatique",
          region : "SIEGE",
          localisation : "SIEGE",
          archived : false , 
          structure :"DI"
        },
        defaults: {
          nom: "stock informatique",
          region : "SIEGE",
          localisation : "SIEGE",
          archived : false ,
          structure :"DI"
        },
      });
    const [instanceProfil, createdProfile] =
      await require("./models/profil.model").Profil.findOrCreate({
        where: {
          nom: "mondher",
          prenom: "jardak",
          email: "mondher.jardak@gmail.com",
          UserId: instance.dataValues.id
        },
        defaults: {
          nom: "mondher",
          prenom: "jardak",
          email: "mondher.jardak@gmail.com",
          UserId: instance.dataValues.id
        },
      });
      ['Siège', 'Regions', 'Pépinières'].map(async (e)=>{
        const [instancelocalisation, createdlocalisation] =
        await require("./models/localisation.model").Localisation.findOrCreate({
          where: {
           name : e
          },
          defaults: {
           name : e
          },
        });
      });
      ['cfga', 'audit', 'cdii', 'cidt', 'di', 'dg', 'dga'].map(async (e)=>{
        const [instancestructure, createdstructure] =
        await require("./models/structure.model").Structure.findOrCreate({
          where: {
           name : e
          },
          defaults: { 
           name : e
          },
        });
      }) ;
      ['imprimante','ordinateur','accessoire','casque','souris','clavier'].map(async (e)=>{
        const [instancetype, createdtype] =
        await require("./models/type.model").Type.findOrCreate({
          where: {
           name : e
          },
          defaults: { 
           name : e
          },
        });
      })
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  sequelize: sequelize,
};
