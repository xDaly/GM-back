const { sequelize } = require("./sequelize");
const { User } = require("./models/user.model");
const { Profil } = require("./models/profil.model");
const { Employe } = require("./models/employe.model");
const { Asset } = require("./models/asset.model");
const { Ownership } = require("./models/ownership.model");
const { History } = require("./models/history.model");

User.hasOne(Profil, { onUpdate: "CASCADE" });
User.hasMany(Ownership, { onUpdate: "CASCADE" });
Asset.hasMany(History, { onUpdate: "CASCADE" });
Profil.belongsTo(User, { onUpdate: "CASCADE" });

module.exports = {
  User: User,
  Profil: Profil,
  Employe: Employe,
  Asset: Asset,
  Ownership: Ownership,
  History: History,
  sequelize: sequelize,
};
