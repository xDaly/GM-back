const gestRoute = require('./gestionnaire.routes');
const assetRoute = require('./asset.routes');
const authRoute = require('./auth.routes')


module.exports = (app) => {
    app.use('/gestionnaire', gestRoute)
    app.use('/asset', assetRoute)
    app.use('/auth', authRoute)
}