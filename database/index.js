const { sequelize } = require("./sequelize");
const { User } = require("./models/user.model");
const { Profil } = require("./models/profil.model");
const { Employe } = require("./models/employe.model");
const { Asset } = require('./models/asset.model')
const { Ownership } = require('./models/ownership.model')


User.hasOne(Profil, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Ownership, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Asset.hasMany(Ownership, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Profil.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })




module.exports = {
  User: User,
  Profil: Profil,
  Employe: Employe,
  Asset: Asset,
  Ownership: Ownership,
  sequelize: sequelize,
};