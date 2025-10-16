const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Definição do modelo Usuario
const Usuario = sequelize.define("Usuario", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nome: {
    allowNull: false,
    type: DataTypes.STRING(100),
    validate: {
      len: [3, 100],
    },
  },
  salario: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    validate: {
      min: 0,
      max: 999999,
    },
  },
  dataNascimento: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  ativo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// Testa conexão e sincroniza o modelo com o banco
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado ao MySQL com Sequelize!");
    return sequelize.sync(); // Cria tabelas se não existirem
  })
  .then(() => {
    console.log("✅ Modelos sincronizados!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar/sincronizar:", err);
  });

/* ROTAS */

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "API Cloud Computing - 2º Semestre" });
});

// CREATE
app.post("/usuarios", (req, res) => {
  const { nome, salario, dataNascimento, ativo } = req.body;

  Usuario.create({ nome, salario, dataNascimento, ativo })
    .then((usuario) => res.status(200).send(usuario))
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

// READ - todos
app.get("/usuarios", (req, res) => {
  Usuario.findAll()
    .then((usuarios) => res.status(200).send(usuarios))
    .catch((error) => res.status(500).send(error));
});

// READ - por ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        res.status(200).send(usuario);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => res.status(500).send(error));
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, salario, dataNascimento, ativo } = req.body;

  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        return usuario.update({ nome, salario, dataNascimento, ativo });
      } else {
        return res.status(404).send();
      }
    })
    .then(() => res.status(200).send())
    .catch((error) => res.status(500).send(error));
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        return usuario.destroy();
      } else {
        return res.status(404).send();
      }
    })
    .then(() => res.status(200).send())
    .catch((error) => res.status(500).send(error));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
