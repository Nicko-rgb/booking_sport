// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { nombres, apellidos, email, phone, password } = req.body;
    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'El correo ya está registrado.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            nombres,
            apellidos,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado correctamente.', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor.', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Correo no encontrado.' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: 'Contraseña incorrecta.' });

        // Crear el token
        const token = jwt.sign(
            { id_user: user.id_user, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id_user: user.id_user,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: err.message });
    }
};

module.exports = { 
    registerUser,
    loginUser,
};
