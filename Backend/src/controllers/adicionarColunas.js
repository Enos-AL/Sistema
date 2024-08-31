const { sql, connectToDatabase } = require('../config/db');

async function adicionarColunas(req, res) {
    const { coluna, acao, novaColuna, apiKey } = req.body;

    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Usuário não autorizado verifique a Chave de API com o Gestor.' });
    }

    try {
        await connectToDatabase();

        if (acao === 'listar') {
            const result = await sql.query`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'Usuarios'
            `;
            return res.json({ colunas: result.recordset.map(row => row.COLUMN_NAME) });
        }

        const columnsResult = await sql.query`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const columns = columnsResult.recordset.map(row => row.COLUMN_NAME.toLowerCase());

        if (acao === 'verificar') {
            if (columns.includes(coluna.toLowerCase())) {
                return res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios.` });
            } else {
                return res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } else if (acao === 'adicionar') {
            if (!columns.includes(coluna.toLowerCase())) {
                await sql.query(`
                    ALTER TABLE Usuarios
                    ADD ${coluna} NVARCHAR(255);
                `);
                return res.json({ message: `Coluna "${coluna}" foi adicionada à tabela Usuarios.` });
            } else {
                return res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios.` });
            }
        } else if (acao === 'excluir') {
            if (columns.includes(coluna.toLowerCase())) {
                await sql.query(`
                    ALTER TABLE Usuarios
                    DROP COLUMN ${coluna};
                `);
                return res.json({ message: `Coluna "${coluna}" foi excluída com sucesso da tabela Usuarios.` });
            } else {
                return res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } else if (acao === 'alterar') {
            if (columns.includes(coluna.toLowerCase())) {
                await sql.query(`
                    EXEC sp_rename 'Usuarios.${coluna}', '${novaColuna}', 'COLUMN';
                `);
                return res.json({ message: `Coluna "${coluna}" foi alterada para "${novaColuna}".` });
            } else {
                return res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } else {
            return res.status(400).json({ message: 'Ação inválida.' });
        }
    } catch (err) {
        console.error('Erro ao processar a requisição:', err);
        return res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = adicionarColunas;
