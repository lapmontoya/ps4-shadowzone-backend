const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('PS4 Shadowzone Backend funcionando correctamente.');
});

// Ruta para devolver juegos
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

// Ruta POST para login con JWT
app.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  if (usuario === 'admin' && contraseña === 'shadowzone2025') {
    const token = jwt.sign({ usuario: 'admin' }, 'secretoSuperSecreto', { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


