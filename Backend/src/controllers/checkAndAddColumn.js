const { sql, connectToDatabase } = require('../config/db');

// Função para verificar se a coluna "Senha" existe na tabela "Usuarios" e adicioná-la se não existir
async function checkAndAddColumn(req, res, next) {
    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Consulta para verificar se a coluna "Senha" existe na tabela "Usuarios"
        const result = await sql.query`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios' 
            AND COLUMN_NAME = 'Senha'
        `;

        // Se a coluna não existir, adicione-a
        if (result.recordset.length === 0) {
            await sql.query`
                ALTER TABLE Usuarios
                ADD Senha NVARCHAR(255);
            `;
            console.log('Coluna "Senha" foi adicionada à tabela Usuarios.');
        } else {
            console.log('Coluna "Senha" já existe na tabela Usuarios.');
        }
        next();
    } catch (err) {
        console.error('Erro ao verificar ou adicionar coluna:', err);
        res.status(500).send('Erro ao verificar ou adicionar coluna.');
    }
}

module.exports = checkAndAddColumn







