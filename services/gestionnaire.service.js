const { User } = require('../database')
const { Profil } = require('../database')



exports.createUser = async ({ userName, password, role }) => {
    try {
        return await User.create({
            userName: userName,
            password: password,
            role: role
        })
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
    await User.destroy({
        where: {
            id: id
        },
        cascade: true,
        include: [Profil]
    })
}