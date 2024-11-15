const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; 

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        users.push(newUser);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.message(error)
    }
    
});

router.get('/users', (req, res) => {
    res.status(200).json(users);
});


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
       
        console.log("Datos recibidos:", { username, password });

       
        const user = users.find(user => user.username === username);

        if (!user) {
            console.log("Usuario no encontrado.");
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        return res.json({ message: "Inicio de sesión exitoso", token });
        

    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};


router.post('/login', login);

module.exports = router;
