const { Asset } = require("../database");
const { Ownership } = require("../database");
const { User } = require("../database");
const { paginate } = require("../helpers/paginate.helper");

exports.AddAsset = async ({ asset }) => {
  try {
    const admin = await User.findOne({
      where: {
        role: "admin",
      },
    });
    const NewAsset = await Asset.create({
      SN: asset.SN,
      model: asset.model,
      buy_date: asset.buy_date,
      current_owner: asset.current_owner,
      structure: asset.structure,
      localisation: asset.localisation,
      etat: asset.etat,
      observation: asset.observation,
    });
    await Ownership.create({
      asset_id: NewAsset.get().id,
      user_id: admin.dataValues.id,
    });
    return NewAsset.get();
  } catch (error) {
    return error;
  }
};

exports.creteProfil = async ({ UserId, nom, prenom, email }) => {
  try {
    return await Profil.create({
      UserId,
      nom,
      prenom,
      email,
    });
  } catch (error) {
    return error;
  }
};

exports.getAssets = async (page, pageSize, orderBy, direction) => {
  const pagination = paginate(page, pageSize, orderBy, direction);
  try {
    return await Asset.findAndCountAll(pagination);
  } catch (error) {
    return error;
  }
};

exports.deleteGestionnaire = async (id) => {
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
};

exports.updateAsset = async (newData, id) => {
  try {
    return await Asset.update(
      {
        ...newData,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

exports.deleteAsset = async (id) => {
  try {
    await Asset.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
