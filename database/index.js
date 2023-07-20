const { sequelize } = require("./sequelize");
const { User } = require("./models/user.model");
const { Profil } = require("./models/profil.model");
const { Employe } = require("./models/employe.model");
const { Asset } = require("./models/asset.model");
const { History } = require("./models/history.model");
const { Structure } = require("./models/structure.model");
const { Localisation } = require("./models/localisation.model");
const { Type } = require("./models/type.model");

User.hasOne(Profil, { onUpdate: "CASCADE" });
Employe.hasMany(Asset, { onUpdate: "CASCADE" });
Asset.belongsTo(Employe, { onUpdate: "CASCADE" })
Profil.belongsTo(User, { onUpdate: "CASCADE" });
Asset.hasMany(History, { onUpdate: "CASCADE" })
History.belongsTo(Asset, { onUpdate: "CASCADE" })

module.exports = {
  User: User,
  Profil: Profil,
  Employe: Employe, 
  Asset: Asset,
  History: History,
  Structure : Structure,
  Localisation : Localisation,
  Type:Type,
  sequelize: sequelize,
};
