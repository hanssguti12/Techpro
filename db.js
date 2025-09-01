const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("tienda.sqlite");

db.serialize(() => {
  // Productos
  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `);

  // Usuarios (login simple)
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Historial de compras
  db.run(`
    CREATE TABLE IF NOT EXISTS compras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      producto TEXT NOT NULL,
      cantidad INTEGER NOT NULL,
      total REAL NOT NULL,
      fecha TEXT NOT NULL,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);

  // Usuario por defecto
  db.get("SELECT * FROM usuarios WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO usuarios (username, password) VALUES (?,?)", ['admin','1234']);
    }
  });
});

module.exports = db;