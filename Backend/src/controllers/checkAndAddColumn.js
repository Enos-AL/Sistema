const { sql, connectToDatabase } = require('../config/db');

async function checkAndModifyColumn(req, res) {
    const { coluna, acao } = req.body;

    try {
        await connectToDatabase();

        if (acao === 'verificar') {
            const result = await sql.query`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'Usuarios' 
                AND COLUMN_NAME = ${coluna}
            `;
            if (result.recordset.length > 0) {
                res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios.` });
            } else {
                res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } else if (acao === 'adicionar') {
            const result = await sql.query`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'Usuarios' 
                AND COLUMN_NAME = ${coluna}
            `;
            if (result.recordset.length === 0) {
                await sql.query`
                    ALTER TABLE Usuarios
                    ADD ${sql.raw(coluna)} NVARCHAR(255);
                `;
                res.json({ message: `Coluna "${coluna}" foi adicionada à tabela Usuarios.` });
            } else {
                res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios.` });
            }
        } else if (acao === 'verificarColunas') {
            const result = await sql.query`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'Usuarios'
            `;
            res.json({ colunas: result.recordset.map(row => row.COLUMN_NAME) });
        } else {
            res.status(400).json({ message: 'Ação inválida.' });
        }
    } catch (err) {
        console.error('Erro ao processar a requisição:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = checkAndModifyColumn;
