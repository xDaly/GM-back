const { sequelize } = require("../sequelize");

const { DataTypes, Sequelize } = require("sequelize");

exports.Employe = sequelize.define(
  "Employe",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
    cin: {
      type: DataTypes.INTEGER,
    },
    structure: {
      type: DataTypes.STRING,
    },
    etage: {
      type: DataTypes.STRING,
    },
    bureau: {
      type: DataTypes.STRING,
    },
    poste: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    localisation: {
      type: DataTypes.STRING,
    },
    archived: {
      type: DataTypes.BOOLEAN,
    },
  }
);