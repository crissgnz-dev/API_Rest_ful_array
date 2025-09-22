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

app.use(express.json()); // middleware
app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("escribimos un user");

  const nvo_id = users.length + 1;
  const new_user = {
    id: nvo_id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    foto: "foto" + nvo_id + ".jpg",
  };
  users.push(new_user);
});

app.put("/users", (req, res) => {
  const user = users.find((u) => u.id == req.query.id);
  console.log(user);
  if (!user) return res.status(404).send("User no existe");

  user.nombre = req.body.nombre;
  user.apellido = req.body.apellido;

  res.json(user);

  /*   const id_act = req.query.id;
  console.log(req.query.id);
  console.log(req.body); */

  res.send("actualizamos un user");
});

app.delete("/users", (req, res) => {
  const userIndex = users.findIndex((u) => u.id == req.query.id);

  if (!userIndex) return res.status(404).send("User no existe");

  users.splice(userIndex, 1);

  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).send("el recurso no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
