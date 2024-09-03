const { sql, connectToDatabase } = require('../config/db');

async function adicionarColunas(req, res) {
    const { coluna, acao, novaColuna, apiKey } = req.body;

    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Usuário não autorizado verifique a Chave de API com o Gestor.' });
    }

    try {
        await connectToDatabase();

        // Consulta para obter todas as colunas da tabela 'Usuarios'
        const columnsResult = await sql.query`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const columns = columnsResult.recordset.map(row => row.COLUMN_NAME);

        // Ação para listar as colunas da tabela 'Usuarios'
        if (acao === 'listar') {
            return res.json({ colunas: columns });
        }

        // Ação para verificar se a coluna existe
        if (acao === 'verificar') {
            const foundColumn = columns.find(dbColumn => dbColumn.toLowerCase() === coluna.toLowerCase());

            if (foundColumn) {
                const caseSensitiveMatch = foundColumn === coluna;
                if (caseSensitiveMatch) {
                    return res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios com o nome exato.` });
                } else {
                    return res.json({ message: `Nome de coluna encontrada no Banco de Dados, mas com letra minúscula/maiúscula.` });
                }
            } else {
                return res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } 
        
        // Ação para adicionar uma nova coluna
        else if (acao === 'adicionar') {
            if (!columns.map(col => col.toLowerCase()).includes(coluna.toLowerCase())) {
                await sql.query(`
                    ALTER TABLE Usuarios
                    ADD ${coluna} NVARCHAR(255);
                `);
                return res.json({ message: `Coluna "${coluna}" foi adicionada à tabela Usuarios.` });
            } else {
                return res.json({ message: `A coluna "${coluna}" já existe na tabela Usuarios.` });
            }
        } 
        
        // Ação para excluir uma coluna existente
        else if (acao === 'excluir') {
            // Verifica se o nome da coluna contém apenas caracteres válidos (letras, números e underline)
            const isValidColumnName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(coluna);
        
            if (!isValidColumnName) {
                return res.status(400).json({ message: `O nome da coluna "${coluna}" é inválido. Nomes de colunas devem começar com uma letra ou underline e só podem conter letras, números e underline.` });
            }
        
            // Verifica se a coluna existe na tabela
            if (columns.map(col => col.toLowerCase()).includes(coluna.toLowerCase())) {
                await sql.query(`
                    ALTER TABLE Usuarios
                    DROP COLUMN ${coluna};
                `);
                return res.json({ message: `Coluna "${coluna}" foi excluída com sucesso da tabela Usuarios.` });
            } else {
                return res.status(404).json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        }
        
        
        // Ação para alterar o nome de uma coluna existente
        else if (acao === 'alterar') {
            // Garantir que a nova coluna tenha a primeira letra maiúscula, exceto para 'id'
            if (novaColuna !== 'id' && novaColuna[0] !== novaColuna[0].toUpperCase()) {
                return res.status(400).json({ message: 'O novo nome de coluna deve começar com letra maiúscula, exceto "id".' });
            }

            if (columns.map(col => col.toLowerCase()).includes(coluna.toLowerCase())) {
                await sql.query(`
                    EXEC sp_rename 'Usuarios.${coluna}', '${novaColuna}', 'COLUMN';
                `);
                return res.json({ message: `Coluna "${coluna}" foi alterada para "${novaColuna}".` });
            } else {
                return res.json({ message: `A coluna "${coluna}" não existe na tabela Usuarios.` });
            }
        } 
        
        // Ação inválida
        else {
            return res.status(400).json({ message: 'Ação inválida.' });
        }
    } catch (err) {
        console.error('Erro ao processar a requisição:', err);
        return res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = adicionarColunas;
