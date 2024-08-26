require('dotenv').config({ path: '../.env' });
const express = require('express');
const sql = require('mssql');

const app = express();

// Configurações do banco de dados
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // para conexões seguras, depende da configuração do seu SQL Server
        trustServerCertificate: true // pode ser necessário dependendo da configuração do SQL Server
    },
    port: parseInt(process.env.DB_PORT, 10)
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexão com o banco de dados SQL Server bem-sucedida!');
    } catch (err) {
        console.error('Erro ao conectar com o banco de dados:', err);
        console.log('Server:', process.env.DB_SERVER);
    }
}

// Conectar ao banco de dados
connectToDatabase();

// Middleware para analisar JSON
app.use(express.json());

// Função para verificar se a coluna existe
async function checkAndAddColumn() {
    try {
      await connectToDatabase();
      
      // Verifica se a coluna "Senha" existe
      const result = await sql.query`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'Usuarios' 
        AND COLUMN_NAME = 'Senha'
      `;
      
      if (result.recordset.length === 0) {
        // Se a coluna "Senha" não existe, adicione-a
        await sql.query`
          ALTER TABLE Usuarios
          ADD Senha NVARCHAR(255);
        `;
        console.log('Coluna "Senha" foi adicionada à tabela Usuario.');
      } else {
        console.log('Coluna "Senha" já existe na tabela Usuario.');
      }
    } catch (err) {
      console.error('Erro ao verificar ou adicionar coluna:', err);
    }
  }

// Rota para inserir um usuário no banco de dados
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
  
    try {
      // Verificar e adicionar a coluna "Senha" se necessário
      await checkAndAddColumn();
  
      // Inserir dados na tabela Usuario
      const result = await sql.query`
        INSERT INTO Usuarios (Nome, Email, Senha)
        VALUES (${nome}, ${email}, ${senha})
      `;
  
      res.status(201).send('Usuário inserido com sucesso!');
    } catch (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados no banco de dados.');
    }
  });

// Rota básica para testar a comunicação com o banco de dados
app.get('/usuarios', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Usuarios`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).send('Erro ao buscar dados');
    }
});

// Usar a porta definida no .env ou 3000 como padrão
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
