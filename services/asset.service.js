const { Asset } = require("../database");
const { Ownership } = require("../database");
const { User } = require("../database");
const { paginate } = require("../helpers/paginate.helper");
const { Op } = require("sequelize");

exports.AddAsset = async (asset) => {
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
      AssetId: NewAsset.get().id,
      UserId: admin.dataValues.id,
    });
    return NewAsset.get();
  } catch (error) {
    return error;
  }
};

exports.getAssets = async (query, filters) => {
  try {
    const pagination = paginate(
      query.page,
      query.pageSize,
      query.orderBy,
      query.direction
    );
    const assets = await Asset.findAndCountAll({
      offset: +pagination.offset,
      limit: +pagination.limit,
      order: pagination.order,
      where: {
        [Op.and]: [
          {
            etat: filters.etat
              ? { [Op.eq]: filters.etat }
              : { [Op.not]: "declassé" },
          },
          {
            [Op.or]: [
              { SN: { [Op.substring]: filters.SN || "" } },
              { model: { [Op.substring]: filters.model || "" } },
              { buy_date: { [Op.substring]: filters.buy_date || "" } },
              {
                current_owner: { [Op.substring]: filters.current_owner || "" },
              },
              { structure: { [Op.substring]: filters.structure || "" } },
              { localisation: { [Op.substring]: filters.localisation || "" } },
              { observation: { [Op.substring]: filters.observation || "" } },
            ],
          },
        ],
      },
    });
    return assets;
  } catch (error) {
    console.err(error);
    throw error;
  }
};

exports.deleteGestionnaire = async (id) => {
  const profil = await Asset.findOne({
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
    await Asset.update(
      {
        ...newData,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await Asset.findByPk(id);
  } catch (error) {
    return error;
  }
};

exports.deleteAsset = async (id) => {
  try {
    await Asset.update(
      {
        etat: "declassé",
      },
      {
        where: {
          id: id,
        },
      }
    );
    return await Asset.findByPk(id);
  } catch (error) {
    return error;
  }
};
