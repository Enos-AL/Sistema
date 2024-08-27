const { sql, connectToDatabase } = require('../config/db');

// Função para excluir um usuário da tabela "Usuarios"
async function excluirUsuario(req, res) {
    const { id, nome } = req.body;

    // Verifica se o ID e o nome completo foram fornecidos
    if (!id || !nome) {
        return res.status(400).send('É necessário fornecer o ID e o nome completo do usuário para excluir.');
    }

    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Verifica se o usuário existe com o ID e nome fornecidos
        const userResult = await sql.query`SELECT * FROM Usuarios WHERE ID = ${id} AND Nome = ${nome}`;

        // Se o usuário não for encontrado, retorna erro 400
        if (userResult.recordset.length === 0) {
            return res.status(400).send('Usuário não encontrado ou o nome completo não corresponde ao ID fornecido.');
        }

        // Exclui o usuário da tabela
        await sql.query`DELETE FROM Usuarios WHERE ID = ${id}`;
        res.send('Usuário excluído com sucesso!');
    } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        res.status(500).send('Erro ao excluir usuário.');
    }
}

module.exports = {
    excluirUsuario,
};