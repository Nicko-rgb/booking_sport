# Booking Sport - Server

Servidor backend para la aplicación de reservas deportivas con autenticación de usuarios.

## Configuración Inicial

### 1. Crear archivo .env

Crea un archivo `.env` en la raíz del servidor con la siguiente configuración:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=db_sport
DB_USER=root
DB_PASSWORD=

# Server Configuration
PORT=5010
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

### 2. Crear la base de datos

En MySQL, crea la base de datos:

```sql
CREATE DATABASE db_sport;
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## Endpoints de Autenticación

### Registro de Usuario

- **POST** `/api/auth/register`
- **Body:**

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "phone": "+1234567890"
}
```

### Login de Usuario

- **POST** `/api/auth/login`
- **Body:**

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

## Estructura del Proyecto

```
server/
├── config/
│   └── db.js          # Configuración de Sequelize
├── controllers/
│   └── userController.js    # Controladores de autenticación
├── middlewares/
│   └── verificarToken.js             # Middleware de autenticación JWT
├── models/
│   └── User.js             # Modelo de usuario
├── routes/
│   └── userRoute.js             # Rutas de autenticación
├── server.js               # Servidor principal
└── package.json
```

## Características

- ✅ Autenticación JWT
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de datos con Sequelize
- ✅ Middleware de seguridad (Helmet, Rate Limiting)
- ✅ CORS configurado
- ✅ Manejo de errores global
- ✅ Sincronización automática de modelos
- ✅ Logs informativos

## Respuestas de la API

Todas las respuestas siguen este formato:

```json
{
  "success": true/false,
  "message": "Mensaje descriptivo",
  "data": {
    // Datos de la respuesta
  }
}
```

## Próximos Pasos

1. Crear el archivo `.env` con la configuración de tu base de datos
2. Asegúrate de que MySQL esté corriendo
3. Ejecuta `npm run dev` para iniciar el servidor
4. Prueba los endpoints con Postman o similar

El servidor estará disponible en `http://localhost:5010`
