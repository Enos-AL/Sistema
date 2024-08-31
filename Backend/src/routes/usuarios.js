const express = require('express');
const router = express.Router();
const adicionarColunas  = require('../controllers/adicionarColunas');
const obterDadosParaGrafico = require('../controllers/obterDadosParaGrafico');

// Rotas existentes
router.post('/colunas', adicionarColunas);

// Nova rota para obter dados para gráficos
router.get('/graficos', obterDadosParaGrafico);

module.exports = router;
