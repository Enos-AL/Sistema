const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota para inserir um usuário no banco de dados
router.post('/', usuariosController.inserirUsuario);

// Rota para buscar todos os usuários
router.get('/', usuariosController.buscarUsuarios);

module.exports = router;
