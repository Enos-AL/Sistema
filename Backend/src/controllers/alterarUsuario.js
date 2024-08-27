const { sql, connectToDatabase } = require('../config/db');

// Função para alterar os dados de um usuário na tabela "Usuarios"
async function alterarUsuario(req, res) {
    const id = req.query.id || req.query.ID;
    const nomeCompleto = req.body.nomeCompleto;
    const novosDados = req.body;

    // Verifica se o ID e o nome completo foram fornecidos
    if (!id || !nomeCompleto) {
        return res.status(400).send('É necessário fornecer tanto o ID quanto o nome completo para realizar alterações.');
    }

    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Verifica se o usuário existe com o ID e nome fornecidos
        const usuarioExistente = await sql.query`SELECT * FROM Usuarios WHERE ID = ${parseInt(id, 10)} AND Nome = ${nomeCompleto}`;

        // Se o usuário não for encontrado, retorna erro 404
        if (usuarioExistente.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Verifica a confirmação para realizar a alteração
        const confirmacao = req.body.confirmacao;
        if (confirmacao !== true) {
            return res.status(400).send('Confirmação não realizada. As alterações não foram aplicadas.');
        }

        // Cria a query de atualização com base nos novos dados fornecidos
        const queryParts = [];
        if (novosDados.nome) queryParts.push(`Nome = '${novosDados.nome}'`);
        if (novosDados.email) queryParts.push(`Email = '${novosDados.email}'`);
        if (novosDados.senha) queryParts.push(`Senha = '${novosDados.senha}'`);

        const updateQuery = `UPDATE Usuarios SET ${queryParts.join(', ')} WHERE ID = ${parseInt(id, 10)} AND Nome = '${nomeCompleto}'`;

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