const { sequelize } = require("../sequelize");
const { DataTypes, Sequelize } = require("sequelize");

exports.History = sequelize.define("History", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  gestionnaire: {
    type: DataTypes.STRING,
  },
  update: {
    type: DataTypes.STRING,
  },
  from: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});
