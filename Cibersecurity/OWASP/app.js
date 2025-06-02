const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database(":memory:");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); // Para CSS futuramente, se quiser

// Banco inseguro
db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
  );
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin123')");
  db.run("INSERT INTO users (username, password) VALUES ('user', 'user123')");
});

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Login
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (row) {
      res.redirect(`/profile/${row.id}`);
    } else {
      res.render("login", { error: "Falha no login!" });
    }
  });
});

// Pesquisa (XSS)
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.render("search", { query: q });
});

// Perfil (IDOR)
app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  db.get(`SELECT * FROM users WHERE id = ${userId}`, (err, row) => {
    if (row) {
      res.render("profile", { user: row });
    } else {
      res.send("Usuário não encontrado!");
    }
  });
});

// Exposição de credenciais
app.get("/.env", (req, res) => {
  res.send("DB_PASSWORD=supersecret\nAPI_KEY=123456");
});

app.listen(3000, () => {
  console.log("App vulnerável rodando em http://localhost:3000");
});
