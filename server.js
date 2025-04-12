const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = 'ps4shadowzone';
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let juegos = require('./data/juegos.json');

// Middleware de autenticación
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Token faltante');
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;
    next();
  });
}

// Login admin
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === 'admin' && password === 'ps4zone') {
    const token = jwt.sign({ usuario }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales inválidas');
  }
});

// Obtener juegos
app.get('/juegos', (req, res) => {
  res.json(juegos);
});

// Agregar juego (admin)
app.post('/juegos', auth, (req, res) => {
  const nuevo = { ...req.body, descargas: 0 };
  juegos.push(nuevo);
  fs.writeFileSync('./data/juegos.json', JSON.stringify(juegos, null, 2));
  res.sendStatus(201);
});

// Contador de descargas
app.post('/descargas/:nombre', (req, res) => {
  const juego = juegos.find(j => j.nombre === req.params.nombre);
  if (juego) {
    juego.descargas++;
    fs.writeFileSync('./data/juegos.json', JSON.stringify(juegos, null, 2));
    res.sendStatus(200);
  } else {
    res.status(404).send('Juego no encontrado');
  }
});

app.get('/descargas/:nombre', (req, res) => {
  const juego = juegos.find(j => j.nombre === req.params.nombre);
  if (juego) {
    res.json({ descargas: juego.descargas });
  } else {
    res.status(404).send('Juego no encontrado');
  }
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
