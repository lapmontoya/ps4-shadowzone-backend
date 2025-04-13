const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PS4 Shadowzone Backend funcionando correctamente.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const fs = require('fs');
const path = require('path');

// Ruta GET para devolver el archivo juegos.json
app.get('/juegos', (req, res) => {
  const archivoPath = path.join(__dirname, 'juegos.json');

  fs.readFile(archivoPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el archivo juegos.json' });
    }
    try {
      const juegos = JSON.parse(data);
      res.json(juegos);
    } catch (parseErr) {
      res.status(500).json({ error: 'Error al parsear juegos.json' });
    }
  });
});
const jwt = require('jsonwebtoken');

// Ruta POST para login
aplicación.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  if (usuario === 'admin' && contraseña === 'shadowzone2025') {
    const token = jwt.sign({ usuario: 'admin' }, 'secretoSuperSecreto', { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

