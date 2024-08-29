const express = require('express');
const router = express.Router();
const alterarUsuario = require('../controllers/alterarUsuario');
const excluirUsuario = require('../controllers/excluirUsuario');
const localizarUsuario = require('../controllers/localizarUsuario');

// Rota para localizar um usuário por ID ou nome
router.get('/localizar', localizarUsuario.localizarUsuario); // Localiza um usuário

// Rota para alterar um usuário por ID
router.put('/alterar/:id', alterarUsuario.alterarUsuario); // Altera um usuário existente

// Rota para excluir um usuário por ID
router.delete('/excluir/:id', excluirUsuario.excluirUsuario); // Exclui um usuário existente

module.exports = router;
