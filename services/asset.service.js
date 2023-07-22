const { Asset, History, Employe } = require("../database");
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
    const stock = await Employe.findOne({
      where: {
        nom: 'stock informatique'
      }
    })
    console.log('stock', stock);
    const NewAsset = await Asset.create({
      SN: asset.SN,
      model: asset.model,
      buy_date: asset.buy_date,
      // current_owner: "stock informatique",
      EmployeId: stock.id,
      type: asset.type,
      etat: "en stock",
      observation: asset.observation,
    });
    return await Asset.findByPk(NewAsset.id, {
      include: ['Employe']
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getAssets = async (query, filters) => {
  try {
    const pagination = paginate(
      query.page,
      query.size,
      query.orderBy,
      query.direction
    );
    const assets = await Asset.findAndCountAll({
      offset: +pagination.offset,
      limit: +pagination.limit,
      order: pagination.order,
      include: {
        model: Employe,
        where: {
          [Op.and]: [
            { id: { [Op.substring]: filters.employeId } },
            { structure: { [Op.substring]: filters.structure } },
            { localisation: { [Op.substring]: filters.localisation } },
            { region: { [Op.substring]: filters.region } },
          ]
        }
      },
      where: {
        [Op.and]: [
          {
            etat: filters.etat ? { [Op.eq]: filters.etat } : { [Op.not]: "declassé" },
          },
          {
            [Op.and]: [
              { SN: { [Op.substring]: filters.SN } },
              { type: { [Op.substring]: filters.type } },
              { model: { [Op.substring]: filters.model } },
              { buy_date: { [Op.substring]: filters.buy_date } },
              // {
              //   current_owner: { [Op.substring]: filters.current_owner || "" },
              // },
              // { structure: { [Op.substring]: filters.structure || "" } },
              // { localisation: { [Op.substring]: filters.localisation || "" } },
            ],
          },
        ],
      },
    });
    return assets;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.updateAsset = async (newData, id, profil) => {
  try {
    const [, Update] = await Asset.update(
      {
        ...newData,
      },
      {
        where: {
          id: id,
        },
        individualHooks: true,
      }
    );

    const changes = Array.from(Update[0]._changed);
    addHistory(changes, Update, profil.nom + " " + profil.prenom);
    return await Asset.findByPk(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};



exports.deleteAsset = async (id,profil) => {
  try {
    const [, Update] =   await Asset.update(
      {
        etat: "declassé",
      },
      {
        where: {
          id: id,
        },
        individualHooks: true,
      }
    );
    const changes = Array.from(Update[0]._changed);
    addHistory(changes, Update, profil.nom + " " + profil.prenom);
    return await Asset.findByPk(id);
  } catch (error) {
    return error;
  }
};


exports.getHistory = async (id) => {
  try {
    const history =  await History.findAll({
      where: {
        AssetId: id
      },
      order: [['date', 'DESC']]
    })
    const historyAffectation =  await History.findAll({
      where: {
        AssetId: id,
        update : 'Affectation'
      },
      order: [['date', 'DESC']]
    })
    return {history,historyAffectation}
  } catch (error) {
    console.error(error);
    throw error;
  }

}

const addHistory = async (data, Update, gestionnaire) => {
  console.log('add history');
  try {
    await data.map(async (e) => {
      if (e != "updatedAt" && e != "EmployeId") {
        await History.create({
          gestionnaire: gestionnaire,
          update: e,
          from: Update[0]._previousDataValues[e],
          to: Update[0].dataValues[e],
          date: Update[0].dataValues.updatedAt,
          AssetId: Update[0].dataValues.id,
        });
      }
      if (e == "EmployeId") {
        const from = await Employe.findByPk(Update[0]._previousDataValues[e])
        const to = await Employe.findByPk(Update[0].dataValues[e])
        await History.create({
          gestionnaire: gestionnaire,
          update: "Affectation",
          from: from.nom,
          to: to.nom,
          date: Update[0].dataValues.updatedAt,
          AssetId: Update[0].dataValues.id,
        });
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


