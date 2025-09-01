const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM usuarios WHERE username=? AND password=?", [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    res.json({ mensaje: "Login exitoso", usuario_id: row.id });
  });
});

// Productos CRUD 
app.get("/api/productos", (req, res) => {
  db.all("SELECT * FROM productos", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/productos", (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  db.run(
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, precio, stock],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nombre, descripcion, precio, stock });
    }
  );
});

app.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM productos WHERE id=?", id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Producto eliminado", id });
  });
});

// Finalizar compra y guardar en historial
app.post("/api/finalizar-compra", (req, res) => {
  const { usuario_id, productos } = req.body; // productos: [{id, nombre, cantidad, precio}]
  if (!usuario_id || !productos || productos.length === 0) return res.status(400).json({error:"Datos incompletos"});

  db.serialize(() => {
    const stmtUpdate = db.prepare(
      "UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?"
    );
    const stmtInsertCompra = db.prepare(
      "INSERT INTO compras (usuario_id, producto, cantidad, total, fecha) VALUES (?,?,?,?,?)"
    );

    let error = null;

    productos.forEach(p => {
      stmtUpdate.run([p.cantidad, p.id, p.cantidad], function(err){
        if(err) error = err;
        if(this.changes === 0) error = `Stock insuficiente para producto ID ${p.id}`;
      });

      const fecha = new Date().toISOString();
      stmtInsertCompra.run([usuario_id, p.nombre, p.cantidad, p.precio*p.cantidad, fecha]);
    });

    stmtUpdate.finalize();
    stmtInsertCompra.finalize();

    if(error) return res.status(400).json({error});
    res.json({mensaje:"Compra realizada y registrada"});
  });
});

// Obtener historial de compras de un usuario
app.get("/api/compras/:usuario_id", (req,res)=>{
  const {usuario_id} = req.params;
  db.all("SELECT * FROM compras WHERE usuario_id=? ORDER BY fecha DESC", [usuario_id], (err,rows)=>{
    if(err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});