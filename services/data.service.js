const { Op } = require("sequelize");
const { Structure, Localisation, Type, Employe, Asset, User } = require("../database");


exports.getStructures = async () => {
  try {
    const structures = await Structure.findAll()
    return structures
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getLocalisations = async () => {
  try {
    const localisations = await Localisation.findAll()
    return localisations
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getTypes = async () => {
  try {
    const types = await Type.findAll()
    return types
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.getCounts = async () => {
  try {
    const employes = await Employe.count({
      where: {
        archived: false
      }
    })
    const archivedEmployes = await Employe.count({
      where: {
        archived: true
      }
    })
    const assets = await Asset.count({
      where: {
        etat: { [Op.not]: "declassé" }
      }
    })
    const declassedAssets = await Asset.count({
      where: {
        etat: "declassé"
      }
    })
    const users = await User.count({
      where: {
        archived: false
      }
    })
    const archivedusers = await User.count({
      where: {
        archived: true
      }
    })

    const regionData = await Employe.count({
      group: ['region']
    })
    const localisationUsersData = await Employe.count({
      group: ['localisation']
    })
     const assetsData = await Asset.count({
      group: 'etat'
    })
    // const usersData = await User.findAll({
    //   group: 'archived'

    // })

    return {
      employes,
      archivedEmployes,
      assets,
      declassedAssets,
      users,
      archivedusers,
      regionData,
      localisationUsersData,
      assetsData
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}