const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../config/db');
const adicionarColunas = require('../controllers/adicionarColunas');

connectToDatabase();

router.post('/colunas', adicionarColunas);

module.exports = router;
