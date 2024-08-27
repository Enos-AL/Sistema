const { sql, connectToDatabase } = require('../config/db');

// Função para localizar um usuário na tabela "Usuarios" por ID ou nome
async function localizarUsuario(req, res) {
    const id = req.query.id || req.query.ID;
    const nome = req.query.nome || req.query.NOME;

    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        let result;
        // Consulta o usuário pelo ID ou nome
        if (id) {
            result = await sql.query`SELECT * FROM Usuarios WHERE ID = ${parseInt(id, 10)}`;
        } else if (nome) {
            result = await sql.query`SELECT * FROM Usuarios WHERE Nome = ${nome}`;
        } else {
            return res.status(400).send('Por favor, forneça um ID ou nome completo para localizar o usuário.');
        }

        // Se o usuário não for encontrado, retorna erro 404
        if (result.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao localizar usuário:', err);
        res.status(500).send('Erro ao localizar usuário.');
    }
}




module.exports = {
    localizarUsuario,
};