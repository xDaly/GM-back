const { User } = require("../database");
const { Profil } = require("../database");

exports.createUser = async ({ userName, password, role }) => {
  try {
    return await User.create({
      userName: userName,
      password: password,
      archived: false,
      role: role,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createProfil = async ({ UserId, nom, prenom, email }) => {
  try {
    const profil = await Profil.create({
      UserId,
      nom,
      prenom,
      email,
    });
    return profil;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getGestinnaires = async () => {
  try {
    const user = await User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
        archived: false
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getGestinnairesNames = async () => {
  try {
    const user = await User.findAll({
      attributes: ['userName'],
      where: {
        role: "gestionnaire",
        archived: false
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getArchivedGestinnaires = async () => {
  try {
    const user = await User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
        archived: true
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteGestionnaire = async (id) => {
  try {
    const profil = await Profil.findOne({
      where: {
        id: id,
      },
    });

    await User.destroy({
      where: {
        id: profil.dataValues.UserId,
      },
    });
    // await Profil.destroy({
    //     where: {
    //         id: id
    //     }
    // })
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updateGestionnaire = async (newData, id) => {
  try {
    const profil = await Profil.findOne({
      where: {
        id: id,
      },
    });
    await User.update(
      {
        ...newData
      },
      {
        where: {
          id: profil.dataValues.UserId,
        }
      }
    );
    const [, Update] = await Profil.update(
      {
        nom: newData.nom,
        prenom: newData.prenom,
        email: newData.email,
      },
      {
        where: {
          id: id,
        },
        individualHooks: true
      }
    );
    return await User.findAll({
      include: [Profil],
      where: {
        role: "gestionnaire",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
