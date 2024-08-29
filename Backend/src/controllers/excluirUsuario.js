const { sql, connectToDatabase } = require('../config/db');

// Função para excluir um usuário da tabela "Usuarios"
async function excluirUsuario(req, res) {
    const id = req.params.id; // ID do usuário a ser excluído, fornecido na URL

    // Verifica se o ID foi fornecido
    if (!id) {
        return res.status(400).send('É necessário fornecer o ID para realizar a exclusão.');
    }

    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Verifica se o usuário existe com o ID fornecido
        const usuarioExistente = await sql.query`
            SELECT * FROM Usuarios 
            WHERE ID = ${parseInt(id, 10)}
        `;

        // Se o usuário não for encontrado, retorna erro 404
        if (usuarioExistente.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado com o ID fornecido.');
        }

        // Executa a query para excluir o usuário
        await sql.query`
            DELETE FROM Usuarios 
            WHERE ID = ${parseInt(id, 10)}
        `;
        res.send('Usuário excluído com sucesso!');
    } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        res.status(500).send('Erro ao excluir usuário.');
    }
}

module.exports = {
    excluirUsuario,
};
