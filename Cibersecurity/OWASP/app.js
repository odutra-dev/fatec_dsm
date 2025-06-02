const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database(":memory:");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Banco de dados inseguro
db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
  );
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin123')");
  db.run("INSERT INTO users (username, password) VALUES ('user', 'user123')");
});

// Página inicial vulnerável
app.get("/", (req, res) => {
  res.render("home");
});

// Página de login vulnerável a SQL Injection
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (row) {
      res.send(`Bem-vindo ${row.username}!`);
    } else {
      res.send("Falha no login!");
    }
  });
});

// XSS vulnerável
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.send(`Resultado da pesquisa: ${q}`);
});

// IDOR vulnerável
app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  db.get(`SELECT * FROM users WHERE id = ${userId}`, (err, row) => {
    if (row) {
      res.send(`Perfil: ${JSON.stringify(row)}`);
    } else {
      res.send("Usuário não encontrado!");
    }
  });
});

// Informações sensíveis expostas
app.get("/.env", (req, res) => {
  res.send("DB_PASSWORD=supersecret\nAPI_KEY=123456");
});

app.listen(3000, () =>
  console.log("App vulnerável rodando em http://localhost:3000")
);
