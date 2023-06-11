const express = require("express");
const cors = require('cors')
const bodyparser = require('body-parser')
const { sequelize } = require('./database')
const app = express();



app.use(cors({
    origin: '*'
}))
app.use(bodyparser.json({ limit: '50000kb' }))


require('./routes')(app)
app.listen(3000, () => {
    console.log("server is working");
});