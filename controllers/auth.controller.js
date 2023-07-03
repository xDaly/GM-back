const { userService, authService } = require('../services')
const resHandler = require('../helpers/responseHandler.helper')




exports.signin = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await authService.checkUser(userName, password)
        const token = await authService.CreateToken(user.id)
            const profil = await authService.getProfil(user.id)
            const userData = {
                ...user,
                ...profil,
                token
            }
            resHandler.setSuccess(200, 'connecte avec success', userData)
            return resHandler.send(res);
    

    } catch (error) {
        resHandler.setError(400, error)
        return resHandler.send(res);
    }
}