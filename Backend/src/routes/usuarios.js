
// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const adicionarColunas = require('../controllers/adicionarColunas');
const obterDadosParaGrafico = require('../controllers/obterDadosParaGrafico');
const enviarDadosCDC = require('../controllers/cdcController');
const { getColumnData } = require('../controllers/columnController');
const { verificarEstruturaTabela } = require('../controllers/columnController');


// Rota para adicionar colunas
router.post('/', adicionarColunas);

// Rota para obter dados para gráficos
router.get('/graficos', obterDadosParaGrafico);

// Rota para obter dados CDC
router.get('/cdc-data', enviarDadosCDC);

// Rota para obter dados das colunas
router.get('/usuarios/graficos', getColumnData);

// Nova rota para verificar a estrutura da tabela
router.get('/verificar-estrutura-tabela', verificarEstruturaTabela);



module.exports = router;
