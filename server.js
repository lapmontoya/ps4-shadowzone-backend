const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

const SECRET_KEY = 'shadowzone_secret_key';

app.use(express.json());

// 🔧 CONFIGURACIÓN CORS CORRECTA
app.use(cors({
  origin: 'https://ps4-shadow-zone.netlify.app', // tu frontend en Netlify
  credentials: true
}));

// Ruta de login con JWT
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  if (usuario === 'admin' && contrasena === 'shadowzone2025') {
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
});

// Middleware de autenticación
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Ejemplo de ruta protegida
app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({ mensaje: 'Acceso concedido a ruta protegida', user: req.user });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
