const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use('/usuarios', usuariosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
