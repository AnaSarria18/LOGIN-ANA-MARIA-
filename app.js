require('dotenv').config();
const express = require('express');
const rutas = require('./routes/autenticar');
const rutaprotegida = require('./middleware/token');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));


app.use('/autenticar', rutas);
app.get('/protegida', rutaprotegida, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto ' + PORT);
});
