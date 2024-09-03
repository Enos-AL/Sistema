// src/Services/cdcService.js
const { connectToDatabase } = require('../config/db');

const fetchCDCData = async () => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Usuarios');
        return result.recordset;
    } catch (err) {
        console.error('Erro ao obter dados CDC:', err);
        throw err;
    }
};


module.exports = { fetchCDCData };

