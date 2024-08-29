const { sql, connectToDatabase } = require('../config/db');
const checkAndModifyColumn = require('../controllers/checkAndAddColumn');

// Função para inserir um novo usuário na tabela "Usuarios"
async function inserirUsuario(req, res) {
    const { nome, email, senha } = req.body;

    try {
        // Verifica e adiciona a coluna "Senha" se necessário
        await checkAndModifyColumn(req, res, () => {}); // Passa req, res e uma função vazia como próximo middleware

        // Insere um novo registro na tabela "Usuarios"
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

module.exports = {
    inserirUsuario,
};
