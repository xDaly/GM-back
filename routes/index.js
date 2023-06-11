const gestRoute = require('./gestionnaire.routes');

module.exports = (app) => {
    app.use('/gestionnaire', gestRoute)
}