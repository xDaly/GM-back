const { assetService } = require('../services')
const resHandler = require('../helpers/responseHandler.helper')


exports.createAsset = async (req, res) => {
    try {
        const newAsset = await assetService.AddAsset(req.body)
        resHandler.setSuccess(200, 'Materiel a été ajouter avec succes', newAsset)
        return resHandler.send(res);
    } catch (error) {
        console.log(error);
        resHandler.setError(400, 'Erreur au creation de l"ajout de materiel merci de verifier les information')
        return resHandler.send(res);
    }
}


