const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();

//Connect to DB
const initOptions = {
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }

};
const pgp = require('pg-promise')(initOptions)
const db = pgp(process.env.DB_CONNECT);
db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;

        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

//Import Route
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);


app.listen(port, ()=> console.log(`App listening on port ${port}!`))