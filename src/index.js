const express = require('express');
const bodyParser = require('body-parser');

const { PORT, DB_SYNC } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models');

const setupAndStartServer = async ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`);
    })
    if(DB_SYNC){
        db.sequelize.sync({alter: true})
    }
}

setupAndStartServer();