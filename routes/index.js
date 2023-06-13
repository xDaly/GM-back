const gestRoute = require('./gestionnaire.routes');
const assetRoute = require('./asset.routes');


module.exports = (app) => {
    app.use('/gestionnaire', gestRoute)
    app.use('/asset', assetRoute)
}