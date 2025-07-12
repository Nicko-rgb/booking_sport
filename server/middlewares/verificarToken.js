const jwt = require('jsonwebtoken');

// Esto sirve para hacer manejar rutas protegidas en el servidor
// en el cliente se debe usar una instance de axios "axiosInstance"
// que este enviará en los encabezados en token al servidor

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado. Token no proporcionado.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado. Vuelve a iniciar sesión.'
        });
    }
};

module.exports = {
    verificarToken
}
