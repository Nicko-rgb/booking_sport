// server/server.js
const express = require('express');
const app = express();
const chalk = require('chalk');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Probar conexión y sincronizar modelos
sequelize.sync({ force: true })
    .then(() => {
        console.log(chalk.bgGreen('🟢 Conectado a la base de datos y modelos sincronizados'));
        console.log(chalk.green('Todo bien!!'));
        
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () =>
            console.log(chalk.cyan(chalk.bold(`🚀 Servidor corriendo en http://localhost:${PORT}`)))
        );
    })
    .catch((err) => {
        console.error(chalk.red(`🔴 Error al conectar con la base de datos: ${err.message}`));
    });
