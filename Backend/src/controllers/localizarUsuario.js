const { sql, connectToDatabase } = require('../config/db');

// Função para localizar um usuário na tabela "Usuarios" por nome
async function localizarUsuario(req, res) {
    const nomeCompleto = req.query.nome;  // Recebe o nome completo passado como parâmetro na URL

    if (!nomeCompleto) {
        return res.status(400).send('Nome não fornecido.');
    }

    try {
        await connectToDatabase();  // Conecta ao banco de dados

        // Consulta pelo nome completo, garantindo que o id seja incluído na resposta
        const result = await sql.query`
        SELECT * FROM Usuarios 
        WHERE Nome = ${nomeCompleto}
    `;
    

        // Se não encontrar o usuário, retorna erro 404
        if (result.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.json(result.recordset[0]);  // Retorna os dados do usuário encontrado
    } catch (err) {
        console.error('Erro ao localizar usuário:', err);
        res.status(500).send('Erro ao localizar usuário.');
    }
}

module.exports = {
    localizarUsuario,
};
