const { sequelize } = require("./sequelize");
const { User } = require("./models/user.model");
const { Profil } = require("./models/profil.model");
const { Employe } = require("./models/employe.model");


User.hasOne(Profil);
Profil.belongsTo(User)

 


module.exports = {
  User: User,
  Profil: Profil,
  Employe: Employe,
  sequelize:sequelize,
};