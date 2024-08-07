const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// importing routes
const routes = require('./routes/route');


//settings
app.set('port', process.env.PORT || 8090);

app.use(cors());

//midelwares
const verification = express.Router();

verification.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log(token)
})


app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }))
app.disable('x-powered-by')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para analizar el contenido JSON de las solicitudes
// app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

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