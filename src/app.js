const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const app = express();

// importing routes
const userRoutes = require('./routes/users');

//settings
app.set('port', process.env.PORT || 8090);
app.use(cors());


//midelwares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '11192102',
    port: 3306,
    database: 'pruebaBackend'
}, 'single'));
app.use(express.urlencoded({ extended: false }))

// Middleware para analizar el contenido JSON de las solicitudes
// app.use(express.json());

//routes
app.use('/', userRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));


// Manejo de errores 404 para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found', status: 404 });
});

// Manejo de errores genéricos
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error', status: 500 });
});

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 8090');
})