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
