const express = require('express')
const app = express ();
const sequelize = require('./config/dbConfig');
require('dotenv').config();
const roomRoutes = require('./routes/roomRoutes');
const typeRoutes = require('./routes/typeRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
// const web = require('./routes/web');

const PORT = process.env.PORT || 8000

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

app.use('/api/room', roomRoutes);
app.use('/api/type', typeRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/login', authRoutes);

app.use('/images', express.static('./images'))

app.use('*', (req, res, next) => {
    res.status(404).json({ error: `unknown route` });
});


init();