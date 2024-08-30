const { sql, connectToDatabase } = require('../config/db');

// Função para alterar os dados de um usuário na tabela "Usuarios"
async function alterarUsuario(req, res) {
    const id = req.params.id; // ID do usuário a ser alterado, fornecido na URL
    const novosDados = req.body; // Dados para atualizar

    // Verifica se o ID foi fornecido
    if (!id) {
        return res.status(400).send('É necessário fornecer o ID para realizar alterações.');
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

        // Cria a query de atualização com base nos novos dados fornecidos dinamicamente
        const queryParts = Object.keys(novosDados).map(coluna => `${coluna} = '${novosDados[coluna]}'`).join(', ');

        // Verifica se há dados para alterar
        if (queryParts.length === 0) {
            return res.status(400).send('Nenhum dado fornecido para alteração.');
        }

        const updateQuery = `UPDATE Usuarios SET ${queryParts} WHERE ID = ${parseInt(id, 10)}`;

        // Executa a query de atualização
        await sql.query(updateQuery);
        res.send('Usuário alterado com sucesso!');
    } catch (err) {
        console.error('Erro ao alterar usuário:', err);
        res.status(500).send('Erro ao alterar usuário.');
    }
}

module.exports = {
    alterarUsuario,
};
