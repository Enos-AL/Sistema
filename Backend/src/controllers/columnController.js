// src/controllers/columnController.js
const { fetchColumnData } = require('../Service/columnService');
// controllers/columnController.js
const { poolConnect, sql } = require('../config/db'); // Importa a conexão configurada

async function verificarEstruturaTabela(req, res) {
    try {
        await poolConnect; // Garante que a conexão está estabelecida
        
        const request = new sql.Request();
        
        // Query para obter a estrutura da tabela
        const query = `
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'Usuarios';
        `;
        
        const result = await request.query(query);

        res.json(result.recordset); // Retorna a estrutura da tabela como JSON
    } catch (err) {
        console.error('Erro ao verificar a estrutura da tabela:', err);
        res.status(500).send('Erro ao verificar a estrutura da tabela');
    }
}

async function getColumnData(req, res) {

    try {
        const data = await fetchColumnData();
        res.json(data);
    } catch (err) {
        console.error('Erro ao obter dados das colunas:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = { getColumnData,  verificarEstruturaTabela };


