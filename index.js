import express from "express";

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;

const users = [
  {
    id: 1,
    nombre: "Luis",
    apellido: "Sosa",
    foto: "foto1.jpg",
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "Gomez",
    foto: "foto2.jpg",
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Perez",
    foto: "foto3.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("API Rest ful con datos desde un array");
  console.log(__dirname);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  user ? res.json(user) : res.status(404).send("User no existe");
});

app.get("/image/users/:id", (req, res) => {
  /*   const user = users.find((u) => u.id == req.params.id);
  console.log(__dirname + "/image/foto" + req.params.id + ".jpg"); */
  /* 
  user
   ? res.sendFile(__dirname + "/image/" + user.foto) 
   : res.status(404).send("User no existe");
  */
  if (user)
    return res.sendFile(__dirname + "/image/foto" + req.params.id + ".jpg");

  res.status(404).send("User no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
