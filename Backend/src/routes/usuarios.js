const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/verificarColuna');
const buscarUsuarios = require('../controllers/buscarUsuarios');
const inserirUsuario = require('../controllers/inserirUsuario');
const localizarUsuario = require('../controllers/localizarUsuario');
const alterarUsuario = require('../controllers/alterarUsuario');
const excluirUsuario = require('../controllers/excluirUsuario');

// Rota para inserir um usuário
router.post('/', inserirUsuario.inserirUsuario);

// Rota para buscar todos os usuários
router.get('/', buscarUsuarios.buscarUsuarios);

// Rota para localizar um usuário por ID ou nome
router.get('/localizar', localizarUsuario.localizarUsuario);

// Rota para alterar um usuário por ID
router.put('/:id', alterarUsuario.alterarUsuario);

// Rota para excluir um usuário por ID e nome completo
router.delete('/', excluirUsuario.excluirUsuario);

module.exports = router;
