const { sql, connectToDatabase } = require('../config/db');

async function getColunas(req, res) {
    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Recupera a lista de colunas da tabela "Usuarios"
        const result = await sql.query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'Usuarios'
        `);

        const colunas = result.recordset.map(row => row.COLUMN_NAME);
        res.json(colunas);
    } catch (err) {
        console.error('Erro ao recuperar colunas:', err);
        res.status(500).send('Erro ao recuperar colunas.');
    }
}

module.exports = {
    getColunas,
};
