const { sql, connectToDatabase } = require('../config/db');

async function addColumn(req, res) {
    const { nomeColuna, valor } = req.body;

    try {
        await connectToDatabase();
        await sql.query`
            UPDATE Usuarios
            SET ${sql.raw(nomeColuna)} = ${valor}
        `;
        res.json({ message: `Valor "${valor}" foi adicionado à coluna "${nomeColuna}".` });
    } catch (err) {
        console.error('Erro ao adicionar valor na coluna:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = addColumn;
