const { sql, connectToDatabase } = require('../config/db');

// Função para verificar se a coluna existe
async function checkAndAddColumn() {
    try {
        await connectToDatabase();

        const result = await sql.query`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios' 
            AND COLUMN_NAME = 'Senha'
        `;

        if (result.recordset.length === 0) {
            await sql.query`
                ALTER TABLE Usuarios
                ADD Senha NVARCHAR(255);
            `;
            console.log('Coluna "Senha" foi adicionada à tabela Usuarios.');
        } else {
            console.log('Coluna "Senha" já existe na tabela Usuarios.');
        }
    } catch (err) {
        console.error('Erro ao verificar ou adicionar coluna:', err);
    }
}

async function inserirUsuario(req, res) {
    const { nome, email, senha } = req.body;

    try {
        await checkAndAddColumn();

        await sql.query`
            INSERT INTO Usuarios (Nome, Email, Senha)
            VALUES (${nome}, ${email}, ${senha})
        `;

        res.status(201).send('Usuário inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).send('Erro ao inserir dados no banco de dados.');
    }
}

async function buscarUsuarios(req, res) {
    try {
        const result = await sql.query`SELECT * FROM Usuarios`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).send('Erro ao buscar dados');
    }
}

module.exports = {
    inserirUsuario,
    buscarUsuarios,
};
