// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
} = require('../controllers/userController');

// Registro de nuevo usuario
router.post('/register', registerUser);

// Inicio de sesion de usuario
router.post('/login', loginUser);

module.exports = router;
