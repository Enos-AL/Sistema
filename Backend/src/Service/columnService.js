// src/Services/columnService.js
const sql = require('mssql');
const { config } = require('../config/db');

const fetchColumnData = async () => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Usuarios'); // Ajuste conforme necessário
        return result.recordset;
    } catch (err) {
        console.error('Erro ao receber dados:', err);
        throw err;
    }
};

module.exports = { fetchColumnData };
