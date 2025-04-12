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
