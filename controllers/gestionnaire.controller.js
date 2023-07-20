const { userService } = require('../services')
const resHandler = require('../helpers/responseHandler.helper')


exports.createGestinnaire = async (req, res) => {
    try {
        const newGestionnaire = await userService.createUser({
            userName: req.body.userName,
            password: req.body.password,
            role: 'gestionnaire'
        })
        const newProfil = await userService.createProfil({
            UserId: newGestionnaire.id,
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email
        })
        resHandler.setSuccess(200, 'Gestionnaire a été crée avec succes', { ...newGestionnaire.get(), Profil: { ...newProfil.get() } })
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur au creation du gestionnaire merci de verifier les information')
        return resHandler.send(res);
    }
}

exports.getGestinnaires = async (req, res) => {
    try {
        const data = await userService.getGestinnaires()
        resHandler.setSuccess(200, 'Data récupéré avec success', data)
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur lors de recupération du data')
        return resHandler.send(res);
    }
}

exports.getGestinnairesNames = async (req, res) => {
    try {
        const data = await userService.getGestinnairesNames()
        resHandler.setSuccess(200, 'Data récupéré avec success', data)
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur lors de recupération du data')
        return resHandler.send(res);
    }
}

exports.getArchivedGestinnaires = async (req, res) => {
    try {
        const data = await userService.getArchivedGestinnaires()
        resHandler.setSuccess(200, 'Data récupéré avec success', data)
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur lors de recupération du data')
        return resHandler.send(res);
    }
}

exports.deleteGestionnaire = async (req, res) => {
    try {
        await userService.deleteGestionnaire(req.params.id)
        resHandler.setSuccess(200, 'Gestionnaire supprimé avec success')
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur lors de suppression du data')
        return resHandler.send(res);
    }
}

exports.updateGestionnaire = async (req, res) => {
    try {
        await userService.updateGestionnaire(req.body, req.params.id)
        resHandler.setSuccess(200, 'Gestionnaire modifier avec success')
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur lors de la modification du data')
        return resHandler.send(res);
    }
}