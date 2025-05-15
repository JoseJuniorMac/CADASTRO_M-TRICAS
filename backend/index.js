const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // troque se necessário
  database: 'cadastro_metricas'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco:', err);
    return;
  }

  console.log('✅ Conectado ao MySQL');

  // Tabela de usuários
  db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(100) NOT NULL
    )
  `);

  // Tabela de métricas
  db.query(`
    CREATE TABLE IF NOT EXISTS metricas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      titulo VARCHAR(100) NOT NULL,
      valor DECIMAL(10,2) NOT NULL,
      data_hora DATETIME NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);
});

// Cadastro de usuário
app.post('/api/register', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar' });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
  );
});

// Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro ao fazer login' });
      if (results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

      res.status(200).json({ user: results[0] });
    }
  );
});

// Cadastro de métrica
app.post('/metricas', (req, res) => {
  const { usuario_id, titulo, valor, data_hora } = req.body;

  if (!usuario_id || !titulo || !valor || !data_hora) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query(
    'INSERT INTO metricas (usuario_id, titulo, valor, data_hora) VALUES (?, ?, ?, ?)',
    [usuario_id, titulo, valor, data_hora],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar métrica' });
      res.status(201).json({ message: 'Métrica registrada com sucesso' });
    }
  );
});

// Listar métricas por usuário
app.get('/metricas/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  db.query(
    'SELECT * FROM metricas WHERE usuario_id = ? ORDER BY data_hora DESC',
    [usuario_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar métricas' });
      res.status(200).json(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
