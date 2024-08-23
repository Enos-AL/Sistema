require('dotenv').config();
const express = require('express');
const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Rota básica para testar a comunicação
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Usar a porta definida no .env ou 3000 como padrão
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
