const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Configura as rotas dos usuários
app.use('/usuarios', usuariosRouter);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
