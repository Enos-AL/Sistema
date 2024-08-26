const express = require('express');
const { connectToDatabase } = require('./config/db');

const app = express();

// Conectar ao banco de dados
connectToDatabase();

// Middleware para analisar JSON
app.use(express.json());

// Rotas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Usar a porta definida no .env ou 3000 como padrão
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
