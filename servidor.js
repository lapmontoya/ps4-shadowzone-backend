
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let juegos = [
  {
    nombre: "Uncharted 4",
    genero: "Acción",
    peso: "50 GB",
    imagen: "https://upload.wikimedia.org/wikipedia/en/3/3e/Uncharted_4_box_artwork.jpg",
    descargas: 0
  },
  {
    nombre: "God of War",
    genero: "Mitología",
    peso: "45 GB",
    imagen: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    descargas: 0
  },
  {
    nombre: "FIFA 23",
    genero: "Deportes",
    peso: "50 GB",
    imagen: "https://upload.wikimedia.org/wikipedia/en/5/5f/FIFA_23_Cover.jpg",
    descargas: 0
  }
];

app.get("/juegos", (req, res) => {
  res.json(juegos);
});

app.get("/descargas/:nombre", (req, res) => {
  const juego = juegos.find(j => j.nombre === req.params.nombre);
  if (!juego) return res.json({ descargas: 0 });
  res.json({ descargas: juego.descargas });
});

app.post("/descargas/:nombre", (req, res) => {
  const juego = juegos.find(j => j.nombre === req.params.nombre);
  if (juego) juego.descargas++;
  res.json({ mensaje: "Contador actualizado" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
