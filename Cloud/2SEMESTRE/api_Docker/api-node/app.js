const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("Cloud Computing, 2 Semestre");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
