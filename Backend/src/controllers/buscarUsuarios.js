const {sql} = require('../config/db');

// Função para buscar todos os usuários na tabela "Usuarios"
async function buscarUsuarios(req, res) {
    try {
        // Consulta para obter todos os registros da tabela "Usuarios"
        const result = await sql.query`SELECT * FROM Usuarios`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).send('Erro ao buscar dados');
    }
}

module.exports = {
    buscarUsuarios,
};