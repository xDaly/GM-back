const gestRoute = require('./gestionnaire.routes');
const assetRoute = require('./asset.routes');
const authRoute = require('./auth.routes')
const dataRoute = require('./data.routes')
const employeRoute = require('./employe.routes')


module.exports = (app) => {
    app.use('/gestionnaire', gestRoute)
    app.use('/asset', assetRoute)
    app.use('/auth', authRoute)
    app.use('/data', dataRoute)
    app.use('/employe',employeRoute)
}