const express = require('express');
const router = express.Router();

// Certifique-se de que a função é uma função de middleware válida
const checkAndAddColumn = require('../controllers/checkAndAddColumn');
const buscarUsuarios = require('../controllers/buscarUsuarios');
const inserirUsuario = require('../controllers/inserirUsuario');
const localizarUsuario = require('../controllers/localizarUsuario');
const alterarUsuario = require('../controllers/alterarUsuario');
const excluirUsuario = require('../controllers/excluirUsuario');

// Rota para verificar e adicionar coluna do usuário (se necessário)
router.post('/checkAndAddColumn', checkAndAddColumn); // Apenas verifica e adiciona a coluna

// Rota para inserir um usuário
router.post('/', inserirUsuario.inserirUsuario); // Insere um novo usuário

// Rota para buscar todos os usuários
router.get('/', buscarUsuarios.buscarUsuarios); // Busca todos os usuários

// Rota para localizar um usuário por ID ou nome
router.get('/localizar', localizarUsuario.localizarUsuario); // Localiza um usuário

// Rota para alterar um usuário por ID
router.put('/:id', alterarUsuario.alterarUsuario); // Altera um usuário existente

// Rota para excluir um usuário por ID e nome completo
router.delete('/', excluirUsuario.excluirUsuario); // Exclui um usuário

module.exports = router;
