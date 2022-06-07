const express = require('express')
const app = express ();
const sequelize = require('./config/dbConfig');
require('dotenv').config();
const roomRoutes = require('./routes/roomRoutes');
const typeRoutes = require('./routes/typeRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');

const PORT = process.env.PORT

async function databaseConnection() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        await sequelize.sync();
        console.log('Database synced!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await databaseConnection();

    console.log(`Starting server on port ${PORT}...`);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}.`);
    });
}


app.use(express.json());

app.use('/room', roomRoutes);
app.use('/type', typeRoutes);
app.use('/furniture', furnitureRoutes);

app.use('*', (req, res, next) => {
    res.status(404).json({ error: `unknown route` });
});


init();