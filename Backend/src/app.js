const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

// Configura as rotas dos usuários
app.use('/usuarios', usuariosRouter);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
