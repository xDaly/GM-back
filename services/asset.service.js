const { Asset } = require('../database')
const { Ownership } = require('../database')
const { User } = require('../database')


exports.AddAsset = async ({ asset }) => {
    try {
        const admin = await User.findOne({
            where: {
                role: 'admin'
            }
        })
        const NewAsset = await Asset.create({
            SN: asset.SN,
            model: asset.model,
            buy_date: asset.buy_date,
            current_owner: asset.current_owner,
            structure: asset.structure,
            localisation: asset.localisation,
            etat: asset.etat,
            observation: asset.observation
        })
        await Ownership.create({
            asset_id: NewAsset.get().id,
            user_id: admin.dataValues.id
        })
        return NewAsset
    } catch (error) {
        return error
    }
}

exports.creteProfil = async ({ UserId, nom, prenom, email }) => {
    try {
        return await Profil.create({
            UserId, nom, prenom, email
        })
    } catch (error) {
        return error
    }
}


exports.getGestinnaires = async () => {
    try {
        return User.findAll({
            include: [Profil],
            where: {
                role: 'gestionnaire'
            }
        })
    } catch (error) {
        return error
    }
}

exports.deleteGestionnaire = async (id) => {
    const profil = await Profil.findOne({
        where: {
            id: id
        }
    })

    await User.destroy({
        where: {
            id: profil.dataValues.UserId
        },
    })
    // await Profil.destroy({
    //     where: {
    //         id: id
    //     }
    // })
}


exports.updateGestionnaire = async (newData, id) => {
    const profil = await Profil.findOne({
        where: {
            id: id
        }
    })
    await User.update({
        userName: newData.userName,
        password: newData.password
    }, {
        where: {
            id: profil.dataValues.UserId
        }
    })
    await Profil.update({
        nom: newData.nom,
        prenom: newData.prenom,
        email: newData.email
    }, {
        where: {
            id: id
        }
    })
}