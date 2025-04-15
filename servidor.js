const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'ps4shadowzone2025';

app.use(cors());
app.use(express.json());

// Ruta de login
app.post('/api/login', (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === 'admin' && password === 'shadowzone2025') {
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ mensaje: 'Credenciales incorrectas' });
});

// Ruta protegida de prueba
app.get('/api/protegido', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido' });
    res.json({ mensaje: 'Acceso permitido', usuario: decoded.usuario });
  });
});

// Fallback
app.get('/', (req, res) => {
  res.send('Backend PS4 Shadow Zone funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor backend funcionando en el puerto ${PORT}`);
});
